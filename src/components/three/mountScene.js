import * as THREE from "three";

// Convierte "#rrggbb" en un vec3 con los valores sRGB tal cual (0..1), sin pasar a lineal.
// Los ShaderMaterial de estas escenas escriben el color directo a pantalla, así que el hex
// que se ve en el código es el que se ve en el canvas.
export function hexVec(hex) {
  const value = parseInt(hex.replace("#", ""), 16);
  return new THREE.Vector3(((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255);
}

export function makeGlowTexture(size = 128) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.6)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.12)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function disposeMaterial(material) {
  if (material.uniforms) {
    Object.values(material.uniforms).forEach((uniform) => uniform.value?.isTexture && uniform.value.dispose());
  }
  material.map?.dispose();
  material.dispose();
}

/**
 * Monta una escena three.js dentro de `container` y devuelve la función de limpieza.
 *
 * `setup` recibe { THREE, scene, camera, renderer, pointer, size, container } y puede devolver:
 *   - update(time, delta): se llama en cada frame
 *   - resize(width, height): tras cada cambio de tamaño
 *   - dispose(): limpieza extra (listeners propios, etc.)
 *   - stillTime: instante que se dibuja cuando el usuario pide reducir el movimiento
 *
 * `pointer.x/y` van de -1 a 1 relativos al contenedor (y hacia arriba); `sx/sy` son la versión
 * suavizada; `active` indica si el cursor está encima.
 */
export function mountScene(container, setup, { reducedMotion = false, fov = 45, maxPixelRatio = 2 } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return () => {};
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
  renderer.setClearColor(0x000000, 0);
  Object.assign(renderer.domElement.style, { position: "absolute", inset: "0", width: "100%", height: "100%", display: "block" });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 400);
  const pointer = { x: 0, y: 0, sx: 0, sy: 0, active: false, down: false };
  const size = { width: 1, height: 1, aspect: 1 };

  const api = setup({ THREE, scene, camera, renderer, pointer, size, container }) || {};

  const clock = new THREE.Clock();
  let elapsed = 0;
  let frame = 0;
  let visible = true;

  function render() {
    renderer.render(scene, camera);
  }

  function resize() {
    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;
    size.width = width;
    size.height = height;
    size.aspect = width / height;
    renderer.setSize(width, height, false);
    camera.aspect = size.aspect;
    camera.updateProjectionMatrix();
    api.resize?.(width, height);
    if (reducedMotion) render();
  }

  function tick() {
    frame = requestAnimationFrame(tick);
    if (!visible) {
      clock.getDelta();
      return;
    }
    const delta = Math.min(clock.getDelta(), 0.05);
    elapsed += delta;
    pointer.sx += (pointer.x - pointer.sx) * Math.min(1, delta * 4);
    pointer.sy += (pointer.y - pointer.sy) * Math.min(1, delta * 4);
    api.update?.(elapsed, delta);
    render();
  }

  function onPointerMove(event) {
    const rect = container.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    pointer.active = Math.abs(x) <= 1 && Math.abs(y) <= 1;
    pointer.x = Math.max(-1.5, Math.min(1.5, x));
    pointer.y = Math.max(-1.5, Math.min(1.5, y));
  }
  const onPointerDown = () => (pointer.down = true);
  const onPointerUp = () => (pointer.down = false);
  const onPointerLeave = () => {
    pointer.active = false;
    pointer.down = false;
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  // Pausa el render cuando el banner sale de pantalla. Arranca visible: en algunas pestañas
  // en segundo plano el observer no entrega el callback inicial.
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  intersectionObserver.observe(container);

  if (reducedMotion) {
    api.update?.(api.stillTime ?? 6, 0);
    render();
  } else {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerleave", onPointerLeave);
    tick();
  }

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    container.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointerup", onPointerUp);
    container.removeEventListener("pointerleave", onPointerLeave);
    api.dispose?.();
    scene.traverse((object) => {
      object.geometry?.dispose();
      if (Array.isArray(object.material)) object.material.forEach(disposeMaterial);
      else if (object.material) disposeMaterial(object.material);
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}

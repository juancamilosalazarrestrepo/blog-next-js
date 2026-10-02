import * as THREE from "three";
import { HERO_AGENTS, HERO_MODULES, HERO_ORBITS, HERO_STACK_BREAKPOINT } from "./config";

// Radio aproximado del sistema completo (núcleo + órbitas + módulos), para encajarlo en pantalla.
const SYSTEM_RADIUS = 4.3;
const ACTIVATION_INTERVAL = 2.6;
const PACKETS_PER_CONNECTION = 3;

const CORE_COLOR = new THREE.Color("#1d6cf2");
const MODULE_COLOR = new THREE.Color("#a78bfa");

function makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.18, "rgba(255,255,255,0.75)");
  gradient.addColorStop(0.45, "rgba(255,255,255,0.18)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function fibonacciSphere(count, radius) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
    seeds[i] = Math.random();
  }
  return { positions, seeds };
}

const fresnelVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const coreFragment = /* glsl */ `
  uniform vec3 uInner;
  uniform vec3 uRim;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float f = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.0);
    float pulse = 0.85 + 0.15 * sin(uTime * 2.2);
    gl_FragColor = vec4(mix(uInner, uRim, f) * pulse, 1.0);
  }
`;

const haloFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float f = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 3.0);
    gl_FragColor = vec4(uColor, f * 0.9);
  }
`;

// Nube de puntos que "respira" alrededor del núcleo: la mente del sistema.
const shellVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    vec3 p = position;
    float w = sin(p.y * 3.0 + uTime * 1.2 + aSeed * 6.2831) * 0.5 + 0.5;
    float w2 = sin(p.x * 2.5 - uTime * 0.9) * 0.5 + 0.5;
    p *= 1.0 + 0.14 * w * w2;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.4 + 3.2 * w) * uPixelRatio * (10.0 / -mv.z);
    vAlpha = 0.2 + 0.8 * w;
    vColor = mix(vec3(0.07, 0.32, 0.83), vec3(0.22, 0.74, 0.97), w2);
  }
`;

const shellFragment = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(vColor, smoothstep(0.5, 0.0, d) * vAlpha);
  }
`;

/**
 * Monta la escena 3D del hero dentro de `container`.
 * Devuelve una función de limpieza, o null si el navegador no soporta WebGL.
 */
export function createAgentsScene({ container, agentLabels = [], moduleLabels = [], reducedMotion = false, onActivate, onReady }) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);
  container.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  const glowMap = makeGlowTexture();
  const additive = { transparent: true, blending: THREE.AdditiveBlending, depthWrite: false };
  const isCompact = container.clientWidth < HERO_STACK_BREAKPOINT;

  // --- Campo de estrellas de fondo ---
  const starCount = isCompact ? 500 : 1100;
  const starPositions = new Float32Array(starCount * 3);
  const dir = new THREE.Vector3();
  for (let i = 0; i < starCount; i++) {
    dir.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    dir.multiplyScalar(9 + Math.random() * 16);
    starPositions.set([dir.x, dir.y, dir.z], i * 3);
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
  const stars = new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.05, opacity: 0.55, transparent: true, depthWrite: false })
  );
  scene.add(stars);

  // --- Sistema: núcleo, órbitas con agentes y módulos de software ---
  const system = new THREE.Group();
  scene.add(system);
  const spin = new THREE.Group();
  system.add(spin);

  const coreGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowMap, color: CORE_COLOR, opacity: 0.85, ...additive }));
  coreGlow.scale.setScalar(4.4);
  system.add(coreGlow);

  const coreMaterial = new THREE.ShaderMaterial({
    vertexShader: fresnelVertex,
    fragmentShader: coreFragment,
    uniforms: {
      uInner: { value: new THREE.Color("#2563eb") },
      uRim: { value: new THREE.Color("#bae6fd") },
      uTime: { value: 0 },
    },
  });
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.62, 48, 48), coreMaterial);
  system.add(core);

  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(0.98, 48, 48),
    new THREE.ShaderMaterial({
      vertexShader: fresnelVertex,
      fragmentShader: haloFragment,
      uniforms: { uColor: { value: new THREE.Color("#38bdf8") } },
      ...additive,
    })
  );
  system.add(halo);

  const icosahedron = new THREE.IcosahedronGeometry(1.25, 1);
  const wireInner = new THREE.LineSegments(
    new THREE.EdgesGeometry(icosahedron),
    new THREE.LineBasicMaterial({ color: 0x60a5fa, opacity: 0.5, ...additive })
  );
  icosahedron.dispose();
  system.add(wireInner);

  const octahedron = new THREE.OctahedronGeometry(1.6, 0);
  const wireOuter = new THREE.LineSegments(
    new THREE.EdgesGeometry(octahedron),
    new THREE.LineBasicMaterial({ color: 0xa78bfa, opacity: 0.28, ...additive })
  );
  octahedron.dispose();
  system.add(wireOuter);

  const shell = fibonacciSphere(isCompact ? 420 : 760, 1.8);
  const shellGeometry = new THREE.BufferGeometry();
  shellGeometry.setAttribute("position", new THREE.BufferAttribute(shell.positions, 3));
  shellGeometry.setAttribute("aSeed", new THREE.BufferAttribute(shell.seeds, 1));
  const shellMaterial = new THREE.ShaderMaterial({
    vertexShader: shellVertex,
    fragmentShader: shellFragment,
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: pixelRatio } },
    ...additive,
  });
  system.add(new THREE.Points(shellGeometry, shellMaterial));

  const orbits = HERO_ORBITS.map((config) => {
    const group = new THREE.Group();
    group.rotation.set(...config.tilt);
    spin.add(group);
    const points = [];
    for (let i = 0; i < 160; i++) {
      const a = (i / 160) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(a) * config.radius, 0, Math.sin(a) * config.radius));
    }
    group.add(
      new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: 0x38bdf8, opacity: 0.16, ...additive })
      )
    );
    return { ...config, group };
  });

  const modules = HERO_MODULES.map((config, i) => {
    const group = new THREE.Group();
    group.position.set(...config.position);
    system.add(group);
    const box = new THREE.BoxGeometry(0.62, 0.62, 0.62);
    const frame = new THREE.LineSegments(
      new THREE.EdgesGeometry(box),
      new THREE.LineBasicMaterial({ color: MODULE_COLOR, opacity: 0.85, ...additive })
    );
    box.dispose();
    const inner = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.32, 0.32),
      new THREE.MeshBasicMaterial({ color: MODULE_COLOR, opacity: 0.45, ...additive })
    );
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowMap, color: MODULE_COLOR, opacity: 0.35, ...additive }));
    glow.scale.setScalar(1.3);
    group.add(frame, inner, glow);
    return { ...config, group, frame, inner, base: new THREE.Vector3(...config.position), seed: i * 1.7 };
  });

  const agents = HERO_AGENTS.map((config) => {
    const color = new THREE.Color(config.color);
    const node = new THREE.Group();
    orbits[config.orbit].group.add(node);
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 24), new THREE.MeshBasicMaterial({ color }));
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowMap, color, opacity: 0.9, ...additive }));
    glow.scale.setScalar(0.9);
    node.add(sphere, glow);
    return {
      ...config,
      color,
      node,
      glow,
      level: 0,
      target: modules.find((m) => m.key === config.module),
    };
  });

  // --- Conexiones (núcleo → agente → módulo) y paquetes de datos viajando por ellas ---
  const connections = agents.flatMap((agent, i) => [
    { from: core, to: agent.node, agent: i, colorA: CORE_COLOR, colorB: agent.color },
    { from: agent.node, to: agent.target.group, agent: i, colorA: agent.color, colorB: MODULE_COLOR },
  ]);

  const linePositions = new Float32Array(connections.length * 6);
  const lineColors = new Float32Array(connections.length * 6);
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
  lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));
  const lines = new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ vertexColors: true, opacity: 0.6, ...additive }));
  lines.frustumCulled = false;
  scene.add(lines);

  const packets = [];
  connections.forEach((_, c) => {
    for (let k = 0; k < PACKETS_PER_CONNECTION; k++) {
      packets.push({ connection: c, t: k / PACKETS_PER_CONNECTION + Math.random() * 0.1, speed: 0.3 + Math.random() * 0.2 });
    }
  });
  const packetPositions = new Float32Array(packets.length * 3);
  const packetColors = new Float32Array(packets.length * 3);
  const packetGeometry = new THREE.BufferGeometry();
  packetGeometry.setAttribute("position", new THREE.BufferAttribute(packetPositions, 3).setUsage(THREE.DynamicDrawUsage));
  packetGeometry.setAttribute("color", new THREE.BufferAttribute(packetColors, 3).setUsage(THREE.DynamicDrawUsage));
  const packetMaterial = new THREE.PointsMaterial({ size: 0.24, map: glowMap, vertexColors: true, ...additive });
  const packetPoints = new THREE.Points(packetGeometry, packetMaterial);
  packetPoints.frustumCulled = false;
  scene.add(packetPoints);

  // --- Layout responsive ---
  const layout = { scale: 1, x: 0, y: 0, width: 1, height: 1 };

  function resize() {
    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const halfW = halfH * camera.aspect;
    if (width >= HERO_STACK_BREAKPOINT) {
      // Escritorio: el sistema vive en la columna derecha, a la par del texto.
      layout.x = halfW * 0.4;
      layout.y = halfH * 0.08;
      layout.scale = Math.min(0.95, (halfW * 0.56) / SYSTEM_RADIUS);
    } else {
      // Apilado: el sistema ocupa la franja superior (debe coincidir con el padding del CSS).
      const region = Math.min(width * 0.9, 440);
      const centerY = region / 2 + 8;
      const regionHalfWorld = (region / 2 / height) * 2 * halfH;
      layout.x = 0;
      layout.y = (0.5 - centerY / height) * 2 * halfH;
      layout.scale = Math.min(halfW * 0.92, regionHalfWorld * 1.15) / SYSTEM_RADIUS;
    }
    layout.width = width;
    layout.height = height;
    system.position.set(layout.x, layout.y, 0);
    system.scale.setScalar(layout.scale);
    packetMaterial.size = 0.24 * layout.scale;
    if (reducedMotion) renderFrame(0);
  }

  // --- Interacción con el puntero (parallax suave) ---
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
  }
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  // --- Actualización por frame ---
  const tmpA = new THREE.Vector3();
  const tmpB = new THREE.Vector3();
  const corePos = new THREE.Vector3();
  const projected = new THREE.Vector3();
  const endpoints = connections.map(() => [new THREE.Vector3(), new THREE.Vector3()]);
  let activeIndex = -1;
  let activationTimer = ACTIVATION_INTERVAL - 1;
  let elapsed = reducedMotion ? 4 : 0;

  function placeLabel(el, object, lift, minOpacity) {
    if (!el) return;
    object.getWorldPosition(tmpA);
    projected.copy(tmpA).project(camera);
    const x = (projected.x * 0.5 + 0.5) * layout.width;
    const y = (-projected.y * 0.5 + 0.5) * layout.height;
    // Los nodos que pasan por detrás del núcleo se atenúan.
    const depth = camera.position.distanceTo(tmpA) - camera.position.distanceTo(corePos);
    const opacity = THREE.MathUtils.clamp(1 - depth * 0.4, minOpacity, 1);
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${(y - lift).toFixed(1)}px, 0) translate(-50%, -100%)`;
    el.style.opacity = opacity.toFixed(2);
    el.style.zIndex = String(Math.round(100 - depth * 10));
  }

  function update(dt) {
    elapsed += dt;
    const t = elapsed;

    if (!reducedMotion) {
      activationTimer += dt;
      if (activationTimer >= ACTIVATION_INTERVAL) {
        activationTimer = 0;
        activeIndex = (activeIndex + 1) % agents.length;
        onActivate?.(activeIndex);
      }
    }

    pointer.sx += (pointer.x - pointer.sx) * 0.04;
    pointer.sy += (pointer.y - pointer.sy) * 0.04;
    system.rotation.y = pointer.sx * 0.35;
    system.rotation.x = pointer.sy * 0.2;
    spin.rotation.y = t * 0.05;
    stars.rotation.y = t * 0.008 + pointer.sx * 0.05;
    stars.rotation.x = pointer.sy * 0.03;

    coreMaterial.uniforms.uTime.value = t;
    shellMaterial.uniforms.uTime.value = t;
    wireInner.rotation.set(t * 0.2, t * 0.3, 0);
    wireOuter.rotation.set(-t * 0.12, -t * 0.18, t * 0.05);
    coreGlow.scale.setScalar(4.4 + Math.sin(t * 2.2) * 0.25);

    for (const orbit of orbits) orbit.angle = t * orbit.speed;
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      const orbit = orbits[agent.orbit];
      const angle = agent.phase + orbit.angle;
      agent.node.position.set(Math.cos(angle) * orbit.radius, 0, Math.sin(angle) * orbit.radius);
      agent.level += ((i === activeIndex ? 1 : 0) - agent.level) * Math.min(1, dt * 4 || 1);
      agent.glow.scale.setScalar(0.9 * (1 + agent.level * 0.8) * (1 + Math.sin(t * 3 + i) * 0.08));
    }

    for (const module of modules) {
      module.group.position.set(module.base.x, module.base.y + Math.sin(t * 0.8 + module.seed) * 0.12, module.base.z);
      module.frame.rotation.set(t * 0.25 + module.seed, t * 0.35, 0);
      module.inner.rotation.set(-t * 0.5, -t * 0.4 + module.seed, 0);
    }

    scene.updateMatrixWorld(true);
    core.getWorldPosition(corePos);

    connections.forEach((connection, c) => {
      const [a, b] = endpoints[c];
      connection.from.getWorldPosition(a);
      connection.to.getWorldPosition(b);
      linePositions.set([a.x, a.y, a.z, b.x, b.y, b.z], c * 6);
      const k = 0.25 + 0.75 * agents[connection.agent].level;
      lineColors.set(
        [connection.colorA.r * k, connection.colorA.g * k, connection.colorA.b * k, connection.colorB.r * k, connection.colorB.g * k, connection.colorB.b * k],
        c * 6
      );
    });
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;

    packets.forEach((packet, p) => {
      const connection = connections[packet.connection];
      const level = agents[connection.agent].level;
      packet.t = (packet.t + dt * packet.speed * (1 + level * 1.4)) % 1;
      const [a, b] = endpoints[packet.connection];
      tmpB.lerpVectors(a, b, packet.t);
      packetPositions.set([tmpB.x, tmpB.y, tmpB.z], p * 3);
      tmpA.copy(connection.colorA).lerp(connection.colorB, packet.t);
      const k = 0.45 + 0.75 * level;
      packetColors.set([tmpA.x * k, tmpA.y * k, tmpA.z * k], p * 3);
    });
    packetGeometry.attributes.position.needsUpdate = true;
    packetGeometry.attributes.color.needsUpdate = true;

    agents.forEach((agent, i) => placeLabel(agentLabels[i], agent.node, 18 * layout.scale + 6, 0.25));
    modules.forEach((module, i) => placeLabel(moduleLabels[i], module.group, 34 * layout.scale + 6, 0.7));
  }

  let readyNotified = false;
  function renderFrame(dt) {
    update(dt);
    renderer.render(scene, camera);
    if (!readyNotified) {
      readyNotified = true;
      onReady?.();
    }
  }

  // --- Bucle de render: se pausa fuera de pantalla o con la pestaña oculta ---
  let inView = true;
  const io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
  });
  io.observe(container);

  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  let raf = 0;
  let last = performance.now();
  function loop(now) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!inView || document.hidden) return;
    renderFrame(dt);
  }
  if (reducedMotion) renderFrame(0);
  else raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    scene.traverse((object) => {
      object.geometry?.dispose();
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => material?.dispose());
    });
    glowMap.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    [...agentLabels, ...moduleLabels].forEach((el) => el && (el.style.opacity = "0"));
  };
}

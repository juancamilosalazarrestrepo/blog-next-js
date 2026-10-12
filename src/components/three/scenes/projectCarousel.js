import { mountScene, makeGlowTexture } from "../mountScene";

// Carrusel 3D de proyectos: las fotos giran sobre un arco y se deslizan de una en una.
// Cada tarjeta tiene borde de acento y reflejo en el piso; el halo y el anillo de onda
// cambian con el proyecto activo. Clic en la tarjeta activa abre el proyecto; arrastrar cambia.

const CARD_W = 3.6;
const CARD_H = CARD_W * 0.625; // proporción 16:10
const RADIUS = 5.2;
const STEP_ANGLE = 0.55; // ángulo entre tarjetas vecinas
const AUTOPLAY_SECONDS = 5;
const TEX_W = 1200;
const TEX_H = 750;
const TEX_RADIUS = 56;
const DEFAULT_ACCENTS = ["#00c6ff", "#a78bfa", "#5eead4", "#f0abfc", "#fbbf24", "#60a5fa"];

const wrap = (i, n) => ((i % n) + n) % n;

// Distancia más corta dentro de un anillo de n posiciones (para que el carrusel sea circular).
const ringDistance = (d, n) => {
  const x = wrap(d, n);
  return x > n / 2 ? x - n : x;
};

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Dibuja la foto del proyecto en un canvas con esquinas redondeadas y borde de acento.
async function buildCardTexture(THREE, { image, title }, accent) {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_W;
  canvas.height = TEX_H;
  const ctx = canvas.getContext("2d");

  ctx.save();
  roundRect(ctx, 0, 0, TEX_W, TEX_H, TEX_RADIUS);
  ctx.clip();
  const background = ctx.createLinearGradient(0, 0, TEX_W, TEX_H);
  background.addColorStop(0, "#0b1d44");
  background.addColorStop(1, "#050b1d");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  try {
    const img = await loadImage(image);
    const scale = Math.max(TEX_W / img.width, TEX_H / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    ctx.drawImage(img, (TEX_W - w) / 2, (TEX_H - h) / 2, w, h);
  } catch {
    // Si la imagen no carga (CORS o red), se muestra el título sobre un degradado de acento.
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, TEX_W, TEX_H);
    ctx.globalAlpha = 1;
    ctx.font = "700 72px system-ui, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(title, 72, TEX_H / 2, TEX_W - 144);
  }

  const shade = ctx.createLinearGradient(0, TEX_H * 0.5, 0, TEX_H);
  shade.addColorStop(0, "rgba(2,5,13,0)");
  shade.addColorStop(1, "rgba(2,5,13,0.6)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, TEX_W, TEX_H);
  ctx.restore();

  ctx.lineWidth = 8;
  ctx.strokeStyle = accent;
  ctx.shadowColor = accent;
  ctx.shadowBlur = 24;
  roundRect(ctx, 4, 4, TEX_W - 8, TEX_H - 8, TEX_RADIUS);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Máscara de degradado para que el reflejo se desvanezca hacia el piso.
function buildFadeTexture(THREE) {
  const canvas = document.createElement("canvas");
  canvas.width = 4;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, 256);
  gradient.addColorStop(0, "#000000");
  gradient.addColorStop(1, "#ffffff");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 4, 256);
  return new THREE.CanvasTexture(canvas);
}

function createCard(THREE, accent, fadeTexture) {
  const geometry = new THREE.PlaneGeometry(CARD_W, CARD_H);
  const faceMaterial = new THREE.MeshBasicMaterial({ color: 0x14213d, transparent: true });
  const face = new THREE.Mesh(geometry, faceMaterial);

  const reflectionMaterial = new THREE.MeshBasicMaterial({
    color: 0x14213d,
    alphaMap: fadeTexture,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
  });
  const reflection = new THREE.Mesh(geometry, reflectionMaterial);
  // Espejo justo debajo de la tarjeta.
  reflection.position.y = -CARD_H;
  reflection.scale.y = -1;

  const group = new THREE.Group();
  group.add(face, reflection);
  return {
    group,
    face,
    reflection,
    materials: [faceMaterial, reflectionMaterial],
    accent: new THREE.Color(accent),
  };
}

function setupCarousel({ THREE, scene, camera, pointer, container }, { slides, reducedMotion, onChange, onOpen }) {
  const count = slides.length;
  const deck = new THREE.Group();
  scene.add(deck);

  const fadeTexture = buildFadeTexture(THREE);
  const glow = makeGlowTexture(256);
  let alive = true;

  const cards = slides.map((slide, i) => {
    const accent = slide.accent || DEFAULT_ACCENTS[i % DEFAULT_ACCENTS.length];
    const card = createCard(THREE, accent, fadeTexture);
    deck.add(card.group);
    buildCardTexture(THREE, slide, accent).then((texture) => {
      if (!alive) {
        texture.dispose();
        return;
      }
      card.face.material.map = texture;
      card.reflection.material.map = texture;
      card.face.material.needsUpdate = true;
      card.reflection.material.needsUpdate = true;
    });
    return card;
  });
  const faces = cards.map((card) => card.face);

  // Halo de color detrás de la tarjeta activa.
  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glow,
      color: cards[0].accent.clone(),
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  halo.scale.set(CARD_W * 2.4, CARD_H * 2.6, 1);
  halo.position.set(0, 0, -0.8);
  deck.add(halo);

  // Anillos de onda que salen de la tarjeta cada vez que cambia el proyecto.
  const ringGeometry = new THREE.RingGeometry(0.96, 1, 96);
  const rings = [];
  function spawnRing(card) {
    const material = new THREE.MeshBasicMaterial({
      color: card.accent,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(ringGeometry, material);
    mesh.position.copy(card.group.position);
    mesh.position.z += 0.05;
    deck.add(mesh);
    rings.push({ mesh, material, t: 0 });
  }

  // Polvo luminoso de fondo.
  const particleCount = 240;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 24;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = -4 - Math.random() * 10;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
      color: 0xbfe9ff,
      size: 0.08,
      map: glow,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  scene.add(particles);

  // Altura de mira: deja las tarjetas en el tercio superior, con el texto debajo.
  let lookY = -1;

  let target = 0; // índice continuo (puede crecer o ser negativo; se normaliza con wrap)
  let current = 0; // posición animada
  let previous = 0;
  let velocity = 0;
  let activeIndex = 0;
  let lastSwitch = 0;
  let elapsed = 0;

  function goTo(index) {
    target += ringDistance(index - wrap(target, count), count);
    lastSwitch = elapsed;
  }
  const next = () => goTo(wrap(target, count) + 1);
  const prev = () => goTo(wrap(target, count) - 1);

  // Entrada con el puntero: clic (sin arrastrar) abre o selecciona, arrastre horizontal cambia.
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let downX = 0;
  let downY = 0;

  function onDown(event) {
    downX = event.clientX;
    downY = event.clientY;
  }

  function onUp(event) {
    const dx = event.clientX - downX;
    const dy = event.clientY - downY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
      return;
    }
    if (Math.hypot(dx, dy) > 6) return;

    const rect = container.getBoundingClientRect();
    ndc.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(faces, false).find((h) => h.object.parent.visible);
    if (!hit) return;
    const index = faces.indexOf(hit.object);
    if (index === wrap(target, count)) onOpen?.(index);
    else goTo(index);
  }

  container.addEventListener("pointerdown", onDown);
  container.addEventListener("pointerup", onUp);

  function layout(delta) {
    const k = 1 - Math.exp(-delta * 4.2);
    current += (target - current) * k;
    velocity = delta > 0 ? (current - previous) / delta : 0;
    previous = current;

    cards.forEach((card, i) => {
      const d = ringDistance(i - current, count);
      const ad = Math.min(Math.abs(d), 1);
      const angle = d * STEP_ANGLE;
      card.group.position.set(Math.sin(angle) * RADIUS, 0, (Math.cos(angle) - 1) * RADIUS);
      card.group.rotation.y = -angle;
      card.group.scale.setScalar(1 - 0.18 * ad);
      card.group.visible = Math.abs(d) < 3;

      const brightness = 1 - 0.6 * ad;
      card.face.material.color.setScalar(brightness);
      card.reflection.material.color.setScalar(brightness);
    });

    const nearest = wrap(Math.round(current), count);
    const focus = cards[nearest];
    halo.position.x += (focus.group.position.x - halo.position.x) * k;
    halo.position.y += (focus.group.position.y - halo.position.y) * k;
    halo.material.color.lerp(focus.accent, k);

    const rounded = wrap(Math.round(target), count);
    if (rounded !== activeIndex) {
      activeIndex = rounded;
      onChange?.(rounded);
      spawnRing(cards[rounded]);
    }
  }

  return {
    controls: { next, prev, goTo: (index) => goTo(index) },

    update(time, delta) {
      elapsed = time;
      if (!reducedMotion && count > 1 && !pointer.active && elapsed - lastSwitch > AUTOPLAY_SECONDS) {
        next();
      }

      layout(delta);

      halo.material.opacity = 0.42 + 0.12 * Math.sin(elapsed * 2.2);
      deck.rotation.y = pointer.sx * 0.06;
      deck.rotation.z = Math.max(-0.06, Math.min(0.06, -velocity * 0.012));
      particles.rotation.y = elapsed * 0.015;

      const k = 1 - Math.exp(-delta * 3);
      camera.position.x += (pointer.sx * 0.6 - camera.position.x) * k;
      camera.position.y += (0.25 + pointer.sy * 0.2 - camera.position.y) * k;
      camera.lookAt(0, lookY, 0);

      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.t += delta;
        const progress = ring.t / 1.1;
        if (progress >= 1) {
          deck.remove(ring.mesh);
          ring.material.dispose();
          rings.splice(i, 1);
          continue;
        }
        const s = 0.6 + progress * 1.1;
        ring.mesh.scale.set(CARD_W * s, CARD_H * s, 1);
        ring.material.opacity = 0.85 * (1 - progress);
      }
    },

    resize(width, height) {
      // En pantallas angostas se aleja la cámara para que quepan las tarjetas vecinas.
      const z = Math.max(8, 10.9 / (width / height));
      camera.position.z = z;
      // Alto visible a esa distancia (FOV vertical de 40°): la mira sube con él.
      lookY = -0.17 * 2 * z * Math.tan(THREE.MathUtils.degToRad(20));
    },

    dispose() {
      alive = false;
      container.removeEventListener("pointerdown", onDown);
      container.removeEventListener("pointerup", onUp);
      rings.forEach((ring) => ring.material.dispose());
      ringGeometry.dispose();
      fadeTexture.dispose();
      glow.dispose();
    },

    stillTime: 6,
  };
}

export default function mountProjectCarousel(container, { slides, reducedMotion, onChange, onReady, onOpen }) {
  return mountScene(
    container,
    (ctx) => {
      const api = setupCarousel(ctx, { slides, reducedMotion, onChange, onOpen });
      onReady?.(api.controls);
      return api;
    },
    { reducedMotion, fov: 40 }
  );
}

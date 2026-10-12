import { mountScene, makeGlowTexture } from "../mountScene";

// Carrusel 3D de proyectos: las fotos giran sobre un arco y se deslizan de una en una.
// Cada tarjeta es de vidrio esmerilado, con la foto dentro y reflejo en el piso; el halo y las mallas de nodos que
// ondulan al fondo toman el color del proyecto activo. Clic en la tarjeta activa abre el
// proyecto; arrastrar cambia.

const CARD_W = 3.6;
const CARD_H = CARD_W * 0.625; // proporción 16:10
const RADIUS = 5.2;
const STEP_ANGLE = 0.55; // ángulo entre tarjetas vecinas
const AUTOPLAY_SECONDS = 5;
const SIDE_LAYOUT_MIN_WIDTH = 900; // debe coincidir con el breakpoint del CSS (texto a la izquierda)
const SIDE_SHIFT = 0.2; // desplazamiento de las tarjetas a la derecha, como fracción del ancho visible
const TEX_W = 1200;
const TEX_H = 750;
const TEX_RADIUS = 56;
const GLASS_PADDING = 30; // grosor del marco de vidrio alrededor de la foto
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

// Dibuja la tarjeta en un canvas: marco de vidrio esmerilado (translúcido, con borde de luz y brillo
// diagonal) y la foto del proyecto dentro, con esquinas redondeadas.
async function buildCardTexture(THREE, { image, title }, accent) {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_W;
  canvas.height = TEX_H;
  const ctx = canvas.getContext("2d");

  // Panel de vidrio: relleno blanco translúcido más intenso arriba a la izquierda.
  roundRect(ctx, 0, 0, TEX_W, TEX_H, TEX_RADIUS);
  const glass = ctx.createLinearGradient(0, 0, TEX_W, TEX_H);
  glass.addColorStop(0, "rgba(255,255,255,0.34)");
  glass.addColorStop(0.5, "rgba(255,255,255,0.14)");
  glass.addColorStop(1, "rgba(255,255,255,0.22)");
  ctx.fillStyle = glass;
  ctx.fill();

  // Foto inscrita en el marco.
  const x = GLASS_PADDING;
  const y = GLASS_PADDING;
  const w = TEX_W - GLASS_PADDING * 2;
  const h = TEX_H - GLASS_PADDING * 2;
  const innerRadius = TEX_RADIUS - GLASS_PADDING * 0.55;

  ctx.save();
  roundRect(ctx, x, y, w, h, innerRadius);
  ctx.clip();
  const background = ctx.createLinearGradient(x, y, x + w, y + h);
  background.addColorStop(0, "#0b1d44");
  background.addColorStop(1, "#050b1d");
  ctx.fillStyle = background;
  ctx.fillRect(x, y, w, h);

  try {
    const img = await loadImage(image);
    const scale = Math.max(w / img.width, h / img.height);
    const iw = img.width * scale;
    const ih = img.height * scale;
    ctx.drawImage(img, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih);
  } catch {
    // Si la imagen no carga (CORS o red), se muestra el título sobre un degradado de acento.
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = accent;
    ctx.fillRect(x, y, w, h);
    ctx.globalAlpha = 1;
    ctx.font = "700 72px system-ui, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(title, x + 48, y + h / 2, w - 96);
  }

  const shade = ctx.createLinearGradient(0, y + h * 0.55, 0, y + h);
  shade.addColorStop(0, "rgba(2,5,13,0)");
  shade.addColorStop(1, "rgba(2,5,13,0.45)");
  ctx.fillStyle = shade;
  ctx.fillRect(x, y, w, h);

  // Brillo diagonal sobre la foto, como el reflejo de una luz en el cristal.
  const sheen = ctx.createLinearGradient(x, y, x + w * 0.7, y + h * 0.9);
  sheen.addColorStop(0, "rgba(255,255,255,0.22)");
  sheen.addColorStop(0.4, "rgba(255,255,255,0.05)");
  sheen.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(x, y, w, h);
  ctx.restore();

  // Filo interior de la foto y borde exterior del vidrio (más luminoso en la esquina superior).
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  roundRect(ctx, x, y, w, h, innerRadius);
  ctx.stroke();

  const edge = ctx.createLinearGradient(0, 0, TEX_W, TEX_H);
  edge.addColorStop(0, "rgba(255,255,255,0.85)");
  edge.addColorStop(0.5, "rgba(255,255,255,0.18)");
  edge.addColorStop(1, "rgba(255,255,255,0.45)");
  ctx.lineWidth = 3;
  ctx.strokeStyle = edge;
  roundRect(ctx, 1.5, 1.5, TEX_W - 3, TEX_H - 3, TEX_RADIUS);
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
    ready: false, // pasa a true cuando se carga la textura de la foto
  };
}

// Malla de nodos que ondula al fondo: la misma función de onda mueve las líneas y los puntos.
const meshVertex = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uSpeed;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uHalf;
  attribute float aSeed;
  varying float vHeight;
  varying float vFade;
  varying float vPulse;
  void main() {
    vec3 p = position;
    float t = uTime * uSpeed;
    float h = sin(p.x * 0.45 + t) * 0.55 + cos(p.y * 0.6 - t * 0.8) * 0.45 + sin((p.x + p.y) * 0.28 + t * 0.6) * 0.4;
    p.z += h * uAmp;
    p.xy += vec2(cos(p.y * 0.5 + t), sin(p.x * 0.5 - t)) * 0.12 * uAmp;
    vHeight = clamp(h * 0.35 + 0.5, 0.0, 1.0);
    vFade = 1.0 - smoothstep(0.5, 1.0, length(position.xy / uHalf));
    vPulse = 0.65 + 0.35 * sin(uTime * 1.8 + aSeed * 6.2831);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize * uPixelRatio * (10.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const meshLineFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vHeight;
  varying float vFade;
  void main() {
    float a = uOpacity * vFade * (0.3 + 0.7 * vHeight);
    gl_FragColor = vec4(uColor, a);
  }
`;

const meshPointFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vHeight;
  varying float vFade;
  varying float vPulse;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    float a = smoothstep(0.5, 0.12, d) * uOpacity * vFade * vPulse * (0.45 + 0.55 * vHeight);
    gl_FragColor = vec4(mix(uColor, vec3(1.0), 0.4 * core), a);
  }
`;

// Una capa: grilla de nodos con desorden leve, unida por líneas (cuadros + diagonales).
function createMeshLayer(THREE, { cols, rows, width, height, amp, speed, pointSize, lineOpacity, pointOpacity, pixelRatio, time, color }) {
  const count = cols * rows;
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const cellW = width / (cols - 1);
  const cellH = height / (rows - 1);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const k = j * cols + i;
      positions[k * 3] = (i / (cols - 1) - 0.5) * width + (Math.random() - 0.5) * cellW * 0.45;
      positions[k * 3 + 1] = (j / (rows - 1) - 0.5) * height + (Math.random() - 0.5) * cellH * 0.45;
      seeds[k] = Math.random();
    }
  }

  const edges = [];
  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const a = j * cols + i;
      const b = a + 1;
      const c = a + cols;
      const d = c + 1;
      edges.push(a, b, a, c);
      if ((i + j) % 2 === 0) edges.push(a, d);
      else edges.push(b, c);
    }
  }

  const positionAttribute = new THREE.BufferAttribute(positions, 3);
  const seedAttribute = new THREE.BufferAttribute(seeds, 1);

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", positionAttribute);
  lineGeometry.setAttribute("aSeed", seedAttribute);
  lineGeometry.setIndex(edges);

  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute("position", positionAttribute);
  pointGeometry.setAttribute("aSeed", seedAttribute);

  const makeUniforms = (opacity, size) => ({
    uTime: time,
    uColor: color,
    uAmp: { value: amp },
    uSpeed: { value: speed },
    uSize: { value: size },
    uPixelRatio: { value: pixelRatio },
    uHalf: { value: new THREE.Vector2(width / 2, height / 2) },
    uOpacity: { value: opacity },
  });
  const baseMaterial = {
    vertexShader: meshVertex,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  };

  const lines = new THREE.LineSegments(
    lineGeometry,
    new THREE.ShaderMaterial({ ...baseMaterial, fragmentShader: meshLineFragment, uniforms: makeUniforms(lineOpacity, 1) })
  );
  const points = new THREE.Points(
    pointGeometry,
    new THREE.ShaderMaterial({ ...baseMaterial, fragmentShader: meshPointFragment, uniforms: makeUniforms(pointOpacity, pointSize) })
  );
  // La onda desplaza los vértices: el cálculo de límites de la grilla plana no sirve para el culling.
  lines.frustumCulled = false;
  points.frustumCulled = false;

  const group = new THREE.Group();
  group.add(lines, points);
  return group;
}

function setupCarousel({ THREE, scene, camera, renderer, pointer, container }, { slides, reducedMotion, onChange, onOpen }) {
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
      card.ready = true;
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

  // Mallas de nodos que ondulan al fondo: una vertical lejana y un "piso" inclinado más cerca.
  const meshTime = { value: 0 };
  const meshColor = { value: new THREE.Color(0x00c6ff).convertLinearToSRGB() };
  const pixelRatio = renderer.getPixelRatio();
  const meshLayers = [
    {
      cols: 52, rows: 28, width: 42, height: 22, amp: 1.4, speed: 0.55, pointSize: 5.5, lineOpacity: 0.2, pointOpacity: 0.9,
      position: [0, 1, -11], rotationX: -0.2,
    },
    {
      cols: 34, rows: 16, width: 32, height: 16, amp: 0.9, speed: 0.75, pointSize: 6.5, lineOpacity: 0.28, pointOpacity: 1,
      position: [0, -4.2, -5.5], rotationX: -1.2,
    },
  ].map(({ position, rotationX, ...options }) => {
    const layer = createMeshLayer(THREE, { ...options, pixelRatio, time: meshTime, color: meshColor });
    layer.position.set(...position);
    layer.rotation.x = rotationX;
    scene.add(layer);
    return layer;
  });
  // Los colores de acento pasados a sRGB, porque el shader escribe directo a pantalla.
  const accentSrgb = cards.map((card) => card.accent.clone().convertLinearToSRGB());

  // Encuadre. En pantallas anchas el texto va a la izquierda y las tarjetas a la derecha, centradas
  // en vertical; en pantallas angostas las tarjetas quedan arriba y el texto debajo.
  let lookY = -1;
  let sideLayout = false;

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

      // Con el texto a la izquierda, las tarjetas anteriores se desvanecen para no tapar el título.
      const alpha = !card.ready ? 0 : sideLayout && d < 0 ? Math.min(1, Math.max(0, 1 + d * 0.7)) : 1;
      card.group.visible = Math.abs(d) < 3 && alpha > 0.01;
      card.face.material.opacity = alpha;
      card.reflection.material.opacity = 0.3 * alpha;

      const brightness = 1 - 0.6 * ad;
      card.face.material.color.setScalar(brightness);
      card.reflection.material.color.setScalar(brightness);
    });

    const nearest = wrap(Math.round(current), count);
    const focus = cards[nearest];
    halo.position.x += (focus.group.position.x - halo.position.x) * k;
    halo.position.y += (focus.group.position.y - halo.position.y) * k;
    halo.material.color.lerp(focus.accent, k);
    meshColor.value.lerp(accentSrgb[nearest], k);

    const rounded = wrap(Math.round(target), count);
    if (rounded !== activeIndex) {
      activeIndex = rounded;
      onChange?.(rounded);
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
      meshTime.value = elapsed;

      const k = 1 - Math.exp(-delta * 3);
      camera.position.x += (pointer.sx * 0.6 - camera.position.x) * k;
      camera.position.y += (0.25 + pointer.sy * 0.2 - camera.position.y) * k;
      camera.lookAt(0, lookY, 0);
    },

    resize(width, height) {
      const aspect = width / height;
      // En pantallas angostas se aleja la cámara para que quepan las tarjetas vecinas.
      const z = Math.max(8, 10.9 / aspect);
      camera.position.z = z;
      // Alto visible a esa distancia (FOV vertical de 40°).
      const viewHeight = 2 * z * Math.tan(THREE.MathUtils.degToRad(20));

      sideLayout = width >= SIDE_LAYOUT_MIN_WIDTH;
      if (sideLayout) {
        // Tarjeta activa hacia el 70 % del ancho y centrada en vertical (con el reflejo debajo).
        deck.position.x = SIDE_SHIFT * viewHeight * aspect;
        lookY = -0.35;
      } else {
        deck.position.x = 0;
        lookY = -0.17 * viewHeight;
      }
    },

    dispose() {
      alive = false;
      container.removeEventListener("pointerdown", onDown);
      container.removeEventListener("pointerup", onUp);
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

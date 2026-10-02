import { mountScene, hexVec } from "../mountScene";

const RADIUS = 2;
const ARCS = 16;

// PRNG con semilla: el mapa de "continentes" sale igual en cada carga.
function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const dotsVertex = /* glsl */ `
  uniform float uPixelRatio;
  uniform float uTime;
  attribute float aSeed;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 n = normalize(normalMatrix * position);
    // Los puntos de la cara oculta se apagan para dar sensación de volumen.
    float facing = smoothstep(-0.15, 0.6, n.z);
    vAlpha = facing * (0.75 + 0.25 * sin(uTime * 1.6 + aSeed * 40.0));
    gl_PointSize = (3.2 + aSeed * 1.8) * uPixelRatio * (8.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const dotsFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.15, d) * vAlpha;
    gl_FragColor = vec4(uColor * a, a);
  }
`;

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
  uniform vec3 uBase;
  uniform vec3 uRim;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 3.0);
    gl_FragColor = vec4(uBase + uRim * rim * 0.45, 1.0);
  }
`;

const atmosphereFragment = /* glsl */ `
  uniform vec3 uRim;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    // Cara trasera del casquete: 0 en la silueta exterior, crece hacia el globo.
    float k = clamp(-dot(normalize(vNormal), normalize(vView)), 0.0, 1.0);
    float glow = pow(smoothstep(0.0, 0.75, k), 2.2) * 0.9;
    gl_FragColor = vec4(uRim * glow, glow);
  }
`;

const arcVertex = /* glsl */ `
  varying float vAlong;
  void main() {
    vAlong = uv.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const arcFragment = /* glsl */ `
  uniform float uTime;
  uniform float uOffset;
  uniform float uSpeed;
  uniform vec3 uColor;
  varying float vAlong;
  void main() {
    // Un "paquete" de luz recorre el arco; detrás deja una estela que se desvanece.
    float head = fract(uTime * uSpeed + uOffset) * 1.5 - 0.1;
    float trail = smoothstep(head - 0.45, head, vAlong) * step(vAlong, head);
    float base = 0.12;
    float a = max(trail, base) * smoothstep(0.0, 0.04, vAlong) * smoothstep(1.0, 0.96, vAlong);
    gl_FragColor = vec4(uColor * a * 1.6, a);
  }
`;

export default function holoGlobe(container, options) {
  return mountScene(
    container,
    ({ THREE, scene, camera, renderer, pointer, size }) => {
      camera.position.set(0, 0, 7.5);
      const random = mulberry32(7);

      // Campo de "continentes": suma de ondas en direcciones aleatorias evaluada sobre la esfera.
      const waves = Array.from({ length: 7 }, () => ({
        dir: new THREE.Vector3(random() - 0.5, random() - 0.5, random() - 0.5).normalize(),
        freq: 1.6 + random() * 2.4,
        phase: random() * Math.PI * 2,
      }));
      const land = (v) => waves.reduce((sum, w) => sum + Math.sin(v.dot(w.dir) * w.freq + w.phase), 0);

      const candidates = window.innerWidth < 768 ? 9000 : 16000;
      const golden = Math.PI * (3 - Math.sqrt(5));
      const landPoints = [];
      const v = new THREE.Vector3();
      for (let i = 0; i < candidates; i++) {
        const y = 1 - (i / (candidates - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        v.set(Math.cos(golden * i) * r, y, Math.sin(golden * i) * r);
        if (land(v) > 0.6) landPoints.push(v.clone());
      }

      const dotPositions = new Float32Array(landPoints.length * 3);
      const dotSeeds = new Float32Array(landPoints.length);
      landPoints.forEach((p, i) => {
        dotPositions.set([p.x * RADIUS, p.y * RADIUS, p.z * RADIUS], i * 3);
        dotSeeds[i] = random();
      });
      const dotGeometry = new THREE.BufferGeometry();
      dotGeometry.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
      dotGeometry.setAttribute("aSeed", new THREE.BufferAttribute(dotSeeds, 1));
      const time = { value: 0 };
      const dots = new THREE.Points(
        dotGeometry,
        new THREE.ShaderMaterial({
          vertexShader: dotsVertex,
          fragmentShader: dotsFragment,
          uniforms: { uTime: time, uPixelRatio: { value: renderer.getPixelRatio() }, uColor: { value: hexVec("#7fe7ff") } },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );

      const rim = hexVec("#3aa0ff");
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(RADIUS * 0.985, 64, 48),
        new THREE.ShaderMaterial({
          vertexShader: fresnelVertex,
          fragmentShader: coreFragment,
          uniforms: { uBase: { value: hexVec("#06142b") }, uRim: { value: rim } },
        })
      );
      const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(RADIUS * 1.14, 64, 48),
        new THREE.ShaderMaterial({
          vertexShader: fresnelVertex,
          fragmentShader: atmosphereFragment,
          uniforms: { uRim: { value: rim } },
          side: THREE.BackSide,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );

      const globe = new THREE.Group();
      globe.add(core, dots);

      // Arcos de datos entre puntos de tierra, con anillos que laten en cada extremo.
      const arcColors = ["#7fe7ff", "#a78bfa", "#5eead4", "#f0abfc"].map(hexVec);
      const rings = [];
      for (let i = 0; i < ARCS; i++) {
        const a = landPoints[Math.floor(random() * landPoints.length)].clone().multiplyScalar(RADIUS);
        let b = landPoints[Math.floor(random() * landPoints.length)].clone().multiplyScalar(RADIUS);
        if (a.distanceTo(b) < 1.2) b = b.clone().negate().lerp(a, 0.4).setLength(RADIUS);
        const lift = RADIUS + a.distanceTo(b) * 0.45;
        const mid = a.clone().add(b).setLength(lift);
        const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
        const color = arcColors[i % arcColors.length];
        globe.add(
          new THREE.Mesh(
            new THREE.TubeGeometry(curve, 80, 0.011, 6, false),
            new THREE.ShaderMaterial({
              vertexShader: arcVertex,
              fragmentShader: arcFragment,
              uniforms: { uTime: time, uOffset: { value: random() }, uSpeed: { value: 0.16 + random() * 0.18 }, uColor: { value: color } },
              transparent: true,
              depthWrite: false,
              blending: THREE.AdditiveBlending,
            })
          )
        );
        for (const end of [a, b]) {
          const ring = new THREE.Mesh(
            new THREE.RingGeometry(0.03, 0.045, 32),
            new THREE.MeshBasicMaterial({ color: new THREE.Color().setRGB(color.x, color.y, color.z, THREE.SRGBColorSpace), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })
          );
          ring.position.copy(end).multiplyScalar(1.005);
          ring.lookAt(end.clone().multiplyScalar(2));
          ring.userData.seed = random();
          rings.push(ring);
          globe.add(ring);
        }
      }

      const system = new THREE.Group();
      system.add(atmosphere, globe);
      system.rotation.z = 0.32;
      scene.add(system);

      return {
        stillTime: 3,
        resize() {
          const wide = size.aspect > 1.15;
          const halfWidth = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * size.aspect;
          system.position.set(wide ? halfWidth * 0.5 : 0, wide ? 0 : 0.9, 0);
          system.scale.setScalar(wide ? 1 : 0.72);
        },
        update(t) {
          time.value = t;
          globe.rotation.y = t * 0.12 + pointer.sx * 0.7;
          globe.rotation.x = -pointer.sy * 0.3;
          for (const ring of rings) {
            const k = (t * 0.6 + ring.userData.seed) % 1;
            ring.scale.setScalar(1 + k * 3.2);
            ring.material.opacity = 1 - k;
          }
        },
      };
    },
    options
  );
}

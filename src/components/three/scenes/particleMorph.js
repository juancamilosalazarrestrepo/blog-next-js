import { mountScene } from "../mountScene";
import { simplexNoise } from "../glsl";

const HOLD = 2.8;
const TRANSITION = 1.8;
const SHAPES = 4;

const morphVertex = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uPixelRatio;
  uniform vec3 uRayOrigin;
  uniform vec3 uRayDir;
  uniform float uPointerStrength;
  attribute vec3 aShape1;
  attribute vec3 aShape2;
  attribute vec3 aShape3;
  attribute float aSeed;
  varying vec3 vColor;
  varying float vAlpha;

  ${simplexNoise}

  float weight(float index) {
    float d = abs(uMorph - index);
    d = min(d, ${SHAPES.toFixed(1)} - d);
    return clamp(1.0 - d, 0.0, 1.0);
  }

  void main() {
    vec3 p = position * weight(0.0) + aShape1 * weight(1.0) + aShape2 * weight(2.0) + aShape3 * weight(3.0);

    // Turbulencia máxima a mitad de cada transición.
    float chaos = sin(fract(uMorph) * 3.14159);
    vec3 drift = vec3(
      snoise(p * 0.9 + vec3(uTime * 0.2, 0.0, aSeed)),
      snoise(p * 0.9 + vec3(0.0, uTime * 0.2, aSeed + 7.0)),
      snoise(p * 0.9 + vec3(aSeed + 13.0, 0.0, uTime * 0.2))
    );
    p += drift * (0.04 + chaos * 0.55);

    // Distancia de la partícula al rayo del cursor: empuja en toda la profundidad de la figura.
    vec3 toPoint = p - uRayOrigin;
    vec3 away = toPoint - uRayDir * dot(toPoint, uRayDir);
    float dist = length(away);
    p += normalize(away + 1e-4) * smoothstep(1.3, 0.0, dist) * 0.75 * uPointerStrength;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.2 + aSeed * 3.0) * uPixelRatio * (7.0 / -mv.z);

    float tone = clamp(p.y * 0.22 + 0.5 + (aSeed - 0.5) * 0.35, 0.0, 1.0);
    vec3 low = vec3(0.96, 0.45, 0.71);
    vec3 mid = vec3(0.51, 0.55, 0.97);
    vec3 high = vec3(0.22, 0.83, 0.98);
    vColor = tone < 0.5 ? mix(low, mid, tone * 2.0) : mix(mid, high, tone * 2.0 - 1.0);
    vAlpha = 0.55 + 0.45 * sin(uTime * 2.0 + aSeed * 30.0);
  }
`;

const morphFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float strength = smoothstep(0.5, 0.05, d) * vAlpha;
    gl_FragColor = vec4(vColor * strength, strength);
  }
`;

function gaussian() {
  return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
}

function buildShapes(count) {
  const sphere = new Float32Array(count * 3);
  const knot = new Float32Array(count * 3);
  const helix = new Float32Array(count * 3);
  const planet = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const o = i * 3;

    // Esfera (distribución de Fibonacci)
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const R = 2 + gaussian() * 0.04;
    sphere.set([Math.cos(theta) * r * R, y * R, Math.sin(theta) * r * R], o);

    // Nudo toroidal (2,3) con grosor
    const t = Math.random() * Math.PI * 2;
    const kr = 1.25 + 0.55 * Math.cos(3 * t);
    knot.set(
      [
        kr * Math.cos(2 * t) + gaussian() * 0.16,
        0.55 * Math.sin(3 * t) * 1.6 + gaussian() * 0.16,
        kr * Math.sin(2 * t) + gaussian() * 0.16,
      ],
      o
    );

    // Doble hélice tipo ADN con peldaños
    const u = Math.random();
    const hy = (u - 0.5) * 4.6;
    const angle = u * Math.PI * 5;
    if (Math.random() < 0.82) {
      const strand = Math.random() < 0.5 ? 0 : Math.PI;
      helix.set(
        [Math.cos(angle + strand) * 1.05 + gaussian() * 0.07, hy + gaussian() * 0.05, Math.sin(angle + strand) * 1.05 + gaussian() * 0.07],
        o
      );
    } else {
      const rung = Math.round(u * 26) / 26;
      const ra = rung * Math.PI * 5;
      const s = Math.random() * 2 - 1;
      helix.set([Math.cos(ra) * 1.05 * s, (rung - 0.5) * 4.6, Math.sin(ra) * 1.05 * s], o);
    }

    // Planeta con anillo inclinado
    if (Math.random() < 0.45) {
      const v = [gaussian(), gaussian(), gaussian()];
      const len = Math.hypot(...v) || 1;
      planet.set(v.map((c) => (c / len) * 1.05), o);
    } else {
      const ringAngle = Math.random() * Math.PI * 2;
      const ringRadius = 1.6 + Math.pow(Math.random(), 0.8) * 1.1;
      const rx = Math.cos(ringAngle) * ringRadius;
      const rz = Math.sin(ringAngle) * ringRadius;
      const tilt = 0.45;
      planet.set([rx, rz * Math.sin(tilt) + gaussian() * 0.03, rz * Math.cos(tilt)], o);
    }
  }
  return { sphere, knot, helix, planet };
}

function easeInOut(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export default function particleMorph(container, options) {
  return mountScene(
    container,
    ({ THREE, scene, camera, renderer, pointer, size }) => {
      camera.position.set(0, 0, 7.5);

      const count = window.innerWidth < 768 ? 9000 : 16000;
      const { sphere, knot, helix, planet } = buildShapes(count);
      const seeds = new Float32Array(count).map(() => Math.random());

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(sphere, 3));
      geometry.setAttribute("aShape1", new THREE.BufferAttribute(knot, 3));
      geometry.setAttribute("aShape2", new THREE.BufferAttribute(helix, 3));
      geometry.setAttribute("aShape3", new THREE.BufferAttribute(planet, 3));
      geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

      const uniforms = {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uRayOrigin: { value: new THREE.Vector3(0, 0, 50) },
        uRayDir: { value: new THREE.Vector3(0, 0, -1) },
        uPointerStrength: { value: 0 },
      };
      const points = new THREE.Points(
        geometry,
        new THREE.ShaderMaterial({
          vertexShader: morphVertex,
          fragmentShader: morphFragment,
          uniforms,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      points.frustumCulled = false;
      const group = new THREE.Group();
      group.add(points);
      scene.add(group);

      const raycaster = new THREE.Raycaster();
      const inverse = new THREE.Matrix4();
      const ndc = new THREE.Vector2();
      const cycle = HOLD + TRANSITION;

      return {
        stillTime: HOLD * 0.5,
        resize() {
          const wide = size.aspect > 1.15;
          const halfWidth = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * size.aspect;
          group.position.set(wide ? halfWidth * 0.52 : 0, wide ? 0 : 0.9, 0);
          group.scale.setScalar(wide ? 1 : 0.7);
        },
        update(t, dt) {
          const stage = Math.floor(t / cycle);
          const local = t - stage * cycle;
          const progress = local < HOLD ? 0 : easeInOut((local - HOLD) / TRANSITION);
          uniforms.uMorph.value = (stage % SHAPES) + progress;
          uniforms.uTime.value = t;

          group.rotation.y = t * 0.18 + pointer.sx * 0.5;
          group.rotation.x = -pointer.sy * 0.35;
          group.updateMatrixWorld();

          // Rayo del cursor llevado al espacio local de las partículas, para el efecto de repulsión.
          ndc.set(pointer.x, pointer.y);
          raycaster.setFromCamera(ndc, camera);
          raycaster.ray.applyMatrix4(inverse.copy(group.matrixWorld).invert());
          uniforms.uRayOrigin.value.copy(raycaster.ray.origin);
          uniforms.uRayDir.value.copy(raycaster.ray.direction).normalize();
          const target = pointer.active ? 1 : 0;
          uniforms.uPointerStrength.value += (target - uniforms.uPointerStrength.value) * Math.min(1, dt * 5);
        },
      };
    },
    options
  );
}

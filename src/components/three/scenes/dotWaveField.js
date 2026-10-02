import { mountScene, hexVec } from "../mountScene";
import { simplexNoise } from "../glsl";

const MAX_RIPPLES = 6;
const WIDTH = 40;
const DEPTH = 26;

const fieldVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uHover;
  uniform float uHoverStrength;
  uniform vec4 uRipples[${MAX_RIPPLES}];
  varying float vHeight;
  varying float vFade;

  ${simplexNoise}

  void main() {
    vec3 p = position;
    float h = sin(p.x * 0.32 + uTime * 0.9) * 0.28;
    h += sin(p.z * 0.45 - uTime * 1.1 + p.x * 0.1) * 0.24;
    h += snoise(vec3(p.x * 0.09, p.z * 0.09, uTime * 0.12)) * 0.7;

    // Onda expansiva por cada clic (x, z, instante, fuerza).
    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      vec4 r = uRipples[i];
      float age = uTime - r.z;
      if (r.w <= 0.0 || age < 0.0) continue;
      float d = distance(p.xz, r.xy);
      float front = d - age * 4.5;
      h += exp(-front * front * 0.35) * exp(-age * 0.55) * r.w * 1.3;
    }

    float hd = distance(p.xz, uHover);
    h += exp(-hd * hd * 0.18) * 1.1 * uHoverStrength;

    p.y = h;
    vHeight = h;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vFade = 1.0 - smoothstep(16.0, 30.0, -mv.z);
    gl_PointSize = min((1.3 + max(h, 0.0) * 1.1) * uPixelRatio * (26.0 / -mv.z), 9.0 * uPixelRatio);
    gl_Position = projectionMatrix * mv;
  }
`;

const fieldFragment = /* glsl */ `
  uniform vec3 uLow;
  uniform vec3 uMid;
  uniform vec3 uHigh;
  varying float vHeight;
  varying float vFade;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float k = clamp(vHeight * 0.45 + 0.45, 0.0, 1.0);
    vec3 color = k < 0.5 ? mix(uLow, uMid, k * 2.0) : mix(uMid, uHigh, k * 2.0 - 1.0);
    float a = smoothstep(0.5, 0.1, d) * vFade * (0.55 + k * 0.8);
    gl_FragColor = vec4(color * a, a);
  }
`;

export default function dotWaveField(container, options) {
  return mountScene(
    container,
    ({ THREE, scene, camera, renderer, pointer }) => {
      camera.position.set(0, 3.4, 9);
      camera.lookAt(0, 0, -3);

      const mobile = window.innerWidth < 768;
      const cols = mobile ? 120 : 200;
      const rows = mobile ? 80 : 130;
      const positions = new Float32Array(cols * rows * 3);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 3;
          positions[i] = (c / (cols - 1) - 0.5) * WIDTH;
          positions[i + 2] = -(r / (rows - 1)) * DEPTH + 6;
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const ripples = Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector4(0, 0, 0, 0));
      const uniforms = {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uHover: { value: new THREE.Vector2(999, 999) },
        uHoverStrength: { value: 0 },
        uRipples: { value: ripples },
        uLow: { value: hexVec(options?.palette?.low || "#0b5e66") },
        uMid: { value: hexVec(options?.palette?.mid || "#14d6c4") },
        uHigh: { value: hexVec(options?.palette?.high || "#d4ff7a") },
      };
      const field = new THREE.Points(
        geometry,
        new THREE.ShaderMaterial({
          vertexShader: fieldVertex,
          fragmentShader: fieldFragment,
          uniforms,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      field.frustumCulled = false;
      scene.add(field);

      const raycaster = new THREE.Raycaster();
      const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const hit = new THREE.Vector3();
      const ndc = new THREE.Vector2();
      let nextRipple = 0;
      let nextAuto = 1.2;
      let wasDown = false;

      function addRipple(x, z, t, strength) {
        ripples[nextRipple].set(x, z, t, strength);
        nextRipple = (nextRipple + 1) % MAX_RIPPLES;
      }

      return {
        stillTime: 4,
        update(t, dt) {
          uniforms.uTime.value = t;

          ndc.set(pointer.x, pointer.y);
          raycaster.setFromCamera(ndc, camera);
          const onGround = raycaster.ray.intersectPlane(ground, hit);
          if (onGround) uniforms.uHover.value.set(hit.x, hit.z);
          const target = pointer.active && onGround ? 1 : 0;
          uniforms.uHoverStrength.value += (target - uniforms.uHoverStrength.value) * Math.min(1, dt * 4);

          if (pointer.down && !wasDown && onGround) addRipple(hit.x, hit.z, t, 1.4);
          wasDown = pointer.down;

          // Ondas automáticas para que el campo nunca se quede quieto.
          if (t > nextAuto) {
            addRipple((Math.random() - 0.2) * WIDTH * 0.5, -Math.random() * 12, t, 0.8);
            nextAuto = t + 2.4 + Math.random() * 1.6;
          }

          camera.position.x = pointer.sx * 0.8;
          camera.position.y = 3.4 + pointer.sy * 0.4;
          camera.lookAt(0, 0, -3);
        },
      };
    },
    options
  );
}

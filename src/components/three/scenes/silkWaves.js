import { mountScene, hexVec } from "../mountScene";
import { simplexNoise } from "../glsl";

const silkVertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec2 vUv;
  varying float vHeight;

  ${simplexNoise}

  float surface(vec2 p) {
    float h = sin(p.x * 0.55 + p.y * 0.25 + uTime * 0.45) * 0.55;
    h += sin(p.y * 0.8 - p.x * 0.18 - uTime * 0.35) * 0.32;
    h += sin(p.x * 1.15 + p.y * 0.45 + uTime * 0.6) * 0.16;
    h += snoise(vec3(p * 0.22, uTime * 0.1)) * 0.6;
    float d = length(p - uPointer);
    h += exp(-d * d * 0.5) * 0.7 * uPointerStrength;
    h += sin(d * 3.2 - uTime * 3.0) * exp(-d * 0.7) * 0.08 * uPointerStrength;
    return h;
  }

  void main() {
    vec2 p = position.xy;
    float eps = 0.04;
    float h = surface(p);
    float hx = surface(p + vec2(eps, 0.0));
    float hy = surface(p + vec2(0.0, eps));
    vec3 normal = normalize(vec3(h - hx, h - hy, eps));

    vec4 mv = modelViewMatrix * vec4(p, h, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    vUv = uv;
    vHeight = h;
    gl_Position = projectionMatrix * mv;
  }
`;

const silkFragment = /* glsl */ `
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform vec3 uC4;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec2 vUv;
  varying float vHeight;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    float k = clamp(vUv.x * 0.85 + vHeight * 0.18 + sin(vUv.y * 3.0 + uTime * 0.15) * 0.08, 0.0, 1.0);
    vec3 base = k < 0.33 ? mix(uC1, uC2, k / 0.33) : k < 0.66 ? mix(uC2, uC3, (k - 0.33) / 0.33) : mix(uC3, uC4, (k - 0.66) / 0.34);

    vec3 light = normalize(vec3(-0.4, 0.6, 0.9));
    float wrap = max((dot(n, light) + 0.6) / 1.6, 0.0);
    float sheen = pow(max(dot(n, normalize(light + v)), 0.0), 36.0);
    float fresnel = pow(1.0 - max(dot(n, v), 0.0), 3.0);

    vec3 color = base * (0.42 + 0.7 * wrap) + sheen * 0.5 + fresnel * 0.18;
    gl_FragColor = vec4(min(color, vec3(1.0)), 1.0);
  }
`;

export default function silkWaves(container, options) {
  return mountScene(
    container,
    ({ THREE, scene, camera, pointer, size }) => {
      camera.position.set(0, 0, 7);

      const uniforms = {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(99, 99) },
        uPointerStrength: { value: 0 },
        uC1: { value: hexVec("#ff8fc4") },
        uC2: { value: hexVec("#a58bff") },
        uC3: { value: hexVec("#62c6ff") },
        uC4: { value: hexVec("#ffc978") },
      };
      const segments = window.innerWidth < 768 ? [150, 130] : [260, 220];
      const silk = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 26, segments[0], segments[1]),
        new THREE.ShaderMaterial({ vertexShader: silkVertex, fragmentShader: silkFragment, uniforms, side: THREE.DoubleSide })
      );
      silk.rotation.set(-0.95, 0, 0.32);
      silk.position.set(0, 1.2, -2.5);
      scene.add(silk);

      const raycaster = new THREE.Raycaster();
      const inverse = new THREE.Matrix4();
      const surfacePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const hit = new THREE.Vector3();
      const ndc = new THREE.Vector2();

      return {
        stillTime: 5,
        resize() {
          silk.scale.setScalar(size.aspect < 1 ? 1.4 : 1);
        },
        update(t, dt) {
          uniforms.uTime.value = t;
          silk.rotation.z = 0.32 + pointer.sx * 0.06;
          silk.rotation.x = -0.95 + pointer.sy * 0.04;
          silk.updateMatrixWorld();

          ndc.set(pointer.x, pointer.y);
          raycaster.setFromCamera(ndc, camera);
          raycaster.ray.applyMatrix4(inverse.copy(silk.matrixWorld).invert());
          if (raycaster.ray.intersectPlane(surfacePlane, hit)) uniforms.uPointer.value.set(hit.x, hit.y);
          const target = pointer.active ? 1 : 0;
          uniforms.uPointerStrength.value += (target - uniforms.uPointerStrength.value) * Math.min(1, dt * 3);
        },
      };
    },
    options
  );
}

import { mountScene, hexVec } from "../mountScene";

const LENGTH = 22;
const PALETTE = ["#ff6b6b", "#ffa94d", "#ffd43b", "#f06595", "#cc5de8", "#845ef7", "#5c7cfa", "#22b8cf"];

const ribbonVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPhase;
  uniform float uY;
  uniform float uWidth;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vAlong;
  varying float vAcross;

  vec3 centerline(float s) {
    float y = uY + sin(s * 0.33 + uTime * 0.55 + uPhase) * 0.8 + sin(s * 0.12 - uTime * 0.3 + uPhase * 2.0) * 1.1;
    // El cursor atrae suavemente las cintas cercanas.
    float pull = exp(-pow(s - uPointer.x, 2.0) * 0.08) * uPointerStrength;
    y = mix(y, uPointer.y, pull * 0.45);
    float z = cos(s * 0.26 + uTime * 0.45 + uPhase) * 1.3 - 1.0;
    return vec3(s, y, z);
  }

  vec3 acrossDir(float s) {
    float a = s * 0.22 + uTime * 0.6 + uPhase * 1.7;
    return vec3(0.0, cos(a), sin(a));
  }

  void main() {
    float s = position.x * ${LENGTH.toFixed(1)};
    vec3 c = centerline(s);
    vec3 across = acrossDir(s);
    vec3 p = c + across * position.y * uWidth;

    vec3 tangent = normalize(centerline(s + 0.05) - c);
    vec3 normal = normalize(cross(tangent, across));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    vAlong = uv.x;
    vAcross = uv.y;
    gl_Position = projectionMatrix * mv;
  }
`;

const ribbonFragment = /* glsl */ `
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vAlong;
  varying float vAcross;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    if (!gl_FrontFacing) n = -n;
    vec3 light = normalize(vec3(-0.3, 0.7, 0.8));
    float diffuse = abs(dot(n, light));
    float spec = pow(max(dot(n, normalize(light + v)), 0.0), 48.0);
    float fresnel = pow(1.0 - abs(dot(n, v)), 2.0);

    vec3 base = mix(uC1, uC2, smoothstep(0.1, 0.9, vAlong));
    vec3 color = base * (0.35 + 0.75 * diffuse) + spec * 0.8 + fresnel * base * 0.6;
    // Líneas finas a lo largo de la cinta, como tela técnica.
    float stripes = smoothstep(0.92, 1.0, abs(sin(vAcross * 3.14159 * 6.0)));
    color += stripes * 0.08;
    float ends = smoothstep(0.0, 0.12, vAlong) * smoothstep(1.0, 0.88, vAlong);
    gl_FragColor = vec4(color, 0.92 * ends);
  }
`;

export default function flowRibbons(container, options) {
  return mountScene(
    container,
    ({ THREE, scene, camera, pointer, size }) => {
      camera.position.set(0, 0, 10);

      const count = window.innerWidth < 768 ? 6 : 9;
      const geometry = new THREE.PlaneGeometry(1, 1, 360, 1);
      const pointerWorld = new THREE.Vector2(0, 0);
      const pointerStrength = { value: 0 };
      const time = { value: 0 };
      const group = new THREE.Group();

      for (let i = 0; i < count; i++) {
        const material = new THREE.ShaderMaterial({
          vertexShader: ribbonVertex,
          fragmentShader: ribbonFragment,
          uniforms: {
            uTime: time,
            uPhase: { value: i * 0.9 + Math.random() * 0.4 },
            uY: { value: (i / (count - 1) - 0.5) * 3.6 },
            uWidth: { value: 0.35 + Math.random() * 0.45 },
            uPointer: { value: pointerWorld },
            uPointerStrength: pointerStrength,
            uC1: { value: hexVec(PALETTE[i % PALETTE.length]) },
            uC2: { value: hexVec(PALETTE[(i + 3) % PALETTE.length]) },
          },
          side: THREE.DoubleSide,
          transparent: true,
        });
        const ribbon = new THREE.Mesh(geometry, material);
        ribbon.frustumCulled = false;
        ribbon.renderOrder = i;
        group.add(ribbon);
      }
      group.rotation.z = -0.12;
      scene.add(group);

      const halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;

      return {
        stillTime: 5,
        resize() {
          group.scale.setScalar(size.aspect < 1 ? 0.7 : 1);
        },
        update(t, dt) {
          time.value = t;
          pointerWorld.set(pointer.sx * halfHeight * size.aspect, pointer.sy * halfHeight);
          pointerStrength.value += ((pointer.active ? 1 : 0) - pointerStrength.value) * Math.min(1, dt * 3);
          group.rotation.x = -pointer.sy * 0.15;
          group.rotation.y = pointer.sx * 0.2;
        },
      };
    },
    options
  );
}

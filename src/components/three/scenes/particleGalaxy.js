import { mountScene, makeGlowTexture } from "../mountScene";

const BRANCHES = 4;
const RADIUS = 5;
const SPIN = 1.15;

const galaxyVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute vec3 aOffset;
  attribute vec3 aColor;
  varying vec3 vColor;

  void main() {
    // Giro rígido + un vaivén diferencial acotado (el centro se adelanta y vuelve),
    // para que los brazos no se enrollen indefinidamente con el tiempo.
    float radius = length(position.xz);
    float angle = atan(position.z, position.x) + uTime * 0.1 + sin(uTime * 0.25) * 0.45 / (radius + 0.6);
    vec3 p = vec3(cos(angle) * radius, position.y, sin(angle) * radius) + aOffset;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
    vColor = aColor;
  }
`;

const galaxyFragment = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float strength = pow(max(1.0 - d * 2.0, 0.0), 2.4);
    gl_FragColor = vec4(vColor * strength, strength);
  }
`;

export default function particleGalaxy(container, options) {
  return mountScene(
    container,
    ({ THREE, scene, camera, renderer, pointer, size }) => {
      const mobile = window.innerWidth < 768;
      const count = mobile ? 22000 : 52000;

      const positions = new Float32Array(count * 3);
      const offsets = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      const inside = new THREE.Color("#ffb070");
      const middle = new THREE.Color("#c056ff");
      const outside = new THREE.Color("#2fc8ff");
      const color = new THREE.Color();
      const rgb = { r: 0, g: 0, b: 0 };

      for (let i = 0; i < count; i++) {
        const radius = Math.pow(Math.random(), 1.35) * RADIUS + 0.05;
        const branch = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;
        const angle = branch + radius * SPIN;
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = Math.sin(angle) * radius;

        const spread = 0.5 * (0.35 + radius * 0.3);
        for (let axis = 0; axis < 3; axis++) {
          const sign = Math.random() < 0.5 ? -1 : 1;
          offsets[i * 3 + axis] = Math.pow(Math.random(), 2.6) * sign * spread * (axis === 1 ? 0.5 : 1.6);
        }

        const mix = radius / RADIUS;
        if (mix < 0.4) color.copy(inside).lerp(middle, mix / 0.4);
        else color.copy(middle).lerp(outside, (mix - 0.4) / 0.6);
        // El shader escribe el color directo a pantalla: se guarda en sRGB, no en lineal.
        color.getRGB(rgb, THREE.SRGBColorSpace);
        colors[i * 3] = rgb.r;
        colors[i * 3 + 1] = rgb.g;
        colors[i * 3 + 2] = rgb.b;
        scales[i] = Math.random() * 0.8 + 0.2;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aOffset", new THREE.BufferAttribute(offsets, 3));
      geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

      const uniforms = {
        uTime: { value: 0 },
        uSize: { value: 62 },
        uPixelRatio: { value: renderer.getPixelRatio() },
      };
      const galaxy = new THREE.Points(
        geometry,
        new THREE.ShaderMaterial({
          vertexShader: galaxyVertex,
          fragmentShader: galaxyFragment,
          uniforms,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );

      const core = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: makeGlowTexture(),
          color: new THREE.Color("#ffc58a"),
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      core.scale.setScalar(3.4);

      const system = new THREE.Group();
      system.add(galaxy, core);
      system.rotation.x = 0.42;
      system.rotation.z = -0.18;
      scene.add(system);

      const starCount = 1800;
      const starPositions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        const v = new THREE.Vector3().randomDirection().multiplyScalar(40 + Math.random() * 40);
        starPositions.set([v.x, v.y, v.z], i * 3);
      }
      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
      const stars = new THREE.Points(
        starGeometry,
        new THREE.PointsMaterial({ color: "#cfd8ff", size: 0.16, transparent: true, opacity: 0.7, depthWrite: false })
      );
      scene.add(stars);

      const lookTarget = new THREE.Vector3();

      return {
        stillTime: 8,
        resize() {
          const wide = size.aspect > 1.15;
          system.position.set(wide ? 2.4 : 0, wide ? 0 : 0.8, 0);
          system.scale.setScalar(wide ? 1 : 0.75);
        },
        update(t) {
          uniforms.uTime.value = t;
          camera.position.set(pointer.sx * 1.4, 3.4 + pointer.sy * 1.1, 9.5);
          lookTarget.set(system.position.x * 0.45, 0, 0);
          camera.lookAt(lookTarget);
          stars.rotation.y = t * 0.006;
        },
      };
    },
    options
  );
}

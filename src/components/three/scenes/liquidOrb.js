import { mountScene, hexVec, makeGlowTexture } from "../mountScene";
import { simplexNoise } from "../glsl";

const orbVertex = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uFreq;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;

  ${simplexNoise}

  float displacement(vec3 n) {
    float slow = snoise(n * uFreq + vec3(uTime * 0.22, uTime * 0.17, uTime * 0.11));
    float fine = snoise(n * uFreq * 2.1 - vec3(uTime * 0.27)) * 0.18;
    return (slow + fine) * uAmp;
  }

  vec3 displaced(vec3 p) {
    vec3 n = normalize(p);
    return n * (length(p) + displacement(n));
  }

  void main() {
    vec3 n = normalize(position);
    vec3 tangent = normalize(cross(n, abs(n.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0)));
    vec3 bitangent = normalize(cross(n, tangent));
    float eps = 0.012;
    vec3 p0 = displaced(position);
    vec3 p1 = displaced(position + tangent * eps);
    vec3 p2 = displaced(position + bitangent * eps);
    vec3 normal = normalize(cross(p1 - p0, p2 - p0));
    if (dot(normal, n) < 0.0) normal = -normal;

    vec4 mv = modelViewMatrix * vec4(p0, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    vDisp = displacement(n);
    gl_Position = projectionMatrix * mv;
  }
`;

const orbFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uDeep;
  uniform vec3 uRim;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;

  // Paleta coseno (Íñigo Quílez) afinada hacia violeta, cian y rosa.
  vec3 palette(float t) {
    return vec3(0.56, 0.48, 0.78) + vec3(0.42, 0.38, 0.30) * cos(6.28318 * (t + vec3(0.0, 0.18, 0.36)));
  }

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    float fresnel = pow(1.0 - max(dot(n, v), 0.0), 2.2);
    vec3 light = normalize(vec3(-0.55, 0.75, 0.6));
    float diffuse = max(dot(n, light), 0.0);
    float spec = pow(max(dot(n, normalize(light + v)), 0.0), 70.0);
    float spec2 = pow(max(dot(n, normalize(normalize(vec3(0.8, -0.3, 0.5)) + v)), 0.0), 30.0);

    float hue = dot(n, vec3(0.35, 0.55, 0.25)) * 0.55 + vDisp * 1.4 + uTime * 0.04 + fresnel * 0.35;
    vec3 iridescent = palette(hue);
    vec3 base = mix(uDeep, iridescent, 0.45 + 0.45 * fresnel);
    vec3 color = base * (0.32 + 0.8 * diffuse) + spec * 0.95 + spec2 * vec3(0.55, 0.85, 1.0) * 0.35 + fresnel * uRim * 1.1;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const dustVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.3 + aSeed * 6.28) * 0.25;
    p.x += cos(uTime * 0.2 + aSeed * 4.0) * 0.2;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (2.0 + aSeed * 4.0) * uPixelRatio * (6.0 / -mv.z);
    vAlpha = 0.25 + 0.5 * (0.5 + 0.5 * sin(uTime * 1.5 + aSeed * 20.0));
    gl_Position = projectionMatrix * mv;
  }
`;

const dustFragment = /* glsl */ `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
    gl_FragColor = vec4(vec3(0.75, 0.82, 1.0) * alpha, alpha);
  }
`;

export default function liquidOrb(container, options) {
  return mountScene(
    container,
    ({ THREE, scene, camera, renderer, pointer, size }) => {
      camera.position.set(0, 0, 7);

      const orbUniforms = {
        uTime: { value: 0 },
        uAmp: { value: 0.26 },
        uFreq: { value: 1.05 },
        uDeep: { value: hexVec("#1e1048") },
        uRim: { value: hexVec("#8ec5ff") },
      };
      const orb = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.75, 72),
        new THREE.ShaderMaterial({ vertexShader: orbVertex, fragmentShader: orbFragment, uniforms: orbUniforms })
      );

      const halo = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: makeGlowTexture(),
          color: new THREE.Color("#7c5cff"),
          transparent: true,
          opacity: 0.55,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      halo.scale.setScalar(9);
      halo.position.z = -1.5;

      const group = new THREE.Group();
      group.add(halo, orb);
      scene.add(group);

      const dustCount = 700;
      const dustPositions = new Float32Array(dustCount * 3);
      const dustSeeds = new Float32Array(dustCount);
      for (let i = 0; i < dustCount; i++) {
        dustPositions[i * 3] = (Math.random() - 0.5) * 22;
        dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
        dustSeeds[i] = Math.random();
      }
      const dustGeometry = new THREE.BufferGeometry();
      dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
      dustGeometry.setAttribute("aSeed", new THREE.BufferAttribute(dustSeeds, 1));
      const dustUniforms = { uTime: { value: 0 }, uPixelRatio: { value: renderer.getPixelRatio() } };
      const dust = new THREE.Points(
        dustGeometry,
        new THREE.ShaderMaterial({
          vertexShader: dustVertex,
          fragmentShader: dustFragment,
          uniforms: dustUniforms,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      scene.add(dust);

      let energy = 0;

      return {
        stillTime: 4,
        resize() {
          const wide = size.aspect > 1.15;
          const halfWidth = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * size.aspect;
          group.position.x = wide ? halfWidth * 0.5 : 0;
          group.position.y = wide ? 0 : 0.9;
          group.scale.setScalar(wide ? 1 : 0.72);
        },
        update(t, dt) {
          // El cursor "agita" la superficie: más energía cuanto más rápido se mueve.
          const target = pointer.active ? 0.18 + Math.hypot(pointer.x - pointer.sx, pointer.y - pointer.sy) * 0.6 : 0;
          energy += (Math.min(target, 0.3) - energy) * Math.min(1, dt * 2.5);
          orbUniforms.uTime.value = t;
          orbUniforms.uAmp.value = 0.26 + energy;
          dustUniforms.uTime.value = t;
          orb.rotation.y = t * 0.12 + pointer.sx * 0.6;
          orb.rotation.x = -pointer.sy * 0.4;
          group.position.y += ((size.aspect > 1.15 ? 0 : 0.9) + Math.sin(t * 0.6) * 0.08 - group.position.y) * 0.05;
          dust.rotation.y = pointer.sx * 0.08;
          dust.rotation.x = -pointer.sy * 0.05;
        },
      };
    },
    options
  );
}

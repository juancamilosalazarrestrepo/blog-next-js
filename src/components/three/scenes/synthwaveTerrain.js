import { mountScene, hexVec, makeGlowTexture } from "../mountScene";
import { simplexNoise } from "../glsl";

const HORIZON = "#3d0b52";

const terrainVertex = /* glsl */ `
  uniform float uTravel;
  varying vec2 vWorld;
  varying float vHeight;
  varying float vDepth;

  ${simplexNoise}

  float terrainHeight(vec2 p) {
    // Valle plano en el centro (la "carretera") y montañas a los lados.
    float valley = smoothstep(1.4, 7.5, abs(p.x));
    float n = snoise(vec3(p * 0.11, 0.0)) * 0.5 + 0.5;
    float detail = snoise(vec3(p * 0.36, 4.0)) * 0.22;
    return pow(max(n + detail, 0.0), 1.7) * valley * 4.6;
  }

  void main() {
    vec3 p = position;
    vWorld = vec2(p.x, p.z - uTravel);
    p.y = terrainHeight(vWorld);
    vHeight = p.y;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const terrainFragment = /* glsl */ `
  uniform vec3 uLineLow;
  uniform vec3 uLineHigh;
  uniform vec3 uFill;
  uniform vec3 uFog;
  varying vec2 vWorld;
  varying float vHeight;
  varying float vDepth;

  void main() {
    vec2 cell = vWorld * 0.85;
    vec2 grid = abs(fract(cell - 0.5) - 0.5) / fwidth(cell);
    float line = 1.0 - min(min(grid.x, grid.y), 1.0);
    float h = clamp(vHeight / 4.0, 0.0, 1.0);
    vec3 lineColor = mix(uLineLow, uLineHigh, h);
    vec3 color = mix(uFill * (0.6 + h * 0.8), lineColor * 1.25, line);
    float fog = smoothstep(10.0, 62.0, vDepth);
    gl_FragColor = vec4(mix(color, uFog, fog), 1.0);
  }
`;

const sunVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const sunFragment = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    float d = length(vUv - 0.5);
    float disc = smoothstep(0.5, 0.49, d);
    vec3 color = mix(vec3(1.0, 0.16, 0.52), vec3(1.0, 0.86, 0.36), smoothstep(0.1, 0.95, vUv.y));
    // Franjas horizontales que se ensanchan hacia abajo y bajan lentamente.
    float bands = fract(vUv.y * 14.0 + uTime * 0.35);
    float thickness = clamp((0.55 - vUv.y) * 1.3, 0.0, 0.75);
    float alpha = disc * step(thickness, bands);
    gl_FragColor = vec4(color, alpha);
  }
`;

const skyVertex = sunVertex;
const skyFragment = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(mix(uHorizon, uTop, smoothstep(0.0, 0.55, vUv.y)), 1.0);
  }
`;

export default function synthwaveTerrain(container, options) {
  return mountScene(
    container,
    ({ THREE, scene, camera, pointer }) => {
      camera.position.set(0, 1.7, 5.5);

      const terrainGeometry = new THREE.PlaneGeometry(56, 72, 168, 216);
      terrainGeometry.rotateX(-Math.PI / 2);
      terrainGeometry.translate(0, 0, -30);
      const terrainUniforms = {
        uTravel: { value: 0 },
        uLineLow: { value: hexVec("#ff3cac") },
        uLineHigh: { value: hexVec("#2de2ff") },
        uFill: { value: hexVec("#12021f") },
        uFog: { value: hexVec(HORIZON) },
      };
      const terrain = new THREE.Mesh(
        terrainGeometry,
        new THREE.ShaderMaterial({ vertexShader: terrainVertex, fragmentShader: terrainFragment, uniforms: terrainUniforms })
      );
      scene.add(terrain);

      const sky = new THREE.Mesh(
        new THREE.PlaneGeometry(320, 120),
        new THREE.ShaderMaterial({
          vertexShader: skyVertex,
          fragmentShader: skyFragment,
          uniforms: { uTop: { value: hexVec("#07010f") }, uHorizon: { value: hexVec(HORIZON) } },
          depthWrite: false,
        })
      );
      sky.position.set(0, 60 - 2, -100);
      sky.renderOrder = -2;
      scene.add(sky);

      const sunUniforms = { uTime: { value: 0 } };
      const sun = new THREE.Mesh(
        new THREE.PlaneGeometry(26, 26),
        new THREE.ShaderMaterial({
          vertexShader: sunVertex,
          fragmentShader: sunFragment,
          uniforms: sunUniforms,
          transparent: true,
          depthWrite: false,
        })
      );
      sun.position.set(0, 9, -90);
      sun.renderOrder = -1;
      scene.add(sun);

      const sunGlow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: makeGlowTexture(),
          color: new THREE.Color("#ff2d8a"),
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      sunGlow.scale.setScalar(70);
      sunGlow.position.set(0, 9, -95);
      sunGlow.renderOrder = -1;
      scene.add(sunGlow);

      const starCount = 600;
      const starPositions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 260;
        starPositions[i * 3 + 1] = 8 + Math.random() * 90;
        starPositions[i * 3 + 2] = -96;
      }
      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
      const stars = new THREE.Points(
        starGeometry,
        new THREE.PointsMaterial({ color: "#ffd9f5", size: 0.35, transparent: true, opacity: 0.8, depthWrite: false })
      );
      stars.renderOrder = -1;
      scene.add(stars);

      const lookTarget = new THREE.Vector3();
      let travel = 0;
      let speed = 4;

      return {
        stillTime: 3,
        update(t, dt) {
          speed += ((pointer.down ? 14 : 4) - speed) * Math.min(1, dt * 2);
          travel += speed * dt;
          terrainUniforms.uTravel.value = travel;
          sunUniforms.uTime.value = t;
          camera.position.x = pointer.sx * 1.1;
          camera.position.y = 1.7 + pointer.sy * 0.35;
          lookTarget.set(pointer.sx * 2.5, 1.0, -20);
          camera.lookAt(lookTarget);
          camera.rotation.z -= pointer.sx * 0.04;
        },
      };
    },
    options
  );
}

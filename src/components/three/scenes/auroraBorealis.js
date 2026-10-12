import { mountScene, hexVec } from "../mountScene";
import { simplexNoise } from "../glsl";

// Cielo nocturno a pantalla completa: tres cortinas de aurora con rayos verticales, estrellas que
// titilan y dos cordilleras en silueta iluminadas por el resplandor. Todo ocurre en un solo
// fragment shader sobre un quad que ignora la cámara.
const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uPointer;
  uniform vec3 uGreen;
  uniform vec3 uLime;
  uniform vec3 uCyan;
  uniform vec3 uViolet;
  uniform vec3 uPink;
  varying vec2 vUv;

  ${simplexNoise}

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float fbm(vec3 p) {
    float sum = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 3; i++) {
      sum += amp * snoise(p);
      p *= 2.03;
      amp *= 0.5;
    }
    return sum;
  }

  // Una cortina: borde inferior ondulado, rayos verticales que suben y se desvanecen,
  // color que pasa de cLow (borde) a cHigh (puntas).
  vec3 curtain(vec2 p, float t, float seed, float base, float amp, vec3 cLow, vec3 cHigh) {
    float wave = fbm(vec3(p.x * 0.32 + seed, seed * 1.7, t * 0.055)) * amp;
    wave += sin(p.x * 0.85 + t * 0.22 + seed) * 0.045;
    float d = p.y - (base + wave);

    float rays = snoise(vec3(p.x * 6.5 + wave * 16.0, seed, t * 0.11)) * 0.5 + 0.5;
    float fine = snoise(vec3(p.x * 26.0 + wave * 38.0, seed + 3.0, t * 0.22)) * 0.5 + 0.5;
    rays = mix(0.25, 1.0, pow(rays, 1.4)) * mix(0.7, 1.0, fine);

    float above = exp(-max(d, 0.0) * mix(2.4, 7.5, 1.0 - rays));
    float below = exp(-max(-d, 0.0) * 60.0);
    float shape = d > 0.0 ? above : below;
    float edge = exp(-abs(d) * 38.0) * 0.55;

    float envelope = smoothstep(0.15, 0.75, snoise(vec3(p.x * 0.22 + seed * 5.0, seed, t * 0.03)) * 0.5 + 0.5);
    float intensity = (shape + edge) * rays * envelope;

    vec3 col = mix(cLow, cHigh, smoothstep(0.0, 0.38, d));
    return col * intensity;
  }

  float ridge(float x, float seed, float height, float rough) {
    float h = height;
    h += sin(x * 1.3 + seed) * 0.035;
    h += sin(x * 3.1 + seed * 2.0) * 0.018;
    h += snoise(vec3(x * rough, seed, 0.0)) * 0.03;
    h += abs(snoise(vec3(x * rough * 4.0, seed + 9.0, 0.0))) * 0.012;
    return h;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / uRes.y;
    vec2 p = vec2((uv.x - 0.5) * aspect, uv.y);
    float t = uTime;

    // Cielo
    vec3 col = mix(vec3(0.012, 0.035, 0.075), vec3(0.004, 0.008, 0.022), smoothstep(0.1, 1.0, uv.y));

    // Estrellas
    vec2 g = vec2(p.x, uv.y) * 150.0;
    vec2 id = floor(g);
    float h = hash(id);
    vec2 f = fract(g) - 0.5 - (vec2(hash(id + 1.7), hash(id + 3.1)) - 0.5) * 0.6;
    float twinkle = 0.55 + 0.45 * sin(t * (0.8 + h * 2.5) + h * 60.0);
    float star = step(0.975, h) * smoothstep(0.09, 0.0, length(f)) * twinkle;
    col += vec3(0.85, 0.92, 1.0) * star * smoothstep(0.15, 0.45, uv.y);

    // Aurora (el cursor la desplaza un poco, con paralaje distinto por capa)
    vec2 pa = p + vec2(uPointer.x * 0.05, uPointer.y * 0.015);
    vec3 aurora = vec3(0.0);
    aurora += curtain(pa, t, 1.3, 0.44, 0.22, uGreen, uViolet) * 1.15;
    aurora += curtain(pa * vec2(1.25, 1.0) + vec2(2.0, 0.0) + vec2(uPointer.x * 0.03, 0.0), t * 1.15, 7.1, 0.6, 0.17, uCyan, uPink) * 0.75;
    aurora += curtain(pa * vec2(0.8, 1.0) - vec2(1.0, 0.0), t * 0.85, 3.9, 0.3, 0.24, uLime, uCyan) * 0.6;
    col += aurora;

    // Resplandor sobre el horizonte, teñido con la propia aurora
    float glow = exp(-max(uv.y - 0.12, 0.0) * 5.0);
    col += (uGreen * 0.06 + aurora * 0.25) * glow;

    // Mapeo de tonos suave para que los cruces de cortinas no se quemen
    col = 1.0 - exp(-col * 1.35);

    // Cordilleras: la lejana azulada con borde iluminado, la cercana casi negra
    float far = ridge(p.x + uPointer.x * 0.02, 2.0, 0.22, 0.9);
    float near = ridge(p.x * 0.8 + uPointer.x * 0.045, 11.0, 0.12, 0.7);
    float farMask = smoothstep(far + 0.002, far - 0.002, uv.y);
    float nearMask = smoothstep(near + 0.002, near - 0.002, uv.y);
    vec3 light = uGreen * 0.45 + aurora * 0.7;
    vec3 farCol = mix(vec3(0.015, 0.035, 0.06), vec3(0.04, 0.1, 0.13), smoothstep(far - 0.12, far, uv.y));
    farCol += light * exp(-max(far - uv.y, 0.0) * 70.0) * 0.6;
    vec3 nearCol = vec3(0.004, 0.01, 0.016) + light * exp(-max(near - uv.y, 0.0) * 120.0) * 0.28;
    col = mix(col, farCol, farMask);
    col = mix(col, nearCol, nearMask);

    // Tramado contra el banding de los degradados
    col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) / 255.0;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function auroraBorealis(container, options) {
  return mountScene(
    container,
    ({ THREE, scene, renderer, pointer }) => {
      const uniforms = {
        uTime: { value: 0 },
        uRes: { value: new THREE.Vector2(1, 1) },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uGreen: { value: hexVec("#2dffa0") },
        uLime: { value: hexVec("#a3e635") },
        uCyan: { value: hexVec("#22d3ee") },
        uViolet: { value: hexVec("#8b5cf6") },
        uPink: { value: hexVec("#ec4899") },
      };
      const quad = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms, depthTest: false, depthWrite: false })
      );
      quad.frustumCulled = false;
      scene.add(quad);

      return {
        stillTime: 14,
        resize() {
          renderer.getDrawingBufferSize(uniforms.uRes.value);
        },
        update(t) {
          uniforms.uTime.value = t;
          uniforms.uPointer.value.set(pointer.sx, pointer.sy);
        },
      };
    },
    { maxPixelRatio: 1, ...options }
  );
}

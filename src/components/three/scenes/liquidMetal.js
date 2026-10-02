import { mountScene } from "../mountScene";

const BALLS = 6;

const quadVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy * 2.0, 0.0, 1.0);
  }
`;

const metalFragment = /* glsl */ `
  uniform float uTime;
  uniform float uAspect;
  uniform float uTanHalfFov;
  uniform vec3 uOffset;
  uniform vec3 uPointer;
  uniform float uPointerStrength;
  uniform float uScale;
  varying vec2 vUv;

  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  vec3 ballPos(float i) {
    float t = uTime * (0.22 + i * 0.035);
    return uOffset + uScale * vec3(
      sin(t * 1.3 + i * 2.1) * 1.7,
      cos(t * 1.1 + i * 1.3) * 1.05,
      sin(t * 0.9 + i * 0.7) * 0.8
    );
  }

  float map(vec3 p) {
    float d = length(p - uOffset) - 0.95 * uScale;
    for (int i = 0; i < ${BALLS}; i++) {
      float fi = float(i);
      float r = (0.42 + 0.12 * sin(fi * 3.7)) * uScale;
      d = smin(d, length(p - ballPos(fi)) - r, 0.75 * uScale);
    }
    float pr = 0.5 * uScale * uPointerStrength;
    if (pr > 0.01) d = smin(d, length(p - uPointer) - pr, 0.8 * uScale);
    return d;
  }

  vec3 calcNormal(vec3 p) {
    vec2 e = vec2(0.0015, 0.0);
    return normalize(vec3(
      map(p + e.xyy) - map(p - e.xyy),
      map(p + e.yxy) - map(p - e.yxy),
      map(p + e.yyx) - map(p - e.yyx)
    ));
  }

  // "Estudio" falso: degradado de cielo, suelo oscuro y dos softboxes para los reflejos del cromo.
  vec3 environment(vec3 r) {
    vec3 sky = mix(vec3(0.05, 0.06, 0.14), vec3(0.55, 0.62, 0.95), smoothstep(-0.2, 0.9, r.y));
    sky += vec3(1.0, 0.95, 0.9) * smoothstep(0.86, 0.95, dot(r, normalize(vec3(-0.6, 0.6, 0.5)))) * 1.6;
    sky += vec3(0.6, 0.85, 1.0) * smoothstep(0.9, 0.97, dot(r, normalize(vec3(0.8, 0.1, 0.6)))) * 1.1;
    sky += vec3(1.0, 0.45, 0.85) * smoothstep(0.75, 1.0, dot(r, normalize(vec3(0.2, -0.9, 0.4)))) * 0.5;
    return sky;
  }

  vec3 iridescence(float t) {
    return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    vec3 ro = vec3(0.0, 0.0, 6.0);
    vec3 rd = normalize(vec3(uv.x * uAspect * uTanHalfFov, uv.y * uTanHalfFov, -1.0));

    float t = 0.0;
    float hit = -1.0;
    for (int i = 0; i < 72; i++) {
      float d = map(ro + rd * t);
      if (d < 0.0015) { hit = t; break; }
      t += d;
      if (t > 12.0) break;
    }
    if (hit < 0.0) {
      gl_FragColor = vec4(0.0);
      return;
    }

    vec3 p = ro + rd * hit;
    vec3 n = calcNormal(p);
    vec3 v = -rd;
    float ndv = max(dot(n, v), 0.0);
    float fresnel = pow(1.0 - ndv, 3.0);
    vec3 refl = environment(reflect(rd, n));
    vec3 film = iridescence(ndv * 1.4 + uTime * 0.05 + p.y * 0.15);
    vec3 color = refl * mix(vec3(0.85), film, 0.55) + fresnel * film * 0.6;
    color = color / (1.0 + color * 0.35);
    gl_FragColor = vec4(pow(color, vec3(0.92)), 1.0);
  }
`;

export default function liquidMetal(container, options) {
  return mountScene(
    container,
    ({ THREE, scene, camera, pointer, size }) => {
      camera.position.set(0, 0, 6);

      const uniforms = {
        uTime: { value: 0 },
        uAspect: { value: 1 },
        uTanHalfFov: { value: Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) },
        uOffset: { value: new THREE.Vector3() },
        uPointer: { value: new THREE.Vector3(0, 0, 0) },
        uPointerStrength: { value: 0 },
        uScale: { value: 1 },
      };
      const quad = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.ShaderMaterial({ vertexShader: quadVertex, fragmentShader: metalFragment, uniforms, transparent: true, depthWrite: false })
      );
      quad.frustumCulled = false;
      scene.add(quad);

      return {
        stillTime: 4,
        resize() {
          const wide = size.aspect > 1.15;
          uniforms.uAspect.value = size.aspect;
          const halfWidth = uniforms.uTanHalfFov.value * camera.position.z * size.aspect;
          uniforms.uOffset.value.set(wide ? halfWidth * 0.5 : 0, wide ? 0 : 0.8, 0);
          uniforms.uScale.value = wide ? 1 : 0.7;
        },
        update(t, dt) {
          uniforms.uTime.value = t;
          // Cursor proyectado al plano z = 0, donde viven las gotas.
          const tan = uniforms.uTanHalfFov.value * 6;
          uniforms.uPointer.value.set(pointer.sx * tan * size.aspect, pointer.sy * tan, 0.4);
          uniforms.uPointerStrength.value += ((pointer.active ? 1 : 0) - uniforms.uPointerStrength.value) * Math.min(1, dt * 3);
        },
      };
    },
    { ...options, maxPixelRatio: 1.25 }
  );
}

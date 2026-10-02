import { mountScene, makeGlowTexture } from "../mountScene";

const DEPTH = 90;

const streakVertex = /* glsl */ `
  uniform float uTravel;
  uniform float uSpeed;
  attribute float aAngle;
  attribute float aRadius;
  attribute float aOffset;
  attribute float aWidth;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlong;
  varying float vAcross;
  varying float vFade;

  void main() {
    // Cada estela avanza hacia la cámara y reaparece al fondo del túnel.
    float head = mod(aOffset + uTravel, ${DEPTH.toFixed(1)}) - ${(DEPTH - 2).toFixed(1)};
    float along = position.y + 0.5;
    float len = 0.6 + uSpeed * 0.22;
    float z = head - (1.0 - along) * len;
    vec2 radial = vec2(cos(aAngle), sin(aAngle));
    vec2 tangent = vec2(-radial.y, radial.x);
    vec2 xy = radial * aRadius + tangent * position.x * aWidth;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(xy, z, 1.0);
    vColor = aColor;
    vAlong = along;
    vAcross = position.x * 2.0;
    vFade = smoothstep(-${DEPTH.toFixed(1)}, -${(DEPTH - 30).toFixed(1)}, head);
  }
`;

const streakFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlong;
  varying float vAcross;
  varying float vFade;
  void main() {
    float edge = 1.0 - abs(vAcross);
    float alpha = pow(vAlong, 2.2) * edge * edge * vFade;
    gl_FragColor = vec4(vColor * alpha * 2.0, alpha);
  }
`;

export default function warpTunnel(container, options) {
  return mountScene(
    container,
    ({ THREE, scene, camera, pointer, size }) => {
      camera.position.set(0, 0, 0);

      const mobile = window.innerWidth < 768;
      const count = mobile ? 1400 : 2800;
      const palette = ["#22d3ee", "#38bdf8", "#818cf8", "#c084fc", "#f472b6", "#e0f2fe"].map((hex) => {
        const rgb = { r: 0, g: 0, b: 0 };
        new THREE.Color(hex).getRGB(rgb, THREE.SRGBColorSpace);
        return rgb;
      });

      const angles = new Float32Array(count);
      const radii = new Float32Array(count);
      const offsets = new Float32Array(count);
      const widths = new Float32Array(count);
      const colors = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        angles[i] = Math.random() * Math.PI * 2;
        radii[i] = 1.6 + Math.pow(Math.random(), 0.7) * 7;
        offsets[i] = Math.random() * DEPTH;
        widths[i] = 0.03 + Math.random() * 0.07;
        const c = palette[Math.floor(Math.random() * palette.length)];
        colors.set([c.r, c.g, c.b], i * 3);
      }

      const geometry = new THREE.InstancedBufferGeometry();
      const quad = new THREE.PlaneGeometry(1, 1);
      geometry.index = quad.index;
      geometry.setAttribute("position", quad.getAttribute("position"));
      geometry.setAttribute("aAngle", new THREE.InstancedBufferAttribute(angles, 1));
      geometry.setAttribute("aRadius", new THREE.InstancedBufferAttribute(radii, 1));
      geometry.setAttribute("aOffset", new THREE.InstancedBufferAttribute(offsets, 1));
      geometry.setAttribute("aWidth", new THREE.InstancedBufferAttribute(widths, 1));
      geometry.setAttribute("aColor", new THREE.InstancedBufferAttribute(colors, 3));
      geometry.instanceCount = count;
      quad.dispose();

      const uniforms = { uTravel: { value: 0 }, uSpeed: { value: 10 } };
      const streaks = new THREE.Mesh(
        geometry,
        new THREE.ShaderMaterial({
          vertexShader: streakVertex,
          fragmentShader: streakFragment,
          uniforms,
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
        })
      );
      streaks.frustumCulled = false;

      const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: makeGlowTexture(),
          color: new THREE.Color("#6d5dfc"),
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      glow.scale.setScalar(26);
      glow.position.z = -80;

      const core = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: makeGlowTexture(),
          color: new THREE.Color("#c4f1ff"),
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      core.scale.setScalar(5);
      core.position.z = -78;

      const tunnel = new THREE.Group();
      tunnel.add(glow, core, streaks);
      scene.add(tunnel);

      let speed = 10;
      let travel = 0;

      return {
        stillTime: 2,
        resize() {
          // En pantallas anchas el punto de fuga se desplaza a la derecha para dejar aire al texto.
          tunnel.position.x = size.aspect > 1.15 ? 1.4 : 0;
        },
        update(t, dt) {
          speed += ((pointer.down ? 55 : 10) - speed) * Math.min(1, dt * (pointer.down ? 1.6 : 1.2));
          travel += speed * dt;
          uniforms.uTravel.value = travel;
          uniforms.uSpeed.value = speed;
          tunnel.rotation.z = t * 0.05;
          camera.rotation.y = -pointer.sx * 0.12;
          camera.rotation.x = pointer.sy * 0.08;
          glow.material.opacity = 0.75 + Math.min(speed / 55, 1) * 0.25;
          camera.fov = 60 + Math.min((speed - 10) / 45, 1) * 18;
          camera.updateProjectionMatrix();
        },
      };
    },
    { ...options, fov: 60 }
  );
}

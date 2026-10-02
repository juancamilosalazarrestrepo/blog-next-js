import ThreeScene from "./three/ThreeScene";

// Galaxia espiral de ~50.000 partículas con rotación diferencial en GPU. La cámara sigue al cursor.
const load = () => import("./three/scenes/particleGalaxy");

export default function ParticleGalaxy({ className, style }) {
  return <ThreeScene load={load} background="radial-gradient(ellipse at 70% 45%, #140b2e 0%, #05040f 60%, #020208 100%)" className={className} style={style} />;
}

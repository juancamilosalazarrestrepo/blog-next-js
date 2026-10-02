import ThreeScene from "./three/ThreeScene";

// Nube de partículas que se transforma entre esfera, nudo toroidal, ADN y planeta. El cursor las repele.
const load = () => import("./three/scenes/particleMorph");

export default function ParticleMorph({ className, style }) {
  return <ThreeScene load={load} background="radial-gradient(ellipse at 70% 50%, #0c1433 0%, #050816 62%)" className={className} style={style} />;
}

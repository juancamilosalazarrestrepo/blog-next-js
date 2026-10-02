import ThreeScene from "./three/ThreeScene";

// Esfera iridiscente deformada por ruido simplex en el vertex shader. El cursor agita la superficie.
const load = () => import("./three/scenes/liquidOrb");

export default function LiquidOrb({ className, style }) {
  return <ThreeScene load={load} background="radial-gradient(ellipse at 70% 50%, #1c1040 0%, #0a0618 55%, #05030d 100%)" className={className} style={style} />;
}

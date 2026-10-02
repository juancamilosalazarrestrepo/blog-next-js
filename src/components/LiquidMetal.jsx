import ThreeScene from "./three/ThreeScene";

// Metaballs de cromo iridiscente renderizados con raymarching. Una gota sigue al cursor.
const load = () => import("./three/scenes/liquidMetal");

export default function LiquidMetal({ className, style }) {
  return <ThreeScene load={load} background="radial-gradient(ellipse at 70% 45%, #161a3a 0%, #070816 60%, #03040b 100%)" className={className} style={style} />;
}

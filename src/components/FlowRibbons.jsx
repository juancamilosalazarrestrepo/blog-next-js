import ThreeScene from "./three/ThreeScene";

// Cintas 3D que fluyen y se retuercen con degradado atardecer. El cursor las atrae.
const load = () => import("./three/scenes/flowRibbons");

export default function FlowRibbons({ className, style }) {
  return <ThreeScene load={load} background="radial-gradient(ellipse at 60% 40%, #1b0f2e 0%, #0a0612 65%)" className={className} style={style} />;
}

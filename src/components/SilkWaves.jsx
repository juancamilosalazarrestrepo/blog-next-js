import ThreeScene from "./three/ThreeScene";

// Tela satinada en tonos pastel que ondula con ruido y olas sinusoidales. El cursor levanta la tela.
const load = () => import("./three/scenes/silkWaves");

export default function SilkWaves({ className, style }) {
  return <ThreeScene load={load} background="linear-gradient(180deg, #faf8ff 0%, #f1edff 100%)" className={className} style={style} />;
}

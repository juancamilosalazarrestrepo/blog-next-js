import ThreeScene from "./three/ThreeScene";

// Campo de puntos en perspectiva que ondula con ruido. Un clic lanza una onda expansiva.
const load = () => import("./three/scenes/dotWaveField");

const DEFAULT_BACKGROUND = "radial-gradient(ellipse at 50% 30%, #062226 0%, #020c0e 65%)";

// `palette` ({ low, mid, high }) y `background` permiten recolorear el campo (por defecto, verde azulado).
export default function DotWaveField({ className, style, palette, background = DEFAULT_BACKGROUND }) {
  return <ThreeScene load={load} background={background} className={className} style={style} options={palette ? { palette } : undefined} />;
}

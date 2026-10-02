import ThreeScene from "./three/ThreeScene";

// Globo holográfico de puntos con arcos de datos animados y anillos que laten en cada conexión.
const load = () => import("./three/scenes/holoGlobe");

export default function HoloGlobe({ className, style }) {
  return <ThreeScene load={load} background="radial-gradient(ellipse at 70% 50%, #0a1a3a 0%, #040a1a 58%, #02050d 100%)" className={className} style={style} />;
}

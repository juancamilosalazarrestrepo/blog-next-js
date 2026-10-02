import ThreeScene from "./three/ThreeScene";

// Túnel de hiperespacio con miles de estelas instanciadas en GPU. Mantén pulsado para el salto a velocidad warp.
const load = () => import("./three/scenes/warpTunnel");

export default function WarpTunnel({ className, style }) {
  return <ThreeScene load={load} background="radial-gradient(circle at 60% 50%, #0d0b2c 0%, #03030c 65%)" className={className} style={style} />;
}

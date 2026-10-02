import ThreeScene from "./three/ThreeScene";

// Paisaje retro synthwave: terreno de grilla neón infinito, sol a franjas y estrellas. Mantén pulsado para acelerar.
const load = () => import("./three/scenes/synthwaveTerrain");

export default function SynthwaveTerrain({ className, style }) {
  return <ThreeScene load={load} background="#07010f" className={className} style={style} />;
}

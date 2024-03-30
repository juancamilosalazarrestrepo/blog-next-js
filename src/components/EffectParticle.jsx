import Link from "next/link";
import logo from "../../public/images/locosc.webp";
import Image from "next/image";


export default function EffectParticle() {
  particle()
  return (
    <div id="particles-js">
      <h1>Particle Effect</h1>

      <script type="text/javascript" src="./particle.js"></script>
    </div>
  );
}

import Layout from "../../components/Layout";
import ComponentDemoPage from "../../components/ComponentDemoPage";
import SynthwaveTerrain from "../../components/SynthwaveTerrain";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const theme = {
  "bg": "#0b0118",
  "surface": "#150727",
  "border": "#2a1145",
  "accent": "#ff5cc0",
  "accentGlow": "rgba(255,92,192,0.35)",
  "codeBg": "#080112",
  "scrim": "linear-gradient(90deg, rgba(11,1,24,.86) 0%, rgba(11,1,24,.55) 38%, rgba(11,1,24,0) 64%)",
  "scrimMobile": "linear-gradient(0deg, rgba(11,1,24,.94) 0%, rgba(11,1,24,.7) 45%, rgba(11,1,24,0) 78%)"
};

const usage = `import SynthwaveTerrain from "@/components/SynthwaveTerrain";

// Copia también la carpeta components/three (escena + utilidades).
// Requiere: npm i three

<section style={{ position: "relative", height: "100vh" }}>
  <SynthwaveTerrain />
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1>Tu contenido</h1>
  </div>
</section>`;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale || "es", ["common"])) } };
}

export default function SynthwaveTerrainPage() {
  return (
    <Layout>
      <ComponentDemoPage
        title="Synthwave Terrain"
        subtitle="Paisaje retro de los 80: terreno de grilla neón generado con ruido, sol a franjas y niebla al horizonte. Avance infinito sin recrear geometría."
        tags={["Three.js", "GLSL", "Retro", "Procedural"]}
        theme={theme}
        preview={<SynthwaveTerrain />}
        hint="Mantén pulsado para acelerar"
        banner={{
          badge: "Retro Future",
          title: "Back to",
          titleLight: "the future",
          tagline: "Interfaces con personalidad: estética synthwave, animación fluida y rendimiento de 60 fps.",
          primary: "Ver el demo",
          secondary: "Contacto",
        }}
        features={[
          "Terreno de 168×216 segmentos desplazado con ruido en el vertex shader",
          "Valle central plano y montañas que crecen hacia los lados",
          <>Grilla antialiasada con <code>fwidth</code>, color según la altura</>,
          "Avance infinito: solo se desplaza el muestreo del ruido",
          "Sol con franjas animadas, halo aditivo y estrellas",
          "Niebla al horizonte que funde el terreno con el cielo",
        ]}
        usage={usage}
      />
    </Layout>
  );
}

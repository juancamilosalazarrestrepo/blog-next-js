import Layout from "../../components/Layout";
import ComponentDemoPage from "../../components/ComponentDemoPage";
import HoloGlobe from "../../components/HoloGlobe";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const theme = {
  "bg": "#03070f",
  "surface": "#08121f",
  "border": "#132338",
  "accent": "#5cd6ff",
  "accentGlow": "rgba(92,214,255,0.32)",
  "codeBg": "#02050b",
  "scrim": "linear-gradient(90deg, rgba(3,7,15,.86) 0%, rgba(3,7,15,.55) 38%, rgba(3,7,15,0) 64%)",
  "scrimMobile": "linear-gradient(0deg, rgba(3,7,15,.94) 0%, rgba(3,7,15,.7) 45%, rgba(3,7,15,0) 78%)"
};

const usage = `import HoloGlobe from "@/components/HoloGlobe";

// Copia también la carpeta components/three (escena + utilidades).
// Requiere: npm i three

<section style={{ position: "relative", height: "100vh" }}>
  <HoloGlobe />
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1>Tu contenido</h1>
  </div>
</section>`;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale || "es", ["common"])) } };
}

export default function HoloGlobePage() {
  return (
    <Layout>
      <ComponentDemoPage
        title="Holo Globe"
        subtitle="Globo holográfico de puntos con continentes procedurales, atmósfera fresnel y arcos de datos que viajan entre ciudades. Ideal para SaaS, fintech y productos globales."
        tags={["Three.js", "GLSL", "Data viz", "Procedural"]}
        theme={theme}
        preview={<HoloGlobe />}
        hint="Mueve el cursor para girar el globo"
        banner={{
          badge: "Global Scale",
          title: "Conecta tu negocio",
          titleLight: "con el mundo",
          tagline: "Infraestructura y software que operan en cualquier país, en tiempo real y sin fricción.",
          primary: "Empezar ahora",
          secondary: "Ver cobertura",
        }}
        features={[
          "Continentes procedurales con PRNG con semilla: siempre el mismo mapa",
          "Miles de puntos sobre una esfera de Fibonacci con parpadeo individual",
          "Puntos de la cara oculta atenuados según la normal en espacio de vista",
          <>Atmósfera fresnel aditiva (<code>BackSide</code>) alrededor del globo</>,
          "16 arcos Bézier con un paquete de luz que recorre cada conexión",
          "Anillos que laten en los extremos de cada arco",
        ]}
        usage={usage}
      />
    </Layout>
  );
}

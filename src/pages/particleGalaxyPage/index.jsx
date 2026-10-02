import Layout from "../../components/Layout";
import ComponentDemoPage from "../../components/ComponentDemoPage";
import ParticleGalaxy from "../../components/ParticleGalaxy";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const theme = {
  "bg": "#04040d",
  "surface": "#0b0a1c",
  "border": "#1a1833",
  "accent": "#ffb26b",
  "accentGlow": "rgba(255,178,107,0.3)",
  "codeBg": "#03030a",
  "scrim": "linear-gradient(90deg, rgba(4,4,13,.86) 0%, rgba(4,4,13,.55) 38%, rgba(4,4,13,0) 64%)",
  "scrimMobile": "linear-gradient(0deg, rgba(4,4,13,.94) 0%, rgba(4,4,13,.7) 45%, rgba(4,4,13,0) 78%)"
};

const usage = `import ParticleGalaxy from "@/components/ParticleGalaxy";

// Copia también la carpeta components/three (escena + utilidades).
// Requiere: npm i three

<section style={{ position: "relative", height: "100vh" }}>
  <ParticleGalaxy />
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1>Tu contenido</h1>
  </div>
</section>`;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale || "es", ["common"])) } };
}

export default function ParticleGalaxyPage() {
  return (
    <Layout>
      <ComponentDemoPage
        title="Particle Galaxy"
        subtitle="Galaxia espiral generativa de ~50.000 partículas. El giro y el vaivén de los brazos se calculan por completo en el vertex shader."
        tags={["Three.js", "Points", "GLSL", "Generativo"]}
        theme={theme}
        preview={<ParticleGalaxy />}
        hint="Mueve el cursor para orbitar la cámara"
        banner={{
          badge: "Data & AI",
          title: "Explora el",
          titleLight: "universo de tus datos",
          tagline: "Visualizaciones que convierten millones de puntos en historias claras, rápidas y memorables.",
          primary: "Agendar demo",
          secondary: "Saber más",
        }}
        features={[
          "~52.000 partículas en escritorio, ~22.000 en móvil",
          "Giro en GPU con un vaivén diferencial acotado: los brazos nunca se enrollan",
          "4 brazos espirales con dispersión exponencial",
          "Gradiente de color por radio: ámbar → violeta → cian",
          "Blending aditivo + núcleo luminoso tipo sprite",
          "Cámara con parallax suave que sigue al cursor",
        ]}
        usage={usage}
      />
    </Layout>
  );
}

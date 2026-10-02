import Layout from "../../components/Layout";
import ComponentDemoPage from "../../components/ComponentDemoPage";
import ParticleMorph from "../../components/ParticleMorph";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const theme = {
  "bg": "#050816",
  "surface": "#0b1028",
  "border": "#1a2248",
  "accent": "#8b93ff",
  "accentGlow": "rgba(139,147,255,0.35)",
  "codeBg": "#040611",
  "scrim": "linear-gradient(90deg, rgba(5,8,22,.86) 0%, rgba(5,8,22,.55) 38%, rgba(5,8,22,0) 64%)",
  "scrimMobile": "linear-gradient(0deg, rgba(5,8,22,.94) 0%, rgba(5,8,22,.7) 45%, rgba(5,8,22,0) 78%)"
};

const usage = `import ParticleMorph from "@/components/ParticleMorph";

// Copia también la carpeta components/three (escena + utilidades).
// Requiere: npm i three

<section style={{ position: "relative", height: "100vh" }}>
  <ParticleMorph />
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1>Tu contenido</h1>
  </div>
</section>`;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale || "es", ["common"])) } };
}

export default function ParticleMorphPage() {
  return (
    <Layout>
      <ComponentDemoPage
        title="Particle Morph"
        subtitle="16.000 partículas que se transforman entre esfera, nudo toroidal, doble hélice de ADN y planeta con anillo. El cursor las aparta a su paso."
        tags={["Three.js", "Morphing", "GLSL", "Interactivo"]}
        theme={theme}
        preview={<ParticleMorph />}
        hint="Pasa el cursor sobre las partículas"
        banner={{
          badge: "Innovación",
          title: "Tecnología que",
          titleLight: "se transforma contigo",
          tagline: "Soluciones que evolucionan con tu negocio: de la idea al prototipo y del prototipo a escala.",
          primary: "Hablemos",
          secondary: "Casos de éxito",
        }}
        features={[
          "4 formas precalculadas como atributos y mezcladas en el shader",
          "Transición con easing cúbico y turbulencia de ruido a mitad de camino",
          "Repulsión por distancia al rayo del cursor (afecta toda la profundidad)",
          "Gradiente rosa → índigo → cian según la altura",
          "Parpadeo individual por partícula y blending aditivo",
          "Rotación con parallax y adaptación automática a móvil",
        ]}
        usage={usage}
      />
    </Layout>
  );
}

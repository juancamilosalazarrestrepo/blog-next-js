import Layout from "../../components/Layout";
import ComponentDemoPage from "../../components/ComponentDemoPage";
import LiquidMetal from "../../components/LiquidMetal";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const theme = {
  "bg": "#05060f",
  "surface": "#0c0e1f",
  "border": "#1b1f3a",
  "accent": "#a5b4ff",
  "accentGlow": "rgba(165,180,255,0.32)",
  "codeBg": "#03040a",
  "scrim": "linear-gradient(90deg, rgba(5,6,15,.86) 0%, rgba(5,6,15,.55) 38%, rgba(5,6,15,0) 64%)",
  "scrimMobile": "linear-gradient(0deg, rgba(5,6,15,.94) 0%, rgba(5,6,15,.7) 45%, rgba(5,6,15,0) 78%)"
};

const usage = `import LiquidMetal from "@/components/LiquidMetal";

// Copia también la carpeta components/three (escena + utilidades).
// Requiere: npm i three

<section style={{ position: "relative", height: "100vh" }}>
  <LiquidMetal />
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1>Tu contenido</h1>
  </div>
</section>`;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale || "es", ["common"])) } };
}

export default function LiquidMetalPage() {
  return (
    <Layout>
      <ComponentDemoPage
        title="Liquid Metal"
        subtitle="Gotas de cromo líquido que se fusionan entre sí, renderizadas con raymarching en un solo quad. Reflejos de estudio y película iridiscente. Una gota sigue al cursor."
        tags={["Three.js", "Raymarching", "SDF", "GLSL"]}
        theme={theme}
        preview={<LiquidMetal />}
        hint="Mueve el cursor: una gota te sigue"
        banner={{
          badge: "Future Ready",
          title: "Ideas fluidas,",
          titleLight: "resultados sólidos",
          tagline: "Producto digital premium: ingeniería sólida con una estética que se siente del futuro.",
          primary: "Agendar llamada",
          secondary: "Ver casos",
        }}
        features={[
          "Raymarching de funciones de distancia (SDF) en el fragment shader",
          <>7 esferas unidas con <code>smooth min</code> para el efecto de fusión</>,
          "Entorno de estudio procedural con softboxes para reflejos de cromo",
          "Película iridiscente según el ángulo de visión",
          "Pixel ratio limitado a 1.25 para mantener 60 fps",
          "Fondo transparente: se combina con cualquier degradado CSS",
        ]}
        usage={usage}
      />
    </Layout>
  );
}

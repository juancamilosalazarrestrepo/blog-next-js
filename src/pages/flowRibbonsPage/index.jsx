import Layout from "../../components/Layout";
import ComponentDemoPage from "../../components/ComponentDemoPage";
import FlowRibbons from "../../components/FlowRibbons";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const theme = {
  "bg": "#0a0612",
  "surface": "#140c20",
  "border": "#261a38",
  "accent": "#ff9f5a",
  "accentGlow": "rgba(255,159,90,0.32)",
  "codeBg": "#06040b",
  "scrim": "linear-gradient(90deg, rgba(10,6,18,.86) 0%, rgba(10,6,18,.55) 38%, rgba(10,6,18,0) 64%)",
  "scrimMobile": "linear-gradient(0deg, rgba(10,6,18,.94) 0%, rgba(10,6,18,.7) 45%, rgba(10,6,18,0) 78%)"
};

const usage = `import FlowRibbons from "@/components/FlowRibbons";

// Copia también la carpeta components/three (escena + utilidades).
// Requiere: npm i three

<section style={{ position: "relative", height: "100vh" }}>
  <FlowRibbons />
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1>Tu contenido</h1>
  </div>
</section>`;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale || "es", ["common"])) } };
}

export default function FlowRibbonsPage() {
  return (
    <Layout>
      <ComponentDemoPage
        title="Flow Ribbons"
        subtitle="Cintas 3D que fluyen y se retuercen sobre sí mismas con un degradado atardecer. Movimiento hipnótico, ideal para marcas creativas y agencias."
        tags={["Three.js", "GLSL", "Abstracto", "Interactivo"]}
        theme={theme}
        preview={<FlowRibbons />}
        hint="Pasa el cursor para atraer las cintas"
        banner={{
          badge: "Creative Studio",
          title: "Diseño que",
          titleLight: "fluye y emociona",
          tagline: "Identidades digitales con movimiento, color y una dirección de arte que se recuerda.",
          primary: "Ver estudio",
          secondary: "Reel 2026",
        }}
        features={[
          "9 cintas con 360 segmentos cada una, todas animadas en GPU",
          "Línea central con ondas superpuestas y torsión a lo largo del recorrido",
          "Normales calculadas en el shader para iluminación de doble cara",
          "Degradado atardecer por cinta + brillo especular y fresnel",
          "Rayado fino tipo tela técnica y extremos desvanecidos",
          "El cursor atrae suavemente las cintas cercanas",
        ]}
        usage={usage}
      />
    </Layout>
  );
}

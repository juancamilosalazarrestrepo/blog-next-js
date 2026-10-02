import Layout from "../../components/Layout";
import ComponentDemoPage from "../../components/ComponentDemoPage";
import DotWaveField from "../../components/DotWaveField";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const theme = {
  "bg": "#020c0e",
  "surface": "#071a1d",
  "border": "#10302f",
  "accent": "#2ee6c9",
  "accentGlow": "rgba(46,230,201,0.3)",
  "codeBg": "#010809",
  "scrim": "linear-gradient(90deg, rgba(2,12,14,.86) 0%, rgba(2,12,14,.55) 38%, rgba(2,12,14,0) 64%)",
  "scrimMobile": "linear-gradient(0deg, rgba(2,12,14,.94) 0%, rgba(2,12,14,.7) 45%, rgba(2,12,14,0) 78%)"
};

const usage = `import DotWaveField from "@/components/DotWaveField";

// Copia también la carpeta components/three (escena + utilidades).
// Requiere: npm i three

<section style={{ position: "relative", height: "100vh" }}>
  <DotWaveField />
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1>Tu contenido</h1>
  </div>
</section>`;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale || "es", ["common"])) } };
}

export default function DotWaveFieldPage() {
  return (
    <Layout>
      <ComponentDemoPage
        title="Dot Wave Field"
        subtitle="Campo de miles de puntos en perspectiva que ondula como un océano digital. El cursor levanta una colina y cada clic lanza una onda expansiva."
        tags={["Three.js", "Points", "GLSL", "Interactivo"]}
        theme={theme}
        preview={<DotWaveField />}
        hint="Haz clic para lanzar una onda"
        banner={{
          badge: "Real-time Data",
          title: "Datos que",
          titleLight: "fluyen solos",
          tagline: "Dashboards y plataformas que reaccionan al instante a cada evento de tu negocio.",
          primary: "Ver plataforma",
          secondary: "Documentación",
        }}
        features={[
          "26.000 puntos (200×130) desplazados en el vertex shader",
          "Olas sinusoidales + ruido simplex para un movimiento orgánico",
          <>Hasta 6 ondas expansivas simultáneas en un array de <code>uniform vec4</code></>,
          "Clic: onda en el punto exacto del cursor (raycast al plano)",
          "Color y tamaño según la altura, desvanecido en profundidad",
          "Ondas automáticas para que el banner nunca se quede quieto",
        ]}
        usage={usage}
      />
    </Layout>
  );
}

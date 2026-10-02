import Layout from "../../components/Layout";
import ComponentDemoPage from "../../components/ComponentDemoPage";
import SilkWaves from "../../components/SilkWaves";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const theme = {
  "bg": "#faf8ff",
  "surface": "#ffffff",
  "border": "#e6e1f5",
  "accent": "#6d28d9",
  "accentGlow": "rgba(109,40,217,0.25)",
  "codeBg": "#f3f0fb",
  "scrim": "linear-gradient(90deg, rgba(250,248,255,.88) 0%, rgba(250,248,255,.6) 38%, rgba(250,248,255,0) 64%)",
  "scrimMobile": "linear-gradient(0deg, rgba(250,248,255,.94) 0%, rgba(250,248,255,.7) 45%, rgba(250,248,255,0) 78%)"
};

const usage = `import SilkWaves from "@/components/SilkWaves";

// Copia también la carpeta components/three (escena + utilidades).
// Requiere: npm i three

<section style={{ position: "relative", height: "100vh" }}>
  <SilkWaves />
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1>Tu contenido</h1>
  </div>
</section>`;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale || "es", ["common"])) } };
}

export default function SilkWavesPage() {
  return (
    <Layout>
      <ComponentDemoPage
        title="Silk Waves"
        subtitle="Tela satinada en tonos pastel que ondula con olas sinusoidales y ruido. Iluminación con brillo especular tipo seda. El cursor levanta la tela."
        tags={["Three.js", "GLSL", "Light theme", "Interactivo"]}
        theme={theme}
        light
        preview={<SilkWaves />}
        hint="Pasa el cursor sobre la tela"
        banner={{
          badge: "Diseño premium",
          title: "Elegancia en",
          titleLight: "cada detalle",
          tagline: "Marcas que se sienten suaves, modernas y cuidadas desde el primer scroll.",
          primary: "Solicitar propuesta",
          secondary: "Portafolio",
        }}
        features={[
          "Plano de 260×220 segmentos desplazado en el vertex shader",
          "Normales por diferencias finitas para un brillo satinado realista",
          "Degradado de 4 colores pastel que fluye con la altura",
          "Ondulación y ondas concéntricas bajo el cursor",
          "Versión clara: ideal para landings luminosas y e-commerce",
          "Menos segmentos en móvil para mantener 60 fps",
        ]}
        usage={usage}
      />
    </Layout>
  );
}

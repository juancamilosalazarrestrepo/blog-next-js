import Layout from "../../components/Layout";
import ComponentDemoPage from "../../components/ComponentDemoPage";
import WarpTunnel from "../../components/WarpTunnel";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const theme = {
  "bg": "#03030c",
  "surface": "#0a0a1f",
  "border": "#17173a",
  "accent": "#22d3ee",
  "accentGlow": "rgba(34,211,238,0.35)",
  "codeBg": "#020208",
  "scrim": "linear-gradient(90deg, rgba(3,3,12,.86) 0%, rgba(3,3,12,.55) 38%, rgba(3,3,12,0) 64%)",
  "scrimMobile": "linear-gradient(0deg, rgba(3,3,12,.94) 0%, rgba(3,3,12,.7) 45%, rgba(3,3,12,0) 78%)"
};

const usage = `import WarpTunnel from "@/components/WarpTunnel";

// Copia también la carpeta components/three (escena + utilidades).
// Requiere: npm i three

<section style={{ position: "relative", height: "100vh" }}>
  <WarpTunnel />
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1>Tu contenido</h1>
  </div>
</section>`;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale || "es", ["common"])) } };
}

export default function WarpTunnelPage() {
  return (
    <Layout>
      <ComponentDemoPage
        title="Warp Tunnel"
        subtitle="Salto al hiperespacio: miles de estelas de luz instanciadas que vuelan hacia la cámara. Mantén pulsado el banner para activar la velocidad warp."
        tags={["Three.js", "Instancing", "GLSL", "Interactivo"]}
        theme={theme}
        preview={<WarpTunnel />}
        hint="Mantén pulsado para la velocidad warp"
        banner={{
          badge: "Next Level",
          title: "Acelera tu",
          titleLight: "producto digital",
          tagline: "Llevamos tu idea del concepto a producción a la velocidad de la luz, sin sacrificar calidad.",
          primary: "Despegar",
          secondary: "Ver planes",
        }}
        features={[
          <>~2.800 estelas en un único draw call (<code>InstancedBufferGeometry</code>)</>,
          "Posición calculada en GPU: cero actualizaciones de buffers por frame",
          "Longitud de la estela y FOV dependen de la velocidad",
          "Pulsar el banner acelera de 10 a 55 unidades/s con easing",
          "Punto de fuga con doble glow aditivo y giro lento del túnel",
          "Paleta cian, índigo y rosa con desvanecido en profundidad",
        ]}
        usage={usage}
      />
    </Layout>
  );
}

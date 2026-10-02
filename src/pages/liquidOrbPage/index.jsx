import Layout from "../../components/Layout";
import ComponentDemoPage from "../../components/ComponentDemoPage";
import LiquidOrb from "../../components/LiquidOrb";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const theme = {
  "bg": "#07051a",
  "surface": "#0e0b26",
  "border": "#1d1840",
  "accent": "#b69cff",
  "accentGlow": "rgba(182,156,255,0.35)",
  "codeBg": "#050414",
  "scrim": "linear-gradient(90deg, rgba(7,5,26,.86) 0%, rgba(7,5,26,.55) 38%, rgba(7,5,26,0) 64%)",
  "scrimMobile": "linear-gradient(0deg, rgba(7,5,26,.94) 0%, rgba(7,5,26,.7) 45%, rgba(7,5,26,0) 78%)"
};

const usage = `import LiquidOrb from "@/components/LiquidOrb";

// Copia también la carpeta components/three (escena + utilidades).
// Requiere: npm i three

<section style={{ position: "relative", height: "100vh" }}>
  <LiquidOrb />
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1>Tu contenido</h1>
  </div>
</section>`;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale || "es", ["common"])) } };
}

export default function LiquidOrbPage() {
  return (
    <Layout>
      <ComponentDemoPage
        title="Liquid Orb"
        subtitle="Esfera líquida iridiscente renderizada con Three.js. La superficie se deforma con ruido simplex 3D en el vertex shader y reacciona a la velocidad del cursor."
        tags={["Three.js", "WebGL", "GLSL", "Shaders"]}
        theme={theme}
        preview={<LiquidOrb />}
        hint="Mueve el cursor rápido para agitar la esfera"
        banner={{
          badge: "Creative Developer",
          title: "Ideas que",
          titleLight: "toman forma",
          tagline: "Experiencias web inmersivas con 3D en tiempo real, shaders y animación que convierten visitas en recuerdos.",
          primary: "Empezar proyecto",
          secondary: "Ver trabajos",
        }}
        features={[
          "Icosaedro de alta resolución (≈100k triángulos) desplazado en GPU",
          "Ruido simplex 3D en dos octavas, animado en el tiempo",
          "Normales recalculadas por diferencias finitas para iluminación correcta",
          "Color iridiscente con paleta coseno + fresnel en el borde",
          "Halo aditivo y polvo flotante con parallax al cursor",
          <>Pausa automática fuera de pantalla y soporte de <code>prefers-reduced-motion</code></>,
        ]}
        usage={usage}
      />
    </Layout>
  );
}

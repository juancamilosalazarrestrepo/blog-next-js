import Layout from "../../components/Layout";
import LavaBackground from "../../components/LavaBackground";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import styles from "../../styles/LavaBannerElementPage.module.css";

const LavaBannerElement = () => {
  return (
    <div>
      {/* Header de la página */}
      <div className={styles.pageHeader}>
        <Link href="/elements" className={styles.backLink}>
          ← Biblioteca de Componentes
        </Link>
        <h1 className={styles.pageTitle}>Lava Lamp Banner</h1>
        <p className={styles.pageSubtitle}>
          Banner hero con fondo animado de lámpara de lava azul, blobs orgánicos
          y blob interactivo que sigue el cursor.
        </p>
      </div>

      {/* Demo del componente */}
      <div className={styles.demoSection}>
        <div className={styles.demoLabel}>Vista previa</div>
        <div className={styles.bannerWrapper}>
          <LavaBackground />

          {/* Overlay oscuro sutil */}
          <div className={styles.bannerOverlay} />

          {/* Contenido del banner */}
          <div className={styles.bannerContent}>
            <span className={styles.bannerBadge}>Fullstack Developer & AI</span>
            <div className={styles.bannerTextGroup}>
              <h2 className={styles.bannerTitle}>
                Juan Camilo
                <br />
                <span className={styles.bannerTitleLight}>Salazar Restrepo</span>
              </h2>
              <p className={styles.bannerTagline}>
                Desarrollo aplicaciones web y soluciones con inteligencia artificial
                que impulsan negocios al siguiente nivel.
              </p>
            </div>
            <div className={styles.bannerButtons}>
              <button className={styles.btnPrimary}>Contáctame</button>
              <button className={styles.btnSecondary}>Ver Portafolio</button>
            </div>
          </div>
        </div>
      </div>

      {/* Detalles del componente */}
      <div className={styles.detailsSection}>
        <div className={styles.detailsGrid}>
          {/* Info */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Sobre el componente</h3>
            <ul className={styles.infoList}>
              <li>Blobs orgánicos animados con CSS <code>keyframes</code></li>
              <li>Filtro SVG <code>feGaussianBlur + feColorMatrix</code> para efecto goo</li>
              <li>Blob interactivo que sigue el cursor con interpolación suave</li>
              <li>9 blobs con gradientes azul marino / azul eléctrico</li>
              <li>100% CSS — sin librerías de canvas</li>
            </ul>
          </div>

          {/* Código de uso */}
          <div className={styles.codeCard}>
            <h3 className={styles.infoTitle}>Uso</h3>
            <pre className={styles.codeBlock}>{`import LavaBackground from "@/components/LavaBackground";

// El componente padre debe tener position: relative
<div style={{ position: "relative", height: "100vh" }}>
  <LavaBackground />
  {/* Tu contenido aquí con z-index > 1 */}
  <div style={{ position: "relative", zIndex: 3 }}>
    <h1>Tu título</h1>
  </div>
</div>`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || "es", ["common"])),
    },
  };
}

export default function LavaBannerElementPage() {
  return (
    <Layout>
      <LavaBannerElement />
    </Layout>
  );
}

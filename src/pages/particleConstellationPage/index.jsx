import Layout from "../../components/Layout";
import ParticleConstellation from "../../components/ParticleConstellation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import styles from "../../styles/ParticleConstellationPage.module.css";

const ParticleConstellationElement = () => {
    return (
        <div>
            <div className={styles.pageHeader}>
                <Link href="/elements" className={styles.backLink}>
                    ← Biblioteca de Componentes
                </Link>
                <h1 className={styles.pageTitle}>Particle Constellation</h1>
                <p className={styles.pageSubtitle}>
                    Partículas flotantes que se conectan con líneas de constelación.
                    Reaccionan al cursor con repulsión suave y pulso de brillo individual.
                </p>
            </div>

            <div className={styles.demoSection}>
                <div className={styles.demoLabel}>Vista previa — mueve el cursor dentro</div>
                <div className={styles.bannerWrapper}>
                    <ParticleConstellation />

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

            <div className={styles.detailsSection}>
                <div className={styles.detailsGrid}>
                    <div className={styles.infoCard}>
                        <h3 className={styles.infoTitle}>Sobre el componente</h3>
                        <ul className={styles.infoList}>
                            <li>Canvas 2D con <code>requestAnimationFrame</code></li>
                            <li>110 partículas con colores: cyan, violeta, verde, magenta, ámbar</li>
                            <li>Líneas de conexión con degradado entre colores vecinos</li>
                            <li>Repulsión suave al cursor dentro de radio de 130px</li>
                            <li>Pulso de brillo individual con <code>Math.sin</code></li>
                            <li>Glow radial por partícula con <code>createRadialGradient</code></li>
                            <li>Responsive via <code>ResizeObserver</code></li>
                        </ul>
                    </div>

                    <div className={styles.codeCard}>
                        <h3 className={styles.infoTitle}>Uso</h3>
                        <pre className={styles.codeBlock}>{`import ParticleConstellation from "@/components/ParticleConstellation";

// El padre debe tener position: relative
<div style={{ position: "relative", height: "100vh",
  background: "#050714" }}>

  <ParticleConstellation />

  {/* Contenido con z-index > 1 */}
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1>Tu título</h1>
  </div>
</div>`}</pre>
                    </div>

                    <div className={styles.infoCard}>
                        <h3 className={styles.infoTitle}>Personalización</h3>
                        <ul className={styles.infoList}>
                            <li><code>PARTICLE_COUNT</code> — cantidad de partículas (default: 110)</li>
                            <li><code>CONNECTION_DIST</code> — distancia máxima de conexión (140px)</li>
                            <li><code>MOUSE_RADIUS</code> — radio de repulsión del cursor (130px)</li>
                            <li><code>COLORS</code> — array de colores hex de las partículas</li>
                        </ul>
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

export default function ParticleConstellationPage() {
    return (
        <Layout>
            <ParticleConstellationElement />
        </Layout>
    );
}

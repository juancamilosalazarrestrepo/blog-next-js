import Layout from "../../components/Layout";
import AuroraBackground from "../../components/AuroraBackground";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import styles from "../../styles/AuroraPage.module.css";

const Demo = () => (
    <div>
        <div className={styles.pageHeader}>
            <Link href="/elements" className={styles.backLink}>← Biblioteca de Componentes</Link>
            <h1 className={styles.pageTitle}>Aurora Borealis</h1>
            <p className={styles.pageSubtitle}>
                Aurora boreal animada con 6 bandas sinusoidales en blend mode screen.
                Estrellas de fondo y movimiento orgánico fluido.
            </p>
        </div>

        <div className={styles.demoSection}>
            <div className={styles.demoLabel}>Vista previa — animación continua</div>
            <div className={styles.bannerWrapper}>
                <AuroraBackground />
                <div className={styles.bannerContent}>
                    <span className={styles.badge}>Fullstack Developer & AI</span>
                    <h2 className={styles.title}>
                        Juan Camilo<br />
                        <span className={styles.titleLight}>Salazar Restrepo</span>
                    </h2>
                    <p className={styles.tagline}>
                        Desarrollo aplicaciones web y soluciones con inteligencia artificial
                        que impulsan negocios al siguiente nivel.
                    </p>
                    <div className={styles.buttons}>
                        <button className={styles.btnPrimary}>Contáctame</button>
                        <button className={styles.btnSecondary}>Ver Portafolio</button>
                    </div>
                </div>
            </div>
        </div>

        <div className={styles.detailsSection}>
            <div className={styles.grid}>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Características</h3>
                    <ul className={styles.list}>
                        <li>6 bandas de aurora con colores y velocidades únicas</li>
                        <li><code>globalCompositeOperation: screen</code> para mezcla de luz</li>
                        <li>Doble onda sinusoidal por banda para movimiento orgánico</li>
                        <li>Gradiente vertical de transparencia en cada banda</li>
                        <li>Estrellas generadas con densidad adaptada al canvas</li>
                        <li>Colores: verde, cyan, violeta, rosa, azul celeste</li>
                    </ul>
                </div>
                <div className={styles.codeCard}>
                    <h3 className={styles.cardTitle}>Uso</h3>
                    <pre className={styles.code}>{`import AuroraBackground from "@/components/AuroraBackground";

<div style={{ position: "relative", height: "100vh",
  background: "#020712" }}>
  <AuroraBackground />
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1>Tu contenido</h1>
  </div>
</div>`}</pre>
                </div>
            </div>
        </div>
    </div>
);

export async function getStaticProps({ locale }) {
    return { props: { ...(await serverSideTranslations(locale || "es", ["common"])) } };
}

export default function AuroraPage() {
    return <Layout><Demo /></Layout>;
}

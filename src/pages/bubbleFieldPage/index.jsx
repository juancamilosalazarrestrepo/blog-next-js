import Layout from "../../components/Layout";
import BubbleField from "../../components/BubbleField";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import styles from "../../styles/BubbleFieldPage.module.css";

const Demo = () => (
    <div>
        <div className={styles.pageHeader}>
            <Link href="/elements" className={styles.backLink}>← Biblioteca de Componentes</Link>
            <h1 className={styles.pageTitle}>Bubble Field</h1>
            <p className={styles.pageSubtitle}>
                Burbujas semitransparentes que ascienden con trayectoria sinusoidal.
                Al pasar el cursor sobre ellas explotan con un pop animado.
            </p>
        </div>

        <div className={styles.demoSection}>
            <div className={styles.demoLabel}>Vista previa — pasa el cursor sobre las burbujas</div>
            <div className={styles.bannerWrapper}>
                <BubbleField />
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
                        <li>55 burbujas con tamaño aleatorio (12–50px radio)</li>
                        <li>Gradiente radial interno con highlight de esfera</li>
                        <li>Trayectoria sinusoidal ascendente</li>
                        <li>Detección de colisión cursor → pop animado</li>
                        <li>Fade-in al aparecer, reaparecen al morir</li>
                        <li>7 colores: cyan, violeta, verde, rosa, ámbar, índigo, teal</li>
                    </ul>
                </div>
                <div className={styles.codeCard}>
                    <h3 className={styles.cardTitle}>Uso</h3>
                    <pre className={styles.code}>{`import BubbleField from "@/components/BubbleField";

<div style={{ position: "relative", height: "100vh",
  background: "#06061a" }}>
  <BubbleField />
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

export default function BubbleFieldPage() {
    return <Layout><Demo /></Layout>;
}

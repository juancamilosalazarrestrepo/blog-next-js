import Layout from "../../components/Layout";
import Fireflies from "../../components/Fireflies";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import styles from "../../styles/FirefliesPage.module.css";

const Demo = () => (
    <div>
        <div className={styles.pageHeader}>
            <Link href="/elements" className={styles.backLink}>← Biblioteca de Componentes</Link>
            <h1 className={styles.pageTitle}>Fireflies</h1>
            <p className={styles.pageSubtitle}>
                90 luciérnagas con movimiento orgánico, trail luminoso y pulso individual.
                El cursor las dispersa al acercarse a menos de 90px.
            </p>
        </div>

        <div className={styles.demoSection}>
            <div className={styles.demoLabel}>Vista previa — acerca el cursor para dispersarlas</div>
            <div className={styles.bannerWrapper}>
                <Fireflies />
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
                        <li>90 luciérnagas con velocidad y tamaño únicos</li>
                        <li>Movimiento orgánico por ángulo con deriva angular suave</li>
                        <li>Trail de hasta 12 puntos con fade-in progresivo</li>
                        <li>Glow radial con <code>createRadialGradient</code></li>
                        <li>Pulso de opacidad individual con fase aleatoria</li>
                        <li>Dispersión al cursor dentro de 90px de radio</li>
                        <li>Trail + desvanecimiento de pantalla (<code>fillRect alpha 0.18</code>)</li>
                    </ul>
                </div>
                <div className={styles.codeCard}>
                    <h3 className={styles.cardTitle}>Uso</h3>
                    <pre className={styles.code}>{`import Fireflies from "@/components/Fireflies";

// Fondo oscuro recomendado (verde noche o negro)
<div style={{ position: "relative", height: "100vh",
  background: "#010a05" }}>
  <Fireflies />
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1 style={{ color: "#f0fdf4" }}>Tu contenido</h1>
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

export default function FirefliesPage() {
    return <Layout><Demo /></Layout>;
}

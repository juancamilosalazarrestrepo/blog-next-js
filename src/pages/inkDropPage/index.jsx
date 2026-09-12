import Layout from "../../components/Layout";
import InkDrop from "../../components/InkDrop";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import styles from "../../styles/InkDropPage.module.css";

const Demo = () => (
    <div>
        <div className={styles.pageHeader}>
            <Link href="/elements" className={styles.backLink}>← Biblioteca de Componentes</Link>
            <h1 className={styles.pageTitle}>Ink Drop</h1>
            <p className={styles.pageSubtitle}>
                Manchas de tinta que se expanden al mover el cursor, con ondas de ripple
                y blend mode multiply para mezcla realista de colores sobre papel.
            </p>
        </div>

        <div className={styles.demoSection}>
            <div className={styles.demoLabel}>Vista previa — mueve el cursor y haz clic</div>
            <div className={styles.bannerWrapper}>
                <InkDrop />
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
                        <li>Fondo papel crema — las manchas persisten como tinta real</li>
                        <li><code>globalCompositeOperation: multiply</code> para mezcla de pigmentos</li>
                        <li>3 ondas de ripple concéntricas por cada gota</li>
                        <li>Crecimiento con deceleración física (<code>grow *= 0.978</code>)</li>
                        <li>Clic genera 4 gotas simultáneas con dispersión</li>
                        <li>7 colores de tinta: índigo, morado, azul petróleo, rojo, verde, violeta, café</li>
                    </ul>
                </div>
                <div className={styles.codeCard}>
                    <h3 className={styles.cardTitle}>Uso</h3>
                    <pre className={styles.code}>{`import InkDrop from "@/components/InkDrop";

// Fondo claro recomendado para efecto multiply
<div style={{ position: "relative", height: "100vh",
  background: "#faf8f5" }}>
  <InkDrop />
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1 style={{ color: "#1a1a2e" }}>Tu contenido</h1>
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

export default function InkDropPage() {
    return <Layout><Demo /></Layout>;
}

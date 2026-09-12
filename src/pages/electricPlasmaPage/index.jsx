import Layout from "../../components/Layout";
import ElectricPlasma from "../../components/ElectricPlasma";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import styles from "../../styles/ElectricPlasmaPage.module.css";

const Demo = () => (
    <div>
        <div className={styles.pageHeader}>
            <Link href="/elements" className={styles.backLink}>← Biblioteca de Componentes</Link>
            <h1 className={styles.pageTitle}>Electric Plasma</h1>
            <p className={styles.pageSubtitle}>
                Rayos eléctricos generados por desplazamiento de punto medio recursivo.
                El cursor atrae los rayos y el clic genera descargas masivas.
            </p>
        </div>

        <div className={styles.demoSection}>
            <div className={styles.demoLabel}>Vista previa — mueve el cursor y haz clic para descargas</div>
            <div className={styles.bannerWrapper}>
                <ElectricPlasma />
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
                        <li>Algoritmo de desplazamiento de punto medio recursivo</li>
                        <li>Ramificaciones laterales con 28% de probabilidad</li>
                        <li><code>shadowBlur</code> por segmento para efecto neón</li>
                        <li>Trail de desvanecimiento con <code>fillRect + alpha</code></li>
                        <li>El cursor atrae los puntos de origen al 45%</li>
                        <li>Clic → 4 descargas simultáneas desde la posición</li>
                        <li>4 colores: cyan, índigo, blanco, violeta, azul hielo</li>
                    </ul>
                </div>
                <div className={styles.codeCard}>
                    <h3 className={styles.cardTitle}>Uso</h3>
                    <pre className={styles.code}>{`import ElectricPlasma from "@/components/ElectricPlasma";

// Fondo negro recomendado
<div style={{ position: "relative", height: "100vh",
  background: "#000008" }}>
  <ElectricPlasma />
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1 style={{ color: "#fff" }}>Tu contenido</h1>
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

export default function ElectricPlasmaPage() {
    return <Layout><Demo /></Layout>;
}

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import styles from "../../styles/ProyectoDetalle.module.css";
import SEO from "../../components/SEO";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from "next/router";

const HERO_IMAGE = "/images/proyectos/dtf-studio/portada.webp";
const LIVE_URL = "https://dtf.salazarcode.com";

const techStack = {
  app: [
    { name: "Next.js", icon: "▲", color: "#000000" },
    { name: "React", icon: "⚛️", color: "#61DAFB" },
    { name: "Canvas API", icon: "🖼️", color: "#E67E22" },
    { name: "Web Workers", icon: "⚙️", color: "#7F8C8D" },
    { name: "PNG a 300 DPI", icon: "🖨️", color: "#27AE60" },
  ],
  ai: [
    { name: "Eliminación de fondo con IA", icon: "✨", color: "#8E44AD" },
    { name: "Upscaling con IA", icon: "🔍", color: "#2980B9" },
    { name: "Algoritmos de semitono", icon: "🔘", color: "#34495E" },
    { name: "WhatsApp Business", icon: "💬", color: "#25D366" },
  ],
};

const content = {
  es: {
    seoTitle: "DTF Studio: Editor de Semitonos para Impresión DTF | Proyecto",
    seoDescription: "DTF Studio es una app web para preparar diseños de impresión DTF: semitonos con lineatura y trama ajustables, quitar fondo con IA, redimensionar, armar lienzos y exportar PNG transparente a 300 DPI.",
    badge: "Proyecto Web · Herramienta para Impresión DTF",
    heroTitlePre: "DTF Studio, el Editor de ",
    heroTitleHl: "Semitonos para DTF",
    heroDescription: "Aplicación web que deja un diseño listo para imprimir en DTF sin abrir Photoshop. Subes tu imagen y la conviertes a semitono ajustando umbral, lineatura (LPI) y forma del entramado; ves el resultado sobre telas de distintos colores; quitas el fondo con IA, redimensionas, armas el lienzo y descargas un PNG transparente a 300 DPI. Si prefieres que te lo impriman, cotizas por WhatsApp desde la misma app.",
    btnLive: "Ir a ver",
    btnFeatures: "Ver características",
    cardTitle: "PNG a 300 DPI",
    cardText: "Transparente y listo para imprimir",
    demoTitle: "La App en Acción",
    demoSubtitle: "Capturas de la app funcionando",
    demos: [],
    featuresTitle: "Características Principales",
    featuresSubtitle: "Todo el flujo, de la imagen al archivo de impresión",
    features: [
      { icon: "🔘", title: "Semitonos Ajustables", description: "Convierte cualquier imagen a semitono controlando el umbral, la lineatura (25 a 45 LPI) y la forma del entramado: puntos, líneas o trama cruzada." },
      { icon: "👕", title: "Vista Previa sobre Tela", description: "Mira el resultado sobre tela negra, blanca, gris, roja, azul, verde o un color propio con el gotero, y evita sorpresas al imprimir." },
      { icon: "🪄", title: "Fondo con IA", description: "Quita el fondo de la imagen con un clic y deja solo el diseño sobre transparencia." },
      { icon: "🎨", title: "Quitar Color", description: "Elimina un color específico del diseño, útil para fondos planos que no deben llevar tinta." },
      { icon: "📐", title: "Redimensionar y Armar Lienzo", description: "Ajusta el tamaño real en centímetros y organiza varios diseños en un lienzo para aprovechar la película." },
      { icon: "📥", title: "Descarga Lista para Imprimir", description: "Exporta un PNG transparente a 300 DPI con las medidas exactas, y cotiza la impresión por WhatsApp si no tienes impresora." },
    ],
    techTitle: "Stack Tecnológico",
    techSubtitle: "Procesamiento de imagen directamente en el navegador",
    tabBackend: "App y Procesamiento",
    tabFrontend: "IA y Servicios",
    challengesTitle: "Desafíos y Soluciones",
    challengesSubtitle: "Problemas técnicos que resuelve la herramienta",
    solutionLabel: "Solución:",
    challenges: [
      { title: "El Blanco También Lleva Tinta", description: "En DTF el blanco se imprime como una capa de tinta, así que un semitono pensado para tela blanca falla sobre tela oscura.", solution: "Selector de color de tela con una regla clara: el color de la tela no lleva tinta y todo lo demás sí, incluido el blanco." },
      { title: "Imágenes Pesadas en el Navegador", description: "Procesar un semitono a 300 DPI sobre una imagen grande congela la interfaz si se hace en el hilo principal.", solution: "El trabajo pesado se aísla del render y la vista previa se calcula a menor resolución mientras mueves los controles." },
      { title: "Imprimir lo que Ves", description: "Un semitono que se ve bien en pantalla puede salir empastado o perder detalle una vez impreso.", solution: "La lineatura y la forma de trama se eligen con referencias de impresión DTF reales, y el tamaño final se muestra en centímetros y píxeles." },
      { title: "Una Herramienta para Quien No Diseña", description: "La mayoría de quienes imprimen DTF no dominan Photoshop ni las curvas de semitono.", solution: "Un flujo guiado por pestañas con valores por defecto sensatos y un botón para reiniciar todo en cualquier momento." },
    ],
    liveTitle: "Pruébala en Vivo",
    liveDescription: "DTF Studio está publicada y funcionando. Entra, sube tu diseño y descarga tu semitono listo para imprimir.",
    liveStat1: "Semitonos ajustables",
    liveStat2: "PNG a 300 DPI",
    liveStat3: "Fondo con IA",
    liveButton: "Ir a ver",
    ctaTitle: "¿Necesitas una herramienta web a medida?",
    ctaText: "Creo aplicaciones que automatizan el trabajo de tu negocio, desde editores de imagen hasta sistemas completos",
    ctaContact: "Contactar",
    ctaMore: "Ver más proyectos",
  },
  en: {
    seoTitle: "DTF Studio: Halftone Editor for DTF Printing | Project",
    seoDescription: "DTF Studio is a web app to prepare DTF print designs: halftones with adjustable line screen and pattern, AI background removal, resizing, gang sheets and transparent 300 DPI PNG export.",
    badge: "Web Project · DTF Printing Tool",
    heroTitlePre: "DTF Studio, the ",
    heroTitleHl: "Halftone Editor for DTF",
    heroDescription: "A web app that gets a design ready for DTF printing without opening Photoshop. Upload your image and turn it into a halftone by adjusting threshold, line screen (LPI) and dot shape; preview it on fabrics of different colors; remove the background with AI, resize, build the sheet and download a transparent 300 DPI PNG. If you'd rather have it printed for you, request a quote on WhatsApp from the same app.",
    btnLive: "Go see it",
    btnFeatures: "View features",
    cardTitle: "300 DPI PNG",
    cardText: "Transparent and print-ready",
    demoTitle: "The App in Action",
    demoSubtitle: "Screenshots of the running app",
    demos: [],
    featuresTitle: "Key Features",
    featuresSubtitle: "The whole flow, from image to print file",
    features: [
      { icon: "🔘", title: "Adjustable Halftones", description: "Turn any image into a halftone by controlling threshold, line screen (25 to 45 LPI) and screen shape: dots, lines or cross-hatch." },
      { icon: "👕", title: "Fabric Preview", description: "See the result on black, white, gray, red, blue, green or a custom color picked with the eyedropper, and avoid surprises when printing." },
      { icon: "🪄", title: "AI Background Removal", description: "Remove the image background in one click and keep just the design on transparency." },
      { icon: "🎨", title: "Remove Color", description: "Drop a specific color from the design, handy for flat backgrounds that shouldn't get any ink." },
      { icon: "📐", title: "Resize & Build Sheet", description: "Set the real size in centimeters and arrange several designs on one sheet to make the most of the film." },
      { icon: "📥", title: "Print-Ready Download", description: "Export a transparent 300 DPI PNG with exact dimensions, and request a print quote on WhatsApp if you don't own a printer." },
    ],
    techTitle: "Tech Stack",
    techSubtitle: "Image processing right in the browser",
    tabBackend: "App & Processing",
    tabFrontend: "AI & Services",
    challengesTitle: "Challenges and Solutions",
    challengesSubtitle: "Technical problems the tool solves",
    solutionLabel: "Solution:",
    challenges: [
      { title: "White Takes Ink Too", description: "In DTF, white is printed as a layer of ink, so a halftone designed for white fabric fails on dark fabric.", solution: "A fabric color selector with one clear rule: the fabric color gets no ink and everything else does, white included." },
      { title: "Heavy Images in the Browser", description: "Processing a 300 DPI halftone on a large image freezes the UI if done on the main thread.", solution: "Heavy work is kept apart from rendering, and the preview is computed at lower resolution while you move the controls." },
      { title: "Printing What You See", description: "A halftone that looks great on screen can come out clogged or lose detail once printed.", solution: "Line screen and pattern shape are chosen from real DTF printing references, and the final size is shown in centimeters and pixels." },
      { title: "A Tool for Non-Designers", description: "Most people who print DTF don't master Photoshop or halftone curves.", solution: "A tab-guided flow with sensible defaults and a button to reset everything at any time." },
    ],
    liveTitle: "Try It Live",
    liveDescription: "DTF Studio is live and running. Jump in, upload your design and download your print-ready halftone.",
    liveStat1: "Adjustable halftones",
    liveStat2: "300 DPI PNG",
    liveStat3: "AI background removal",
    liveButton: "Go see it",
    ctaTitle: "Need a custom web tool?",
    ctaText: "I build apps that automate your business's work, from image editors to complete systems",
    ctaContact: "Contact",
    ctaMore: "See more projects",
  },
};

const DtfStudio = () => {
  const { locale } = useRouter();
  const c = content[locale] || content.es;
  const [activeTab, setActiveTab] = useState("app");

  return (
    <Layout>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        keywords={["dtf studio", "semitonos dtf", "impresión dtf", "editor de semitonos", "png 300 dpi", "quitar fondo con ia", "next.js"]}
      />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <span className={styles.badge}>{c.badge}</span>
            <h1 className={styles.heroTitle}>
              {c.heroTitlePre}<span className={styles.gradient}>{c.heroTitleHl}</span>
            </h1>
            <p className={styles.heroDescription}>
              {c.heroDescription}
            </p>
            <div className={styles.heroButtons}>
              <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                {c.btnLive} ↗
              </a>
              <a href="#features" className={styles.btnSecondary}>
                {c.btnFeatures}
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.imageWrapper}>
              <Image
                src={HERO_IMAGE}
                alt="DTF Studio: editor de semitonos para impresión DTF con vista previa sobre tela"
                width={1912}
                height={906}
                className={styles.projectImage}
                priority
              />
              <div className={styles.floatingCard}>
                <div className={styles.cardIcon}>🖨️</div>
                <div>
                  <p className={styles.cardTitle}>{c.cardTitle}</p>
                  <p className={styles.cardText}>{c.cardText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{c.featuresTitle}</h2>
            <p className={styles.sectionSubtitle}>
              {c.featuresSubtitle}
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {c.features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className={styles.techSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{c.techTitle}</h2>
            <p className={styles.sectionSubtitle}>
              {c.techSubtitle}
            </p>
          </div>

          <div className={styles.techTabs}>
            <button
              className={`${styles.tabButton} ${activeTab === "app" ? styles.active : ""}`}
              onClick={() => setActiveTab("app")}
            >
              {c.tabBackend}
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "ai" ? styles.active : ""}`}
              onClick={() => setActiveTab("ai")}
            >
              {c.tabFrontend}
            </button>
          </div>

          <div className={styles.techGrid}>
            {techStack[activeTab].map((tech, index) => (
              <div key={index} className={styles.techCard}>
                <span className={styles.techIcon} style={{ color: tech.color }}>
                  {tech.icon}
                </span>
                <span className={styles.techName}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className={styles.challengesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{c.challengesTitle}</h2>
            <p className={styles.sectionSubtitle}>
              {c.challengesSubtitle}
            </p>
          </div>
          <div className={styles.challengesGrid}>
            {c.challenges.map((challenge, index) => (
              <div key={index} className={styles.challengeCard}>
                <div className={styles.challengeNumber}>{index + 1}</div>
                <h3 className={styles.challengeTitle}>{challenge.title}</h3>
                <p className={styles.challengeDescription}>{challenge.description}</p>
                <div className={styles.solution}>
                  <strong>{c.solutionLabel}</strong> {challenge.solution}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Section */}
      <section className={styles.repoSection}>
        <div className={styles.container}>
          <div className={styles.repoContent}>
            <div className={styles.repoIcon}>
              <span style={{ fontSize: "80px", lineHeight: 1 }}>🖨️</span>
            </div>
            <div className={styles.repoText}>
              <h2 className={styles.repoTitle}>{c.liveTitle}</h2>
              <p className={styles.repoDescription}>
                {c.liveDescription}
              </p>
              <div className={styles.repoStats}>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>🔘</span>
                  <span className={styles.statLabel}>{c.liveStat1}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>📥</span>
                  <span className={styles.statLabel}>{c.liveStat2}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>🪄</span>
                  <span className={styles.statLabel}>{c.liveStat3}</span>
                </div>
              </div>
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoButton}
              >
                {c.liveButton} ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>{c.ctaTitle}</h2>
          <p className={styles.ctaText}>
            {c.ctaText}
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.btnCta}>
              {c.ctaContact}
            </Link>
            <Link href="/proyectos" className={styles.btnCtaSecondary}>
              {c.ctaMore}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['common'])),
    },
  };
}

export default DtfStudio;

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import styles from "../../styles/ProyectoDetalle.module.css";
import SEO from "../../components/SEO";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from "next/router";

// Portada temporal (foto del propio proyecto). Reemplazar por las capturas reales.
const HERO_IMAGE = "/images/proyectos/concesionario/portada.webp";

const content = {
  es: {
    seoTitle: "Página Web para Concesionarios y Alquiler de Autos con 3D | Proyecto",
    seoDescription: "Sitio web premium para concesionarios y rent a car: showroom 3D con Three.js, cambio de color de pintura, inventario filtrable y hero en video. Hecho con Next.js 16.",
    badge: "Proyecto Web · Automotriz",
    heroTitlePre: "Concesionario y Alquiler ",
    heroTitleHl: "de Autos",
    heroDescription: "Experiencia web de alta gama para el sector automotriz. OBSIDIAN es un concesionario de superdeportivos con un showroom 3D donde el cliente gira el auto, cambia el color de la pintura y consulta las especificaciones; y su versión de rent a car de lujo presenta la flota con un hero en video a pantalla completa. Construido con Next.js 16, React Three Fiber, Tailwind CSS v4 y Motion.",
    btnFeatures: "Ver características",
    btnTech: "Stack tecnológico",
    cardTitle: "Showroom 3D",
    cardText: "Three.js en el navegador",
    demoTitle: "El Proyecto en Acción",
    demoSubtitle: "Capturas del sitio funcionando",
    demos: [],
    featuresTitle: "Características Principales",
    featuresSubtitle: "Lo que hace que el cliente se quede mirando el auto",
    features: [
      { icon: "🏎️", title: "Hero 3D Interactivo", description: "Un Ferrari 458 sobre piso reflectante con iluminación de estudio; la cámara responde al movimiento del mouse y al scroll con parallax." },
      { icon: "🎨", title: "Configurador de Pintura", description: "Showroom con Ferrari 458 Italia, Lamborghini Urus y Porsche 911 Carrera 4S que se pueden girar y repintar en vivo con los colores oficiales de cada marca." },
      { icon: "📋", title: "Fichas Técnicas", description: "Potencia, 0–100 km/h, velocidad máxima, motor y precio de cada modelo, todo leído desde una sola fuente de datos tipada." },
      { icon: "🗂️", title: "Inventario Filtrable", description: "Cuadrícula editorial del inventario con filtros por categoría para encontrar rápido el tipo de auto que busca el cliente." },
      { icon: "🎬", title: "Rent a Car con Video", description: "Landing de alquiler de autos de lujo con video a pantalla completa que se mantiene reproduciendo aunque el navegador lo pause o cambie de pestaña." },
      { icon: "📅", title: "Visita Privada", description: "Formulario para agendar una visita al showroom, más secciones de atelier y servicios con contadores animados e imágenes en parallax." },
    ],
    techTitle: "Stack Tecnológico",
    techSubtitle: "Gráficos 3D en tiempo real y un frontend moderno",
    tabBackend: "3D y Animación",
    tabFrontend: "Frontend",
    challengesTitle: "Desafíos y Soluciones",
    challengesSubtitle: "Problemas técnicos resueltos durante el desarrollo",
    solutionLabel: "Solución:",
    challenges: [
      { title: "Modelos 3D Pesados", description: "Los modelos de autos con todo su detalle pesaban demasiado para cargar rápido en una página web, sobre todo en móvil.", solution: "Compresión de los .glb con Draco y un decodificador servido desde el propio sitio, más un preloader que muestra el avance de la carga." },
      { title: "Tres Modelos, Tres Orientaciones", description: "Cada modelo venía de un autor distinto, con su escala y su rotación propias, y no quedaban alineados en el showroom.", solution: "Normalización al cargar: se escala cada auto a un tamaño común y se aplica una rotación de corrección definida en los datos del modelo." },
      { title: "Cambiar el Color sin Romper el Auto", description: "Repintar el modelo afectaba también vidrios, llantas y partes cromadas.", solution: "Solo se modifica el material de la carrocería, identificado por nombre, conservando los reflejos del entorno de estudio." },
      { title: "Video de Fondo que se Detiene", description: "Los navegadores pausan los videos de fondo al cambiar de pestaña o al ahorrar batería, y el hero quedaba congelado.", solution: "Un vigilante que reintenta la reproducción ante cada pausa, al volver a la pestaña y cada segundo, sin bloquear la interfaz." },
    ],
    repoTitle: "Código Fuente",
    repoDescription: "Explora mis proyectos en GitHub. Este incluye las escenas 3D, el modelo de datos de los autos y las secciones del sitio.",
    repoStat1: "Three.js",
    repoStat2: "Next.js 16",
    repoStat3: "Responsive",
    repoButton: "Ver GitHub",
    ctaTitle: "¿Tienes un concesionario o un rent a car?",
    ctaText: "Puedo crear la página web de tu negocio automotriz con showroom 3D, inventario y reservas",
    ctaContact: "Contactar",
    ctaMore: "Ver más proyectos",
  },
  en: {
    seoTitle: "Car Dealership & Car Rental Website with 3D | Project",
    seoDescription: "Premium website for car dealerships and rent a car businesses: 3D showroom with Three.js, live paint changes, filterable inventory and a video hero. Built with Next.js 16.",
    badge: "Web Project · Automotive",
    heroTitlePre: "Car Dealership ",
    heroTitleHl: "& Rental",
    heroDescription: "High-end web experience for the automotive industry. OBSIDIAN is a supercar dealership with a 3D showroom where customers rotate the car, change its paint and check its specs; its luxury rent a car version showcases the fleet with a full-screen video hero. Built with Next.js 16, React Three Fiber, Tailwind CSS v4 and Motion.",
    btnFeatures: "View features",
    btnTech: "Tech stack",
    cardTitle: "3D Showroom",
    cardText: "Three.js in the browser",
    demoTitle: "The Project in Action",
    demoSubtitle: "Screenshots of the live site",
    demos: [],
    featuresTitle: "Key Features",
    featuresSubtitle: "What keeps customers looking at the car",
    features: [
      { icon: "🏎️", title: "Interactive 3D Hero", description: "A Ferrari 458 on a reflective floor with studio lighting; the camera reacts to mouse movement and scroll with parallax." },
      { icon: "🎨", title: "Paint Configurator", description: "Showroom with a Ferrari 458 Italia, Lamborghini Urus and Porsche 911 Carrera 4S that can be rotated and repainted live with each brand's official colors." },
      { icon: "📋", title: "Spec Sheets", description: "Power, 0–100 km/h, top speed, engine and price for each model, all read from a single typed data source." },
      { icon: "🗂️", title: "Filterable Inventory", description: "Editorial inventory grid with category filters so customers quickly find the type of car they want." },
      { icon: "🎬", title: "Rent a Car with Video", description: "Luxury car rental landing page with a full-screen video that keeps playing even when the browser pauses it or the tab changes." },
      { icon: "📅", title: "Private Viewing", description: "Form to book a showroom visit, plus atelier and services sections with animated counters and parallax images." },
    ],
    techTitle: "Tech Stack",
    techSubtitle: "Real-time 3D graphics and a modern frontend",
    tabBackend: "3D & Animation",
    tabFrontend: "Frontend",
    challengesTitle: "Challenges and Solutions",
    challengesSubtitle: "Technical problems solved during development",
    solutionLabel: "Solution:",
    challenges: [
      { title: "Heavy 3D Models", description: "Fully detailed car models were too heavy to load quickly on a web page, especially on mobile.", solution: "Draco-compressed .glb files with a self-hosted decoder, plus a preloader that shows loading progress." },
      { title: "Three Models, Three Orientations", description: "Each model came from a different author with its own scale and rotation, so they didn't line up in the showroom.", solution: "Normalization on load: every car is scaled to a common size and gets a correction rotation defined in the model data." },
      { title: "Repainting Without Breaking the Car", description: "Repainting the model also affected glass, wheels and chrome parts.", solution: "Only the body material, identified by name, is changed, keeping the studio environment reflections." },
      { title: "Background Video Stopping", description: "Browsers pause background videos when switching tabs or saving battery, leaving the hero frozen.", solution: "A watchdog that retries playback after each pause, when the tab becomes visible again and every second, without blocking the UI." },
    ],
    repoTitle: "Source Code",
    repoDescription: "Explore my projects on GitHub. This one includes the 3D scenes, the car data model and the site sections.",
    repoStat1: "Three.js",
    repoStat2: "Next.js 16",
    repoStat3: "Responsive",
    repoButton: "View GitHub",
    ctaTitle: "Do you run a car dealership or rental business?",
    ctaText: "I can build your automotive business website with a 3D showroom, inventory and bookings",
    ctaContact: "Contact",
    ctaMore: "See more projects",
  },
};

const ConcesionarioAlquilerAutos = () => {
  const { locale } = useRouter();
  const c = content[locale] || content.es;
  const [activeTab, setActiveTab] = useState("graphics");

  const techStack = {
    graphics: [
      { name: "Three.js", icon: "🧊", color: "#049EF4" },
      { name: "React Three Fiber", icon: "⚛️", color: "#61DAFB" },
      { name: "Drei", icon: "🛠️", color: "#8E44AD" },
      { name: "Draco (GLB)", icon: "🗜️", color: "#27AE60" },
      { name: "Motion", icon: "🎞️", color: "#FF0055" },
      { name: "Lenis", icon: "🌀", color: "#333333" },
    ],
    frontend: [
      { name: "Next.js 16", icon: "▲", color: "#000000" },
      { name: "React 19", icon: "⚛️", color: "#61DAFB" },
      { name: "TypeScript", icon: "📘", color: "#3178C6" },
      { name: "Tailwind CSS v4", icon: "🎨", color: "#06B6D4" },
      { name: "CSS Modules", icon: "🧩", color: "#1572B6" },
    ],
  };

  return (
    <Layout>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        keywords={["página web concesionario", "página web alquiler de autos", "rent a car", "showroom 3d", "three.js", "next.js", "diseño web automotriz"]}
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
              <a href="#features" className={styles.btnPrimary}>
                {c.btnFeatures}
              </a>
              <a href="#tech" className={styles.btnSecondary}>
                {c.btnTech}
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.imageWrapper}>
              <Image
                src={HERO_IMAGE}
                alt="Página web para concesionario de autos con showroom 3D"
                width={1200}
                height={800}
                className={styles.projectImage}
                priority
              />
              <div className={styles.floatingCard}>
                <div className={styles.cardIcon}>🏁</div>
                <div>
                  <p className={styles.cardTitle}>{c.cardTitle}</p>
                  <p className={styles.cardText}>{c.cardText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section: se muestra cuando haya capturas en `demos` */}
      {c.demos.length > 0 && (
        <section id="demo" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{c.demoTitle}</h2>
              <p className={styles.sectionSubtitle}>{c.demoSubtitle}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
              {c.demos.map((demo) => (
                <figure
                  key={demo.src}
                  style={{ margin: 0, background: "#11111f", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <Image
                    src={demo.src}
                    alt={demo.alt}
                    width={demo.width}
                    height={demo.height}
                    sizes="(max-width: 700px) 100vw, 380px"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <figcaption style={{ padding: "16px 18px 20px" }}>
                    <strong style={{ display: "block", color: "#fff", marginBottom: "4px" }}>{demo.title}</strong>
                    <span style={{ color: "#cbd5e1", fontSize: "0.92rem", lineHeight: 1.6 }}>{demo.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

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
              className={`${styles.tabButton} ${activeTab === "graphics" ? styles.active : ""}`}
              onClick={() => setActiveTab("graphics")}
            >
              {c.tabBackend}
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "frontend" ? styles.active : ""}`}
              onClick={() => setActiveTab("frontend")}
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

      {/* Repository Section */}
      <section className={styles.repoSection}>
        <div className={styles.container}>
          <div className={styles.repoContent}>
            <div className={styles.repoIcon}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
              </svg>
            </div>
            <div className={styles.repoText}>
              <h2 className={styles.repoTitle}>{c.repoTitle}</h2>
              <p className={styles.repoDescription}>
                {c.repoDescription}
              </p>
              <div className={styles.repoStats}>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>🧊</span>
                  <span className={styles.statLabel}>{c.repoStat1}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>▲</span>
                  <span className={styles.statLabel}>{c.repoStat2}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>📱</span>
                  <span className={styles.statLabel}>{c.repoStat3}</span>
                </div>
              </div>
              <a
                href="https://github.com/juancamilosalazarrestrepo"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoButton}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                {c.repoButton}
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

export default ConcesionarioAlquilerAutos;

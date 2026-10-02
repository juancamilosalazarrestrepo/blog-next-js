import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import styles from "../../styles/ProyectoDetalle.module.css";
import SEO from "../../components/SEO";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from "next/router";

// Portada temporal (arte conceptual del juego). Reemplazar por capturas del gameplay.
const HERO_IMAGE = "/images/proyectos/oakhaven/portada.webp";

const content = {
  es: {
    seoTitle: "Oakhaven: Videojuego 2D Estilo Bloodborne en Unity | Proyecto",
    seoDescription: "Videojuego 2D de acción gótica estilo Bloodborne y metroidvania, hecho en Unity 6: combate con espada y pistola, esquiva, progresión estilo Elden Ring y cooperativo local.",
    badge: "Videojuego · Unity 6",
    heroTitlePre: "Oakhaven: Videojuego 2D ",
    heroTitleHl: "estilo Bloodborne",
    heroDescription: "Videojuego de acción 2D gótico-industrial inspirado en Bloodborne y en los metroidvania como Blasphemous. Eres un Sepulturero que recorre Oakhaven, una ciudad victoriana hundida en una noche eterna, enfrentando licántropos de hollín y vampiros aristócratas con espada en una mano y pistola en la otra. Desarrollado en Unity 6 con C#.",
    btnFeatures: "Ver características",
    btnTech: "Stack tecnológico",
    cardTitle: "Acción Gótica 2D",
    cardText: "Soulslike · Metroidvania",
    demoTitle: "Arte del Juego",
    demoSubtitle: "Hojas de concepto y sprites de los enemigos y del mundo de Oakhaven",
    demos: [
      { src: "/images/proyectos/oakhaven/arte-mundo.webp", width: 1200, height: 655, title: "El mundo de Oakhaven", caption: "Distritos, monstruos, el Sepulturero, armas y secuencias de storyboard.", alt: "Hoja de arte conceptual del mundo de Oakhaven: distritos, monstruos y armas" },
      { src: "/images/proyectos/oakhaven/arte-relojero.webp", width: 1200, height: 670, title: "El Relojero Corrupto", caption: "Concepto, animación de reposo, ataques y ciclo de caminata del enemigo.", alt: "Hoja de sprites del enemigo El Relojero Corrupto" },
      { src: "/images/proyectos/oakhaven/arte-taxidermista.webp", width: 1200, height: 670, title: "El Taxidermista Dorado", caption: "Ataque con garra, rociado con jeringa y efectos visuales.", alt: "Hoja de sprites del enemigo El Taxidermista Dorado" },
    ],
    featuresTitle: "Características Principales",
    featuresSubtitle: "Los sistemas que hacen que se sienta como un soulslike",
    features: [
      { icon: "⚔️", title: "Combate con Espada y Pistola", description: "Ataques cuerpo a cuerpo con estoques y machetes mecánicos, y disparo con la mano secundaria para interrumpir y romper la guardia del enemigo." },
      { icon: "💨", title: "Esquiva y Magia", description: "Esquiva con ventana de invulnerabilidad y tónicos alquímicos que potencian al personaje a costa de su cordura." },
      { icon: "📈", title: "Progresión Estilo Elden Ring", description: "Seis atributos, nivel que se sube con Ecos de Óleo en los Faroles de Vigilia y armas que se mejoran de +0 a +10." },
      { icon: "🗺️", title: "Mundo Metroidvania", description: "Diez regiones interconectadas en forma de cruz, con atajos, hogueras que guardan la partida y fuentes para viajar rápido." },
      { icon: "🎮", title: "Cooperativo Local", description: "Dos jugadores en la misma pantalla, cada uno con su HUD, su personaje y su mando o mitad del teclado, con cámara compartida." },
      { icon: "💬", title: "Lore y Diálogos", description: "Una biblia de lore propia, NPCs con los que se puede hablar, enemigos con frase de presentación y jefes con su barra de vida." },
    ],
    techTitle: "Stack Tecnológico",
    techSubtitle: "Motor, lenguaje y herramientas del juego",
    tabBackend: "Motor y Código",
    tabFrontend: "Arte y Diseño",
    challengesTitle: "Desafíos y Soluciones",
    challengesSubtitle: "Problemas técnicos resueltos durante el desarrollo",
    solutionLabel: "Solución:",
    challenges: [
      { title: "Un Mapa Grande sin Cargas Eternas", description: "Un mundo metroidvania en una sola escena es lento de editar y pesa en memoria; una escena por sala serían cientos de escenas.", solution: "Diseño híbrido: una escena por región dividida en salas, con la cámara que se encaja en cada sala y cargas solo al cruzar entre regiones." },
      { title: "Daño Justo y Balanceable", description: "El daño tenía que depender del arma, su nivel de mejora, los atributos y la defensa del enemigo sin volverse imposible de ajustar.", solution: "Un núcleo de cálculo en C# puro con las fórmulas de Elden Ring y los valores en un ScriptableObject de ajuste, cubierto con tests." },
      { title: "Dos Jugadores en la Misma Pantalla", description: "Todo el juego asumía un único jugador: entradas, enemigos, recogibles y la cámara.", solution: "Un registro de jugadores locales con mapas de entrada por jugador; enemigos, objetos y eventos ahora manejan varios jugadores." },
      { title: "Construir Niveles a Mano Era Lento", description: "Armar cada nivel y cada personaje en el editor tomaba demasiado tiempo y era fácil equivocarse.", solution: "Builders por código en el editor de Unity que generan regiones, personajes y menús a partir de definiciones." },
    ],
    repoTitle: "Código Fuente",
    repoDescription: "Explora mis proyectos en GitHub. Este incluye los sistemas de combate, progresión, multijugador local y los builders de niveles.",
    repoStat1: "Unity 6",
    repoStat2: "C#",
    repoStat3: "Co-op local",
    repoButton: "Ver GitHub",
    ctaTitle: "¿Tienes la idea de un videojuego?",
    ctaText: "Puedo ayudarte a llevarla a Unity: mecánicas, sistemas de progresión y prototipos jugables",
    ctaContact: "Contactar",
    ctaMore: "Ver más proyectos",
  },
  en: {
    seoTitle: "Oakhaven: Bloodborne-Style 2D Video Game in Unity | Project",
    seoDescription: "Gothic 2D action game in the style of Bloodborne and metroidvanias, made in Unity 6: sword and pistol combat, dodging, Elden Ring-style progression and local co-op.",
    badge: "Video Game · Unity 6",
    heroTitlePre: "Oakhaven: 2D Game ",
    heroTitleHl: "Bloodborne-Style",
    heroDescription: "Gothic-industrial 2D action game inspired by Bloodborne and metroidvanias like Blasphemous. You are a Gravewarden roaming Oakhaven, a Victorian city sunk into an endless night, fighting soot lycans and aristocratic vampires with a sword in one hand and a pistol in the other. Developed in Unity 6 with C#.",
    btnFeatures: "View features",
    btnTech: "Tech stack",
    cardTitle: "Gothic 2D Action",
    cardText: "Soulslike · Metroidvania",
    demoTitle: "Game Art",
    demoSubtitle: "Concept and sprite sheets for Oakhaven's enemies and world",
    demos: [
      { src: "/images/proyectos/oakhaven/arte-mundo.webp", width: 1200, height: 655, title: "The world of Oakhaven", caption: "Districts, monsters, the Gravewarden, weapons and storyboard sequences.", alt: "Oakhaven world concept art sheet: districts, monsters and weapons" },
      { src: "/images/proyectos/oakhaven/arte-relojero.webp", width: 1200, height: 670, title: "The Corrupted Clockmaker", caption: "Concept, idle animation, attacks and walk cycle for the enemy.", alt: "Sprite sheet for the Corrupted Clockmaker enemy" },
      { src: "/images/proyectos/oakhaven/arte-taxidermista.webp", width: 1200, height: 670, title: "The Gilded Taxidermist", caption: "Talon strike, syringe spray and visual effects.", alt: "Sprite sheet for the Gilded Taxidermist enemy" },
    ],
    featuresTitle: "Key Features",
    featuresSubtitle: "The systems that make it feel like a soulslike",
    features: [
      { icon: "⚔️", title: "Sword and Pistol Combat", description: "Melee attacks with rapiers and mechanical machetes, plus off-hand gunfire to interrupt enemies and break their guard." },
      { icon: "💨", title: "Dodge and Magic", description: "Dodge with an invulnerability window and alchemical tonics that empower the character at the cost of sanity." },
      { icon: "📈", title: "Elden Ring-Style Progression", description: "Six attributes, levels bought with Void-Oil Echoes at Vigil Lanterns and weapons upgraded from +0 to +10." },
      { icon: "🗺️", title: "Metroidvania World", description: "Ten interconnected regions laid out as a cross, with shortcuts, save bonfires and fountains for fast travel." },
      { icon: "🎮", title: "Local Co-op", description: "Two players on the same screen, each with their own HUD, character and gamepad or half of the keyboard, with a shared camera." },
      { icon: "💬", title: "Lore and Dialogue", description: "An original lore bible, NPCs you can talk to, enemies with intro lines and bosses with their own health bar." },
    ],
    techTitle: "Tech Stack",
    techSubtitle: "Engine, language and game tools",
    tabBackend: "Engine & Code",
    tabFrontend: "Art & Design",
    challengesTitle: "Challenges and Solutions",
    challengesSubtitle: "Technical problems solved during development",
    solutionLabel: "Solution:",
    challenges: [
      { title: "A Big Map Without Endless Loading", description: "A metroidvania world in a single scene is slow to edit and heavy on memory; one scene per room would mean hundreds of scenes.", solution: "Hybrid design: one scene per region split into rooms, with the camera snapping to each room and loading only when crossing between regions." },
      { title: "Fair, Tunable Damage", description: "Damage had to depend on the weapon, its upgrade level, the attributes and the enemy's defense without becoming impossible to tune.", solution: "A pure C# calculation core using Elden Ring's formulas, with values in a tuning ScriptableObject and covered by tests." },
      { title: "Two Players on One Screen", description: "The whole game assumed a single player: input, enemies, pickups and the camera.", solution: "A local player registry with per-player input maps; enemies, items and events now handle several players." },
      { title: "Building Levels by Hand Was Slow", description: "Assembling every level and character in the editor took too long and was error-prone.", solution: "Code-driven builders in the Unity editor that generate regions, characters and menus from definitions." },
    ],
    repoTitle: "Source Code",
    repoDescription: "Explore my projects on GitHub. This one includes the combat, progression and local multiplayer systems plus the level builders.",
    repoStat1: "Unity 6",
    repoStat2: "C#",
    repoStat3: "Local co-op",
    repoButton: "View GitHub",
    ctaTitle: "Do you have a video game idea?",
    ctaText: "I can help you bring it to Unity: mechanics, progression systems and playable prototypes",
    ctaContact: "Contact",
    ctaMore: "See more projects",
  },
};

const OakhavenVideojuego = () => {
  const { locale } = useRouter();
  const c = content[locale] || content.es;
  const [activeTab, setActiveTab] = useState("engine");

  const techStack = {
    engine: [
      { name: "Unity 6", icon: "🎮", color: "#222222" },
      { name: "C#", icon: "#️⃣", color: "#68217A" },
      { name: "URP 2D", icon: "💡", color: "#F39C12" },
      { name: "Input System", icon: "🕹️", color: "#2980B9" },
      { name: "Cinemachine", icon: "🎥", color: "#16A085" },
      { name: "Unity Test Framework", icon: "✅", color: "#27AE60" },
    ],
    art: [
      { name: "Sprites 2D", icon: "🖼️", color: "#C0392B" },
      { name: "Tilemaps", icon: "🧱", color: "#7F8C8D" },
      { name: "Shaders", icon: "✨", color: "#8E44AD" },
      { name: "Arte con IA", icon: "🤖", color: "#E67E22" },
      { name: "Lore y Guion", icon: "📜", color: "#8D6E63" },
    ],
  };

  return (
    <Layout>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        keywords={["videojuego 2d", "juego estilo bloodborne", "metroidvania", "soulslike 2d", "unity", "desarrollo de videojuegos", "c#"]}
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
                alt="Oakhaven, videojuego 2D de acción gótica estilo Bloodborne"
                width={1200}
                height={800}
                className={styles.projectImage}
                priority
              />
              <div className={styles.floatingCard}>
                <div className={styles.cardIcon}>🗡️</div>
                <div>
                  <p className={styles.cardTitle}>{c.cardTitle}</p>
                  <p className={styles.cardText}>{c.cardText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
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
              className={`${styles.tabButton} ${activeTab === "engine" ? styles.active : ""}`}
              onClick={() => setActiveTab("engine")}
            >
              {c.tabBackend}
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "art" ? styles.active : ""}`}
              onClick={() => setActiveTab("art")}
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
                  <span className={styles.statIcon}>🎮</span>
                  <span className={styles.statLabel}>{c.repoStat1}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>#️⃣</span>
                  <span className={styles.statLabel}>{c.repoStat2}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>👥</span>
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

export default OakhavenVideojuego;

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import styles from "../../styles/ProyectoDetalle.module.css";
import SEO from "../../components/SEO";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from "next/router";

// Portada temporal. Reemplazar por las capturas reales de la app.
const HERO_IMAGE = "/images/proyectos/rimas/portada.webp";

const techStack = {
  engine: [
    { name: "Next.js 16", icon: "▲", color: "#000000" },
    { name: "React 19", icon: "⚛️", color: "#61DAFB" },
    { name: "TypeScript", icon: "📘", color: "#3178C6" },
    { name: "Supabase", icon: "🟢", color: "#3ECF8E" },
    { name: "TanStack Virtual", icon: "📜", color: "#FF4154" },
    { name: "Vitest", icon: "✅", color: "#6E9F18" },
  ],
  ai: [
    { name: "Claude API", icon: "🧠", color: "#D97757" },
    { name: "Gemini API", icon: "✨", color: "#4285F4" },
    { name: "Zod", icon: "🛡️", color: "#3068B7" },
    { name: "Hunspell (léxico)", icon: "📚", color: "#8D6E63" },
    { name: "Motor fonético propio", icon: "🔤", color: "#8E44AD" },
  ],
};

const content = {
  es: {
    seoTitle: "Diccionario de Rimas y Asistente de Composición en Español | Proyecto",
    seoDescription: "Diccionario de rimas en español para freestyle y asistente de composición de letras: rimas consonantes y asonantes, conteo de sílabas con sinalefa y esquema de rima automático.",
    badge: "Proyecto Web · Herramienta para Músicos",
    heroTitlePre: "Diccionario de Rimas y ",
    heroTitleHl: "Asistente de Composición",
    heroDescription: "Herramienta para escribir y entrenar freestyle en español. Buscas una palabra y te devuelve sus rimas consonantes y asonantes agrupadas por terminación entre más de 645.000 palabras; armas tu propio tablero de terminaciones; y escribes la letra en un editor que cuenta las sílabas de cada verso, marca el esquema de rima y te sugiere rimas para la palabra donde está el cursor. Hecho con Next.js, TypeScript, Supabase y la API de Claude o Gemini.",
    btnFeatures: "Ver características",
    btnTech: "Stack tecnológico",
    cardTitle: "645k Palabras",
    cardText: "Rimas en 38 ms",
    demoTitle: "La App en Acción",
    demoSubtitle: "Capturas de la app funcionando",
    demos: [],
    featuresTitle: "Características Principales",
    featuresSubtitle: "Todo lo que necesitas para escribir una letra que rime",
    features: [
      { icon: "🔎", title: "Buscador de Rimas", description: "Escribes una palabra y obtienes solo las terminaciones que riman con ella, con filtros por tipo de rima, sílabas, acentuación y categoría gramatical." },
      { icon: "🗂️", title: "Mi Tablero", description: "Columnas con las terminaciones que más usas, donde puedes agregar palabras a mano, incluso licencias poéticas que no riman en sentido estricto." },
      { icon: "✍️", title: "Compositor de Letras", description: "Editor que cuenta las sílabas de cada verso con sinalefa, para comparar el flow entre líneas, y resalta las palabras que repites." },
      { icon: "🔁", title: "Esquema de Rima Automático", description: "Cada verso recibe su letra (A, B, A, B…) según cómo termina de verdad, y el panel de rimas sigue la palabra donde tienes el cursor." },
      { icon: "🤖", title: "Ingesta de Letras con IA", description: "Pegas la letra de una canción y Claude o Gemini extraen vocabulario nuevo y pares de rima reales, que tú apruebas antes de que entren al diccionario." },
      { icon: "📚", title: "Catálogo Completo", description: "Todas las familias de rima del español en una vista virtualizada que se desplaza con fluidez aunque tenga cientos de miles de palabras." },
    ],
    techTitle: "Stack Tecnológico",
    techSubtitle: "Un motor fonético propio sobre un stack web moderno",
    tabBackend: "App y Datos",
    tabFrontend: "IA y Fonética",
    challengesTitle: "Desafíos y Soluciones",
    challengesSubtitle: "Problemas técnicos resueltos durante el desarrollo",
    solutionLabel: "Solución:",
    challenges: [
      { title: "Un Motor Fonético del Español", description: "Para saber si dos palabras riman hay que transcribirlas, separarlas en sílabas y encontrar la tónica; un error ahí da resultados creíbles pero falsos.", solution: "Un paquete TypeScript puro, sin dependencias y desarrollado con TDD, con seseo latinoamericano para que «casa» y «caza» rimen como en el freestyle." },
      { title: "Búsqueda Lenta", description: "Buscar rimas en cientos de miles de palabras tardaba 1,7 segundos y la base gratuita se pausaba sola, dejando la búsqueda caída.", solution: "Primero índices compuestos que la bajaron a 38 ms; después, un índice estático particionado que no depende de la base de datos." },
      { title: "La IA Puede Inventar", description: "Si la IA analiza mal dos o tres letras, llena el diccionario de palabras y rimas inventadas sin que nadie lo note.", solution: "La IA propone y el usuario aprueba: cada hallazgo pasa por una compuerta de revisión y la salida se valida con un esquema Zod." },
      { title: "Contar Sílabas como un Músico", description: "En una canción las vocales entre palabras se funden (sinalefa), así que el conteo gramatical no sirve para medir el flow.", solution: "Conteo por verso que aplica la sinalefa entre palabras e ignora números y símbolos, cubierto con tests." },
    ],
    repoTitle: "Código Fuente",
    repoDescription: "Explora mis proyectos en GitHub. Este incluye el motor fonético, el índice de rimas, el compositor y la ingesta con IA.",
    repoStat1: "Motor fonético",
    repoStat2: "Búsqueda en 38 ms",
    repoStat3: "Claude y Gemini",
    repoButton: "Ver GitHub",
    ctaTitle: "¿Necesitas una herramienta a medida con IA?",
    ctaText: "Puedo crear aplicaciones web que procesan lenguaje y usan IA para resolver problemas concretos",
    ctaContact: "Contactar",
    ctaMore: "Ver más proyectos",
  },
  en: {
    seoTitle: "Spanish Rhyme Dictionary and Songwriting Assistant | Project",
    seoDescription: "Spanish rhyme dictionary for freestyle and a lyric-writing assistant: perfect and assonant rhymes, syllable counting with synalepha and automatic rhyme scheme.",
    badge: "Web Project · Tool for Musicians",
    heroTitlePre: "Rhyme Dictionary & ",
    heroTitleHl: "Songwriting Assistant",
    heroDescription: "A tool for writing and practicing freestyle in Spanish. Type a word and get its perfect and assonant rhymes grouped by ending across more than 645,000 words; build your own board of endings; and write lyrics in an editor that counts each line's syllables, marks the rhyme scheme and suggests rhymes for the word under the cursor. Built with Next.js, TypeScript, Supabase and the Claude or Gemini API.",
    btnFeatures: "View features",
    btnTech: "Tech stack",
    cardTitle: "645k Words",
    cardText: "Rhymes in 38 ms",
    demoTitle: "The App in Action",
    demoSubtitle: "Screenshots of the running app",
    demos: [],
    featuresTitle: "Key Features",
    featuresSubtitle: "Everything you need to write lyrics that rhyme",
    features: [
      { icon: "🔎", title: "Rhyme Finder", description: "Type a word and get only the endings that rhyme with it, with filters for rhyme type, syllables, stress and part of speech." },
      { icon: "🗂️", title: "My Board", description: "Columns with the endings you use most, where you can add words by hand, even poetic licenses that don't strictly rhyme." },
      { icon: "✍️", title: "Lyric Composer", description: "An editor that counts each line's syllables with synalepha to compare the flow between lines, and highlights repeated words." },
      { icon: "🔁", title: "Automatic Rhyme Scheme", description: "Each line gets its letter (A, B, A, B…) based on how it actually ends, and the rhyme panel follows the word under your cursor." },
      { icon: "🤖", title: "AI Lyric Ingestion", description: "Paste a song's lyrics and Claude or Gemini extract new vocabulary and real rhyme pairs, which you approve before they enter the dictionary." },
      { icon: "📚", title: "Full Catalog", description: "Every Spanish rhyme family in a virtualized view that scrolls smoothly even with hundreds of thousands of words." },
    ],
    techTitle: "Tech Stack",
    techSubtitle: "A custom phonetic engine on a modern web stack",
    tabBackend: "App & Data",
    tabFrontend: "AI & Phonetics",
    challengesTitle: "Challenges and Solutions",
    challengesSubtitle: "Technical problems solved during development",
    solutionLabel: "Solution:",
    challenges: [
      { title: "A Spanish Phonetic Engine", description: "Knowing whether two words rhyme requires transcribing them, splitting them into syllables and finding the stressed one; a bug there gives believable but wrong results.", solution: "A pure TypeScript package with no dependencies, built with TDD, using Latin American seseo so «casa» and «caza» rhyme the way they do in freestyle." },
      { title: "Slow Search", description: "Searching rhymes across hundreds of thousands of words took 1.7 seconds, and the free database paused itself, taking search down.", solution: "First, composite indexes that brought it down to 38 ms; then a partitioned static index that doesn't depend on the database." },
      { title: "AI Can Make Things Up", description: "If the AI misreads two or three lyrics, it fills the dictionary with invented words and rhymes without anyone noticing.", solution: "The AI proposes and the user approves: every finding goes through a review gate and the output is validated with a Zod schema." },
      { title: "Counting Syllables Like a Musician", description: "In a song, vowels between words merge (synalepha), so the grammatical count doesn't measure flow.", solution: "Per-line counting that applies synalepha between words and ignores numbers and symbols, covered by tests." },
    ],
    repoTitle: "Source Code",
    repoDescription: "Explore my projects on GitHub. This one includes the phonetic engine, the rhyme index, the composer and the AI ingestion.",
    repoStat1: "Phonetic engine",
    repoStat2: "38 ms search",
    repoStat3: "Claude & Gemini",
    repoButton: "View GitHub",
    ctaTitle: "Need a custom AI-powered tool?",
    ctaText: "I can build web apps that process language and use AI to solve concrete problems",
    ctaContact: "Contact",
    ctaMore: "See more projects",
  },
};

const DiccionarioRimasCompositor = () => {
  const { locale } = useRouter();
  const c = content[locale] || content.es;
  const [activeTab, setActiveTab] = useState("engine");

  return (
    <Layout>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        keywords={["diccionario de rimas", "rimas en español", "freestyle", "asistente de composición", "escribir canciones", "contador de sílabas", "next.js"]}
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
                alt="Rimas: diccionario de rimas y asistente de composición de letras"
                width={1200}
                height={800}
                className={styles.projectImage}
                priority
              />
              <div className={styles.floatingCard}>
                <div className={styles.cardIcon}>🎤</div>
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
                  <span className={styles.statIcon}>🔤</span>
                  <span className={styles.statLabel}>{c.repoStat1}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>⚡</span>
                  <span className={styles.statLabel}>{c.repoStat2}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>🤖</span>
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

export default DiccionarioRimasCompositor;

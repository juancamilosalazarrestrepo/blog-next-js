import Layout from '../../components/Layout';
import styles from '../../styles/NiceGradient.module.css';
import Link from 'next/link';
import SEO from '../../components/SEO';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

const content = {
  es: {
    seoTitle: "Nice Gradient - Generador de Gradientes con IA | Juan Camilo Salazar",
    seoDescription: "Herramienta profesional de gradientes impulsada por Inteligencia Artificial. Genera gradientes únicos, explora +500 gradientes curados, editor visual avanzado y exportación CSS/PNG.",
    heroDescription: "Generador de gradientes impulsado por Inteligencia Artificial que combina creatividad y tecnología para crear gradientes únicos. Una plataforma completa con colección curada de gradientes hermosos, descarga de código CSS y exportación de imágenes PNG.",
    badgeAI: "Inteligencia Artificial",
    btnDemo: "Ver Demo",
    btnSource: "Código Fuente",
    featuresTitle: "Características Principales",
    featuresSubtitle: "Una herramienta completa para diseñadores y desarrolladores",
    features: [
      { icon: "🤖", title: "Generación por IA", text: "Utiliza inteligencia artificial avanzada para generar gradientes únicos basados en prompts descriptivos y preferencias de color." },
      { icon: "🎨", title: "Colección Curada", text: "Biblioteca de más de 500 gradientes hermosos, organizados por categorías y tendencias de diseño actuales." },
      { icon: "📥", title: "Descarga CSS/PNG", text: "Exporta gradientes como código CSS listo para usar o como imágenes PNG de alta calidad para tus proyectos." },
      { icon: "🎯", title: "Personalización Avanzada", text: "Editor visual con controles precisos para ángulos, colores, opacidad y tipos de gradiente (lineal, radial, cónico)." },
      { icon: "💾", title: "Favoritos y Historial", text: "Guarda tus gradientes favoritos y accede al historial de creaciones para facilitar la reutilización." },
      { icon: "📱", title: "Responsive Design", text: "Interfaz completamente responsiva que funciona perfectamente en desktop, tablet y móvil." },
    ],
    techTitle: "Stack Tecnológico",
    techSubtitle: "Tecnologías modernas para máximo rendimiento",
    techFrontend: "Frontend",
    techBackend: "Backend & IA",
    techItems: {
      next: "App Router, Server Components, SSR",
      react: "Hooks, Context API, Suspense",
      tailwind: "Utility-first, responsive design",
      ts: "Type safety, mejor DX",
      openai: "GPT-4 para generación inteligente",
      vercelai: "Streaming, edge functions",
      supabase: "Database, Auth, Storage",
      edge: "Respuestas ultra-rápidas",
    },
    modulesTitle: "Módulos y Funcionalidades",
    modulesSubtitle: "Arquitectura modular para máxima escalabilidad",
    modules: [
      { icon: "🧠", title: "AI Generator Engine", text: "Motor de generación inteligente que interpreta prompts de texto y genera gradientes únicos utilizando algoritmos de ML.", features: ["Procesamiento de lenguaje natural", "Análisis de paletas de color", "Generación contextual", "Refinamiento iterativo"] },
      { icon: "🎨", title: "Visual Editor", text: "Editor visual interactivo con controles en tiempo real para ajustar todos los aspectos del gradiente.", features: ["Color picker avanzado", "Control de ángulos", "Stops personalizables", "Vista previa en vivo"] },
      { icon: "📚", title: "Gradient Library", text: "Sistema de gestión de biblioteca con categorización, búsqueda y filtros para encontrar el gradiente perfecto.", features: ["Categorización automática", "Búsqueda por color dominante", "Filtros por tipo y estilo", "Trending gradients"] },
      { icon: "⬇️", title: "Export System", text: "Sistema de exportación que genera código CSS optimizado e imágenes PNG de alta calidad.", features: ["CSS con prefijos vendor", "PNG en múltiples resoluciones", "SVG para vectores", "Formatos para diferentes frameworks"] },
      { icon: "👤", title: "User Management", text: "Sistema completo de usuarios con autenticación, perfiles y gestión de contenido personalizado.", features: ["Auth con múltiples providers", "Favoritos personalizados", "Historial de creaciones", "Colecciones privadas"] },
      { icon: "📊", title: "Analytics Dashboard", text: "Panel de analytics para monitorear uso, gradientes populares y métricas de engagement.", features: ["Métricas de uso en tiempo real", "Gradientes más populares", "Analytics de generación por IA", "Reportes de performance"] },
    ],
    challengesTitle: "Desafíos Técnicos Resueltos",
    challengesSubtitle: "Soluciones innovadoras a problemas complejos",
    challengeLabel: "Desafío:",
    solutionLabel: "Solución:",
    challenges: [
      { num: "01", title: "Optimización de Generación por IA", challenge: "Generar gradientes de alta calidad en tiempo real sin comprometer la experiencia del usuario.", solution: "Implementación de streaming responses con Vercel AI SDK, cache inteligente y generación en Edge Functions para latencia mínima." },
      { num: "02", title: "Performance del Color Picker", challenge: "Mantener 60fps en el editor visual mientras se actualizan múltiples gradientes en tiempo real.", solution: "Debouncing inteligente, virtualización de componentes y uso de Web Workers para cálculos pesados de color." },
      { num: "03", title: "Calidad de Exportación", challenge: "Generar imágenes PNG de alta calidad que mantengan la fidelidad del gradiente CSS.", solution: "Canvas API optimizado con anti-aliasing, algoritmos de interpolación suave y soporte para HDR colors." },
      { num: "04", title: "Escalabilidad de la Biblioteca", challenge: "Manejar miles de gradientes con búsqueda y filtrado instantáneo.", solution: "Indexación full-text con Supabase, paginación infinita con React Query y algoritmos de clustering por similitud de color." },
    ],
    repoTitle: "Código Fuente",
    repoDescription: "Proyecto open-source construido con Next.js 14, TypeScript, Tailwind CSS e integración con OpenAI. Incluye documentación completa, tests automatizados y guías de contribución.",
    repoStat1: "234 Stars",
    repoStat3: "MIT License",
    repoSeeCode: "Ver Código",
    repoSeeDemo: "Ver Demo",
    ctaTitle: "¿Te interesa el proyecto?",
    ctaText: "Explora Nice Gradient y descubre cómo la inteligencia artificial puede potenciar tu flujo de trabajo de diseño.",
    ctaPrimary: "Probar Nice Gradient",
    ctaSecondary: "Ver Más Proyectos",
  },
  en: {
    seoTitle: "Nice Gradient - AI-Powered Gradient Generator | Juan Camilo Salazar",
    seoDescription: "Professional AI-powered gradient tool. Generate unique gradients, explore 500+ curated gradients, advanced visual editor and CSS/PNG export.",
    heroDescription: "An AI-powered gradient generator that combines creativity and technology to create unique gradients. A complete platform with a curated collection of beautiful gradients, CSS code download and PNG image export.",
    badgeAI: "Artificial Intelligence",
    btnDemo: "View Demo",
    btnSource: "Source Code",
    featuresTitle: "Key Features",
    featuresSubtitle: "A complete tool for designers and developers",
    features: [
      { icon: "🤖", title: "AI Generation", text: "Uses advanced artificial intelligence to generate unique gradients based on descriptive prompts and color preferences." },
      { icon: "🎨", title: "Curated Collection", text: "Library of over 500 beautiful gradients, organized by categories and current design trends." },
      { icon: "📥", title: "CSS/PNG Download", text: "Export gradients as ready-to-use CSS code or as high-quality PNG images for your projects." },
      { icon: "🎯", title: "Advanced Customization", text: "Visual editor with precise controls for angles, colors, opacity and gradient types (linear, radial, conic)." },
      { icon: "💾", title: "Favorites and History", text: "Save your favorite gradients and access your creation history to make reuse easier." },
      { icon: "📱", title: "Responsive Design", text: "Fully responsive interface that works perfectly on desktop, tablet and mobile." },
    ],
    techTitle: "Tech Stack",
    techSubtitle: "Modern technologies for maximum performance",
    techFrontend: "Frontend",
    techBackend: "Backend & AI",
    techItems: {
      next: "App Router, Server Components, SSR",
      react: "Hooks, Context API, Suspense",
      tailwind: "Utility-first, responsive design",
      ts: "Type safety, better DX",
      openai: "GPT-4 for intelligent generation",
      vercelai: "Streaming, edge functions",
      supabase: "Database, Auth, Storage",
      edge: "Ultra-fast responses",
    },
    modulesTitle: "Modules and Features",
    modulesSubtitle: "Modular architecture for maximum scalability",
    modules: [
      { icon: "🧠", title: "AI Generator Engine", text: "Intelligent generation engine that interprets text prompts and creates unique gradients using ML algorithms.", features: ["Natural language processing", "Color palette analysis", "Contextual generation", "Iterative refinement"] },
      { icon: "🎨", title: "Visual Editor", text: "Interactive visual editor with real-time controls to adjust every aspect of the gradient.", features: ["Advanced color picker", "Angle control", "Customizable stops", "Live preview"] },
      { icon: "📚", title: "Gradient Library", text: "Library management system with categorization, search and filters to find the perfect gradient.", features: ["Automatic categorization", "Search by dominant color", "Filters by type and style", "Trending gradients"] },
      { icon: "⬇️", title: "Export System", text: "Export system that generates optimized CSS code and high-quality PNG images.", features: ["CSS with vendor prefixes", "PNG in multiple resolutions", "SVG for vectors", "Formats for different frameworks"] },
      { icon: "👤", title: "User Management", text: "Complete user system with authentication, profiles and personalized content management.", features: ["Auth with multiple providers", "Personalized favorites", "Creation history", "Private collections"] },
      { icon: "📊", title: "Analytics Dashboard", text: "Analytics panel to monitor usage, popular gradients and engagement metrics.", features: ["Real-time usage metrics", "Most popular gradients", "AI generation analytics", "Performance reports"] },
    ],
    challengesTitle: "Technical Challenges Solved",
    challengesSubtitle: "Innovative solutions to complex problems",
    challengeLabel: "Challenge:",
    solutionLabel: "Solution:",
    challenges: [
      { num: "01", title: "AI Generation Optimization", challenge: "Generate high-quality gradients in real time without compromising the user experience.", solution: "Implementation of streaming responses with Vercel AI SDK, smart caching and generation in Edge Functions for minimal latency." },
      { num: "02", title: "Color Picker Performance", challenge: "Maintain 60fps in the visual editor while updating multiple gradients in real time.", solution: "Smart debouncing, component virtualization and use of Web Workers for heavy color calculations." },
      { num: "03", title: "Export Quality", challenge: "Generate high-quality PNG images that maintain the fidelity of the CSS gradient.", solution: "Optimized Canvas API with anti-aliasing, smooth interpolation algorithms and HDR color support." },
      { num: "04", title: "Library Scalability", challenge: "Handle thousands of gradients with instant search and filtering.", solution: "Full-text indexing with Supabase, infinite pagination with React Query and color-similarity clustering algorithms." },
    ],
    repoTitle: "Source Code",
    repoDescription: "Open-source project built with Next.js 14, TypeScript, Tailwind CSS and OpenAI integration. Includes complete documentation, automated tests and contribution guides.",
    repoStat1: "234 Stars",
    repoStat3: "MIT License",
    repoSeeCode: "View Code",
    repoSeeDemo: "View Demo",
    ctaTitle: "Interested in the project?",
    ctaText: "Explore Nice Gradient and discover how artificial intelligence can boost your design workflow.",
    ctaPrimary: "Try Nice Gradient",
    ctaSecondary: "See More Projects",
  },
};

export default function NiceGradientProject() {
  const { locale } = useRouter();
  const c = content[locale] || content.es;
  const ti = c.techItems;

  return (
    <>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        keywords={["nice gradient", "generador gradientes", "inteligencia artificial", "css gradients", "design tools", "next.js"]}
        image="/images/nice-gradient-mockup.webp"
      />

      <Layout>
        <div className={styles.projectContainer}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1>
                Nice Gradient
                <br />
                <span className={styles.heroHighlight}>Generator</span>
              </h1>
              <p className={styles.heroDescription}>
                {c.heroDescription}
              </p>
              <div className={styles.heroBadges}>
                <span className={styles.heroBadge}>Next.js 14</span>
                <span className={styles.heroBadge}>{c.badgeAI}</span>
                <span className={styles.heroBadge}>React</span>
                <span className={styles.heroBadge}>CSS Generator</span>
              </div>
              <div className={styles.heroButtons}>
                <a href="https://nice-gradient.vercel.app/" target="_blank" rel="noopener noreferrer" className={styles.heroDemoButton}>
                  <span>🚀</span>
                  {c.btnDemo}
                </a>
                <a href="https://github.com/juancamilosalazarrestrepo/NiceGradient" target="_blank" rel="noopener noreferrer" className={styles.heroSourceButton}>
                  <span>💻</span>
                  {c.btnSource}
                </a>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img src="/images/nice-gradient-mockup2.webp" alt="Nice Gradient Generator Interface" className={styles.heroMockup} />
              <img src="/images/phonemockup.webp" alt="Nice Gradient Mobile App" className={styles.heroPhoneMockup} />
              <div className={styles.heroGradientBar}></div>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className={styles.contentContainer}>
          {/* Features Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>{c.featuresTitle}</h2>
              <p>{c.featuresSubtitle}</p>
            </div>
            <div className={styles.featuresGrid}>
              {c.features.map((feat, i) => (
                <div key={i} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feat.icon}</div>
                  <h3>{feat.title}</h3>
                  <p>{feat.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>{c.techTitle}</h2>
              <p>{c.techSubtitle}</p>
            </div>
            <div className={styles.techGrid}>
              <div className={styles.techCategory}>
                <h3>{c.techFrontend}</h3>
                <div className={styles.techList}>
                  <div className={styles.techItem}>
                    <span className={styles.techIcon}>⚛️</span>
                    <div><strong>Next.js 14</strong><p>{ti.next}</p></div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techIcon}>⚡</span>
                    <div><strong>React 18</strong><p>{ti.react}</p></div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techIcon}>🎨</span>
                    <div><strong>Tailwind CSS</strong><p>{ti.tailwind}</p></div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techIcon}>🔷</span>
                    <div><strong>TypeScript</strong><p>{ti.ts}</p></div>
                  </div>
                </div>
              </div>
              <div className={styles.techCategory}>
                <h3>{c.techBackend}</h3>
                <div className={styles.techList}>
                  <div className={styles.techItem}>
                    <span className={styles.techIcon}>🤖</span>
                    <div><strong>OpenAI API</strong><p>{ti.openai}</p></div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techIcon}>🔥</span>
                    <div><strong>Vercel AI SDK</strong><p>{ti.vercelai}</p></div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techIcon}>🗄️</span>
                    <div><strong>Supabase</strong><p>{ti.supabase}</p></div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techIcon}>⚡</span>
                    <div><strong>Edge Runtime</strong><p>{ti.edge}</p></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Modules Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>{c.modulesTitle}</h2>
              <p>{c.modulesSubtitle}</p>
            </div>
            <div className={styles.modulesGrid}>
              {c.modules.map((mod, i) => (
                <div key={i} className={styles.moduleCard}>
                  <div className={styles.moduleHeader}>
                    <span className={styles.moduleIcon}>{mod.icon}</span>
                    <h3>{mod.title}</h3>
                  </div>
                  <p>{mod.text}</p>
                  <ul className={styles.moduleFeatures}>
                    {mod.features.map((mf, j) => <li key={j}>{mf}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Challenges Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>{c.challengesTitle}</h2>
              <p>{c.challengesSubtitle}</p>
            </div>
            <div className={styles.challengesList}>
              {c.challenges.map((ch, i) => (
                <div key={i} className={styles.challengeItem}>
                  <div className={styles.challengeNumber}>{ch.num}</div>
                  <div className={styles.challengeContent}>
                    <h3>{ch.title}</h3>
                    <p><strong>{c.challengeLabel}</strong> {ch.challenge}</p>
                    <p><strong>{c.solutionLabel}</strong> {ch.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Repository Section */}
          <section className={styles.section}>
            <div className={styles.repoCard}>
              <div className={styles.repoHeader}>
                <div className={styles.repoIcon}>
                  <svg viewBox="0 0 16 16" width="24" height="24" fill="currentColor">
                    <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
                  </svg>
                </div>
                <div>
                  <h3>{c.repoTitle}</h3>
                  <p>nice-gradient</p>
                </div>
              </div>
              <p className={styles.repoDescription}>
                {c.repoDescription}
              </p>
              <div className={styles.repoStats}>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>⭐</span>
                  <span>{c.repoStat1}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>🔧</span>
                  <span>TypeScript</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>📦</span>
                  <span>{c.repoStat3}</span>
                </div>
              </div>
              <div className={styles.repoLinks}>
                <a href="https://github.com/juancamilosalazarrestrepo/NiceGradient" target="_blank" rel="noopener noreferrer" className={styles.repoLink}>
                  <span>💻</span>
                  {c.repoSeeCode}
                </a>
                <a href="https://nice-gradient.vercel.app/" target="_blank" rel="noopener noreferrer" className={styles.repoLink}>
                  <span>📚</span>
                  {c.repoSeeDemo}
                </a>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2>{c.ctaTitle}</h2>
              <p>{c.ctaText}</p>
              <div className={styles.ctaButtons}>
                <a href="https://nice-gradient.vercel.app/" target="_blank" rel="noopener noreferrer" className={styles.ctaPrimaryButton}>
                  {c.ctaPrimary}
                </a>
                <Link href="/proyectos" className={styles.ctaSecondaryButton}>
                  {c.ctaSecondary}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['common'])),
    },
  };
}

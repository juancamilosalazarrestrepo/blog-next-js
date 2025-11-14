import Layout from '../../components/Layout';
import styles from '../../styles/NiceGradient.module.css';
import Link from 'next/link';
import Head from 'next/head';

export default function NiceGradientProject() {
  return (
    <>
      <Head>
        {/* Metadatos básicos */}
        <title>Nice Gradient - Generador de Gradientes con IA | Juan Camilo Salazar</title>
        <meta name="description" content="Herramienta profesional de gradientes con IA. Genera gradientes únicos, +500 gradientes curados, editor visual y exportación CSS/PNG. Desarrollado con Next.js 14 y OpenAI por Juan Camilo Salazar." />
        <meta name="keywords" content="nice gradient, generador gradientes, inteligencia artificial, css gradients, design tools, next.js, ai generator, gradient maker, web design" />
        <meta name="author" content="Juan Camilo Salazar" />
        
        {/* Open Graph para redes sociales */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Juan Camilo Salazar - Portfolio" />
        <meta property="og:title" content="Nice Gradient - Generador de Gradientes con IA | Juan Camilo Salazar" />
        <meta property="og:description" content="Herramienta profesional de gradientes impulsada por Inteligencia Artificial. Genera gradientes únicos, explora +500 gradientes curados, editor visual avanzado y exportación CSS/PNG. Desarrollado con Next.js 14, OpenAI y TypeScript por Juan Camilo Salazar." />
        <meta property="og:url" content="https://www.salazarcode.com/proyectos/nice_gradient" />
        <meta property="og:image" content="https://www.salazarcode.com/images/nice-gradient-mockup.webp" />
        <meta property="og:image:alt" content="Nice Gradient - Generador de gradientes con Inteligencia Artificial desarrollado por Juan Camilo Salazar" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="es_ES" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@juancamilosalazar" />
        <meta name="twitter:creator" content="@juancamilosalazar" />
        <meta name="twitter:title" content="Nice Gradient - Generador de Gradientes con IA" />
        <meta name="twitter:description" content="🤖 Genera gradientes únicos con IA. Editor visual avanzado, +500 gradientes curados y exportación CSS/PNG. Construido con Next.js 14 y OpenAI." />
        <meta name="twitter:image" content="https://www.salazarcode.com/images/nice-gradient-mockup.webp" />
        <meta name="twitter:image:alt" content="Nice Gradient - Generador de gradientes con Inteligencia Artificial" />
        
        {/* LinkedIn específico */}
        <meta property="og:image:secure_url" content="https://www.salazarcode.com/images/nice-gradient-mockup.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="article:author" content="Juan Camilo Salazar" />
        <meta property="article:section" content="Desarrollo Web" />
        <meta property="article:tag" content="Inteligencia Artificial" />
        <meta property="article:tag" content="Next.js" />
        <meta property="article:tag" content="React" />
        <meta property="article:tag" content="TypeScript" />
        <meta property="article:tag" content="OpenAI" />
        <meta property="article:tag" content="Design Tools" />
        
        {/* Metadatos adicionales para LinkedIn */}
        <meta property="og:determiner" content="the" />
        <meta property="og:updated_time" content="2024-11-13T00:00:00Z" />
        <meta name="linkedin:owner" content="Juan Camilo Salazar" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.salazarcode.com/proyectos/nice_gradient" />
        
        {/* Schema.org para mejor SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Nice Gradient",
            "description": "Generador de gradientes impulsado por Inteligencia Artificial que combina creatividad y tecnología para crear gradientes únicos.",
            "url": "https://nice-gradient.vercel.app/",
            "author": {
              "@type": "Person",
              "name": "Juan Camilo Salazar",
              "url": "https://www.salazarcode.com"
            },
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Generación de gradientes con IA",
              "Colección curada de +500 gradientes",
              "Editor visual avanzado",
              "Exportación CSS y PNG",
              "Interfaz responsive"
            ]
          })}
        </script>
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.salazarcode.com/proyectos/nice_gradient" />
        
        {/* Prefetch para mejor performance */}
        <link rel="preconnect" href="https://nice-gradient.vercel.app" />
        <link rel="preconnect" href="https://github.com" />
      </Head>
      
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
                Generador de gradientes impulsado por Inteligencia Artificial que combina 
                creatividad y tecnología para crear gradientes únicos. Una plataforma 
                completa con colección curada de gradientes hermosos, descarga de código 
                CSS y exportación de imágenes PNG.
              </p>
              <div className={styles.heroBadges}>
                <span className={styles.heroBadge}>Next.js 14</span>
                <span className={styles.heroBadge}>Inteligencia Artificial</span>
                <span className={styles.heroBadge}>React</span>
                <span className={styles.heroBadge}>CSS Generator</span>
              </div>
              <div className={styles.heroButtons}>
                <a
                  href="https://nice-gradient.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.heroDemoButton}
                >
                  <span>🚀</span>
                  Ver Demo
                </a>
                <a
                  href="https://github.com/juancamilosalazarrestrepo/NiceGradient"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.heroSourceButton}
                >
                  <span>💻</span>
                  Código Fuente
                </a>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                src="/images/nice-gradient-mockup2.webp"
                alt="Nice Gradient Generator Interface"
                className={styles.heroMockup}
              />
              <img
                src="/images/phonemockup.webp"
                alt="Nice Gradient Mobile App"
                className={styles.heroPhoneMockup}
              />
              <div className={styles.heroGradientBar}></div>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className={styles.contentContainer}>
          {/* Features Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Características Principales</h2>
              <p>Una herramienta completa para diseñadores y desarrolladores</p>
            </div>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🤖</div>
                <h3>Generación por IA</h3>
                <p>
                  Utiliza inteligencia artificial avanzada para generar gradientes únicos 
                  basados en prompts descriptivos y preferencias de color.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🎨</div>
                <h3>Colección Curada</h3>
                <p>
                  Biblioteca de más de 500 gradientes hermosos, organizados por categorías 
                  y tendencias de diseño actuales.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📥</div>
                <h3>Descarga CSS/PNG</h3>
                <p>
                  Exporta gradientes como código CSS listo para usar o como imágenes 
                  PNG de alta calidad para tus proyectos.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🎯</div>
                <h3>Personalización Avanzada</h3>
                <p>
                  Editor visual con controles precisos para ángulos, colores, 
                  opacidad y tipos de gradiente (lineal, radial, cónico).
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>💾</div>
                <h3>Favoritos y Historial</h3>
                <p>
                  Guarda tus gradientes favoritos y accede al historial de 
                  creaciones para facilitar la reutilización.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📱</div>
                <h3>Responsive Design</h3>
                <p>
                  Interfaz completamente responsiva que funciona perfectamente 
                  en desktop, tablet y móvil.
                </p>
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Stack Tecnológico</h2>
              <p>Tecnologías modernas para máximo rendimiento</p>
            </div>
            <div className={styles.techGrid}>
              <div className={styles.techCategory}>
                <h3>Frontend</h3>
                <div className={styles.techList}>
                  <div className={styles.techItem}>
                    <span className={styles.techIcon}>⚛️</span>
                    <div>
                      <strong>Next.js 14</strong>
                      <p>App Router, Server Components, SSR</p>
                    </div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techIcon}>⚡</span>
                    <div>
                      <strong>React 18</strong>
                      <p>Hooks, Context API, Suspense</p>
                    </div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techIcon}>🎨</span>
                    <div>
                      <strong>Tailwind CSS</strong>
                      <p>Utility-first, responsive design</p>
                    </div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techIcon}>🔷</span>
                    <div>
                      <strong>TypeScript</strong>
                      <p>Type safety, mejor DX</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.techCategory}>
                <h3>Backend & IA</h3>
                <div className={styles.techList}>
                  <div className={styles.techItem}>
                    <span className={styles.techIcon}>🤖</span>
                    <div>
                      <strong>OpenAI API</strong>
                      <p>GPT-4 para generación inteligente</p>
                    </div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techIcon}>🔥</span>
                    <div>
                      <strong>Vercel AI SDK</strong>
                      <p>Streaming, edge functions</p>
                    </div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techIcon}>🗄️</span>
                    <div>
                      <strong>Supabase</strong>
                      <p>Database, Auth, Storage</p>
                    </div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techIcon}>⚡</span>
                    <div>
                      <strong>Edge Runtime</strong>
                      <p>Respuestas ultra-rápidas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Modules Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Módulos y Funcionalidades</h2>
              <p>Arquitectura modular para máxima escalabilidad</p>
            </div>
            <div className={styles.modulesGrid}>
              <div className={styles.moduleCard}>
                <div className={styles.moduleHeader}>
                  <span className={styles.moduleIcon}>🧠</span>
                  <h3>AI Generator Engine</h3>
                </div>
                <p>
                  Motor de generación inteligente que interpreta prompts de texto 
                  y genera gradientes únicos utilizando algoritmos de ML.
                </p>
                <ul className={styles.moduleFeatures}>
                  <li>Procesamiento de lenguaje natural</li>
                  <li>Análisis de paletas de color</li>
                  <li>Generación contextual</li>
                  <li>Refinamiento iterativo</li>
                </ul>
              </div>
              <div className={styles.moduleCard}>
                <div className={styles.moduleHeader}>
                  <span className={styles.moduleIcon}>🎨</span>
                  <h3>Visual Editor</h3>
                </div>
                <p>
                  Editor visual interactivo con controles en tiempo real para 
                  ajustar todos los aspectos del gradiente.
                </p>
                <ul className={styles.moduleFeatures}>
                  <li>Color picker avanzado</li>
                  <li>Control de ángulos</li>
                  <li>Stops personalizables</li>
                  <li>Vista previa en vivo</li>
                </ul>
              </div>
              <div className={styles.moduleCard}>
                <div className={styles.moduleHeader}>
                  <span className={styles.moduleIcon}>📚</span>
                  <h3>Gradient Library</h3>
                </div>
                <p>
                  Sistema de gestión de biblioteca con categorización, búsqueda 
                  y filtros para encontrar el gradiente perfecto.
                </p>
                <ul className={styles.moduleFeatures}>
                  <li>Categorización automática</li>
                  <li>Búsqueda por color dominante</li>
                  <li>Filtros por tipo y estilo</li>
                  <li>Trending gradients</li>
                </ul>
              </div>
              <div className={styles.moduleCard}>
                <div className={styles.moduleHeader}>
                  <span className={styles.moduleIcon}>⬇️</span>
                  <h3>Export System</h3>
                </div>
                <p>
                  Sistema de exportación que genera código CSS optimizado y 
                  imágenes PNG de alta calidad.
                </p>
                <ul className={styles.moduleFeatures}>
                  <li>CSS con prefijos vendor</li>
                  <li>PNG en múltiples resoluciones</li>
                  <li>SVG para vectores</li>
                  <li>Formatos para diferentes frameworks</li>
                </ul>
              </div>
              <div className={styles.moduleCard}>
                <div className={styles.moduleHeader}>
                  <span className={styles.moduleIcon}>👤</span>
                  <h3>User Management</h3>
                </div>
                <p>
                  Sistema completo de usuarios con autenticación, perfiles 
                  y gestión de contenido personalizado.
                </p>
                <ul className={styles.moduleFeatures}>
                  <li>Auth con múltiples providers</li>
                  <li>Favoritos personalizados</li>
                  <li>Historial de creaciones</li>
                  <li>Colecciones privadas</li>
                </ul>
              </div>
              <div className={styles.moduleCard}>
                <div className={styles.moduleHeader}>
                  <span className={styles.moduleIcon}>📊</span>
                  <h3>Analytics Dashboard</h3>
                </div>
                <p>
                  Panel de analytics para monitorear uso, gradientes populares 
                  y métricas de engagement.
                </p>
                <ul className={styles.moduleFeatures}>
                  <li>Métricas de uso en tiempo real</li>
                  <li>Gradientes más populares</li>
                  <li>Analytics de generación por IA</li>
                  <li>Reportes de performance</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Challenges Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Desafíos Técnicos Resueltos</h2>
              <p>Soluciones innovadoras a problemas complejos</p>
            </div>
            <div className={styles.challengesList}>
              <div className={styles.challengeItem}>
                <div className={styles.challengeNumber}>01</div>
                <div className={styles.challengeContent}>
                  <h3>Optimización de Generación por IA</h3>
                  <p>
                    <strong>Desafío:</strong> Generar gradientes de alta calidad en tiempo real 
                    sin comprometer la experiencia del usuario.
                  </p>
                  <p>
                    <strong>Solución:</strong> Implementación de streaming responses con Vercel AI SDK, 
                    cache inteligente y generación en Edge Functions para latencia mínima.
                  </p>
                </div>
              </div>
              <div className={styles.challengeItem}>
                <div className={styles.challengeNumber}>02</div>
                <div className={styles.challengeContent}>
                  <h3>Performance del Color Picker</h3>
                  <p>
                    <strong>Desafío:</strong> Mantener 60fps en el editor visual mientras se 
                    actualizan múltiples gradientes en tiempo real.
                  </p>
                  <p>
                    <strong>Solución:</strong> Debouncing inteligente, virtualización de componentes 
                    y uso de Web Workers para cálculos pesados de color.
                  </p>
                </div>
              </div>
              <div className={styles.challengeItem}>
                <div className={styles.challengeNumber}>03</div>
                <div className={styles.challengeContent}>
                  <h3>Calidad de Exportación</h3>
                  <p>
                    <strong>Desafío:</strong> Generar imágenes PNG de alta calidad que mantengan 
                    la fidelidad del gradiente CSS.
                  </p>
                  <p>
                    <strong>Solución:</strong> Canvas API optimizado con anti-aliasing, algoritmos 
                    de interpolación suave y soporte para HDR colors.
                  </p>
                </div>
              </div>
              <div className={styles.challengeItem}>
                <div className={styles.challengeNumber}>04</div>
                <div className={styles.challengeContent}>
                  <h3>Escalabilidad de la Biblioteca</h3>
                  <p>
                    <strong>Desafío:</strong> Manejar miles de gradientes con búsqueda y 
                    filtrado instantáneo.
                  </p>
                  <p>
                    <strong>Solución:</strong> Indexación full-text con Supabase, paginación 
                    infinita con React Query y algoritmos de clustering por similitud de color.
                  </p>
                </div>
              </div>
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
                  <h3>Código Fuente</h3>
                  <p>nice-gradient</p>
                </div>
              </div>
              <p className={styles.repoDescription}>
                Proyecto open-source construido con Next.js 14, TypeScript, Tailwind CSS 
                e integración con OpenAI. Incluye documentación completa, tests automatizados 
                y guías de contribución.
              </p>
              <div className={styles.repoStats}>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>⭐</span>
                  <span>234 Stars</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>🔧</span>
                  <span>TypeScript</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>📦</span>
                  <span>MIT License</span>
                </div>
              </div>
              <div className={styles.repoLinks}>
                <a
                  href="https://github.com/juancamilosalazarrestrepo/NiceGradient"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repoLink}
                >
                  <span>💻</span>
                  Ver Código
                </a>
                <a
                  href="https://nice-gradient.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repoLink}
                >
                  <span>📚</span>
                  Ver Demo
                </a>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2>¿Te interesa el proyecto?</h2>
              <p>
                Explora Nice Gradient y descubre cómo la inteligencia artificial 
                puede potenciar tu flujo de trabajo de diseño.
              </p>
              <div className={styles.ctaButtons}>
                <a
                  href="https://nice-gradient.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaPrimaryButton}
                >
                  Probar Nice Gradient
                </a>
                <Link href="/proyectos" className={styles.ctaSecondaryButton}>
                  Ver Más Proyectos
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

export async function getStaticProps() {
  return {
    props: {
      title: 'Nice Gradient - Generador de Gradientes con IA | Juan Camilo Salazar',
      description: 'Nice Gradient es un generador de gradientes impulsado por inteligencia artificial. Crea gradientes únicos, explora una colección curada y descarga código CSS o imágenes PNG.',
      keywords: 'nice gradient, generador gradientes, inteligencia artificial, css gradients, design tools, next.js'
    },
  };
}
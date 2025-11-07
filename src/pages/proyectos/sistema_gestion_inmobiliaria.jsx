import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import styles from "../../styles/ProyectoDetalle.module.css";
import realEstateApp from "../../../public/images/realEstateApp.webp";

const SistemaGestionInmobiliaria = () => {
  const [activeTab, setActiveTab] = useState("features");

  const features = [
    {
      icon: "🏢",
      title: "Gestión de Propiedades",
      description: "CRUD completo para administrar propiedades con imágenes, descripciones, precios y estados."
    },
    {
      icon: "👥",
      title: "Multi-usuario",
      description: "Sistema de roles con administradores, agentes y clientes con permisos diferenciados."
    },
    {
      icon: "📊",
      title: "Dashboard Analytics",
      description: "Panel de analíticas con gráficos de ventas, propiedades más vistas y métricas en tiempo real."
    },
    {
      icon: "🔍",
      title: "Búsqueda Avanzada",
      description: "Filtros por precio, ubicación, tipo de propiedad, número de habitaciones y más."
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Interfaz adaptable a todo tipo de dispositivos, desde móviles hasta desktops."
    },
    {
      icon: "🔒",
      title: "Seguridad",
      description: "Autenticación JWT, encriptación de datos y protección contra ataques comunes."
    }
  ];

  const techStack = {
    backend: [
      { name: ".NET 7", icon: "⚙️", color: "#512BD4" },
      { name: "Clean Architecture", icon: "🏗️", color: "#2C3E50" },
      { name: "Entity Framework", icon: "💾", color: "#512BD4" },
      { name: "SQL Server", icon: "🗄️", color: "#CC2927" },
      { name: "JWT Auth", icon: "🔐", color: "#000000" }
    ],
    frontend: [
      { name: "Next.js 14", icon: "▲", color: "#000000" },
      { name: "React 18", icon: "⚛️", color: "#61DAFB" },
      { name: "Tailwind CSS", icon: "🎨", color: "#06B6D4" },
      { name: "Axios", icon: "📡", color: "#5A29E4" },
      { name: "React Query", icon: "🔄", color: "#FF4154" }
    ]
  };

  const challenges = [
    {
      title: "Arquitectura Escalable",
      description: "Implementación de Clean Architecture para garantizar mantenibilidad y escalabilidad del sistema.",
      solution: "Separación en capas (Domain, Application, Infrastructure, Presentation) con inyección de dependencias."
    },
    {
      title: "Gestión de Imágenes",
      description: "Manejo eficiente de múltiples imágenes de alta calidad por propiedad.",
      solution: "Optimización con Next.js Image, compresión automática y CDN para servir contenido estático."
    },
    {
      title: "Búsqueda en Tiempo Real",
      description: "Filtros dinámicos y búsqueda rápida con gran volumen de propiedades.",
      solution: "Implementación de índices en base de datos y caché con Redis para consultas frecuentes."
    }
  ];

  return (
    <Layout>
      <Head>
        <title>Sistema de Gestión Inmobiliaria | Proyecto Portfolio</title>
        <meta
          name="description"
          content="Plataforma inmobiliaria completa con backend .NET (Clean Architecture) y frontend Next.js moderno"
        />
      </Head>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <span className={styles.badge}>Proyecto Destacado</span>
            <h1 className={styles.heroTitle}>
              Sistema de Gestión <span className={styles.gradient}>Inmobiliaria</span>
            </h1>
            <p className={styles.heroDescription}>
              Plataforma completa para gestionar propiedades inmobiliarias con panel administrativo,
              backend robusto en .NET con Clean Architecture y frontend moderno en Next.js
            </p>
            <div className={styles.heroButtons}>
              <a href="#features" className={styles.btnPrimary}>
                Ver características
              </a>
              <a href="#tech" className={styles.btnSecondary}>
                Stack tecnológico
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.imageWrapper}>
              <Image
                src={realEstateApp}
                alt="Sistema de Gestión Inmobiliaria"
                width={700}
                height={500}
                className={styles.projectImage}
                priority
              />
              <div className={styles.floatingCard}>
                <div className={styles.cardIcon}>✅</div>
                <div>
                  <p className={styles.cardTitle}>Proyecto Completo</p>
                  <p className={styles.cardText}>Full Stack Development</p>
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
            <h2 className={styles.sectionTitle}>Características Principales</h2>
            <p className={styles.sectionSubtitle}>
              Funcionalidades diseñadas para optimizar la gestión inmobiliaria
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
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
            <h2 className={styles.sectionTitle}>Stack Tecnológico</h2>
            <p className={styles.sectionSubtitle}>
              Tecnologías modernas y probadas en producción
            </p>
          </div>

          <div className={styles.techTabs}>
            <button
              className={`${styles.tabButton} ${activeTab === "features" ? styles.active : ""}`}
              onClick={() => setActiveTab("features")}
            >
              Backend
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "frontend" ? styles.active : ""}`}
              onClick={() => setActiveTab("frontend")}
            >
              Frontend
            </button>
          </div>

          <div className={styles.techGrid}>
            {activeTab === "features" && techStack.backend.map((tech, index) => (
              <div key={index} className={styles.techCard}>
                <span className={styles.techIcon} style={{ color: tech.color }}>
                  {tech.icon}
                </span>
                <span className={styles.techName}>{tech.name}</span>
              </div>
            ))}
            {activeTab === "frontend" && techStack.frontend.map((tech, index) => (
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
            <h2 className={styles.sectionTitle}>Desafíos y Soluciones</h2>
            <p className={styles.sectionSubtitle}>
              Problemas técnicos resueltos durante el desarrollo
            </p>
          </div>
          <div className={styles.challengesGrid}>
            {challenges.map((challenge, index) => (
              <div key={index} className={styles.challengeCard}>
                <div className={styles.challengeNumber}>{index + 1}</div>
                <h3 className={styles.challengeTitle}>{challenge.title}</h3>
                <p className={styles.challengeDescription}>{challenge.description}</p>
                <div className={styles.solution}>
                  <strong>Solución:</strong> {challenge.solution}
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
              <h2 className={styles.repoTitle}>Código Fuente</h2>
              <p className={styles.repoDescription}>
                Explora el código completo del proyecto en GitHub. Incluye documentación detallada,
                arquitectura del sistema y ejemplos de implementación.
              </p>
              <div className={styles.repoStats}>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>⭐</span>
                  <span className={styles.statLabel}>Clean Architecture</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>📝</span>
                  <span className={styles.statLabel}>Documentado</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>🔧</span>
                  <span className={styles.statLabel}>Open Source</span>
                </div>
              </div>
              <a 
                href="https://github.com/juancamilosalazarrestrepo/million_real_state" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.repoButton}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                Ver Repositorio en GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>¿Interesado en un proyecto similar?</h2>
          <p className={styles.ctaText}>
            Puedo ayudarte a desarrollar tu plataforma web con las mejores tecnologías
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.btnCta}>
              Contactar
            </Link>
            <Link href="/proyectos" className={styles.btnCtaSecondary}>
              Ver más proyectos
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SistemaGestionInmobiliaria;

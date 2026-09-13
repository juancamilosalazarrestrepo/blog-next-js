import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import styles from "../../styles/ProyectoDetalle.module.css";
import SEO from "../../components/SEO";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from "next/router";

const SENAS_IMAGE = "/images/vision-computadora/demo-manos.webp";

const content = {
  es: {
    seoTitle: "Reconocimiento de Lenguaje de Señas con Visión Artificial | Proyecto",
    seoDescription: "Sistema de visión artificial que reconoce lenguaje de señas en tiempo real usando Python, MediaPipe y redes neuronales.",
    badge: "Proyecto de IA y Visión Artificial",
    heroTitlePre: "Lenguaje de Señas ",
    heroTitleHl: "con Visión",
    heroDescription: "Sistema de visión por computadora que detecta y traduce gestos de lenguaje de señas en tiempo real. Usa MediaPipe para el seguimiento de manos, OpenCV para el procesamiento de video y una red neuronal entrenada para clasificar cada seña. Construido con Python, TensorFlow y Keras.",
    btnFeatures: "Ver características",
    btnTech: "Stack tecnológico",
    cardTitle: "IA en Tiempo Real",
    cardText: "Computer Vision & Deep Learning",
    demoTitle: "El Sistema en Acción",
    demoSubtitle: "Capturas reales del proyecto corriendo sobre una cámara web estándar",
    demos: [
      { src: "/images/vision-computadora/demo-manos.webp", title: "Manos y señas", caption: "21 landmarks por mano y la seña interpretada en pantalla: 26 FPS.", alt: "Landmarks de la mano derecha con las letras detectadas en lenguaje de señas" },
      { src: "/images/vision-computadora/demo-rostros.webp", title: "Rostros", caption: "Malla facial ajustada al rostro frame a frame: 35 FPS.", alt: "Malla facial de MediaPipe detectando un rostro en tiempo real" },
      { src: "/images/vision-computadora/demo-objetos.webp", title: "Objetos", caption: "Detección de una persona y un control con cajas delimitadoras: 70 FPS.", alt: "Detección de objetos en tiempo real: una persona y un control de videojuegos" },
    ],
    featuresTitle: "Características Principales",
    featuresSubtitle: "Funcionalidades clave del sistema de reconocimiento",
    features: [
      { icon: "✋", title: "Detección de Manos en Tiempo Real", description: "MediaPipe rastrea hasta 21 puntos de referencia de cada mano en el video de la cámara, con alta precisión y rendimiento." },
      { icon: "🧠", title: "Clasificación con Red Neuronal", description: "Modelo de deep learning entrenado con TensorFlow/Keras para reconocer patrones de gestos y clasificar cada seña." },
      { icon: "📊", title: "Dataset Propio", description: "Recolección y etiquetado manual de muestras de cada letra o gesto para construir un dataset balanceado y representativo." },
      { icon: "🔤", title: "Traducción de Letras y Palabras", description: "Reconoce el abecedario dactilológico (letras) y palabras comunes del lenguaje de señas, mostrando el texto traducido." },
      { icon: "⚡", title: "Procesamiento en Streaming", description: "Procesamiento optimizado del flujo de video para obtener respuesta casi instantánea sin sacrificar precisión." },
      { icon: "🖥️", title: "Interfaz Visual", description: "Ventana de visualización que dibuja el esqueleto de la mano, la letra detectada y el historial de señas en pantalla." },
    ],
    techTitle: "Stack Tecnológico",
    techSubtitle: "Herramientas de visión artificial y machine learning",
    tabBackend: "Detección",
    tabFrontend: "Modelo de IA",
    challengesTitle: "Desafíos y Soluciones",
    challengesSubtitle: "Problemas técnicos resueltos durante el desarrollo",
    solutionLabel: "Solución:",
    challenges: [
      { title: "Detección Robusta de Manos", description: "Lograr el seguimiento de las manos en distintas condiciones de iluminación, fondos y tipos de piel sin perder estabilidad.", solution: "Uso de MediaPipe Hands, que provee un modelo de detección y landmarks de mano optimizado y robusto frente a variaciones del entorno." },
      { title: "Dataset y Clases Imbalanceadas", description: "Recolectar suficientes muestras de cada letra y evitar que el modelo se sesgue hacia las clases con más ejemplos.", solution: "Recolección manual equilibrada y aumento de datos (rotaciones y desplazamientos) para balancear y enriquecer el dataset." },
      { title: "Latencia en Tiempo Real", description: "Clasificar cada frame del video sin que la traducción se sienta lenta o entrecortada.", solution: "Optimización del pipeline, muestreo de frames y un modelo ligero que mantiene precisión con baja latencia de inferencia." },
      { title: "Generalización del Modelo", description: "Que el modelo funcione bien con manos de distintos usuarios, tamaños y ángulos, no solo con los datos de entrenamiento.", solution: "Normalización de los landmarks relativos y entrenamiento con validación cruzada para mejorar la capacidad de generalización." },
    ],
    repoTitle: "Código Fuente",
    repoDescription: "Explora el código completo del proyecto en GitHub. Incluye el notebook de entrenamiento del modelo, los scripts de captura de datos, el dataset y el detector en tiempo real.",
    repoStat1: "Deep Learning",
    repoStat2: "MediaPipe",
    repoStat3: "Open Source",
    repoButton: "Ver Repositorio en GitHub",
    ctaTitle: "¿Interesado en un proyecto de IA y visión artificial?",
    ctaText: "Puedo ayudarte a desarrollar tu solución con machine learning y computer vision con las mejores tecnologías",
    ctaContact: "Contactar",
    ctaMore: "Ver más proyectos",
  },
  en: {
    seoTitle: "Sign Language Recognition with Computer Vision | Project",
    seoDescription: "Computer vision system that recognizes sign language in real time using Python, MediaPipe and neural networks.",
    badge: "AI & Computer Vision Project",
    heroTitlePre: "Sign Language ",
    heroTitleHl: "with Vision",
    heroDescription: "Computer vision system that detects and translates sign language gestures in real time. Uses MediaPipe for hand tracking, OpenCV for video processing and a trained neural network to classify each sign. Built with Python, TensorFlow and Keras.",
    btnFeatures: "View features",
    btnTech: "Tech stack",
    cardTitle: "Real-Time AI",
    cardText: "Computer Vision & Deep Learning",
    demoTitle: "The System in Action",
    demoSubtitle: "Real screenshots of the project running on a standard webcam",
    demos: [
      { src: "/images/vision-computadora/demo-manos.webp", title: "Hands and signs", caption: "21 landmarks per hand and the recognized sign on screen: 26 FPS.", alt: "Right hand landmarks with detected sign language letters" },
      { src: "/images/vision-computadora/demo-rostros.webp", title: "Faces", caption: "Face mesh fitted to the face frame by frame: 35 FPS.", alt: "MediaPipe face mesh detecting a face in real time" },
      { src: "/images/vision-computadora/demo-objetos.webp", title: "Objects", caption: "A person and a game controller detected with bounding boxes: 70 FPS.", alt: "Real-time object detection: a person and a game controller" },
    ],
    featuresTitle: "Key Features",
    featuresSubtitle: "Key features of the recognition system",
    features: [
      { icon: "✋", title: "Real-Time Hand Detection", description: "MediaPipe tracks up to 21 landmarks per hand in the camera feed with high accuracy and performance." },
      { icon: "🧠", title: "Neural Network Classification", description: "Deep learning model trained with TensorFlow/Keras to recognize gesture patterns and classify each sign." },
      { icon: "📊", title: "Custom Dataset", description: "Manual collection and labeling of samples for each letter or gesture to build a balanced, representative dataset." },
      { icon: "🔤", title: "Letter and Word Translation", description: "Recognizes the fingerspelling alphabet (letters) and common sign language words, showing translated text." },
      { icon: "⚡", title: "Streaming Processing", description: "Optimized processing of the video stream for near-instant response without sacrificing accuracy." },
      { icon: "🖥️", title: "Visual Interface", description: "Display window that draws the hand skeleton, the detected letter and the sign history on screen." },
    ],
    techTitle: "Tech Stack",
    techSubtitle: "Computer vision and machine learning tools",
    tabBackend: "Detection",
    tabFrontend: "AI Model",
    challengesTitle: "Challenges and Solutions",
    challengesSubtitle: "Technical problems solved during development",
    solutionLabel: "Solution:",
    challenges: [
      { title: "Robust Hand Detection", description: "Achieving stable hand tracking across different lighting conditions, backgrounds and skin tones.", solution: "Using MediaPipe Hands, which provides an optimized and robust hand detection and landmark model against environment variations." },
      { title: "Dataset and Imbalanced Classes", description: "Collecting enough samples of each letter and preventing the model from biasing toward classes with more examples.", solution: "Balanced manual collection and data augmentation (rotations and shifts) to balance and enrich the dataset." },
      { title: "Real-Time Latency", description: "Classifying every video frame without the translation feeling slow or choppy.", solution: "Pipeline optimization, frame sampling and a lightweight model that keeps accuracy with low inference latency." },
      { title: "Model Generalization", description: "Making the model work well with hands of different users, sizes and angles, not just training data.", solution: "Relative landmark normalization and training with cross-validation to improve generalization ability." },
    ],
    repoTitle: "Source Code",
    repoDescription: "Explore the project's full code on GitHub. Includes the training notebook, data capture scripts, dataset and real-time detector.",
    repoStat1: "Deep Learning",
    repoStat2: "MediaPipe",
    repoStat3: "Open Source",
    repoButton: "View Repository on GitHub",
    ctaTitle: "Interested in an AI and computer vision project?",
    ctaText: "I can help you build your machine learning and computer vision solution with the best technologies",
    ctaContact: "Contact",
    ctaMore: "See more projects",
  },
};

const ReconocimientoLenguajeSenas = () => {
  const { locale } = useRouter();
  const c = content[locale] || content.es;
  const [activeTab, setActiveTab] = useState("detection");

  const techStack = {
    detection: [
      { name: "Python", icon: "🐍", color: "#3776AB" },
      { name: "MediaPipe Hands", icon: "✋", color: "#00A6ED" },
      { name: "OpenCV", icon: "🎥", color: "#5C3EE8" },
      { name: "NumPy", icon: "🔢", color: "#4D77CF" },
      { name: "Camera Streaming", icon: "📹", color: "#333333" },
    ],
    model: [
      { name: "TensorFlow", icon: "🧠", color: "#FF6F00" },
      { name: "Keras", icon: "🔷", color: "#D00000" },
      { name: "CNN / MLP", icon: "🧬", color: "#8E44AD" },
      { name: "Data Augmentation", icon: "🔄", color: "#27AE60" },
      { name: "Scikit-learn", icon: "📈", color: "#F7931E" },
    ],
  };

  return (
    <Layout>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        keywords={["lenguaje de señas", "visión artificial", "computer vision", "reconocimiento de gestos", "mediapipe", "deep learning", "lenguaje de señas ia"]}
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
                src={SENAS_IMAGE}
                alt="Reconocimiento de lenguaje de señas con visión artificial"
                width={690}
                height={553}
                className={styles.projectImage}
                priority
              />
              <div className={styles.floatingCard}>
                <div className={styles.cardIcon}>🤟</div>
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
                  width={690}
                  height={553}
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
              className={`${styles.tabButton} ${activeTab === "detection" ? styles.active : ""}`}
              onClick={() => setActiveTab("detection")}
            >
              {c.tabBackend}
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "model" ? styles.active : ""}`}
              onClick={() => setActiveTab("model")}
            >
              {c.tabFrontend}
            </button>
          </div>

          <div className={styles.techGrid}>
            {activeTab === "detection" && techStack.detection.map((tech, index) => (
              <div key={index} className={styles.techCard}>
                <span className={styles.techIcon} style={{ color: tech.color }}>
                  {tech.icon}
                </span>
                <span className={styles.techName}>{tech.name}</span>
              </div>
            ))}
            {activeTab === "model" && techStack.model.map((tech, index) => (
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
                  <span className={styles.statIcon}>🧠</span>
                  <span className={styles.statLabel}>{c.repoStat1}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>✋</span>
                  <span className={styles.statLabel}>{c.repoStat2}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statIcon}>🔓</span>
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

export default ReconocimientoLenguajeSenas;

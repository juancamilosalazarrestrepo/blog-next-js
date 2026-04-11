import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import styles from "../../styles/ProyectoDetalle.module.css";
import reserveDesktop from "../../../public/images/reserveDesktop.png";
import reservePhone from "../../../public/images/reservePhone.png";

const LuxuryBookingEngine = () => {
    const [activeTab, setActiveTab] = useState("features");

    const features = [
        {
            icon: "🛥️",
            title: "Reserva de Yates y Apartamentos",
            description: "Sistema unificado para reservar tanto experiencias náuticas (yates) como alojamientos de lujo."
        },
        {
            icon: "📅",
            title: "Motor de Búsqueda Avanzado",
            description: "Búsqueda en tiempo real por destino, fechas y número de huéspedes con filtros de alta gama."
        },
        {
            icon: "🌑",
            title: "Diseño Premium Dark Mode",
            description: "Interfaz exclusiva en tonos oscuros y metálicos (dorado) para transmitir lujo y sofisticación."
        },
        {
            icon: "💳",
            title: "Pagos Seguros",
            description: "Integración de pasarela de pagos segura y encriptación de datos de alto nivel."
        },
        {
            icon: "📷",
            title: "Galería de Alta Resolución",
            description: "Visualizador de imágenes en alta definición para mostrar cada detalle de la propiedad o yate."
        },
        {
            icon: "🤖",
            title: "Asistente de Reservas",
            description: "Soporte automatizado 24/7 para ayudar a los clientes VIP con sus itinerarios y dudas."
        }
    ];

    const techStack = {
        backend: [
            { name: "Node.js", icon: "🟢", color: "#339933" },
            { name: "Supabase", icon: "💚", color: "#3ECF8E" },
            { name: "PostgreSQL", icon: "🐘", color: "#336791" },
            { name: "Stripe", icon: "💳", color: "#635BFF" }
        ],
        frontend: [
            { name: "Next.js 14", icon: "▲", color: "#000000" },
            { name: "React 18", icon: "⚛️", color: "#61DAFB" },
            { name: "Tailwind CSS", icon: "🎨", color: "#06B6D4" },
            { name: "Zustand", icon: "🐻", color: "#4B32C3" }
        ]
    };

    const challenges = [
        {
            title: "Disponibilidad en Tiempo Real",
            description: "Manejar la concurrencia cuando varios usuarios VIP intentan reservar las mismas fechas para un yate exclusivo.",
            solution: "Implementación de bloqueos temporales en base de datos (pessimistic locking) durante el proceso de checkout."
        },
        {
            title: "Identidad Visual de Lujo",
            description: "Crear una experiencia visual que justifique el ticket promedio alto (high-ticket).",
            solution: "Creación de un design system en dark mode puro con acentos color oro, tipografías elegantes (Plus Jakarta Sans) y micro-animaciones fluidas."
        }
    ];

    return (
        <Layout>
            <Head>
                <title>Motor de Reservas | Yates y Apartamentos de Lujo - Portfolio</title>
                <meta
                    name="description"
                    content="Plataforma premium para reserva de yates exclusivos y apartamentos de lujo empleando Next.js y Dark Mode."
                />
            </Head>

            {/* Hero Section */}
            <section
                className="relative w-full overflow-hidden flex flex-col items-center px-6 py-12 md:py-24 lg:py-32"
                style={{
                    background: 'linear-gradient(to right, #6bb8f4, #70e1f5, #e5e5be)',
                    borderBottomLeftRadius: 'clamp(20px, 10vw, 80px)',
                    borderBottomRightRadius: 'clamp(20px, 10vw, 80px)',
                }}
            >
                <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 overflow-visible">
                    <div className="w-full lg:flex-1 max-w-2xl lg:max-w-none text-center lg:text-left z-20">
                        <span className="bg-white/40 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 inline-block border border-[#1e3a8a]/20 backdrop-blur-md shadow-sm" style={{ color: '#1e3a8a' }}>
                            Web App High-End
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tight" style={{ color: '#0f172a' }}>
                            Luxury Booking <span style={{ background: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Engine</span>
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl mb-10 font-semibold leading-relaxed max-w-2xl mx-auto lg:mx-0 shadow-sm" style={{ color: '#1e293b' }}>
                            Plataforma exclusiva que redefine las reservas de lujo. Motor unificado para conectar usuarios VIP con yates y apartamentos premium.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start relative z-[7000]">
                            <a
                                href="#features"
                                className="px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl text-center active:scale-95"
                                style={{ background: '#1e3a8a', color: 'white' }}
                            >
                                Ver características
                            </a>
                            <a
                                href="#tech"
                                className="bg-transparent border-2 border-[#1e3a8a] text-[#1e3a8a] px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[#1e3a8a]/5 transition-all backdrop-blur-md text-center active:scale-95"
                            >
                                Stack tecnológico
                            </a>
                        </div>
                    </div>
                    <div className="w-full lg:flex-1 relative flex justify-center lg:justify-end items-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] z-10">
                        <div className="relative w-full max-w-[450px] sm:max-w-[550px] md:max-w-[650px] lg:max-w-[750px] h-full flex items-center justify-center">
                            {/* Mobile Mockup on the Left */}
                            <div className="absolute z-30 w-[45%] sm:w-[40%] md:w-[38%] lg:w-[55%] -left-[5%] sm:left-0 md:left-[5%] lg:left-[5%] bottom-[5%] animate-[float-delayed_4s_ease-in-out_infinite]">
                                <Image
                                    src={reservePhone}
                                    alt="Reserva Mobile Mockup"
                                    width={450}
                                    height={900}
                                    className="w-full h-auto"
                                    priority
                                />
                            </div>
                            {/* Desktop Mockup on the Right */}
                            <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[105%] z-10 ml-auto animate-[float_5s_ease-in-out_infinite]">
                                <Image
                                    src={reserveDesktop}
                                    alt="Reserva Desktop Mockup"
                                    width={900}
                                    height={600}
                                    className="w-full h-auto block"
                                    priority
                                />
                            </div>
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                @keyframes float {
                                    0% { transform: translateY(0px); }
                                    50% { transform: translateY(-10px); }
                                    100% { transform: translateY(0px); }
                                }
                                @keyframes float-delayed {
                                    0% { transform: translateY(0px); }
                                    50% { transform: translateY(-15px); }
                                    100% { transform: translateY(0px); }
                                }
                            `}} />

                            <div className={styles.floatingCard} style={{ zIndex: 40 }}>
                                <div className={styles.cardIcon}>⭐️</div>
                                <div>
                                    <p className={styles.cardTitle}>Servicio Premium</p>
                                    <p className={styles.cardText}>High-ticket Bookings</p>
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
                        <h2 className={styles.sectionTitle}>Características Premium</h2>
                        <p className={styles.sectionSubtitle}>
                            Componentes diseñados para usuarios exigentes
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
                        <h2 className={styles.sectionTitle}>Arquitectura Tecnológica</h2>
                        <p className={styles.sectionSubtitle}>
                            Solución escalable para negocios globales
                        </p>
                    </div>

                    <div className={styles.techTabs}>
                        <button
                            className={`${styles.tabButton} ${activeTab === "features" ? styles.active : ""}`}
                            onClick={() => setActiveTab("features")}
                        >
                            Backend / Database
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
                            Superando obstáculos técnicos de alto nivel
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
                                <path d="M19 3v8h-2V5H5v14h14v-4h2v6H3V3h16z" fill="currentColor" />
                                <path d="M19.5 9v4h-8l4.5-4h3.5z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className={styles.repoText}>
                            <h2 className={styles.repoTitle}>App Conceptual</h2>
                            <p className={styles.repoDescription}>
                                Este proyecto representa las capacidades de creación de plataformas transaccionales complejas de alto nivel adquisitivo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaContent}>
                    <h2 className={styles.ctaTitle}>¿Deseas digitalizar tus reservas?</h2>
                    <p className={styles.ctaText}>
                        Creamos motores de reservas robustos e interfaces enfocadas en la conversión.
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

export default LuxuryBookingEngine;

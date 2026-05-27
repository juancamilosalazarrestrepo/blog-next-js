import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/ConsultoriaIA.module.css";

export default function ConsultoriaIA() {
    const phoneNumber = "573042093951";
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        website: "",
        bottleneck: "",
    });
    const [formStatus, setFormStatus] = useState("idle"); // idle | loading | success | error
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus("loading");
        setErrorMessage("");

        if (!formData.name.trim() || !formData.email.trim()) {
            setErrorMessage("Por favor completa tu nombre y correo electrónico.");
            setFormStatus("error");
            return;
        }

        try {
            const res = await fetch("/api/consultoria-ia", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormStatus("success");
                setFormData({ name: "", email: "", website: "", bottleneck: "" });
            } else {
                const data = await res.json();
                setErrorMessage(data.error || "Hubo un error al enviar. Intenta de nuevo.");
                setFormStatus("error");
            }
        } catch {
            setErrorMessage("Error de conexión. Verifica tu internet e intenta de nuevo.");
            setFormStatus("error");
        }
    };

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Layout>
            <SEO
                title="Consultoría y Diagnóstico de IA para Empresas | Salazar Code"
                description="Diagnosticamos tus operaciones, identificamos cuellos de botella y diseñamos Agentes de IA a la medida de tu negocio. Menos procesos manuales, más resultados."
                keywords={[
                    "consultoría inteligencia artificial",
                    "diagnóstico IA empresas",
                    "agentes de IA",
                    "chatbots RAG",
                    "automatización de procesos con IA",
                    "implementación IA empresarial",
                    "salazar code",
                ]}
                image="/assets/ai/ai_hero.webp"
            />
            <Head>
                {/* Cargamos las fuentes Inter y Manrope (la fuente de diseño premium de Stitch) */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Manrope:wght@300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className={styles.pageWrapper}>

                {/* Floating WhatsApp */}
                <a
                    className={styles.whatsappFloat}
                    href={`https://wa.me/${phoneNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contactar por WhatsApp"
                >
                    <svg className={styles.whatsappIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                </a>

                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* SECTION 1: HERO (Stitch-inspired Premium Light layout) */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                <section className={styles.heroSection} id="hero">
                    <div className={styles.gridLines} aria-hidden="true"></div>

                    <div className={styles.heroGrid}>
                        {/* Left Column - Content */}
                        <div className={styles.heroContent}>
                            <span className={styles.heroBadge}>
                                ⚡ Auditoría y Diagnóstico de IA para Empresas
                            </span>

                            <h1 className={styles.heroTitle}>
                                Transforma tu Empresa con{" "}
                                <span className={styles.heroTitleAccent}>
                                    Inteligencia Artificial.
                                </span>{" "}
                                Menos Procesos Manuales, Más Resultados.
                            </h1>

                            <p className={styles.heroSubtitle}>
                                No implementes IA solo porque está de moda. Hazlo donde realmente
                                genera rentabilidad. Diagnosticamos tus operaciones, identificamos
                                cuellos de botella y diseñamos Agentes de IA a la medida de tu
                                negocio.
                            </p>

                            <div className={styles.heroCTAs}>
                                <button
                                    className={styles.ctaPrimary}
                                    onClick={() => scrollToSection("contacto")}
                                    id="hero-cta-diagnostico"
                                >
                                    Solicitar Diagnóstico de IA
                                    <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>arrow_forward</span>
                                </button>
                                <button
                                    className={styles.ctaSecondary}
                                    onClick={() => scrollToSection("soluciones")}
                                    id="hero-cta-soluciones"
                                >
                                    Ver soluciones
                                    <span className="material-symbols-outlined" style={{ fontSize: "1.1rem" }}>expand_more</span>
                                </button>
                            </div>

                            <div className={styles.heroStats}>
                                <div className={styles.heroStatItem}>
                                    <span className={styles.heroStatNumber}>50+</span>
                                    <span className={styles.heroStatLabel}>Implementaciones</span>
                                </div>
                                <div className={styles.heroStatDivider}></div>
                                <div className={styles.heroStatItem}>
                                    <span className={styles.heroStatNumber}>24/7</span>
                                    <span className={styles.heroStatLabel}>Soporte activo</span>
                                </div>
                                <div className={styles.heroStatDivider}></div>
                                <div className={styles.heroStatItem}>
                                    <span className={styles.heroStatNumber}>3x</span>
                                    <span className={styles.heroStatLabel}>ROI promedio</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Visual (Rotating premium light glow) */}
                        <div className={styles.heroVisual} aria-hidden="true">
                            <div className={styles.heroOrb}></div>
                            <div className={styles.heroOrbInner}>
                                <span className="material-symbols-outlined" style={{ fontSize: "4.5rem", color: "#0575e6", opacity: 0.9 }}>
                                    psychology
                                </span>
                            </div>
                            <div className={styles.heroOrbRing}></div>
                            <div className={styles.heroOrbRing2}></div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* SECTION 2: PAIN POINTS & AUDITORÍA */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                <section className={styles.sectionAlt} id="auditoria">
                    <div className={styles.sectionInner}>
                        <h2 className={styles.sectionTitle}>
                            ¿Cómo saber si tu empresa realmente necesita IA{" "}
                            <span className={styles.heroTitleAccent}>(y dónde implementarla)?</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Antes de escribir una sola línea de código, analizamos a fondo tu
                            negocio para asegurarnos de que cada solución tenga un impacto real
                            en tu facturación.
                        </p>

                        <div className={styles.processGrid}>
                            {/* Card 1 */}
                            <div className={styles.processCard}>
                                <div className={styles.processCardNumber}>01</div>
                                <div className={styles.processCardIconWrap}>
                                    <span className="material-symbols-outlined">manage_search</span>
                                </div>
                                <h3 className={styles.processCardTitle}>Auditoría de Procesos</h3>
                                <p className={styles.processCardText}>
                                    Evaluamos las tareas repetitivas en tus áreas de operaciones,
                                    servicio al cliente o ventas. Identificamos exactamente dónde
                                    la IA puede eliminar fricción y reducir costos.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className={styles.processCard}>
                                <div className={styles.processCardNumber}>02</div>
                                <div className={styles.processCardIconWrap}>
                                    <span className="material-symbols-outlined">database</span>
                                </div>
                                <h3 className={styles.processCardTitle}>Análisis de Datos</h3>
                                <p className={styles.processCardText}>
                                    Revisamos la disponibilidad y estructura de los datos de tu
                                    empresa — la materia prima que alimentará a la IA — para
                                    garantizar implementaciones efectivas.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className={styles.processCard}>
                                <div className={styles.processCardNumber}>03</div>
                                <div className={styles.processCardIconWrap}>
                                    <span className="material-symbols-outlined">route</span>
                                </div>
                                <h3 className={styles.processCardTitle}>Roadmap de Adopción</h3>
                                <p className={styles.processCardText}>
                                    Te entregamos un informe claro con las soluciones de IA
                                    prioritarias, el costo estimado y el ROI proyectado para que
                                    tomes decisiones informadas.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* SECTION 3: CATÁLOGO DE SOLUCIONES — BENTO GRID */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                <section className={styles.section} id="soluciones">
                    <div className={styles.sectionInner}>
                        <h2 className={styles.sectionTitle}>
                            De la Estrategia a la Realidad:{" "}
                            <span className={styles.heroTitleAccent}>Soluciones de IA a Medida</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Tras el diagnóstico, diseñamos e integramos las herramientas
                            tecnológicas que tu empresa necesita para escalar.
                        </p>

                        <div className={styles.bentoGrid}>
                            {/* Card 1 - Featured / Span 2 */}
                            <div className={`${styles.bentoCard} ${styles.bentoCardFeatured}`}>
                                <div className={styles.bentoCardGlow}></div>
                                <div className={styles.bentoCardIcon}>
                                    <span className="material-symbols-outlined">smart_toy</span>
                                </div>
                                <h3 className={styles.bentoCardTitle}>Agentes de IA Autónomos</h3>
                                <p className={styles.bentoCardText}>
                                    Automatizan flujos de trabajo complejos, analizan reportes,
                                    procesan documentos y toman decisiones basadas en tus reglas de
                                    negocio. Funcionan 24/7 sin intervención humana.
                                </p>
                                <div className={styles.bentoCardTags}>
                                    <span className={styles.bentoTag}>Automatización</span>
                                    <span className={styles.bentoTag}>Decisiones</span>
                                    <span className={styles.bentoTag}>24/7</span>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className={styles.bentoCard}>
                                <div className={styles.bentoCardGlow}></div>
                                <div className={styles.bentoCardIcon}>
                                    <span className="material-symbols-outlined">forum</span>
                                </div>
                                <h3 className={styles.bentoCardTitle}>
                                    Chatbots de Nueva Generación (RAG)
                                </h3>
                                <p className={styles.bentoCardText}>
                                    Asistentes virtuales entrenados con la información específica de
                                    tu empresa (manuales, catálogos, políticas) para atención al
                                    cliente 24/7 sin respuestas genéricas.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className={styles.bentoCard}>
                                <div className={styles.bentoCardGlow}></div>
                                <div className={styles.bentoCardIcon}>
                                    <span className="material-symbols-outlined">hub</span>
                                </div>
                                <h3 className={styles.bentoCardTitle}>
                                    Integración de Modelos LLM
                                </h3>
                                <p className={styles.bentoCardText}>
                                    Conectamos el potencial de herramientas como OpenAI, Anthropic o
                                    modelos Open Source directamente con tus sistemas internos (CRM,
                                    bases de datos o ERP).
                                </p>
                            </div>

                            {/* Card 4 */}
                            <div className={styles.bentoCard}>
                                <div className={styles.bentoCardGlow}></div>
                                <div className={styles.bentoCardIcon}>
                                    <span className="material-symbols-outlined">settings_suggest</span>
                                </div>
                                <h3 className={styles.bentoCardTitle}>
                                    Automatización de Workflows
                                </h3>
                                <p className={styles.bentoCardText}>
                                    Conectamos tus herramientas del día a día para que la información
                                    fluya sin intervención humana. Menos errores, más velocidad.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* SECTION 4: DIFERENCIADORES */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                <section className={styles.sectionAlt} id="diferenciadores">
                    <div className={styles.sectionInner}>
                        <h2 className={styles.sectionTitle}>
                            Por qué trabajar con{" "}
                            <span className={styles.heroTitleAccent}>Salazar Code</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            No somos una fábrica de software genérico. Somos tu aliado
                            estratégico en la adopción de inteligencia artificial.
                        </p>

                        <div className={styles.benefitsList}>
                            {/* Benefit 1 */}
                            <div className={styles.benefitItem}>
                                <div className={styles.benefitIcon}>
                                    <span className="material-symbols-outlined">trending_up</span>
                                </div>
                                <div>
                                    <h3 className={styles.benefitTitle}>
                                        Enfoque de Negocio, No Solo Técnico
                                    </h3>
                                    <p className={styles.benefitText}>
                                        Entendemos que la tecnología debe servir para facturar más o
                                        gastar menos. Cada solución se justifica con métricas reales
                                        de impacto en tu operación.
                                    </p>
                                </div>
                            </div>

                            {/* Benefit 2 */}
                            <div className={styles.benefitItem}>
                                <div className={styles.benefitIcon}>
                                    <span className="material-symbols-outlined">shield_lock</span>
                                </div>
                                <div>
                                    <h3 className={styles.benefitTitle}>
                                        Soluciones Seguras y Privadas
                                    </h3>
                                    <p className={styles.benefitText}>
                                        Garantizamos que los datos sensibles de tu empresa y de tus
                                        clientes permanezcan protegidos y no se usen para entrenar
                                        modelos públicos. Cumplimiento normativo incluido.
                                    </p>
                                </div>
                            </div>

                            {/* Benefit 3 */}
                            <div className={styles.benefitItem}>
                                <div className={styles.benefitIcon}>
                                    <span className="material-symbols-outlined">rocket_launch</span>
                                </div>
                                <div>
                                    <h3 className={styles.benefitTitle}>
                                        Arquitectura Escalable
                                    </h3>
                                    <p className={styles.benefitText}>
                                        Creamos sistemas que crecen con tu negocio, utilizando
                                        infraestructura moderna, limpia y fácil de mantener. Desde
                                        el primer MVP hasta operaciones enterprise.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* SECTION 5: FORMULARIO DE CAPTACIÓN */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                <section className={styles.ctaSection} id="contacto">
                    <div className={styles.sectionInner}>
                        <div className={styles.ctaContainer}>
                            <div className={styles.ctaContainerGlow}></div>

                            {/* Left — Persuasive text */}
                            <div className={styles.ctaLeft}>
                                <h2 className={styles.ctaTitle}>
                                    Deja de adivinar y empieza a{" "}
                                    <span className={styles.heroTitleAccent}>automatizar</span>
                                </h2>
                                <p className={styles.ctaText}>
                                    Agenda una sesión estratégica de 30 minutos. Evaluemos juntos
                                    el estado actual de tu empresa y descubramos dónde la
                                    Inteligencia Artificial puede ahorrarte horas de trabajo
                                    semanal.
                                </p>
                                <div className={styles.ctaFeatures}>
                                    <div className={styles.ctaFeatureItem}>
                                        <span className="material-symbols-outlined">check_circle</span>
                                        <span>Sesión gratuita de 30 minutos</span>
                                    </div>
                                    <div className={styles.ctaFeatureItem}>
                                        <span className="material-symbols-outlined">check_circle</span>
                                        <span>Diagnóstico inicial sin compromiso</span>
                                    </div>
                                    <div className={styles.ctaFeatureItem}>
                                        <span className="material-symbols-outlined">check_circle</span>
                                        <span>Plan de acción personalizado</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right — Form */}
                            <div className={styles.ctaRight}>
                                {formStatus === "success" ? (
                                    <div className={styles.formSuccess}>
                                        <span className="material-symbols-outlined" style={{ fontSize: "3rem", marginBottom: "1rem", display: "block" }}>
                                            check_circle
                                        </span>
                                        <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                                            ¡Solicitud enviada!
                                        </h3>
                                        <p>
                                            Nos comunicaremos contigo en las próximas 24 horas para
                                            agendar tu sesión de diagnóstico.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className={styles.form} id="form-consultoria-ia">
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel} htmlFor="consultoria-name">
                                                Nombre completo *
                                            </label>
                                            <input
                                                id="consultoria-name"
                                                className={styles.formInput}
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Tu nombre completo"
                                                required
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel} htmlFor="consultoria-email">
                                                Correo electrónico corporativo *
                                            </label>
                                            <input
                                                id="consultoria-email"
                                                className={styles.formInput}
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="tu@empresa.com"
                                                required
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel} htmlFor="consultoria-website">
                                                Sitio web de la empresa
                                            </label>
                                            <input
                                                id="consultoria-website"
                                                className={styles.formInput}
                                                type="url"
                                                name="website"
                                                value={formData.website}
                                                onChange={handleInputChange}
                                                placeholder="https://tuempresa.com"
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel} htmlFor="consultoria-bottleneck">
                                                ¿Cuál es el principal cuello de botella que quieres automatizar?
                                            </label>
                                            <textarea
                                                id="consultoria-bottleneck"
                                                className={styles.formTextarea}
                                                name="bottleneck"
                                                value={formData.bottleneck}
                                                onChange={handleInputChange}
                                                placeholder="Ej: Atención al cliente manual, generación de reportes, procesamiento de documentos..."
                                                rows={3}
                                            />
                                        </div>

                                        {formStatus === "error" && (
                                            <div className={styles.formError}>
                                                {errorMessage}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className={styles.formSubmitBtn}
                                            disabled={formStatus === "loading"}
                                            id="btn-submit-consultoria"
                                        >
                                            {formStatus === "loading" ? (
                                                "Enviando..."
                                            ) : (
                                                <>Quiero agendar mi sesión de diagnóstico 🚀</>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </Layout>
    );
}

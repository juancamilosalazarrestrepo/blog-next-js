import React, { useState } from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SLUG = "espionaje-openai-ia-microfono-oculto-ciberseguridad";
const KEYWORDS = [
  "espionaje empresarial OpenAI",
  "ciberseguridad e IA",
  "seguridad informática en empresas",
  "detección de amenazas internas",
  "Salazar Code",
  "consultoría en inteligencia artificial",
  "arquitectura de software segura",
  "insider risk",
  "Zero Trust",
];
const TITLE =
  "Espionaje en OpenAI: Cómo la Inteligencia Artificial Detectó un Micrófono Oculto y Qué Enseña sobre Ciberseguridad Corporativa";
const SEO_TITLE = "Espionaje en OpenAI: La IA que Detectó un Micrófono Oculto y las Lecciones para Empresas";
const SUBTITLE =
  "Descubre cómo OpenAI utilizó su propia IA para atrapar a un espía interno en sus oficinas. Analizamos el caso del FBI y cómo proteger tu arquitectura digital.";
const DATE = "14 de octubre de 2026";
const READ_TIME = "4 min de lectura";

const BLUE = "#0072ff";
const VIOLET = "#7c3aed";
const CYAN = "#0ea5e9";

const aiSteps = [
  {
    title: "Análisis forense acelerado",
    body: "Los equipos de seguridad alimentaron sus modelos con datos de logs, accesos físicos y especificaciones técnicas del hardware no autorizado.",
    color: BLUE,
  },
  {
    title: "Correlación de patrones",
    body: "La IA cruzó en cuestión de horas patrones de comportamiento, registros corporativos y datos de cámaras para señalar las discrepancias operativas.",
    color: VIOLET,
  },
  {
    title: "Respuesta guiada por IA",
    body: "Permitió recolectar pruebas contundentes que posteriormente fueron entregadas al FBI para la orden de arresto.",
    color: CYAN,
  },
];

const lessons = [
  {
    icon: "🏢",
    title: "El riesgo no es solo digital, es físico y humano",
    body: "Puedes contar con servidores fuertemente cifrados, pero si las conversaciones estratégicas o los flujos de desarrollo quedan expuestos físicamente, la cadena de seguridad se rompe. Implementar auditorías de acceso físico y gobernanza estricta es indispensable.",
  },
  {
    icon: "🛡️",
    title: "Arquitectura de Confianza Cero (Zero Trust)",
    body: "En el desarrollo de software y en la gestión de infraestructura cloud, la metodología Zero Trust exige validar continuamente cada solicitud, dispositivo y usuario dentro de la red corporativa. Ningún perfil, sin importar su rol, debe quedar exento de monitoreo.",
  },
  {
    icon: "🤖",
    title: "Integración de IA en la detección de amenazas",
    body: "Integrar agentes inteligentes y modelos de machine learning en tus plataformas de software permite detectar patrones anómalos de tráfico, accesos no autorizados o filtraciones de código antes de que causen daños irreparables.",
  },
];

const services = [
  {
    icon: "🧠",
    title: "Consultoría e Integración de IA",
    body: "Diseñamos e implementamos modelos y agentes de IA adaptados a los flujos de trabajo de tu empresa de forma segura.",
  },
  {
    icon: "⚙️",
    title: "Desarrollo de Software a la Medida",
    body: "Creación de aplicaciones web y móviles con arquitecturas limpias (Clean Architecture), enfocadas en rendimiento y protección de datos.",
  },
  {
    icon: "🔍",
    title: "Auditoría de Código y Arquitectura",
    body: "Evaluación de vulnerabilidades, optimización de APIs y aseguramiento de integraciones cloud.",
  },
];

const faqs = [
  {
    q: "¿Qué es un insider risk o amenaza interna?",
    a: "Es el riesgo que proviene de una persona con acceso legítimo a la organización, como un empleado o un contratista. En el caso de OpenAI, las barreras de cifrado y perimetrales eran elevadas, pero la amenaza venía de adentro.",
  },
  {
    q: "¿Qué significa Zero Trust en ciberseguridad?",
    a: "Es una metodología que exige validar de forma continua cada solicitud, dispositivo y usuario dentro de la red corporativa. Ningún perfil, sin importar su rol, queda exento de monitoreo.",
  },
  {
    q: "¿Cómo puede ayudar la IA a detectar amenazas internas?",
    a: "Los agentes inteligentes y los modelos de machine learning permiten detectar patrones anómalos de tráfico, accesos no autorizados o filtraciones de código antes de que causen daños irreparables, y cruzar logs, accesos y registros para facilitar el análisis forense.",
  },
];

const sources = [
  {
    label: "El FBI arrestó a un ingeniero de OpenAI por esconder un micrófono en una sala ejecutiva — Infobae",
    href: "https://www.infobae.com/tecno/2026/10/13/el-fbi-arresto-a-un-ingeniero-de-openai-por-esconder-un-microfono-en-una-sala-ejecutiva/",
  },
  {
    label: "OpenAI employee arrested over hidden listening device, company says — NBC News",
    href: "https://www.nbcnews.com/tech/tech-news/openai-employee-arrested-hidden-listening-device-company-says-rcna603262",
  },
];

const sectionTitle = {
  fontSize: "1.8rem",
  fontWeight: 800,
  color: "var(--ink)",
  textAlign: "center",
  marginBottom: "8px",
};

const sectionLead = {
  color: "var(--text-muted)",
  textAlign: "center",
  marginBottom: "40px",
  fontSize: "1rem",
  lineHeight: 1.6,
};

const card = {
  background: "var(--surface)",
  borderRadius: "20px",
  border: "1px solid var(--border)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
};

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--border)" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <span style={{ fontWeight: 600, color: "var(--ink)", fontSize: "1rem", lineHeight: 1.5 }}>{faq.q}</span>
        <span
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: open ? `linear-gradient(135deg, ${BLUE}, ${VIOLET})` : "var(--surface-3)",
            color: open ? "#fff" : "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "1.1rem",
            transition: "all 0.2s",
          }}
        >
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p style={{ color: "var(--text-soft)", lineHeight: 1.75, paddingBottom: "20px", margin: 0, fontSize: "0.97rem" }}>
          {faq.a}
        </p>
      )}
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || "es", ["common"])),
    },
  };
}

export default function EspionajeOpenAI() {
  return (
    <Layout>
      <SEO
        title={SEO_TITLE}
        description={SUBTITLE}
        image={`/images/${SLUG}.webp`}
        imageAlt={SEO_TITLE}
        type="article"
        date="2026-10-14"
        keywords={KEYWORDS}
        languages={["es"]}
      />

      {/* ── HERO ── */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: "420px", display: "flex", alignItems: "center" }}>
        <Image
          src={`/images/${SLUG}.webp`}
          alt="Profesional de ciberseguridad monitoreando un panel de detección de intrusiones con IA en una sala de reuniones"
          width={1280}
          height={500}
          priority
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(10,10,26,0.7) 0%, rgba(10,10,26,0.93) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, width: "100%", padding: "56px 0" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto", width: "100%", padding: "0 24px" }}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "18px" }}>
              {["Ciberseguridad", "Inteligencia Artificial", "Octubre 2026"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(0,114,255,0.25)",
                    border: "1px solid rgba(0,114,255,0.5)",
                    color: "#93c5fd",
                    borderRadius: "20px",
                    padding: "4px 14px",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1
              style={{
                fontSize: "clamp(1.5rem, 3.6vw, 2.3rem)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.25,
                marginBottom: "16px",
              }}
            >
              {TITLE}
            </h1>
            <p style={{ color: "#cbd5e1", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "24px", maxWidth: "700px" }}>
              {SUBTITLE}
            </p>
            <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${BLUE}, ${VIOLET})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                  }}
                >
                  👨‍💻
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.88rem" }}>Juan Camilo Salazar</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: "0.78rem" }}>{DATE}</div>
                </div>
              </div>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>·</span>
              <span style={{ color: "var(--text-subtle)", fontSize: "0.85rem" }}>⏱ {READ_TIME}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BANNER RESUMEN ── */}
      <div style={{ background: "linear-gradient(135deg, #0d1b4b, #1a1a2e)", padding: "40px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "var(--text-subtle)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "700px", margin: "0 auto" }}>
            El sector tecnológico acaba de presenciar un hito en materia de ciberseguridad corporativa y respuesta ante
            amenazas internas. El Departamento de Justicia de Estados Unidos y el FBI detuvieron a un ingeniero de OpenAI
            tras descubrirse un dispositivo de grabación oculto en una sala de reuniones ejecutivas en San Francisco.{" "}
            <strong style={{ color: "#e2e8f0" }}>
              Lo más llamativo: la compañía utilizó sus propios modelos de Inteligencia Artificial para investigar el
              origen del dispositivo e identificar al sospechoso.
            </strong>
          </p>
          <div style={{ display: "flex", gap: "40px", justifyContent: "center", marginTop: "32px", flexWrap: "wrap" }}>
            {[
              { num: "Sala ejecutiva", label: "Dónde apareció el dispositivo" },
              { num: "IA propia", label: "Cómo se investigó" },
              { num: "FBI", label: "Quién realizó la detención" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    background: `linear-gradient(135deg, #60a5fa, #a78bfa)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.num}
                </div>
                <div style={{ color: "var(--text-subtle)", fontSize: "0.82rem", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EL CASO ── */}
      <div style={{ background: "var(--surface)", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>El caso OpenAI: cuando la amenaza viene de adentro</h2>
          <p style={sectionLead}>Un dispositivo pequeño, un puerto USB y un riesgo que ningún cifrado podía frenar.</p>

          <div style={{ ...card, padding: "32px", marginBottom: "48px" }}>
            <p style={{ color: "var(--text-soft)", lineHeight: 1.8, margin: 0, fontSize: "1rem" }}>
              El dispositivo —de tamaño reducido y conectado al puerto USB de un televisor ejecutivo— tenía como
              objetivo interceptar discusiones estratégicas y confidenciales sobre modelos de IA y código fuente.
              Aunque las barreras de cifrado digital y perimetral de OpenAI eran elevadas, el riesgo real provino de un
              factor interno (un <em>insider risk</em>).
            </p>
          </div>

          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--ink)", textAlign: "center", marginBottom: "28px" }}>
            ¿Cómo ayudó la Inteligencia Artificial a resolver el espionaje?
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {aiSteps.map((s, i) => (
              <div key={s.title} style={{ ...card, padding: "28px 24px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: s.color,
                    color: "#fff",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  {i + 1}
                </div>
                <h4 style={{ margin: "0 0 10px", color: "var(--ink)", fontWeight: 700, fontSize: "1.05rem" }}>{s.title}</h4>
                <p style={{ margin: 0, color: "var(--text-soft)", lineHeight: 1.7, fontSize: "0.94rem" }}>{s.body}</p>
              </div>
            ))}
          </div>

          <blockquote
            style={{
              margin: "48px 0 0",
              padding: "28px 32px",
              borderLeft: `4px solid ${BLUE}`,
              background: "var(--surface-2)",
              borderRadius: "0 16px 16px 0",
              color: "var(--ink)",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              fontWeight: 600,
              fontStyle: "italic",
            }}
          >
            “La Inteligencia Artificial ya no solo representa el activo intangible más valioso de una empresa
            tecnológica; se ha convertido en la primera línea de defensa activa para detectar anomalías en tiempo real.”
          </blockquote>
        </div>
      </div>

      {/* ── LECCIONES ── */}
      <div style={{ background: "var(--surface-2)", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>3 lecciones de ciberseguridad para startups y empresas de software</h2>
          <p style={sectionLead}>
            El incidente demuestra que los esquemas tradicionales ya no bastan cuando se maneja información privilegiada
            o modelos propietarios.
          </p>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                position: "absolute",
                left: "27px",
                top: "40px",
                bottom: "40px",
                width: "2px",
                background: `linear-gradient(to bottom, ${BLUE}, ${VIOLET}, ${CYAN})`,
              }}
            />
            {lessons.map((l, i) => (
              <div key={l.title} style={{ position: "relative", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div
                  style={{
                    flexShrink: 0,
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${[BLUE, VIOLET, CYAN][i]}, #0d1b4b)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    zIndex: 1,
                    border: "3px solid var(--surface-2)",
                  }}
                >
                  {l.icon}
                </div>
                <div style={{ ...card, padding: "24px", flex: 1, minWidth: 0 }}>
                  <div style={{ color: BLUE, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.06em", marginBottom: "6px" }}>
                    LECCIÓN {i + 1}
                  </div>
                  <h3 style={{ margin: "0 0 10px", color: "var(--ink)", fontWeight: 700, fontSize: "1.1rem" }}>{l.title}</h3>
                  <p style={{ margin: 0, color: "var(--text-soft)", lineHeight: 1.75, fontSize: "0.96rem" }}>{l.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SALAZAR CODE ── */}
      <div style={{ background: "var(--surface)", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>Fortalece la seguridad y la arquitectura digital de tu empresa</h2>
          <p style={sectionLead}>
            En Salazar Code ayudamos a empresas, startups y organizaciones a construir soluciones digitales robustas,
            escalables y seguras, diseñando la arquitectura desde sus cimientos bajo estándares estrictos de ingeniería
            de software.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {services.map((s) => (
              <div key={s.title} style={{ ...card, padding: "28px 24px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{s.icon}</div>
                <h3 style={{ margin: "0 0 10px", color: "var(--ink)", fontWeight: 700, fontSize: "1.05rem" }}>{s.title}</h3>
                <p style={{ margin: 0, color: "var(--text-soft)", lineHeight: 1.7, fontSize: "0.94rem" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ background: "var(--surface-2)", padding: "72px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ ...sectionTitle, marginBottom: "40px" }}>Preguntas Frecuentes</h2>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} />
          ))}

          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", margin: "56px 0 14px" }}>Fuentes</h3>
          <ul style={{ margin: 0, paddingLeft: "20px", color: "var(--text-soft)", lineHeight: 1.9, fontSize: "0.9rem" }}>
            {sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--brand)" }}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: "var(--surface)", padding: "72px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)",
              borderRadius: "24px",
              padding: "48px 40px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>🔐</div>
            <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, marginBottom: "12px" }}>
              Protege tus proyectos e impulsa tu innovación
            </h2>
            <p style={{ color: "var(--text-subtle)", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto 32px" }}>
              La innovación y la ciberseguridad van de la mano. Si buscas desarrollar software empresarial, integrar IA
              en tus procesos o auditar la seguridad de tus sistemas, agenda una{" "}
              <strong style={{ color: "#93c5fd" }}>consultoría estratégica</strong> con Salazar Code.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="/contact"
                style={{
                  background: `linear-gradient(135deg, ${BLUE}, #0d47a1)`,
                  color: "#fff",
                  fontWeight: 700,
                  padding: "14px 32px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  display: "inline-block",
                }}
              >
                Contáctanos hoy →
              </a>
              <a
                href="/blog"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#e2e8f0",
                  fontWeight: 600,
                  padding: "14px 32px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  display: "inline-block",
                }}
              >
                Ver más artículos
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

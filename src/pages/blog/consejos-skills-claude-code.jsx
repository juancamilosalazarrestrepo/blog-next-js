import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const SLUG = "consejos-skills-claude-code";
const TITLE = "10 Consejos para Crear Skills para Claude Code que Realmente Funcionan";
const SUBTITLE =
  "Los 10 errores más comunes al crear skills para Claude Code y cómo solucionarlos: triggers, estructura, ejemplos y versionado.";
const DATE = "2 de junio de 2026";
const READ_TIME = "8 min de lectura";

const tips = [
  {
    num: "01",
    title: "Empieza por el trigger, no por el contenido",
    color: "#0072ff",
    icon: "⚡",
    body: "La descripción del skill (campo description en el frontmatter YAML) es el mecanismo de activación. Claude la lee para decidir si el skill es relevante. Si es genérica, el skill no se activa.",
    bad: "description: Ayuda a editar documentos de Word.",
    good: "description: Activa este skill cuando el usuario mencione archivos .docx, 'editar Word', 'documento Word', 'abrir documento' o cualquier tarea que involucre crear, modificar o leer archivos de Microsoft Word.",
  },
  {
    num: "02",
    title: "Instrúyele a Claude que lea el skill antes de ejecutar",
    color: "#7c3aed",
    icon: "📖",
    body: "Que el SKILL.md exista no garantiza que Claude lo consulte. Debes decirlo explícitamente al inicio del cuerpo del skill.",
    good: "## Instrucción crítica\n\nAntes de escribir cualquier línea de código, crear archivos o ejecutar comandos, lee este SKILL.md completo. Esta instrucción es obligatoria.",
  },
  {
    num: "03",
    title: "Estructura el SKILL.md con secciones claras",
    color: "#0ea5e9",
    icon: "🗂️",
    body: "Claude escanea los documentos, no los lee linealmente. Los encabezados H2/H3 funcionan como índice — Claude salta a la sección relevante.",
    good: "## Cuándo usar este skill\n## Qué hace este skill\n## Fuera de scope\n## Proceso paso a paso\n## Ejemplos\n## Errores comunes",
  },
  {
    num: "04",
    title: "Incluye explícitamente qué NO hace el skill",
    color: "#10b981",
    icon: "🚫",
    body: "Sin la sección 'Fuera de scope', Claude intenta resolver con el skill tareas para las que no fue diseñado, generando resultados impredecibles.",
    good: "## Fuera de scope\n\n- Archivos PDF (usa el skill `pdf`)\n- Google Docs (requiere integración Drive)\n- Presentaciones PowerPoint (usa `pptx`)",
  },
  {
    num: "05",
    title: "Pon ejemplos reales de input → output",
    color: "#f59e0b",
    icon: "💡",
    body: "Un ejemplo concreto vale más que diez líneas de instrucción abstracta. Claude aprende por demostración.",
    good: '**Input:** "Arregla los errores de gramática en mi documento"\n**Output esperado:** Claude lee el .docx, corrige errores, guarda la versión editada en /mnt/user-data/outputs/\n\n**Qué NO hacer:** No devolver el texto en el chat — siempre modificar el archivo directamente.',
  },
  {
    num: "06",
    title: "Nombra el skill con la acción o el formato",
    color: "#ef4444",
    icon: "🏷️",
    body: "El nombre del skill influye en cómo Claude lo busca y referencia. Un nombre ambiguo genera confusión.",
    bad: "word-handler · document-processor · slide-maker · data-tool",
    good: "docx · pdf · pptx · xlsx · markdown-article",
  },
  {
    num: "07",
    title: "Un skill, una responsabilidad",
    color: "#8b5cf6",
    icon: "🎯",
    body: "Un 'super-skill' que maneje todo se activa de forma impredecible. Señal de alerta: más de 5 contextos distintos en 'Cuándo usar este skill'.",
    good: "## Skills relacionados\n\n- Para PDFs → usa el skill `pdf`\n- Para presentaciones → usa el skill `pptx`\n- Para hojas de cálculo → usa el skill `xlsx`",
  },
  {
    num: "08",
    title: "Prueba con casos límite antes de dar el skill por terminado",
    color: "#06b6d4",
    icon: "🧪",
    body: "Un skill que funciona solo con el caso ideal es un skill frágil. Prueba estos escenarios.",
    good: '✓ Peticiones ambiguas: "arregla esto" (sin especificar archivo)\n✓ Inglés mezclado: "fix my documento de Word"\n✓ Typos: "crear un docuemnto"\n✓ Conversación larga con contexto acumulado\n✓ Arranque desde cero con pedido directo',
  },
  {
    num: "09",
    title: "Versiona tu SKILL.md como si fuera código",
    color: "#f97316",
    icon: "🔖",
    body: "Sin versionado, cuando algo deja de funcionar no sabes qué cambió. Tres líneas de contexto histórico pueden ahorrarte horas de debugging.",
    good: "---\nname: docx\nversion: 1.3\nlast_updated: 2025-06\n---\n\n## Changelog\n- v1.3 — Agregada instrucción para imágenes en base64\n- v1.2 — Corregido trigger para rutas de red\n- v1.0 — Versión inicial",
  },
  {
    num: "10",
    title: "Documenta el 'por qué' de tus decisiones",
    color: "#84cc16",
    icon: "📝",
    body: "El SKILL.md no es solo instrucción para Claude — es documentación para ti en el futuro. Cuando edites el skill tres meses después, necesitarás entender por qué tomaste ciertas decisiones.",
    good: "1. Lee el archivo con `view` antes de modificar\n   *(razón: evita sobreescribir contenido existente relevante)*\n\n2. Guarda en /mnt/user-data/outputs/, nunca en /tmp/\n   *(razón: /tmp/ no persiste entre sesiones)*",
  },
];

const checklist = [
  "La description menciona palabras clave, tipos de archivo y contextos específicos",
  "El SKILL.md instruye a Claude a leerlo antes de ejecutar",
  "Hay secciones claras con H2/H3",
  "Existe una sección 'Fuera de scope'",
  "Hay al menos 2-3 ejemplos de input → output esperado",
  "El nombre refleja la acción o formato, no la función interna",
  "El skill tiene una sola responsabilidad bien definida",
  "Lo probaste con peticiones ambiguas, en inglés y con typos",
  "El frontmatter incluye versión y fecha",
  "Las decisiones no obvias tienen comentarios explicativos",
];

const faqs = [
  {
    q: "¿Por qué Claude no activa mi skill aunque el contenido es perfecto?",
    a: "El problema casi siempre está en la description del frontmatter YAML, no en el contenido. Claude decide si usar el skill basándose en esa descripción. Si es genérica o no menciona las palabras clave que el usuario usará, el skill no se activa. Ajusta la description antes que cualquier otra cosa.",
  },
  {
    q: "¿Cuántos skills puedo tener sin que interfieran entre sí?",
    a: "No hay un límite técnico, pero la claridad sí tiene límites prácticos. Con skills bien nombrados y descripciones específicas y distintas entre sí, puedes tener decenas sin conflicto. El problema surge cuando dos skills tienen descriptions que se solapan para los mismos contextos.",
  },
  {
    q: "¿Debo incluir ejemplos en todos los skills?",
    a: "Sí, especialmente para skills que producen archivos o tienen un output específico. Para skills de consulta o análisis, al menos un ejemplo del input esperado y del formato de respuesta. Los ejemplos son la forma más efectiva de calibrar el comportamiento de Claude.",
  },
  {
    q: "¿Qué pasa si mi skill tiene que manejar muchos formatos diferentes?",
    a: "Es señal de que necesitas dividirlo. Crea un skill por formato o dominio principal, y usa referencias cruzadas entre ellos. Un skill enfocado se activa más consistentemente y produce resultados más predecibles que uno que intenta cubrirlo todo.",
  },
  {
    q: "¿Cómo sé si mi skill realmente mejoró después de un cambio?",
    a: "Prueba siempre el mismo conjunto de casos: el caso ideal, una petición ambigua, una con typo y una en inglés mezclado con español. Si los cuatro funcionan, el skill es robusto. Si solo funciona el caso ideal, sigue ajustando la description.",
  },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid #e5e7eb",
        transition: "all 0.2s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
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
        <span style={{ fontWeight: 600, color: "#1a1a2e", fontSize: "1rem", lineHeight: 1.5 }}>
          {faq.q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: open ? "linear-gradient(135deg, #0072ff, #7c3aed)" : "#f1f5f9",
            color: open ? "#fff" : "#64748b",
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
        <p
          style={{
            color: "#4b5563",
            lineHeight: 1.75,
            paddingBottom: "20px",
            margin: 0,
            fontSize: "0.97rem",
          }}
        >
          {faq.a}
        </p>
      )}
    </div>
  );
}

function CodeBlock({ code, label }) {
  return (
    <div style={{ marginTop: "12px" }}>
      {label && (
        <span
          style={{
            display: "inline-block",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: label === "✗ Mal" ? "#ef4444" : "#10b981",
            marginBottom: "6px",
          }}
        >
          {label}
        </span>
      )}
      <pre
        style={{
          background: "#0f172a",
          borderRadius: "10px",
          padding: "14px 18px",
          margin: 0,
          fontSize: "0.82rem",
          color: "#e2e8f0",
          overflowX: "auto",
          lineHeight: 1.65,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {code}
      </pre>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['common'])),
    },
  };
}

export default function ConsejosSkillsClaudeCode() {
  return (
    <Layout>
      <Head>
        <title>{TITLE} | Juan Camilo Salazar</title>
        <meta name="description" content={SUBTITLE} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={SUBTITLE} />
        <meta property="og:image" content={`/images/${SLUG}.webp`} />
        <meta property="article:published_time" content="2026-06-02" />
        <meta
          name="keywords"
          content="Claude Code, skills Claude Code, crear skills IA, workflow IA, SKILL.md, Anthropic, agentes IA 2026"
        />
      </Head>

      {/* ── HERO ── */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: "420px" }}>
        <Image
          src={`/images/${SLUG}.webp`}
          alt="10 Consejos para crear skills para Claude Code"
          width={1280}
          height={500}
          priority
          style={{
            width: "100%",
            height: "420px",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(10,10,26,0.55) 0%, rgba(10,10,26,0.92) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{ maxWidth: "860px", margin: "0 auto", width: "100%", padding: "0 24px" }}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "18px" }}>
              {["Claude Code", "Skills IA", "Productividad"].map((tag) => (
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
                fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.2,
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
                    background: "linear-gradient(135deg, #0072ff, #7c3aed)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                  }}
                >
                  🤖
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.88rem" }}>Ruva IA</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.78rem" }}>{DATE}</div>
                </div>
              </div>
              <span style={{ color: "#64748b", fontSize: "0.85rem" }}>·</span>
              <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>⏱ {READ_TIME}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BANNER RESUMEN ── */}
      <div style={{ background: "linear-gradient(135deg, #0d1b4b, #1a1a2e)", padding: "40px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.75, maxWidth: "680px", margin: "0 auto" }}>
            Llevas tiempo construyendo tu workflow perfecto, documentas todo en un{" "}
            <code style={{ background: "rgba(0,114,255,0.15)", color: "#93c5fd", padding: "2px 8px", borderRadius: "6px", fontSize: "0.9rem" }}>
              SKILL.md
            </code>{" "}
            impecable, y cuando lo necesitas… Claude improvisa como si el skill no existiera. Estos son los 10 problemas y sus soluciones.
          </p>
          <div style={{ display: "flex", gap: "32px", justifyContent: "center", marginTop: "32px", flexWrap: "wrap" }}>
            {[
              { num: "10", label: "Consejos accionables" },
              { num: "5", label: "Errores de trigger" },
              { num: "8", label: "Min de lectura" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0072ff" }}>{s.num}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.82rem", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONSEJOS ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: 800,
              color: "#1a1a2e",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            Los 10 Consejos
          </h2>
          <p style={{ color: "#6b7280", textAlign: "center", marginBottom: "56px", fontSize: "1rem" }}>
            Ordenados de mayor a menor impacto en la tasa de activación
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {tips.map((tip) => (
              <div
                key={tip.num}
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  padding: "32px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Accent line */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "4px",
                    background: tip.color,
                    borderRadius: "4px 0 0 4px",
                  }}
                />
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: "52px",
                      height: "52px",
                      borderRadius: "14px",
                      background: `${tip.color}18`,
                      border: `2px solid ${tip.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                    }}
                  >
                    {tip.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: tip.color,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        #{tip.num}
                      </span>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "#1a1a2e",
                          lineHeight: 1.3,
                        }}
                      >
                        {tip.title}
                      </h3>
                    </div>
                    <p style={{ color: "#4b5563", lineHeight: 1.7, fontSize: "0.97rem", marginBottom: "16px" }}>
                      {tip.body}
                    </p>
                    {tip.bad && <CodeBlock code={tip.bad} label="✗ Mal" />}
                    {tip.good && <CodeBlock code={tip.good} label="✓ Bien" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CHECKLIST ── */}
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: 800,
              color: "#1a1a2e",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            Checklist de 10 Puntos
          </h2>
          <p style={{ color: "#6b7280", textAlign: "center", marginBottom: "40px" }}>
            Verifica esto antes de dar un skill por terminado
          </p>
          <div
            style={{
              background: "linear-gradient(135deg, #f0f7ff, #f5f3ff)",
              border: "1px solid #dbeafe",
              borderRadius: "20px",
              padding: "32px",
            }}
          >
            {checklist.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  padding: "12px 0",
                  borderBottom: i < checklist.length - 1 ? "1px solid #e0e7ff" : "none",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: "22px",
                    height: "22px",
                    borderRadius: "6px",
                    border: "2px solid #0072ff",
                    marginTop: "1px",
                  }}
                />
                <span style={{ color: "#1e293b", fontSize: "0.95rem", lineHeight: 1.5 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: 800,
              color: "#1a1a2e",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            Preguntas Frecuentes
          </h2>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} />
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)",
              borderRadius: "24px",
              padding: "48px 40px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>🤖</div>
            <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, marginBottom: "12px" }}>
              ¿Tienes un skill que no funciona como esperas?
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>
              El siguiente nivel es aprender a usar la{" "}
              <strong style={{ color: "#93c5fd" }}>skill-creator</strong> — la skill de Claude Code para crear y optimizar otras skills con evals automatizados.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="/blog"
                style={{
                  background: "linear-gradient(135deg, #0072ff, #0d47a1)",
                  color: "#fff",
                  fontWeight: 700,
                  padding: "14px 32px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  display: "inline-block",
                }}
              >
                Ver más artículos →
              </a>
              <a
                href="/"
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
                Contactar
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

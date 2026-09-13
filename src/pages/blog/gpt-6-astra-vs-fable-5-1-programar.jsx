import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SLUG = "gpt-6-astra-vs-fable-5-1-programar";
const TITLE = "GPT-6 Astra vs Claude Fable 5.1: ¿qué modelo conviene para programar en 2026?";
const SUBTITLE =
  "Comparamos GPT-6 Astra y Claude Fable 5.1 para programar: benchmarks independientes, precios, contexto y en qué casos conviene cada modelo en 2026.";
const DATE = "12 de septiembre de 2026";
const READ_TIME = "9 min de lectura";

const ASTRA = "#10b981";
const FABLE = "#f59e0b";

const specs = [
  { label: "Lanzamiento", astra: "3 sept 2026", fable: "1 sept 2026" },
  { label: "ID en la API", astra: "gpt-6-astra", fable: "claude-fable-5-1", mono: true },
  { label: "Contexto", astra: "~1,05M tokens", fable: "1M tokens" },
  { label: "Salida máxima", astra: "128K tokens", fable: "128K tokens" },
  { label: "Entrada / salida (por millón)", astra: "$10 / $50", fable: "$10 / $50" },
  { label: "Lectura de caché (por millón)", astra: "$1", fable: "$0,25", win: "fable" },
  { label: "Agente de código propio", astra: "Codex", fable: "Claude Code" },
  { label: "Otras plataformas", astra: "ChatGPT, Amazon Bedrock", fable: "Bedrock, Google Cloud, Foundry, GitHub Copilot" },
];

const benchmarks = [
  { name: "Coding Agent Index", source: "Independiente", astra: 62, fable: 62, max: 100, unit: "" },
  { name: "Terminal-Bench 4.0", source: "Independiente", astra: 59, fable: 52, max: 100, unit: "%" },
  { name: "Terminal-Bench 4.0", source: "OpenAI", astra: 57.7, fable: 55.8, max: 100, unit: "%" },
  { name: "DeepSWE v1.1", source: "OpenAI", astra: 74.1, fable: 67.4, max: 100, unit: "%" },
  { name: "Humanity's Last Exam (con herramientas)", source: "OpenAI", astra: 57.2, fable: 65.0, max: 100, unit: "%" },
];

const costRows = [
  { label: "Entrada nueva (200K)", astra: "$2,00", fable: "$2,00" },
  { label: "Lectura de caché (1,8M)", astra: "$1,80", fable: "$0,45" },
  { label: "Salida", astra: "$1,35 (27K)", fable: "$3,90 (78K)" },
];

const choose = [
  {
    model: "GPT-6 Astra",
    color: ASTRA,
    icon: "⚡",
    tagline: "El mejor resultado por dólar",
    items: [
      "Pagas la API de tu bolsillo y cada tarea cuenta",
      "Trabajas mucho en terminal: scripts, DevOps, CI, migraciones",
      "Ya usas ChatGPT o Codex a diario",
      "Necesitas velocidad: el modo Fast va hasta 2,5× más rápido (al doble de precio)",
    ],
  },
  {
    model: "Claude Fable 5.1",
    color: FABLE,
    icon: "🧠",
    tagline: "Para lo largo, ambiguo y difícil",
    items: [
      "Refactors grandes y migraciones de varios archivos",
      "Bugs difíciles donde un error confiado sale caro",
      "Ya trabajas en Claude Code o GitHub Copilot",
      "Sesiones de horas con mucho contexto en caché",
    ],
  },
];

const migration = [
  {
    title: "No acepta tool_choice forzado",
    body: "Con Fable 5.1, tool_choice de tipo \"any\" o \"tool\" devuelve un error 400. Usa \"auto\" con strict: true o salidas estructuradas.",
  },
  {
    title: "El historial solo crece hacia adelante",
    body: "Editar mensajes anteriores invalida los bloques de razonamiento. Claude Code y el Agent SDK lo manejan por ti; si armas el array de mensajes a mano, revísalo.",
  },
  {
    title: "Tiende a reescribir archivos completos",
    body: "En cambios pequeños puede reescribir todo el archivo. Pídele ediciones puntuales y ahorrarás tokens de salida.",
  },
  {
    title: "Esfuerzo por mensaje (beta)",
    body: "Puedes subir el nivel de esfuerzo para un paso difícil y bajarlo para los rutinarios sin perder la caché.",
  },
];

const codeAstra = `import OpenAI from "openai";

const client = new OpenAI();

const res = await client.responses.create({
  model: "gpt-6-astra",
  input: "Refactoriza este hook de React para evitar renders extra: ...",
});

console.log(res.output_text);`;

const codeFable = `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const msg = await client.messages.create({
  model: "claude-fable-5-1",
  max_tokens: 16000,
  messages: [
    { role: "user", content: "Refactoriza este hook de React para evitar renders extra: ..." },
  ],
});

for (const block of msg.content) {
  if (block.type === "text") console.log(block.text);
}`;

const alternatives = [
  { name: "Claude Opus 5", price: "$5 / $25", note: "Anthropic recomienda empezar aquí y subir a Fable solo si hace falta." },
  { name: "Claude Sonnet 5", price: "$2 / $10", note: "Rápido para autocompletar y cambios pequeños." },
  { name: "Muse Glimmer (Meta)", price: "Pesos abiertos", note: "30B parámetros, corre sin internet en una GPU de 24 GB." },
];

const faqs = [
  {
    q: "¿Cuál es mejor para programar, GPT-6 Astra o Claude Fable 5.1?",
    a: "En calidad de código están empatados: los dos marcan 62 en el Coding Agent Index de Artificial Analysis. Astra gana en tareas de terminal y gasta menos tokens; Fable 5.1 gana en razonamiento difícil y en tareas largas con muchos pasos.",
  },
  {
    q: "Si cuestan lo mismo por token, ¿por qué uno sale más barato?",
    a: "Porque la salida es lo más caro y Astra escribe cerca de un tercio de los tokens que usa Fable 5.1 para llegar al mismo resultado. Fable compensa algo con una lectura de caché más barata ($0,25 frente a $1 por millón), pero en la mayoría de tareas Astra sale más económico.",
  },
  {
    q: "¿Puedo usar Claude Fable 5.1 en GitHub Copilot?",
    a: "Sí. GitHub anunció el 1 de septiembre de 2026 que Fable 5.1 está disponible de forma general en Copilot. Ten en cuenta que requiere retención de datos por defecto, salvo para algunos clientes empresariales.",
  },
  {
    q: "¿Necesito uno de estos modelos para el trabajo diario?",
    a: "Casi nunca. Para autocompletar, tests y cambios pequeños, modelos como Claude Opus 5 o Sonnet 5 rinden muy bien por mucho menos dinero. Guarda los modelos de frontera para las tareas donde de verdad marcan diferencia.",
  },
  {
    q: "¿Qué tan confiables son estos benchmarks?",
    a: "Sirven para ver tendencias, no para decidir solos. Cada empresa publica las pruebas donde le va mejor, por eso en este artículo separamos los datos independientes de los publicados por OpenAI y Anthropic. Lo más fiable es probar ambos una semana con tu propio repositorio.",
  },
];

const sources = [
  { label: "Claude Fable 5.1 — Claude Platform Docs", href: "https://platform.claude.com/docs/en/models/fable-5-1/overview" },
  { label: "What's new in Claude Fable 5.1", href: "https://platform.claude.com/docs/en/models/fable-5-1/whats-new-fable-5-1" },
  { label: "Benchmarking GPT-6 Astra — Artificial Analysis", href: "https://artificialanalysis.ai/articles/benchmarking-gpt-6-astra" },
  { label: "GPT-6 Astra: Features, Benchmarks, and Pricing — DataCamp", href: "https://www.datacamp.com/blog/gpt-6-astra" },
  { label: "GPT-6 Astra Benchmarks Explained — Vellum", href: "https://www.vellum.ai/blog/gpt-6-astra-benchmarks-explained" },
  { label: "Claude Fable 5.1: Same Sticker, Cheaper Cache — LLM Stats", href: "https://llm-stats.com/blog/research/claude-fable-5-1-launch" },
  { label: "Claude Fable 5.1 en GitHub Copilot — GitHub Changelog", href: "https://github.blog/changelog/2026-09-01-claude-fable-5-1-generally-available-in-github-copilot/" },
];

const sectionTitle = {
  fontSize: "1.8rem",
  fontWeight: 800,
  color: "#1a1a2e",
  textAlign: "center",
  marginBottom: "8px",
};

const sectionLead = {
  color: "#6b7280",
  textAlign: "center",
  marginBottom: "40px",
  fontSize: "1rem",
  lineHeight: 1.6,
};

const card = {
  background: "#fff",
  borderRadius: "20px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
};

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e5e7eb" }}>
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
        <span style={{ fontWeight: 600, color: "#1a1a2e", fontSize: "1rem", lineHeight: 1.5 }}>{faq.q}</span>
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
        <p style={{ color: "#4b5563", lineHeight: 1.75, paddingBottom: "20px", margin: 0, fontSize: "0.97rem" }}>
          {faq.a}
        </p>
      )}
    </div>
  );
}

function CodeBlock({ code, label, color }) {
  return (
    <div style={{ ...card, overflow: "hidden", minWidth: 0 }}>
      <div
        style={{
          padding: "12px 18px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: color }} />
        <span style={{ fontWeight: 700, color: "#1a1a2e", fontSize: "0.92rem" }}>{label}</span>
      </div>
      <pre
        style={{
          background: "#0f172a",
          padding: "18px",
          margin: 0,
          fontSize: "0.8rem",
          color: "#e2e8f0",
          overflowX: "auto",
          lineHeight: 1.65,
        }}
      >
        {code}
      </pre>
    </div>
  );
}

function BenchmarkBar({ value, max, color, unit, winner }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{ flex: 1, height: "10px", background: "#f1f5f9", borderRadius: "10px", overflow: "hidden" }}>
        <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: "10px" }} />
      </div>
      <span
        style={{
          width: "56px",
          textAlign: "right",
          fontWeight: winner ? 800 : 600,
          color: winner ? "#1a1a2e" : "#6b7280",
          fontSize: "0.9rem",
        }}
      >
        {String(value).replace(".", ",")}
        {unit}
      </span>
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

export default function GptAstraVsFable() {
  return (
    <Layout>
      <Head>
        <title>{`${TITLE} | Juan Camilo Salazar`}</title>
        <meta name="description" content={SUBTITLE} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={SUBTITLE} />
        <meta property="og:image" content={`/images/${SLUG}.webp`} />
        <meta property="article:published_time" content="2026-09-12" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="keywords"
          content="GPT-6 Astra, Claude Fable 5.1, GPT-6 Astra vs Fable 5.1, mejor modelo de IA para programar 2026, Claude Code, OpenAI Codex, benchmarks IA programación, precio API modelos IA"
        />
      </Head>

      {/* ── HERO ── */}
      {/* La imagen va de fondo y el texto en flujo normal, así el hero crece en móvil en vez de recortarse */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: "420px", display: "flex", alignItems: "center" }}>
        <Image
          src={`/images/${SLUG}.webp`}
          alt="Comparativa GPT-6 Astra vs Claude Fable 5.1 para programar"
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
              {["Modelos de IA", "Comparativa", "Septiembre 2026"].map((tag) => (
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
                  👨‍💻
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.88rem" }}>Juan Camilo Salazar</div>
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
            En menos de una semana salieron los dos modelos más potentes del momento. Cobran lo mismo por token, manejan
            un millón de tokens de contexto y los dos dicen ser el mejor para programar.{" "}
            <strong style={{ color: "#e2e8f0" }}>
              La respuesta corta: en calidad de código están empatados. La diferencia está en el costo por tarea y en
              cómo trabajan dentro de un agente.
            </strong>
          </p>
          <div style={{ display: "flex", gap: "40px", justifyContent: "center", marginTop: "32px", flexWrap: "wrap" }}>
            {[
              { num: "62 = 62", label: "Coding Agent Index" },
              { num: "$10 / $50", label: "Mismo precio por millón" },
              { num: "~⅓", label: "Tokens de salida de Astra vs Fable" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0072ff" }}>{s.num}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.82rem", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FICHA TÉCNICA ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>Ficha técnica</h2>
          <p style={sectionLead}>Lo básico de cada modelo, con datos de la documentación oficial</p>
          <div style={{ ...card, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}>
              <thead>
                <tr style={{ background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)" }}>
                  <th style={{ padding: "16px 20px", textAlign: "left", color: "#94a3b8", fontSize: "0.8rem", fontWeight: 600 }} />
                  <th style={{ padding: "16px 20px", textAlign: "left", color: ASTRA, fontSize: "0.95rem", fontWeight: 800 }}>
                    GPT-6 Astra
                  </th>
                  <th style={{ padding: "16px 20px", textAlign: "left", color: FABLE, fontSize: "0.95rem", fontWeight: 800 }}>
                    Claude Fable 5.1
                  </th>
                </tr>
              </thead>
              <tbody>
                {specs.map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 ? "#f8fafc" : "#fff" }}>
                    <td style={{ padding: "14px 20px", color: "#6b7280", fontSize: "0.88rem", fontWeight: 600 }}>{row.label}</td>
                    {["astra", "fable"].map((m) => (
                      <td
                        key={m}
                        style={{
                          padding: "14px 20px",
                          color: "#1a1a2e",
                          fontSize: "0.92rem",
                          fontFamily: row.mono ? "Consolas, monospace" : "inherit",
                          fontWeight: row.win === m ? 800 : 500,
                        }}
                      >
                        {row[m]}
                        {row.win === m && (
                          <span
                            style={{
                              marginLeft: "8px",
                              background: "linear-gradient(135deg, #0072ff, #0d47a1)",
                              color: "#fff",
                              fontSize: "0.7rem",
                              padding: "2px 10px",
                              borderRadius: "20px",
                            }}
                          >
                            4× más barato
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── BENCHMARKS ── */}
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>Benchmarks: qué dicen los números</h2>
          <p style={sectionLead}>
            Separamos las mediciones independientes (Artificial Analysis) de las que publica cada empresa.
          </p>

          <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "28px", flexWrap: "wrap" }}>
            {[
              { name: "GPT-6 Astra", color: ASTRA },
              { name: "Claude Fable 5.1", color: FABLE },
            ].map((l) => (
              <span key={l.name} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#4b5563", fontSize: "0.9rem" }}>
                <span style={{ width: "14px", height: "14px", borderRadius: "4px", background: l.color }} />
                {l.name}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {benchmarks.map((b) => (
              <div key={`${b.name}-${b.source}`} style={{ ...card, padding: "22px 26px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "14px",
                    flexWrap: "wrap",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>{b.name}</h3>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      padding: "3px 12px",
                      borderRadius: "20px",
                      background: b.source === "Independiente" ? "#dcfce7" : "#f1f5f9",
                      color: b.source === "Independiente" ? "#166534" : "#64748b",
                    }}
                  >
                    {b.source === "Independiente" ? "✓ Independiente" : `Publicado por ${b.source}`}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <BenchmarkBar value={b.astra} max={b.max} color={ASTRA} unit={b.unit} winner={b.astra > b.fable} />
                  <BenchmarkBar value={b.fable} max={b.max} color={FABLE} unit={b.unit} winner={b.fable > b.astra} />
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "28px",
              background: "linear-gradient(135deg, #f0f7ff, #f5f3ff)",
              border: "1px solid #dbeafe",
              borderRadius: "16px",
              padding: "20px 24px",
              color: "#1e293b",
              lineHeight: 1.7,
              fontSize: "0.95rem",
            }}
          >
            <strong>Lectura rápida:</strong> Astra gana en tareas de terminal y en eficiencia. Fable 5.1 gana en
            razonamiento difícil y trabajo de muchos pasos. En código agéntico general, empate. Anthropic, por su parte,
            reporta que Fable 5.1 subió de 42,0% a 55,8% en Terminal-Bench 4.0 frente a Fable 5.
          </div>
        </div>
      </div>

      {/* ── COSTO REAL ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>El costo real no es el precio por token</h2>
          <p style={sectionLead}>Si los dos cobran $10 / $50, ¿por qué uno sale más barato?</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "32px" }}>
            {[
              {
                icon: "✍️",
                title: "Tokens de salida",
                body: "La salida es lo más caro y Astra escribe unos 27K tokens por tarea frente a 78K de Fable 5.1. En el Intelligence Index, Astra cuesta $3,26 por tarea y Fable 5.1 $7,63.",
                color: ASTRA,
              },
              {
                icon: "🗄️",
                title: "Caché",
                body: "Fable 5.1 cobra la lectura de caché a $0,25 por millón, cuatro veces menos que antes. En sesiones de agente de horas, eso le ayuda bastante.",
                color: FABLE,
              },
            ].map((c) => (
              <div key={c.title} style={{ ...card, padding: "26px", borderTop: `4px solid ${c.color}` }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "10px" }}>{c.icon}</div>
                <h3 style={{ margin: "0 0 8px", fontSize: "1.1rem", fontWeight: 700, color: "#1a1a2e" }}>{c.title}</h3>
                <p style={{ margin: 0, color: "#4b5563", lineHeight: 1.7, fontSize: "0.95rem" }}>{c.body}</p>
              </div>
            ))}
          </div>

          <div style={{ ...card, overflowX: "auto" }}>
            <div style={{ padding: "18px 22px", borderBottom: "1px solid #e5e7eb" }}>
              <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>
                Ejemplo: una sesión de agente
              </h3>
              <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: "0.85rem" }}>
                200K tokens de entrada nueva, 1,8M leídos de caché y la salida típica de cada modelo
              </p>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "480px" }}>
              <thead>
                <tr style={{ background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)" }}>
                  <th style={{ padding: "12px 20px", textAlign: "left", color: "#94a3b8", fontSize: "0.8rem" }}>Concepto</th>
                  <th style={{ padding: "12px 20px", textAlign: "right", color: ASTRA, fontSize: "0.85rem" }}>GPT-6 Astra</th>
                  <th style={{ padding: "12px 20px", textAlign: "right", color: FABLE, fontSize: "0.85rem" }}>Fable 5.1</th>
                </tr>
              </thead>
              <tbody>
                {costRows.map((r, i) => (
                  <tr key={r.label} style={{ background: i % 2 ? "#f8fafc" : "#fff" }}>
                    <td style={{ padding: "12px 20px", color: "#4b5563", fontSize: "0.9rem" }}>{r.label}</td>
                    <td style={{ padding: "12px 20px", textAlign: "right", color: "#1a1a2e", fontSize: "0.9rem" }}>{r.astra}</td>
                    <td style={{ padding: "12px 20px", textAlign: "right", color: "#1a1a2e", fontSize: "0.9rem" }}>{r.fable}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: "2px solid #e5e7eb" }}>
                  <td style={{ padding: "14px 20px", color: "#1a1a2e", fontWeight: 800 }}>Total</td>
                  <td style={{ padding: "14px 20px", textAlign: "right", color: ASTRA, fontWeight: 800, fontSize: "1.05rem" }}>$5,15</td>
                  <td style={{ padding: "14px 20px", textAlign: "right", color: FABLE, fontWeight: 800, fontSize: "1.05rem" }}>$6,35</td>
                </tr>
              </tbody>
            </table>
            <p style={{ margin: 0, padding: "14px 22px", color: "#6b7280", fontSize: "0.82rem", lineHeight: 1.6, borderTop: "1px solid #e5e7eb" }}>
              Estimación simplificada: no incluye escritura de caché. Muestra que la caché barata de Fable no alcanza a
              compensar que escribe casi tres veces más.
            </p>
          </div>
        </div>
      </div>

      {/* ── CUÁNDO ELEGIR ── */}
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>¿Cuál elegir según tu caso?</h2>
          <p style={sectionLead}>No hay un ganador absoluto: depende de cómo programas</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {choose.map((c) => (
              <div key={c.model} style={{ ...card, padding: "30px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: c.color }} />
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "14px",
                      background: `${c.color}18`,
                      border: `2px solid ${c.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800, color: "#1a1a2e" }}>{c.model}</h3>
                    <div style={{ color: c.color, fontSize: "0.85rem", fontWeight: 700 }}>{c.tagline}</div>
                  </div>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {c.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: "10px", padding: "8px 0", color: "#4b5563", lineHeight: 1.55, fontSize: "0.95rem" }}>
                      <span style={{ color: c.color, fontWeight: 800 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CÓDIGO ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>Pruébalos desde tu código</h2>
          <p style={sectionLead}>La misma petición con el SDK oficial de cada empresa en Node.js</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            <CodeBlock code={codeAstra} label="GPT-6 Astra · openai" color={ASTRA} />
            <CodeBlock code={codeFable} label="Claude Fable 5.1 · @anthropic-ai/sdk" color={FABLE} />
          </div>

          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1a1a2e", margin: "56px 0 20px", textAlign: "center" }}>
            Si migras a Fable 5.1, revisa esto
          </h3>
          <div style={{ position: "relative", paddingLeft: "8px" }}>
            <div
              style={{
                position: "absolute",
                left: "27px",
                top: "28px",
                bottom: "28px",
                width: "2px",
                background: "linear-gradient(to bottom, #0072ff, #7c3aed, #0ea5e9)",
              }}
            />
            {migration.map((m, i) => (
              <div key={m.title} style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginBottom: "18px", position: "relative" }}>
                <div
                  style={{
                    flexShrink: 0,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #0072ff, #7c3aed)",
                    color: "#fff",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ ...card, padding: "18px 22px", flex: 1 }}>
                  <h4 style={{ margin: "0 0 6px", fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>{m.title}</h4>
                  <p style={{ margin: 0, color: "#4b5563", lineHeight: 1.65, fontSize: "0.93rem" }}>{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ALTERNATIVAS + VEREDICTO ── */}
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>¿Y si ninguno de los dos?</h2>
          <p style={sectionLead}>Para el día a día, muchas veces sobra con algo más barato</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px", marginBottom: "56px" }}>
            {alternatives.map((a) => (
              <div key={a.name} style={{ ...card, padding: "22px" }}>
                <h3 style={{ margin: "0 0 4px", fontSize: "1.02rem", fontWeight: 700, color: "#1a1a2e" }}>{a.name}</h3>
                <div style={{ color: "#0072ff", fontWeight: 700, fontSize: "0.88rem", marginBottom: "10px" }}>{a.price}</div>
                <p style={{ margin: 0, color: "#4b5563", lineHeight: 1.6, fontSize: "0.92rem" }}>{a.note}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)", borderRadius: "24px", padding: "40px 32px" }}>
            <h2 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, margin: "0 0 24px", textAlign: "center" }}>
              Veredicto
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              {[
                { k: "Mejor calidad/precio", v: "GPT-6 Astra", c: ASTRA },
                { k: "Mejor en tareas largas y difíciles", v: "Claude Fable 5.1", c: FABLE },
                { k: "Mejor para el día a día", v: "Un modelo intermedio", c: "#0ea5e9" },
              ].map((x) => (
                <div
                  key={x.k}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ color: "#94a3b8", fontSize: "0.82rem", marginBottom: "6px" }}>{x.k}</div>
                  <div style={{ color: x.c, fontWeight: 800, fontSize: "1.1rem" }}>{x.v}</div>
                </div>
              ))}
            </div>
            <p style={{ color: "#cbd5e1", textAlign: "center", lineHeight: 1.7, margin: "24px auto 0", maxWidth: "600px" }}>
              Lo más útil es probar los dos con tu propio repositorio durante una semana. Los benchmarks marcan
              tendencia, pero tu código es el que decide.
            </p>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ ...sectionTitle, marginBottom: "40px" }}>Preguntas Frecuentes</h2>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} />
          ))}

          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1a1a2e", margin: "56px 0 14px" }}>Fuentes</h3>
          <ul style={{ margin: 0, paddingLeft: "20px", color: "#4b5563", lineHeight: 1.9, fontSize: "0.9rem" }}>
            {sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: "#0072ff" }}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
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
              ¿Quieres sacarle más provecho a tu agente de código?
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto 32px" }}>
              Elegir el modelo es solo el primer paso. Aprende a darle contexto con{" "}
              <strong style={{ color: "#93c5fd" }}>skills para Claude Code</strong> y a trabajar con agentes de IA en
              tus proyectos.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="/blog/consejos-skills-claude-code"
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
                Leer sobre skills →
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

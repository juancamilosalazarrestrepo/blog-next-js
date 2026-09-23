import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SLUG = "jev-typesafe-ai-modelo-decisiones";
const TITLE = "Jev de TypeSafe AI: la IA que no escribe texto, solo toma decisiones";
const SUBTITLE =
  "Jev es el primer modelo \"System One\" de TypeSafe AI: no genera texto, devuelve decisiones tipadas con probabilidad calibrada en 70-500 ms.";
const DATE = "22 de septiembre de 2026";
const READ_TIME = "8 min de lectura";

const GREEN = "#a3e635";
const BLUE = "#0ea5e9";
const RED = "#f87171";

const stats = [
  { num: "70–500 ms", label: "Latencia end-to-end" },
  { num: "$0.042", label: "Por millón de tokens de entrada" },
  { num: "$0", label: "Tokens de salida" },
];

const compare = [
  { k: "Ejemplos", system2: "GPT, Claude, Gemini", system1: "Jev" },
  { k: "Qué hace", system2: "Razona, escribe y explica", system1: "Devuelve decisiones tipadas con probabilidades calibradas" },
];

const primitives = [
  { name: "Choice", desc: "Elige una opción de una lista que tú defines (hasta 255 opciones), con probabilidad por opción y confianza global." },
  { name: "Score", desc: "Puntúa en una escala de 2 a 10 niveles que tú defines. Puede caer entre dos niveles, por ejemplo 1.04 sobre 2." },
  { name: "Noul", desc: "Responde una pregunta de sí/no como una probabilidad entre 0 y 1 de que el enunciado sea cierto." },
];

const rlTable = [
  { method: "RLHF", optimizes: "Lo que prefiere un humano" },
  { method: "RLVR", optimizes: "Resultados verificables" },
  { method: "RLCD", optimizes: "Que la probabilidad sea honesta", win: true },
];

const numberCards = [
  { num: "193.6x", label: "Más rápido que un LLM en sus flujos de prueba" },
  { num: "444.6x", label: "Más barato por flujo de trabajo" },
  { num: "67.8%", label: "Precisión en sus 4 flujos evaluados (vs 67.9% de GPT Terra)" },
  { num: "0.4s / $0.0004", label: "Frente a 10.1s / $0.0304 del comparado" },
];

const useCases = [
  { title: "Soporte", desc: "Enrutar tickets, detectar frustración y pedidos de reembolso.", icon: "🎧" },
  { title: "Seguridad", desc: "Triage de incidentes y chequeos de riesgo.", icon: "🛡️" },
  { title: "Agentes", desc: "Escoger qué herramienta usar y calificar trazas.", icon: "🤖" },
  { title: "Guardrails", desc: "Verificar y moderar la salida de otros LLM.", icon: "🚧" },
  { title: "Datos", desc: "Clasificar y extraer información a gran escala.", icon: "📊" },
  { title: "Tiempo real", desc: "Jugó Doom: ~10 decisiones/s por ~$7 la hora.", icon: "⚡" },
];

const caveats = [
  { title: '"Sin alucinaciones" ≠ sin errores', body: "No inventa campos fuera del esquema, pero sí puede elegir la opción equivocada dentro de las que le diste." },
  { title: "Solo elige lo que tú le das", body: "Si la respuesta correcta no está entre las opciones definidas, igual escoge una." },
  { title: "No explica, no ve, no sabe del mundo", body: "Solo procesa texto, sin razonamiento visible, y depende del estado que le pases." },
  { title: "Benchmarks del proveedor", body: "Velocidad y costo aún no reproducidos de forma independiente. En tareas complejas, GPT Sol (74.1%) y Claude Opus 5 (73.1%) le ganan." },
];

const roadmap = [
  { title: "Arquitectura híbrida", body: "El LLM razona, Jev decide y el código ejecuta. Cada pieza en lo suyo." },
  { title: "Agentes mucho más baratos", body: "Miles de micro-decisiones por centavos en lugar de dólares." },
  { title: "IA en tiempo real", body: "Juegos, monitoreo y sistemas autónomos que necesitan responder en milisegundos." },
  { title: "La paradoja de Jevons", body: "El nombre lo insinúa: si decidir se vuelve barato, usaremos IA en todas partes." },
];

const gallery = [
  { src: "jev-01", alt: "La IA que no habla, solo decide: presentación de Jev, el nuevo modelo de TypeSafe AI" },
  { src: "jev-02", alt: "El problema: tu código no quiere un párrafo, quiere una decisión" },
  { src: "jev-03", alt: "Qué es Jev: un modelo System One inspirado en la distinción de Kahneman" },
  { src: "jev-04", alt: "Cómo responde Jev: un if / switch con IA usando choice, score y noul" },
  { src: "jev-05", alt: "RLCD: entrenado para no mentir sobre su certeza, frente a RLHF y RLVR" },
  { src: "jev-06", alt: "Los números de Jev según TypeSafe: 70-500 ms y $0.042 por millón de tokens" },
  { src: "jev-07", alt: "Usos reales de Jev: soporte, seguridad, agentes, guardrails, datos y tiempo real" },
  { src: "jev-08", alt: "Lo que no te dicen: sin alucinaciones no significa sin errores" },
  { src: "jev-09", alt: "Hacia dónde va esto: arquitectura híbrida, agentes baratos y la paradoja de Jevons" },
  { src: "jev-10", alt: "En resumen: Jev no reemplaza a los LLM, los complementa" },
];

const codeBefore = `// antes: reglas frágiles
if (msg.includes("reembolso")) {
  // ...
}`;

const codeAfter = `// con Jev (pseudocódigo)
const r = await jev.noul(
  "¿El cliente pide reembolso?", msg
)

if (r.p > 0.9) procesarReembolso()
else escalarAHumano()`;

const faqs = [
  {
    q: "¿Jev genera texto como ChatGPT o Claude?",
    a: "No. Jev solo devuelve decisiones tipadas (choice, score o noul) con su probabilidad. No escribe frases ni párrafos.",
  },
  {
    q: '¿Qué significa que un modelo sea "System One"?',
    a: "Es una categoría inspirada en la distinción de Kahneman entre pensamiento rápido e intuitivo (Sistema 1) y razonamiento lento y deliberado (Sistema 2). Los LLM tradicionales se comportan como Sistema 2; Jev busca comportarse como Sistema 1.",
  },
  {
    q: '¿"Sin alucinaciones" significa que nunca se equivoca?',
    a: "No. Significa que no inventa campos fuera del esquema que le definiste, pero sí puede elegir la opción incorrecta entre las que le diste.",
  },
  {
    q: "¿Las cifras de velocidad y costo son confiables?",
    a: "Son las que reporta TypeSafe AI. Todavía no hay benchmarks independientes que las confirmen, así que conviene tomarlas como punto de partida, no como verdad absoluta.",
  },
  {
    q: "¿Reemplaza a los LLM tradicionales?",
    a: "No, los complementa. La arquitectura que proponen combina un LLM que razona con Jev tomando las decisiones puntuales, y el código ejecutando el resultado.",
  },
];

const sources = [
  { label: "Introducing System One Models & Jev — TypeSafe AI Blog", href: "https://typesafe.ai/blog/introducing-system-one-models-and-jev" },
  { label: "TypeSafe AI Releases Jev — MarkTechPost", href: "https://www.marktechpost.com/2026/09/19/typesafe-ai-releases-jev/" },
  { label: "A deep dive into Jev, TypeSafe's System One model", href: "https://flaviocopes.com/jev/" },
  { label: "TypeSafe Jev: the first System One model, explained — eesel AI", href: "https://www.eesel.ai/blog/typesafe-jev" },
  { label: "Introduction — TypeSafe AI Docs", href: "https://docs.typesafe.ai/introduction" },
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

function Gallery({ items }) {
  const [active, setActive] = useState(null);
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "16px" }}>
        {items.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setActive(i)}
            aria-label={`Ampliar imagen ${i + 1}: ${img.alt}`}
            style={{
              padding: 0,
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#0a0a2e",
              cursor: "zoom-in",
              display: "block",
              lineHeight: 0,
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <Image
              src={`/images/jevArticuleImages/${img.src}.png`}
              alt={img.alt}
              width={432}
              height={540}
              sizes="(max-width: 600px) 45vw, 200px"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(5,5,20,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            cursor: "zoom-out",
          }}
        >
          <Image
            src={`/images/jevArticuleImages/${items[active].src}.png`}
            alt={items[active].alt}
            width={1080}
            height={1350}
            style={{ maxWidth: "min(100%, 620px)", maxHeight: "90vh", width: "auto", height: "auto", borderRadius: "14px" }}
          />
          <button
            onClick={() => setActive(null)}
            aria-label="Cerrar"
            style={{
              position: "absolute",
              top: "20px",
              right: "24px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: "1.3rem",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || "es", ["common"])),
    },
  };
}

export default function JevTypeSafeAi() {
  return (
    <Layout>
      <Head>
        <title>{`${TITLE} | Juan Camilo Salazar`}</title>
        <meta name="description" content={SUBTITLE} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={SUBTITLE} />
        <meta property="og:image" content={`/images/${SLUG}.png`} />
        <meta property="article:published_time" content="2026-09-22" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="keywords"
          content="Jev TypeSafe AI, System One model, modelo de IA para decisiones, RLCD, agentes de IA, guardrails IA, IA sin alucinaciones, if con inteligencia artificial"
        />
      </Head>

      {/* ── HERO ── */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: "420px", display: "flex", alignItems: "center" }}>
        <Image
          src={`/images/${SLUG}.png`}
          alt="Jev, el modelo System One de TypeSafe AI que devuelve decisiones en vez de texto"
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
            background: "linear-gradient(to bottom, rgba(10,10,26,0.72) 0%, rgba(10,10,26,0.93) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, width: "100%", padding: "56px 0" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto", width: "100%", padding: "0 24px" }}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "18px" }}>
              {["Inteligencia Artificial", "TypeSafe AI", "Jev"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(163,230,53,0.18)",
                    border: "1px solid rgba(163,230,53,0.5)",
                    color: GREEN,
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
            TypeSafe AI lanzó el 16 de septiembre de 2026 un modelo que <strong style={{ color: "#e2e8f0" }}>no escribe una sola frase</strong>.
            Se llama Jev, y devuelve decisiones con su probabilidad, como un <code style={{ color: GREEN }}>if</code> o un{" "}
            <code style={{ color: GREEN }}>switch</code>, pero entendiendo lenguaje natural.
          </p>
          <div style={{ display: "flex", gap: "40px", justifyContent: "center", marginTop: "32px", flexWrap: "wrap" }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: GREEN }}>{s.num}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.82rem", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EL PROBLEMA ── */}
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>El problema: tu código no quiere un párrafo</h2>
          <p style={sectionLead}>Cuando usas un LLM tradicional para tomar una decisión dentro de tu app, pasa esto:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
            {[
              "Prompt → texto largo → parsear → validar → reintentar si vino mal",
              "Segundos de latencia y pagas por cada token de salida",
              "Un campo inventado o un JSON roto y se cae el flujo",
            ].map((t) => (
              <div key={t} style={{ ...card, padding: "18px 22px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span style={{ color: RED, fontWeight: 800, flexShrink: 0 }}>✕</span>
                <span style={{ color: "#4b5563", lineHeight: 1.6, fontSize: "0.95rem" }}>{t}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "linear-gradient(135deg, #f0fdf4, #f5f3ff)",
              border: "1px solid #d9f99d",
              borderRadius: "16px",
              padding: "20px 24px",
              color: "#1e293b",
              lineHeight: 1.7,
              fontSize: "0.95rem",
            }}
          >
            La mayoría de lo que le pedimos a un LLM dentro de un flujo de producto es en realidad un{" "}
            <strong>sí/no</strong> o una <strong>categoría</strong>. No necesitas un ensayo: necesitas una decisión y
            qué tan segura es.
          </div>
        </div>
      </div>

      {/* ── SYSTEM ONE ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>Un modelo "System One": por qué el nombre viene de Kahneman</h2>
          <p style={sectionLead}>
            El nombre sale de <em>Pensar rápido, pensar despacio</em>: el Sistema 1 es intuitivo y rápido, el Sistema 2
            es lento y deliberado.
          </p>
          <div style={{ ...card, overflowX: "auto", marginBottom: "32px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "480px" }}>
              <thead>
                <tr style={{ background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)" }}>
                  <th style={{ padding: "16px 20px", textAlign: "left", color: "#94a3b8", fontSize: "0.8rem", fontWeight: 600 }} />
                  <th style={{ padding: "16px 20px", textAlign: "left", color: BLUE, fontSize: "0.95rem", fontWeight: 800 }}>
                    Sistema 2 (LLMs)
                  </th>
                  <th style={{ padding: "16px 20px", textAlign: "left", color: GREEN, fontSize: "0.95rem", fontWeight: 800 }}>
                    Sistema 1 (Jev)
                  </th>
                </tr>
              </thead>
              <tbody>
                {compare.map((row, i) => (
                  <tr key={row.k} style={{ background: i % 2 ? "#f8fafc" : "#fff" }}>
                    <td style={{ padding: "14px 20px", color: "#6b7280", fontSize: "0.88rem", fontWeight: 600 }}>{row.k}</td>
                    <td style={{ padding: "14px 20px", color: "#1a1a2e", fontSize: "0.92rem" }}>{row.system2}</td>
                    <td style={{ padding: "14px 20px", color: "#1a1a2e", fontSize: "0.92rem", fontWeight: 700 }}>{row.system1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "#4b5563", lineHeight: 1.7, textAlign: "center", maxWidth: "680px", margin: "0 auto" }}>
            El propio "Jev" toma su nombre de <strong>William Stanley Jevons</strong>: cuando algo se vuelve más
            eficiente, su demanda aumenta en vez de caer. TypeSafe apuesta a que, si decidir con IA se vuelve casi
            gratis, la usaremos en muchos más lugares de los que hoy imaginamos.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "32px" }}>
            {[
              { k: "Lanzamiento", v: "16 sept 2026" },
              { k: "Ronda", v: "$40M (DCVC)" },
              { k: "CEO", v: "Diogo Almeida, ex OpenAI" },
            ].map((x) => (
              <div key={x.k} style={{ ...card, padding: "18px", textAlign: "center" }}>
                <div style={{ color: "#6b7280", fontSize: "0.8rem", marginBottom: "6px" }}>{x.k}</div>
                <div style={{ color: "#1a1a2e", fontWeight: 700, fontSize: "0.95rem" }}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CÓMO RESPONDE ── */}
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>Cómo responde: choice, score y noul</h2>
          <p style={sectionLead}>
            Le mandas un <strong>estado</strong> en lenguaje natural y preguntas tipadas en una sola petición HTTP.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px", marginBottom: "40px" }}>
            {primitives.map((p) => (
              <div key={p.name} style={{ ...card, padding: "24px" }}>
                <h3 style={{ margin: "0 0 8px", fontSize: "1.2rem", fontWeight: 800, color: GREEN }}>{p.name}</h3>
                <p style={{ margin: 0, color: "#4b5563", lineHeight: 1.65, fontSize: "0.92rem" }}>{p.desc}</p>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1a1a2e", textAlign: "center", marginBottom: "20px" }}>
            De reglas frágiles a decisiones con probabilidad
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            <CodeBlock code={codeBefore} label="Antes · if con palabras clave" color={RED} />
            <CodeBlock code={codeAfter} label="Con Jev · decisión + probabilidad" color={GREEN} />
          </div>
        </div>
      </div>

      {/* ── RLCD ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>RLCD: entrenado para no mentir sobre su certeza</h2>
          <p style={sectionLead}>
            Reinforcement Learning for Calibrated Decisions: si Jev dice 80%, debería acertar cerca del 80% de las veces.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
            {rlTable.map((r) => (
              <div
                key={r.method}
                style={{
                  ...card,
                  padding: "18px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  border: r.win ? `2px solid ${GREEN}` : card.border,
                }}
              >
                <span style={{ fontWeight: 800, color: r.win ? GREEN : "#94a3b8", width: "70px", flexShrink: 0 }}>{r.method}</span>
                <span style={{ color: "#374151", fontSize: "0.95rem" }}>
                  Optimiza <strong>{r.optimizes}</strong>
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "linear-gradient(135deg, #f0fdf4, #f5f3ff)",
              border: "1px solid #d9f99d",
              borderRadius: "16px",
              padding: "20px 24px",
              color: "#1e293b",
              lineHeight: 1.7,
              fontSize: "0.95rem",
            }}
          >
            Como el modelo sabe cuándo duda, tu código puede decidir: <strong>ejecutar solo</strong> cuando la
            confianza es alta, o <strong>escalar a un humano</strong> cuando no lo es.
          </div>
        </div>
      </div>

      {/* ── NÚMEROS ── */}
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>Los números: velocidad y costo</h2>
          <p style={sectionLead}>Cifras reportadas por TypeSafe AI, aún sin verificación independiente.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" }}>
            {numberCards.map((n) => (
              <div key={n.label} style={{ ...card, padding: "24px", borderTop: `4px solid ${GREEN}` }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a1a2e" }}>{n.num}</div>
                <div style={{ color: "#6b7280", fontSize: "0.85rem", marginTop: "6px", lineHeight: 1.5 }}>{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── USOS REALES ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>Para qué sirve: casos de uso reales</h2>
          <p style={sectionLead}>El patrón se repite: confianza alta ejecuta sola, confianza baja escala a un humano.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px", marginBottom: "32px" }}>
            {useCases.map((u) => (
              <div key={u.title} style={{ ...card, padding: "24px" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "10px" }}>{u.icon}</div>
                <h3 style={{ margin: "0 0 6px", fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>{u.title}</h3>
                <p style={{ margin: 0, color: "#4b5563", lineHeight: 1.6, fontSize: "0.9rem" }}>{u.desc}</p>
              </div>
            ))}
          </div>
          <CodeBlock
            code={`// pseudocódigo del patrón
if (d.confidence > 0.9) autoResolver(d.choice)
else escalarAHumano(ticket)`}
            label="El patrón que se repite"
            color={BLUE}
          />
        </div>
      </div>

      {/* ── LO QUE NO TE DICEN ── */}
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>Lo que no te dicen</h2>
          <p style={sectionLead}>Antes de meter esto en producción, vale la pena tener esto claro.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {caveats.map((c) => (
              <div key={c.title} style={{ ...card, padding: "20px 24px", borderLeft: `4px solid ${RED}` }}>
                <h3 style={{ margin: "0 0 6px", fontSize: "1rem", fontWeight: 700, color: RED }}>{c.title}</h3>
                <p style={{ margin: 0, color: "#4b5563", lineHeight: 1.65, fontSize: "0.93rem" }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROADMAP ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>Hacia dónde va esto</h2>
          <p style={sectionLead}>Proyecciones a futuro, según TypeSafe AI.</p>
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
            {roadmap.map((m, i) => (
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

      {/* ── GALERÍA ── */}
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>El artículo en imágenes</h2>
          <p style={sectionLead}>Toca cualquier imagen para verla en grande.</p>
          <Gallery items={gallery} />
        </div>
      </div>

      {/* ── VEREDICTO ── */}
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)", borderRadius: "24px", padding: "40px 32px", textAlign: "center" }}>
            <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, margin: "0 0 16px" }}>
              No reemplaza a los LLM. Los complementa.
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.75, maxWidth: "560px", margin: "0 auto" }}>
              Si construyes agentes o automatizaciones, la pregunta ya no es solo qué modelo usar, sino{" "}
              <strong style={{ color: "#e2e8f0" }}>qué tipo de modelo necesita cada decisión</strong> de tu flujo.
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
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>⚡</div>
            <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, marginBottom: "12px" }}>
              ¿Vas a construir tu próximo agente de IA?
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto 32px" }}>
              Guarda este artículo para cuando decidas qué modelo necesita cada decisión de tu flujo, y sigue
              explorando IA aplicada al desarrollo.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="/blog/agentes-ia-programacion-2026"
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
                Leer sobre agentes de IA →
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

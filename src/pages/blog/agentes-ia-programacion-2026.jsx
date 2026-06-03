import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const tools = [
  {
    name: "Claude Code",
    company: "Anthropic",
    logo: "https://unpkg.com/simple-icons@latest/icons/anthropic.svg",
    badge: "#7c3aed",
    badgeText: "Mejor razonamiento",
    price: "$20/mes",
    score: "80.9% SWE-bench",
    ideal: "Desarrolladores senior, refactors complejos, terminal-first",
    highlights: [
      "Opera desde el terminal con acceso total al sistema",
      "Arquitectura multi-agente para tareas complejas",
      "Soporte para flujos async via Slack",
      "Bundled con Claude Pro",
    ],
    emoji: "🤖",
  },
  {
    name: "Cursor",
    company: "Cursor Inc.",
    logo: "https://www.cursor.com/favicon.ico",
    badge: "#0072ff",
    badgeText: "Mejor experiencia IDE",
    price: "$20/mes",
    score: "360K+ usuarios pago",
    ideal: "Equipos que quieren la mejor experiencia IDE con IA",
    highlights: [
      "La experiencia IDE más refinada del mercado",
      "Composer 2.5 para edición multi-archivo",
      "Cursor Cloud Agent para tareas en segundo plano",
      "Fork de VS Code con IA profunda",
    ],
    emoji: "🖱️",
  },
  {
    name: "Google Antigravity 2.0",
    company: "Google",
    logo: "https://unpkg.com/simple-icons@latest/icons/googlegemini.svg",
    badge: "#ea4335",
    badgeText: "Más veloz",
    price: "$200/mes AI Ultra",
    score: "Gemini 3.5 Flash",
    ideal: "Devs en el ecosistema Google Cloud y GCP",
    highlights: [
      "Gemini 3.5 Flash: velocidad superior de respuesta",
      "IDE agent nativo (no un plugin)",
      "Integración profunda con Google Cloud y Firebase",
      "Actualizado mayo 2026",
    ],
    emoji: "☁️",
  },
  {
    name: "GitHub Copilot",
    company: "GitHub / Microsoft",
    logo: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
    badge: "#238636",
    badgeText: "Mejor para enterprise",
    price: "$10/mes",
    score: "Integración nativa GitHub",
    ideal: "Empresas en el ecosistema Microsoft / Azure / GitHub",
    highlights: [
      "La red de seguridad más accesible ($10/mes)",
      "Integración nativa en toda la plataforma GitHub",
      "Compatible con VS Code, JetBrains, Visual Studio",
      "Modo agente completo + revisión de PRs",
    ],
    emoji: "🐙",
  },
  {
    name: "Windsurf 2.0",
    company: "Codeium",
    logo: "https://codeium.com/favicon.ico",
    badge: "#0ea5e9",
    badgeText: "Delegación remota",
    price: "$15/mes",
    score: "Integra Devin",
    ideal: "Equipos que quieren delegar tareas largas a VM remota",
    highlights: [
      "Integra Devin para delegación en un clic",
      "Ejecuta tareas en VM remota aislada",
      "No toca tu máquina local",
      "Ideal para tareas largas en background",
    ],
    emoji: "🌊",
  },
];

const tableData = [
  { need: "Refactors difíciles y razonamiento profundo", tool: "Claude Code" },
  { need: "Mejor experiencia IDE día a día", tool: "Cursor" },
  { need: "Ecosistema Google / GCP", tool: "Google Antigravity 2.0" },
  { need: "Empresa en GitHub / Microsoft", tool: "GitHub Copilot" },
  { need: "Delegar tareas largas a VM remota", tool: "Windsurf 2.0" },
  { need: "Presupuesto ajustado", tool: "Copilot ($10) + Cline (gratis)" },
];

const roadmap = [
  {
    period: "Semana 1",
    icon: "🚀",
    tool: "GitHub Copilot",
    action: "Instálalo en VS Code",
    detail: "El punto de entrada más suave, documentación extensa, funciona en todos los IDEs.",
    color: "#238636",
  },
  {
    period: "Semana 2-3",
    icon: "⚡",
    tool: "Cursor",
    action: "Descarga y experimenta Composer",
    detail: "Prueba con un proyecto real. Composer para edición multi-archivo cambia tu flujo.",
    color: "#0072ff",
  },
  {
    period: "Mes 2",
    icon: "🤖",
    tool: "Claude Code",
    action: "Agrégalo al terminal",
    detail: "Para tareas que requieren razonamiento profundo o automatización de múltiples archivos.",
    color: "#7c3aed",
  },
  {
    period: "Mes 3+",
    icon: "☁️",
    tool: "Antigravity / Windsurf",
    action: "Evalúa según tu stack",
    detail: "Google Antigravity si trabajas con GCP. Windsurf si quieres delegar tareas complejas.",
    color: "#0ea5e9",
  },
];

const faqs = [
  {
    q: "¿Es Claude Code el mejor agente de IA para programar en 2026?",
    a: "Depende del caso de uso. Claude Code lidera en razonamiento profundo y refactors complejos (80.9% SWE-bench), pero Cursor gana en experiencia IDE y Copilot en integración enterprise. Para la mayoría de desarrolladores senior, combinar Claude Code + Cursor es la configuración óptima.",
  },
  {
    q: "¿Cuánto cuesta usar agentes de IA profesionalmente?",
    a: "El rango varía: Copilot desde $10/mes, Cursor y Claude Code desde $20/mes, y Windsurf Pro a $15/mes. Usuarios intensivos de Claude Code reportan $100-200/mes en uso real. Lo más eficiente para equipos es Copilot como base + Claude Code para trabajo profundo.",
  },
  {
    q: "¿Qué es Google Antigravity y cómo se diferencia de Copilot?",
    a: "Google Antigravity 2.0 es un IDE agente nativo (no un plugin) que corre con Gemini 3.5 Flash como modelo base. A diferencia de Copilot que se integra en editores existentes, Antigravity es el entorno completo. Su ventaja clave es velocidad y profunda integración con Google Cloud.",
  },
  {
    q: "¿Los agentes de IA reemplazarán a los desarrolladores?",
    a: "No. Los agentes de 2026 son confiables en tareas de 5-15 pasos; las tareas más largas o ambiguas siguen degradándose sin supervisión humana. La tendencia es hacia desarrolladores que multiplican su output con agentes, no hacia la eliminación del rol.",
  },
  {
    q: "¿Por dónde empiezo si soy desarrollador junior?",
    a: "Empieza con GitHub Copilot: tiene la curva de aprendizaje más suave, documentación extensa y funciona en todos los IDEs. Una vez que entiendas cómo colaborar con un asistente de IA, avanza a Cursor para tareas multi-archivo.",
  },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid #e5e7eb",
        padding: "0",
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
        <span style={{ fontSize: "1rem", fontWeight: 600, color: "#1a1a2e", lineHeight: 1.4 }}>
          {faq.q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: open ? "#0072ff" : "#f3f4f6",
            color: open ? "#fff" : "#6b7280",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            fontWeight: 700,
            transition: "all 0.2s",
          }}
        >
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p style={{ color: "#4b5563", lineHeight: 1.7, paddingBottom: "20px", margin: 0, fontSize: "0.95rem" }}>
          {faq.a}
        </p>
      )}
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

export default function AgentesIA2026() {
  return (
    <Layout>
      <Head>
        <title>La Importancia de Usar Agentes de IA en el Desarrollo en 2026 | Juan Camilo Salazar</title>
        <meta name="description" content="Descubre por qué los agentes de IA como Claude Code, Cursor y GitHub Copilot son esenciales en 2026 y cuál elegir según tu flujo de trabajo." />
        <meta name="keywords" content="agentes de IA, Claude Code, Cursor, GitHub Copilot, programacion 2026, herramientas IA desarrollador" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="La Importancia de Usar Agentes de IA en el Desarrollo en 2026" />
        <meta property="og:description" content="Descubre por qué los agentes de IA como Claude Code, Cursor y GitHub Copilot son esenciales en 2026 y cuál elegir según tu flujo de trabajo." />
        <meta property="article:published_time" content="2026-06-02" />
      </Head>

      {/* HERO */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src="/images/ai-agents.webp"
          alt="Importancia de usar agentes de IA en el desarrollo en 2026"
          width={1280}
          height={500}
          priority
          style={{ width: "100%", height: "420px", objectFit: "cover", objectPosition: "center" }}
        />
        {/* overlay oscuro para legibilidad del texto */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,26,0.65) 0%, rgba(10,10,26,0.88) 100%)" }} />

        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", zIndex: 1 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%", padding: "0 24px" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
            {["IA", "Herramientas", "Productividad", "2026"].map((tag) => (
              <span key={tag} style={{ background: "rgba(0,114,255,0.2)", border: "1px solid rgba(0,114,255,0.4)", color: "#60a5fa", fontSize: "0.78rem", fontWeight: 600, padding: "4px 12px", borderRadius: "20px", letterSpacing: "0.05em" }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "20px", letterSpacing: "-0.02em" }}>
            La Importancia de Usar{" "}
            <span style={{ background: "linear-gradient(90deg, #0072ff, #00c6ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Agentes de IA
            </span>{" "}
            en el Desarrollo en 2026
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#94a3b8", lineHeight: 1.7, marginBottom: "32px" }}>
            Descubre por qué Claude Code, Cursor y GitHub Copilot son infraestructura esencial hoy — y cuál elegir según tu flujo de trabajo.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #0072ff, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>JC</div>
              <div>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#fff", fontWeight: 600 }}>Juan Camilo Salazar</p>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>2 Jun, 2026 · 8 min lectura</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* STAT BANNER */}
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "0 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0" }}>
          {[
            { num: "84%", label: "devs usan IA hoy" },
            { num: "51%", label: "lo usan diariamente" },
            { num: "5x", label: "más velocidad en tareas" },
            { num: "2026", label: "ya es infraestructura" },
          ].map((s) => (
            <div key={s.num} style={{ padding: "28px 20px", textAlign: "center", borderRight: "1px solid #e2e8f0" }}>
              <p style={{ margin: 0, fontSize: "1.8rem", fontWeight: 800, color: "#0072ff" }}>{s.num}</p>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b", marginTop: "4px" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}>

        {/* INTRO */}
        <section style={{ marginBottom: "64px" }}>
          <p style={{ fontSize: "1.15rem", color: "#374151", lineHeight: 1.8, borderLeft: "4px solid #0072ff", paddingLeft: "20px", marginBottom: "20px" }}>
            En 2024 los agentes de IA eran una curiosidad. En 2026 son infraestructura. Si escribes código profesionalmente hoy y no usas un agente de IA, no estás compitiendo en igualdad de condiciones.
          </p>
          <p style={{ fontSize: "1rem", color: "#4b5563", lineHeight: 1.8 }}>
            Esta no es exageración: el <strong>84% de los desarrolladores profesionales</strong> ya usan alguna forma de asistencia por IA, y el 51% lo hace de forma diaria (Stack Overflow, 2025). El cambio no es opcional, es estructural.
          </p>
        </section>

        {/* QUÉ ES UN AGENTE */}
        <section style={{ marginBottom: "64px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a1a2e", marginBottom: "24px" }}>¿Qué es un Agente de IA para Programar?</h2>
          <p style={{ color: "#4b5563", lineHeight: 1.7, marginBottom: "24px" }}>Un agente de IA no es solo un autocompletado mejorado. La diferencia es fundamental:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            {[
              { year: "2022", label: "Autocompletado", desc: "Sugiere la siguiente línea. Tú controlas cada tecla.", icon: "⌨️", dim: true },
              { year: "2023-24", label: "Asistente", desc: "Responde preguntas, genera bloques de código.", icon: "💬", dim: true },
              { year: "2025-26", label: "Agente", desc: "Planifica, edita 6 archivos, corre tests, corrige lo que rompió y entrega un PR.", icon: "🤖", dim: false },
            ].map((item) => (
              <div key={item.year} style={{ background: item.dim ? "#f8fafc" : "linear-gradient(135deg, #0072ff, #0d47a1)", borderRadius: "16px", padding: "24px", border: item.dim ? "1px solid #e2e8f0" : "none", position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: item.dim ? "#94a3b8" : "rgba(255,255,255,0.7)", letterSpacing: "0.1em" }}>{item.year}</span>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: item.dim ? "#1a1a2e" : "#fff", margin: "4px 0 8px" }}>{item.label}</h3>
                <p style={{ fontSize: "0.88rem", color: item.dim ? "#6b7280" : "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HERRAMIENTAS */}
        <section style={{ marginBottom: "64px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a1a2e", marginBottom: "8px" }}>
            Los Mejores Agentes de IA en 2026
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "32px", lineHeight: 1.6 }}>Cinco herramientas, cinco perfiles. Elige según tu flujo de trabajo.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {tools.map((tool, i) => (
              <div
                key={tool.name}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "20px",
                  padding: "28px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "24px",
                  alignItems: "start",
                }}
              >
                {/* Logo + number */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "#f8fafc", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "8px" }}>
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      onError={(e) => { e.target.style.display = "none"; e.target.parentNode.innerHTML = `<span style="font-size:1.8rem">${tool.emoji}</span>`; }}
                    />
                  </div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8" }}>#{i + 1}</span>
                </div>

                {/* Content */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "6px" }}>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#1a1a2e", margin: 0 }}>{tool.name}</h3>
                    <span style={{ background: tool.badge, color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>{tool.badgeText}</span>
                  </div>
                  <p style={{ fontSize: "0.83rem", color: "#9ca3af", margin: "0 0 12px", fontWeight: 500 }}>{tool.company}</p>

                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
                    <span style={{ background: "#f0fdf4", color: "#166534", fontSize: "0.8rem", fontWeight: 600, padding: "4px 12px", borderRadius: "8px" }}>{tool.price}</span>
                    <span style={{ background: "#eff6ff", color: "#1e40af", fontSize: "0.8rem", fontWeight: 600, padding: "4px 12px", borderRadius: "8px" }}>{tool.score}</span>
                  </div>

                  <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.6, marginBottom: "16px" }}>
                    <strong>Ideal para:</strong> {tool.ideal}
                  </p>

                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "6px" }}>
                    {tool.highlights.map((h) => (
                      <li key={h} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.83rem", color: "#4b5563" }}>
                        <span style={{ color: "#0072ff", flexShrink: 0, marginTop: "2px" }}>✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TABLA */}
        <section style={{ marginBottom: "64px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a1a2e", marginBottom: "8px" }}>¿Cuál Elegir?</h2>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>Guía rápida según tu necesidad principal.</p>
          <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #e5e7eb", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)" }}>
                  <th style={{ padding: "16px 20px", textAlign: "left", fontSize: "0.82rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase" }}>Necesidad</th>
                  <th style={{ padding: "16px 20px", textAlign: "left", fontSize: "0.82rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase" }}>Herramienta</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "14px 20px", fontSize: "0.9rem", color: "#374151" }}>{row.need}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ background: "linear-gradient(135deg, #0072ff, #0d47a1)", color: "#fff", fontSize: "0.82rem", fontWeight: 700, padding: "4px 14px", borderRadius: "20px", whiteSpace: "nowrap" }}>
                        {row.tool}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: "20px", padding: "16px 20px", background: "#eff6ff", borderRadius: "12px", fontSize: "0.9rem", color: "#1e40af", lineHeight: 1.6, border: "1px solid #bfdbfe" }}>
            <strong>💡 Recomendación 2026:</strong> La mayoría de devs profesionales usan más de uno. Cursor o Windsurf como IDE diario. Claude Code para problemas difíciles. Copilot como red de seguridad de $10/mes.
          </p>
        </section>

        {/* ROADMAP */}
        <section style={{ marginBottom: "64px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a1a2e", marginBottom: "8px" }}>Cómo Empezar Hoy</h2>
          <p style={{ color: "#6b7280", marginBottom: "32px" }}>Ruta recomendada para adoptar agentes de IA progresivamente.</p>
          <div style={{ position: "relative" }}>
            {/* vertical line */}
            <div style={{ position: "absolute", left: "27px", top: "40px", bottom: "40px", width: "2px", background: "linear-gradient(to bottom, #0072ff, #7c3aed, #0ea5e9)", borderRadius: "2px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {roadmap.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, width: "56px", height: "56px", borderRadius: "50%", background: step.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", boxShadow: `0 0 0 4px white, 0 0 0 6px ${step.color}33`, zIndex: 1 }}>
                    {step.icon}
                  </div>
                  <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "20px 24px", flex: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: step.color, background: `${step.color}15`, padding: "3px 10px", borderRadius: "20px", letterSpacing: "0.05em" }}>{step.period}</span>
                      <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>{step.action}</h3>
                    </div>
                    <p style={{ margin: "0 0 4px", fontSize: "0.83rem", fontWeight: 600, color: step.color }}>{step.tool}</p>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "#6b7280", lineHeight: 1.6 }}>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a1a2e", marginBottom: "8px" }}>Preguntas Frecuentes</h2>
          <p style={{ color: "#6b7280", marginBottom: "32px" }}>Las dudas más comunes sobre agentes de IA en 2026.</p>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "20px", padding: "8px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)", borderRadius: "24px", padding: "48px 40px", textAlign: "center" }}>
          <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#60a5fa", letterSpacing: "0.1em", marginBottom: "12px" }}>SALAZAR CODE</p>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff", marginBottom: "16px", lineHeight: 1.3 }}>
            ¿Listo para multiplicar tu productividad?
          </h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: "28px", maxWidth: "480px", margin: "0 auto 28px" }}>
            El desarrollador de 2026 que gana no es el que usa más herramientas, sino el que sabe cuándo usar cuál.
          </p>
          <a
            href="/blog"
            style={{ display: "inline-block", background: "linear-gradient(135deg, #0072ff, #0d47a1)", color: "#fff", fontWeight: 700, fontSize: "0.95rem", padding: "14px 32px", borderRadius: "12px", textDecoration: "none", boxShadow: "0 4px 20px rgba(0,114,255,0.35)" }}
          >
            Ver más artículos →
          </a>
        </div>

      </div>
    </Layout>
  );
}

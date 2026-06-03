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
    badgeText: "Best reasoning",
    price: "$20/month",
    score: "80.9% SWE-bench",
    ideal: "Senior developers, complex refactors, terminal-first workflows",
    highlights: [
      "Operates from the terminal with full system access",
      "Multi-agent architecture for complex tasks",
      "Support for async flows via Slack",
      "Bundled with Claude Pro",
    ],
    emoji: "🤖",
  },
  {
    name: "Cursor",
    company: "Cursor Inc.",
    logo: "https://www.cursor.com/favicon.ico",
    badge: "#0072ff",
    badgeText: "Best IDE experience",
    price: "$20/month",
    score: "360K+ paying users",
    ideal: "Teams that want the best AI-powered IDE experience",
    highlights: [
      "The most refined IDE experience on the market",
      "Composer 2.5 for multi-file editing",
      "Cursor Cloud Agent for background tasks",
      "VS Code fork with deep AI integration",
    ],
    emoji: "🖱️",
  },
  {
    name: "Google Antigravity 2.0",
    company: "Google",
    logo: "https://unpkg.com/simple-icons@latest/icons/googlegemini.svg",
    badge: "#ea4335",
    badgeText: "Fastest",
    price: "$200/month AI Ultra",
    score: "Gemini 3.5 Flash",
    ideal: "Devs in the Google Cloud and GCP ecosystem",
    highlights: [
      "Gemini 3.5 Flash: superior response speed",
      "Native IDE agent (not a plugin)",
      "Deep integration with Google Cloud and Firebase",
      "Updated May 2026",
    ],
    emoji: "☁️",
  },
  {
    name: "GitHub Copilot",
    company: "GitHub / Microsoft",
    logo: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
    badge: "#238636",
    badgeText: "Best for enterprise",
    price: "$10/month",
    score: "Native GitHub integration",
    ideal: "Companies in the Microsoft / Azure / GitHub ecosystem",
    highlights: [
      "Most accessible safety net ($10/month)",
      "Native integration across the entire GitHub platform",
      "Compatible with VS Code, JetBrains, Visual Studio",
      "Full agent mode + PR reviews",
    ],
    emoji: "🐙",
  },
  {
    name: "Windsurf 2.0",
    company: "Codeium",
    logo: "https://codeium.com/favicon.ico",
    badge: "#0ea5e9",
    badgeText: "Remote delegation",
    price: "$15/month",
    score: "Integrates Devin",
    ideal: "Teams that want to delegate long tasks to a remote VM",
    highlights: [
      "Integrates Devin for one-click delegation",
      "Runs tasks in an isolated remote VM",
      "Doesn't touch your local machine",
      "Ideal for long background tasks",
    ],
    emoji: "🌊",
  },
];

const tableData = [
  { need: "Difficult refactors and deep reasoning", tool: "Claude Code" },
  { need: "Best day-to-day IDE experience", tool: "Cursor" },
  { need: "Google / GCP ecosystem", tool: "Google Antigravity 2.0" },
  { need: "Company on GitHub / Microsoft", tool: "GitHub Copilot" },
  { need: "Delegate long tasks to a remote VM", tool: "Windsurf 2.0" },
  { need: "Tight budget", tool: "Copilot ($10) + Cline (free)" },
];

const roadmap = [
  {
    period: "Week 1",
    icon: "🚀",
    tool: "GitHub Copilot",
    action: "Install it in VS Code",
    detail: "The gentlest entry point, extensive documentation, works in all IDEs.",
    color: "#238636",
  },
  {
    period: "Weeks 2–3",
    icon: "⚡",
    tool: "Cursor",
    action: "Download and try Composer",
    detail: "Test it on a real project. Composer for multi-file editing will change your workflow.",
    color: "#0072ff",
  },
  {
    period: "Month 2",
    icon: "🤖",
    tool: "Claude Code",
    action: "Add it to your terminal",
    detail: "For tasks that require deep reasoning or multi-file automation.",
    color: "#7c3aed",
  },
  {
    period: "Month 3+",
    icon: "☁️",
    tool: "Antigravity / Windsurf",
    action: "Evaluate based on your stack",
    detail: "Google Antigravity if you work with GCP. Windsurf if you want to delegate complex tasks.",
    color: "#0ea5e9",
  },
];

const faqs = [
  {
    q: "Is Claude Code the best AI agent for programming in 2026?",
    a: "It depends on the use case. Claude Code leads in deep reasoning and complex refactors (80.9% SWE-bench), but Cursor wins in IDE experience and Copilot in enterprise integration. For most senior developers, combining Claude Code + Cursor is the optimal setup.",
  },
  {
    q: "How much does it cost to use AI agents professionally?",
    a: "The range varies: Copilot from $10/month, Cursor and Claude Code from $20/month, and Windsurf Pro at $15/month. Heavy Claude Code users report $100–200/month in real usage. The most efficient setup for teams is Copilot as a base + Claude Code for deep work.",
  },
  {
    q: "What is Google Antigravity and how does it differ from Copilot?",
    a: "Google Antigravity 2.0 is a native agent IDE (not a plugin) that runs with Gemini 3.5 Flash as its base model. Unlike Copilot, which integrates into existing editors, Antigravity is the complete environment. Its key advantage is speed and deep integration with Google Cloud.",
  },
  {
    q: "Will AI agents replace developers?",
    a: "No. 2026 agents are reliable for 5–15 step tasks; longer or more ambiguous tasks still degrade without human supervision. The trend is toward developers multiplying their output with agents, not toward eliminating the role.",
  },
  {
    q: "Where do I start if I am a junior developer?",
    a: "Start with GitHub Copilot: it has the gentlest learning curve, extensive documentation, and works in all IDEs. Once you understand how to collaborate with an AI assistant, move on to Cursor for multi-file tasks.",
  },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e5e7eb" }}>
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
      ...(await serverSideTranslations(locale || "en", ["common"])),
    },
  };
}

export default function AIAgents2026() {
  return (
    <Layout>
      <Head>
        <title>The Importance of Using AI Agents in Development in 2026 | Juan Camilo Salazar</title>
        <meta name="description" content="Discover why AI agents like Claude Code, Cursor and GitHub Copilot are essential in 2026 and which to choose based on your workflow." />
        <meta name="keywords" content="AI agents, Claude Code, Cursor, GitHub Copilot, programming 2026, AI developer tools, Windsurf, Google Antigravity" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="The Importance of Using AI Agents in Development in 2026" />
        <meta property="og:description" content="Discover why AI agents like Claude Code, Cursor and GitHub Copilot are essential in 2026 and which to choose based on your workflow." />
        <meta property="og:image" content="/images/ai-agents.webp" />
        <meta property="article:published_time" content="2026-06-02" />
      </Head>

      {/* ── HERO ── */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src="/images/ai-agents.webp"
          alt="The Importance of Using AI Agents in Development in 2026"
          width={1280}
          height={500}
          priority
          style={{ width: "100%", height: "420px", objectFit: "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(10,10,26,0.65) 0%, rgba(10,10,26,0.88) 100%)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", zIndex: 1 }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%", padding: "0 24px" }}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
              {["AI", "Tools", "Productivity", "2026"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(0,114,255,0.2)",
                    border: "1px solid rgba(0,114,255,0.4)",
                    color: "#60a5fa",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    padding: "4px 12px",
                    borderRadius: "20px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1
              style={{
                fontSize: "clamp(1.8rem, 5vw, 3rem)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.2,
                marginBottom: "20px",
                letterSpacing: "-0.02em",
              }}
            >
              The Importance of Using{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #0072ff, #00c6ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                AI Agents
              </span>{" "}
              in Development in 2026
            </h1>
            <p style={{ fontSize: "1.15rem", color: "#94a3b8", lineHeight: 1.7, marginBottom: "32px" }}>
              Discover why Claude Code, Cursor and GitHub Copilot are essential infrastructure today — and which to choose based on your workflow.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
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
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  JC
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#fff", fontWeight: 600 }}>Juan Camilo Salazar</p>
                  <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>Jun 2, 2026 · 8 min read</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STAT BANNER ── */}
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "0 24px" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          }}
        >
          {[
            { num: "84%", label: "devs use AI today" },
            { num: "51%", label: "use it daily" },
            { num: "5x", label: "faster on tasks" },
            { num: "2026", label: "it's infrastructure now" },
          ].map((s) => (
            <div
              key={s.num}
              style={{
                padding: "28px 20px",
                textAlign: "center",
                borderRight: "1px solid #e2e8f0",
              }}
            >
              <p style={{ margin: 0, fontSize: "1.8rem", fontWeight: 800, color: "#0072ff" }}>{s.num}</p>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b", marginTop: "4px" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}>

        {/* ── INTRO ── */}
        <section style={{ marginBottom: "64px" }}>
          <p
            style={{
              fontSize: "1.15rem",
              color: "#374151",
              lineHeight: 1.8,
              borderLeft: "4px solid #0072ff",
              paddingLeft: "20px",
              marginBottom: "20px",
            }}
          >
            In 2024, AI agents were a curiosity. In 2026, they are infrastructure. If you write code
            professionally today and don't use an AI agent, you are not competing on a level playing field.
          </p>
          <p style={{ fontSize: "1rem", color: "#4b5563", lineHeight: 1.8 }}>
            This is not an exaggeration:{" "}
            <strong>84% of professional developers</strong> already use some form of AI assistance,
            and 51% do so daily (Stack Overflow, 2025). The shift is not optional — it is structural.
          </p>
        </section>

        {/* ── WHAT IS AN AI AGENT ── */}
        <section style={{ marginBottom: "64px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a1a2e", marginBottom: "24px" }}>
            What Is an AI Agent for Programming?
          </h2>
          <p style={{ color: "#4b5563", lineHeight: 1.7, marginBottom: "24px" }}>
            An AI agent is not just improved autocomplete. The difference is fundamental:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            {[
              {
                year: "2022",
                label: "Autocomplete",
                desc: "Suggests the next line. You control every keystroke.",
                icon: "⌨️",
                dim: true,
              },
              {
                year: "2023–24",
                label: "Assistant",
                desc: "Answers questions, generates blocks of code.",
                icon: "💬",
                dim: true,
              },
              {
                year: "2025–26",
                label: "Agent",
                desc: "Plans, edits 6 files, runs tests, fixes what broke, and delivers a PR.",
                icon: "🤖",
                dim: false,
              },
            ].map((item) => (
              <div
                key={item.year}
                style={{
                  background: item.dim ? "#f8fafc" : "linear-gradient(135deg, #0072ff, #0d47a1)",
                  borderRadius: "16px",
                  padding: "24px",
                  border: item.dim ? "1px solid #e2e8f0" : "none",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: item.dim ? "#94a3b8" : "rgba(255,255,255,0.7)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {item.year}
                </span>
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: item.dim ? "#1a1a2e" : "#fff",
                    margin: "4px 0 8px",
                  }}
                >
                  {item.label}
                </h3>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: item.dim ? "#6b7280" : "rgba(255,255,255,0.85)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TOOLS ── */}
        <section style={{ marginBottom: "64px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a1a2e", marginBottom: "8px" }}>
            The Best AI Agents in 2026
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "32px", lineHeight: 1.6 }}>
            Five tools, five profiles. Choose based on your workflow.
          </p>

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
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "14px",
                      background: "#f8fafc",
                      border: "1px solid #e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      padding: "8px",
                    }}
                  >
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = `<span style="font-size:1.8rem">${tool.emoji}</span>`;
                      }}
                    />
                  </div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8" }}>#{i + 1}</span>
                </div>

                {/* Content */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "6px" }}>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#1a1a2e", margin: 0 }}>{tool.name}</h3>
                    <span
                      style={{
                        background: tool.badge,
                        color: "#fff",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "20px",
                      }}
                    >
                      {tool.badgeText}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.83rem", color: "#9ca3af", margin: "0 0 12px", fontWeight: 500 }}>
                    {tool.company}
                  </p>

                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
                    <span style={{ background: "#f0fdf4", color: "#166534", fontSize: "0.8rem", fontWeight: 600, padding: "4px 12px", borderRadius: "8px" }}>
                      {tool.price}
                    </span>
                    <span style={{ background: "#eff6ff", color: "#1e40af", fontSize: "0.8rem", fontWeight: 600, padding: "4px 12px", borderRadius: "8px" }}>
                      {tool.score}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.6, marginBottom: "16px" }}>
                    <strong>Ideal for:</strong> {tool.ideal}
                  </p>

                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "6px",
                    }}
                  >
                    {tool.highlights.map((h) => (
                      <li
                        key={h}
                        style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.83rem", color: "#4b5563" }}
                      >
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

        {/* ── TABLE ── */}
        <section style={{ marginBottom: "64px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a1a2e", marginBottom: "8px" }}>
            Which One to Choose?
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>Quick guide based on your main need.</p>
          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)" }}>
                  <th style={{ padding: "16px 20px", textAlign: "left", fontSize: "0.82rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Need
                  </th>
                  <th style={{ padding: "16px 20px", textAlign: "left", fontSize: "0.82rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Tool
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      background: i % 2 === 0 ? "#fff" : "#f8fafc",
                      borderBottom: "1px solid #f1f5f9",
                    }}
                  >
                    <td style={{ padding: "14px 20px", fontSize: "0.9rem", color: "#374151" }}>{row.need}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span
                        style={{
                          background: "linear-gradient(135deg, #0072ff, #0d47a1)",
                          color: "#fff",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          padding: "4px 14px",
                          borderRadius: "20px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.tool}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p
            style={{
              marginTop: "20px",
              padding: "16px 20px",
              background: "#eff6ff",
              borderRadius: "12px",
              fontSize: "0.9rem",
              color: "#1e40af",
              lineHeight: 1.6,
              border: "1px solid #bfdbfe",
            }}
          >
            <strong>💡 2026 Recommendation:</strong> Most professional devs use more than one. Cursor or Windsurf as daily IDE agent. Claude Code for difficult problems. Copilot as a $10/month safety net that works everywhere.
          </p>
        </section>

        {/* ── ROADMAP ── */}
        <section style={{ marginBottom: "64px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a1a2e", marginBottom: "8px" }}>
            How to Get Started Today
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "32px" }}>
            Recommended path for progressively adopting AI agents.
          </p>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "27px",
                top: "40px",
                bottom: "40px",
                width: "2px",
                background: "linear-gradient(to bottom, #0072ff, #7c3aed, #0ea5e9)",
                borderRadius: "2px",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {roadmap.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: step.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.4rem",
                      boxShadow: `0 0 0 4px white, 0 0 0 6px ${step.color}33`,
                      zIndex: 1,
                    }}
                  >
                    {step.icon}
                  </div>
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "16px",
                      padding: "20px 24px",
                      flex: 1,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: step.color,
                          background: `${step.color}15`,
                          padding: "3px 10px",
                          borderRadius: "20px",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {step.period}
                      </span>
                      <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>
                        {step.action}
                      </h3>
                    </div>
                    <p style={{ margin: "0 0 4px", fontSize: "0.83rem", fontWeight: 600, color: step.color }}>
                      {step.tool}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "#6b7280", lineHeight: 1.6 }}>
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a1a2e", marginBottom: "8px" }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "32px" }}>
            The most common questions about AI agents in 2026.
          </p>
          <div
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "20px",
              padding: "8px 28px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} />
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)",
            borderRadius: "24px",
            padding: "48px 40px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#60a5fa", letterSpacing: "0.1em", marginBottom: "12px" }}>
            SALAZAR CODE
          </p>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff", marginBottom: "16px", lineHeight: 1.3 }}>
            Ready to multiply your productivity?
          </h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: "28px", maxWidth: "480px", margin: "0 auto 28px" }}>
            The winning developer of 2026 is not the one who uses the most tools, but the one who knows when to use which.
          </p>
          <a
            href="/blog"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #0072ff, #0d47a1)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.95rem",
              padding: "14px 32px",
              borderRadius: "12px",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(0,114,255,0.35)",
            }}
          >
            See more articles →
          </a>
        </div>

      </div>
    </Layout>
  );
}

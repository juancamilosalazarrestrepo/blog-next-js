import React, { useState } from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const IMAGE = "/images/gpt-6-astra-vs-fable-5-1-programar.webp";
const KEYWORDS = [
  "GPT-6 Astra",
  "Claude Fable 5.1",
  "GPT-6 Astra vs Fable 5.1",
  "best AI model for coding 2026",
  "Claude Code",
  "OpenAI Codex",
  "AI coding benchmarks",
  "LLM API pricing",
];
// El slug cambia entre idiomas, así que el hreflang no se puede derivar de la URL actual.
const ALTERNATE_PATHS = {
  es: "/blog/gpt-6-astra-vs-fable-5-1-programar",
  en: "/blog/gpt-6-astra-vs-fable-5-1-coding",
};
const TITLE = "GPT-6 Astra vs Claude Fable 5.1: which model is better for coding in 2026?";
const SUBTITLE =
  "We compare GPT-6 Astra and Claude Fable 5.1 for coding: independent benchmarks, pricing, context window and when each model is the right call in 2026.";
const DATE = "September 12, 2026";
const READ_TIME = "9 min read";

const ASTRA = "#10b981";
const FABLE = "#f59e0b";

const specs = [
  { label: "Released", astra: "Sept 3, 2026", fable: "Sept 1, 2026" },
  { label: "API ID", astra: "gpt-6-astra", fable: "claude-fable-5-1", mono: true },
  { label: "Context window", astra: "~1.05M tokens", fable: "1M tokens" },
  { label: "Max output", astra: "128K tokens", fable: "128K tokens" },
  { label: "Input / output (per million)", astra: "$10 / $50", fable: "$10 / $50" },
  { label: "Cache read (per million)", astra: "$1", fable: "$0.25", win: "fable" },
  { label: "Own coding agent", astra: "Codex", fable: "Claude Code" },
  { label: "Also available on", astra: "ChatGPT, Amazon Bedrock", fable: "Bedrock, Google Cloud, Foundry, GitHub Copilot" },
];

const benchmarks = [
  { name: "Coding Agent Index", source: "Independent", astra: 62, fable: 62, max: 100, unit: "" },
  { name: "Terminal-Bench 4.0", source: "Independent", astra: 59, fable: 52, max: 100, unit: "%" },
  { name: "Terminal-Bench 4.0", source: "OpenAI", astra: 57.7, fable: 55.8, max: 100, unit: "%" },
  { name: "DeepSWE v1.1", source: "OpenAI", astra: 74.1, fable: 67.4, max: 100, unit: "%" },
  { name: "Humanity's Last Exam (with tools)", source: "OpenAI", astra: 57.2, fable: 65.0, max: 100, unit: "%" },
];

const costRows = [
  { label: "Fresh input (200K)", astra: "$2.00", fable: "$2.00" },
  { label: "Cache reads (1.8M)", astra: "$1.80", fable: "$0.45" },
  { label: "Output", astra: "$1.35 (27K)", fable: "$3.90 (78K)" },
];

const choose = [
  {
    model: "GPT-6 Astra",
    color: ASTRA,
    icon: "⚡",
    tagline: "Best result per dollar",
    items: [
      "You pay for the API yourself and every task counts",
      "You live in the terminal: scripts, DevOps, CI, migrations",
      "You already use ChatGPT or Codex daily",
      "You need speed: Fast mode runs up to 2.5× faster (at twice the price)",
    ],
  },
  {
    model: "Claude Fable 5.1",
    color: FABLE,
    icon: "🧠",
    tagline: "For the long, ambiguous and hard",
    items: [
      "Large refactors and multi-file migrations",
      "Hard bugs where a confidently wrong answer is expensive",
      "You already work in Claude Code or GitHub Copilot",
      "Hours-long sessions with a lot of cached context",
    ],
  },
];

const migration = [
  {
    title: "Forced tool_choice is rejected",
    body: "On Fable 5.1, a tool_choice of type \"any\" or \"tool\" returns a 400 error. Use \"auto\" with strict: true, or structured outputs.",
  },
  {
    title: "History must be append-only",
    body: "Editing earlier messages invalidates thinking blocks. Claude Code and the Agent SDK handle it for you; if you build the messages array yourself, check it.",
  },
  {
    title: "It tends to rewrite whole files",
    body: "For small changes it may rewrite the entire file. Ask for targeted edits and you will save output tokens.",
  },
  {
    title: "Per-message effort (beta)",
    body: "Raise the effort level for one hard step and lower it for routine ones, without losing the prompt cache.",
  },
];

const codeAstra = `import OpenAI from "openai";

const client = new OpenAI();

const res = await client.responses.create({
  model: "gpt-6-astra",
  input: "Refactor this React hook to avoid extra renders: ...",
});

console.log(res.output_text);`;

const codeFable = `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const msg = await client.messages.create({
  model: "claude-fable-5-1",
  max_tokens: 16000,
  messages: [
    { role: "user", content: "Refactor this React hook to avoid extra renders: ..." },
  ],
});

for (const block of msg.content) {
  if (block.type === "text") console.log(block.text);
}`;

const alternatives = [
  { name: "Claude Opus 5", price: "$5 / $25", note: "Anthropic recommends starting here and moving up to Fable only if you need it." },
  { name: "Claude Sonnet 5", price: "$2 / $10", note: "Fast for completions and small changes." },
  { name: "Muse Glimmer (Meta)", price: "Open weights", note: "30B parameters, runs offline on a 24 GB GPU." },
];

const faqs = [
  {
    q: "Which is better for coding, GPT-6 Astra or Claude Fable 5.1?",
    a: "On code quality they are tied: both score 62 on Artificial Analysis' Coding Agent Index. Astra wins on terminal tasks and uses fewer tokens; Fable 5.1 wins on hard reasoning and long multi-step work.",
  },
  {
    q: "If they cost the same per token, why is one cheaper?",
    a: "Because output is the expensive half, and Astra writes about a third of the tokens Fable 5.1 needs to reach the same result. Fable claws some of it back with cheaper cache reads ($0.25 versus $1 per million), but for most tasks Astra still comes out cheaper.",
  },
  {
    q: "Can I use Claude Fable 5.1 in GitHub Copilot?",
    a: "Yes. GitHub announced on September 1, 2026 that Fable 5.1 is generally available in Copilot. Note that it requires data retention by default, except for some eligible enterprise customers.",
  },
  {
    q: "Do I need one of these models for everyday work?",
    a: "Rarely. For completions, tests and small changes, models like Claude Opus 5 or Sonnet 5 perform very well for far less money. Save the frontier models for tasks where they genuinely make a difference.",
  },
  {
    q: "How reliable are these benchmarks?",
    a: "They are useful for spotting trends, not for deciding on their own. Every vendor publishes the evals it wins, which is why this article separates independent measurements from numbers published by OpenAI and Anthropic. The most reliable test is running both for a week against your own repository.",
  },
];

const sources = [
  { label: "Claude Fable 5.1 — Claude Platform Docs", href: "https://platform.claude.com/docs/en/models/fable-5-1/overview" },
  { label: "What's new in Claude Fable 5.1", href: "https://platform.claude.com/docs/en/models/fable-5-1/whats-new-fable-5-1" },
  { label: "Benchmarking GPT-6 Astra — Artificial Analysis", href: "https://artificialanalysis.ai/articles/benchmarking-gpt-6-astra" },
  { label: "GPT-6 Astra: Features, Benchmarks, and Pricing — DataCamp", href: "https://www.datacamp.com/blog/gpt-6-astra" },
  { label: "GPT-6 Astra Benchmarks Explained — Vellum", href: "https://www.vellum.ai/blog/gpt-6-astra-benchmarks-explained" },
  { label: "Claude Fable 5.1: Same Sticker, Cheaper Cache — LLM Stats", href: "https://llm-stats.com/blog/research/claude-fable-5-1-launch" },
  { label: "Claude Fable 5.1 in GitHub Copilot — GitHub Changelog", href: "https://github.blog/changelog/2026-09-01-claude-fable-5-1-generally-available-in-github-copilot/" },
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
        {value}
        {unit}
      </span>
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

export default function GptAstraVsFableEn() {
  return (
    <Layout>
      <SEO
        title={TITLE}
        description={SUBTITLE}
        image={IMAGE}
        imageAlt={TITLE}
        type="article"
        date="2026-09-12"
        keywords={KEYWORDS}
        languages={["es", "en"]}
        paths={ALTERNATE_PATHS}
      />

      {/* ── HERO ── */}
      {/* The image sits in the background and the text stays in normal flow, so the hero grows on mobile instead of clipping */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: "420px", display: "flex", alignItems: "center" }}>
        <Image
          src={IMAGE}
          alt="GPT-6 Astra vs Claude Fable 5.1 comparison for coding"
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
              {["AI models", "Comparison", "September 2026"].map((tag) => (
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

      {/* ── SUMMARY BANNER ── */}
      <div style={{ background: "linear-gradient(135deg, #0d1b4b, #1a1a2e)", padding: "40px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.75, maxWidth: "680px", margin: "0 auto" }}>
            The two most capable models of the moment shipped in the same week. They charge the same per token, handle a
            million tokens of context, and both claim to be the best at writing code.{" "}
            <strong style={{ color: "#e2e8f0" }}>
              The short answer: on code quality they are tied. What separates them is the cost per task and how they
              behave inside an agent loop.
            </strong>
          </p>
          <div style={{ display: "flex", gap: "40px", justifyContent: "center", marginTop: "32px", flexWrap: "wrap" }}>
            {[
              { num: "62 = 62", label: "Coding Agent Index" },
              { num: "$10 / $50", label: "Same price per million" },
              { num: "~⅓", label: "Astra's output tokens vs Fable" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0072ff" }}>{s.num}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.82rem", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SPEC SHEET ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>Spec sheet</h2>
          <p style={sectionLead}>The basics of each model, taken from the official documentation</p>
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
                            4× cheaper
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
          <h2 style={sectionTitle}>Benchmarks: what the numbers say</h2>
          <p style={sectionLead}>
            Independent measurements (Artificial Analysis) kept separate from vendor-published numbers.
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
                      background: b.source === "Independent" ? "#dcfce7" : "#f1f5f9",
                      color: b.source === "Independent" ? "#166534" : "#64748b",
                    }}
                  >
                    {b.source === "Independent" ? "✓ Independent" : `Published by ${b.source}`}
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
            <strong>Quick read:</strong> Astra wins on terminal work and efficiency. Fable 5.1 wins on hard reasoning and
            multi-step work. On general agentic coding, it is a tie. Anthropic, for its part, reports that Fable 5.1 went
            from 42.0% to 55.8% on Terminal-Bench 4.0 compared with Fable 5.
          </div>
        </div>
      </div>

      {/* ── REAL COST ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>The real cost is not the price per token</h2>
          <p style={sectionLead}>If both charge $10 / $50, why does one end up cheaper?</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "32px" }}>
            {[
              {
                icon: "✍️",
                title: "Output tokens",
                body: "Output is the expensive half, and Astra writes around 27K tokens per task versus 78K for Fable 5.1. On the Intelligence Index, Astra costs $3.26 per task and Fable 5.1 $7.63.",
                color: ASTRA,
              },
              {
                icon: "🗄️",
                title: "Caching",
                body: "Fable 5.1 charges $0.25 per million for cache reads, four times less than before. In agent sessions that run for hours, that helps a lot.",
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
              <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>Example: one agent session</h3>
              <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: "0.85rem" }}>
                200K tokens of fresh input, 1.8M read from cache, and each model&apos;s typical output
              </p>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "480px" }}>
              <thead>
                <tr style={{ background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)" }}>
                  <th style={{ padding: "12px 20px", textAlign: "left", color: "#94a3b8", fontSize: "0.8rem" }}>Item</th>
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
                  <td style={{ padding: "14px 20px", textAlign: "right", color: ASTRA, fontWeight: 800, fontSize: "1.05rem" }}>$5.15</td>
                  <td style={{ padding: "14px 20px", textAlign: "right", color: FABLE, fontWeight: 800, fontSize: "1.05rem" }}>$6.35</td>
                </tr>
              </tbody>
            </table>
            <p style={{ margin: 0, padding: "14px 22px", color: "#6b7280", fontSize: "0.82rem", lineHeight: 1.6, borderTop: "1px solid #e5e7eb" }}>
              Simplified estimate: cache writes are not included. It shows that Fable&apos;s cheap cache does not fully
              offset writing nearly three times as much.
            </p>
          </div>
        </div>
      </div>

      {/* ── WHICH ONE ── */}
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>Which one fits your case?</h2>
          <p style={sectionLead}>There is no absolute winner: it depends on how you write code</p>
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

      {/* ── CODE ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>Try them from your code</h2>
          <p style={sectionLead}>The same request with each vendor&apos;s official Node.js SDK</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            <CodeBlock code={codeAstra} label="GPT-6 Astra · openai" color={ASTRA} />
            <CodeBlock code={codeFable} label="Claude Fable 5.1 · @anthropic-ai/sdk" color={FABLE} />
          </div>

          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1a1a2e", margin: "56px 0 20px", textAlign: "center" }}>
            Migrating to Fable 5.1? Check these
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

      {/* ── ALTERNATIVES + VERDICT ── */}
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={sectionTitle}>What if neither?</h2>
          <p style={sectionLead}>For everyday work, something cheaper is often enough</p>
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
            <h2 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, margin: "0 0 24px", textAlign: "center" }}>Verdict</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              {[
                { k: "Best value for money", v: "GPT-6 Astra", c: ASTRA },
                { k: "Best for long, hard tasks", v: "Claude Fable 5.1", c: FABLE },
                { k: "Best for everyday work", v: "A mid-tier model", c: "#0ea5e9" },
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
              The most useful thing you can do is run both against your own repository for a week. Benchmarks show the
              trend, but your codebase casts the deciding vote.
            </p>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ ...sectionTitle, marginBottom: "40px" }}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} />
          ))}

          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1a1a2e", margin: "56px 0 14px" }}>Sources</h3>
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
              Want to get more out of your coding agent?
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto 32px" }}>
              Picking the model is only the first step. Learn how to give it context with{" "}
              <strong style={{ color: "#93c5fd" }}>Claude Code skills</strong> and how to work with AI agents in your own
              projects.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="/en/blog/claude-code-skills-tips"
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
                Read about skills →
              </a>
              <a
                href="/en/blog"
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
                More articles
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

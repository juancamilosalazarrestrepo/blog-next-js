import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { SITE_URL } from "../../lib/site";

// Plantilla visual compartida por la guía de Rust en español e inglés.
// Cada página aporta su `content` (textos, código, slugs); aquí vive solo el diseño y el SEO.

export const inlineCode = {
  background: "rgba(0,114,255,0.12)",
  color: "var(--brand)",
  padding: "2px 7px",
  borderRadius: "6px",
  fontSize: "0.9em",
};

export const C = ({ children }) => <code style={inlineCode}>{children}</code>;
export const B = ({ children }) => <strong style={{ color: "var(--ink)" }}>{children}</strong>;

function CodeBlock({ code, label, tone }) {
  const color = tone === "bad" ? "#ef4444" : tone === "good" ? "#10b981" : "#93c5fd";
  return (
    <div style={{ marginTop: "14px" }}>
      {label && (
        <span
          style={{
            display: "inline-block",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color,
            marginBottom: "6px",
          }}
        >
          {label}
        </span>
      )}
      <pre
        style={{
          background: "#0f172a",
          borderRadius: "12px",
          padding: "16px 20px",
          margin: 0,
          fontSize: "0.84rem",
          color: "#e2e8f0",
          overflowX: "auto",
          lineHeight: 1.7,
          borderLeft: `4px solid ${color}`,
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SlideImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1080}
      height={1350}
      sizes="(max-width: 700px) 90vw, 360px"
      style={{
        width: "100%",
        height: "auto",
        borderRadius: "16px",
        border: "1px solid var(--border)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
      }}
    />
  );
}

function Block({ id, kicker, title, color = "var(--brand)", slide, alt, flip, bg, children }) {
  return (
    <section id={id} style={{ background: bg || "var(--surface)", padding: "72px 24px", scrollMarginTop: "72px" }}>
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <div style={{ order: flip ? 2 : 1, minWidth: 0 }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, color, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {kicker}
          </span>
          <h2 style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--ink)", lineHeight: 1.25, margin: "8px 0 18px" }}>
            {title}
          </h2>
          <div style={{ color: "var(--text-soft)", lineHeight: 1.75, fontSize: "1rem" }}>{children}</div>
        </div>
        <div style={{ order: flip ? 1 : 2, maxWidth: "360px", width: "100%", justifySelf: "center" }}>
          <SlideImage src={slide} alt={alt} />
        </div>
      </div>
    </section>
  );
}

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
            background: open ? "linear-gradient(135deg, #0072ff, #7c3aed)" : "var(--surface-3)",
            color: open ? "#fff" : "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "1.1rem",
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

const eyebrow = (color) => ({
  fontSize: "0.72rem",
  fontWeight: 700,
  color,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
});

export default function RustGuideArticle({ content: t }) {
  const lang = t.lang;
  const prefix = lang === "es" ? "" : `/${lang}`;
  const pageUrl = `${SITE_URL}${prefix}/blog/${t.slug}`;
  const ogImage = `/images/${t.ogFile}.jpg`;
  const slide = (n) => `/images/${t.slidePrefix}-${String(n).padStart(2, "0")}.webp`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: t.title,
      description: t.subtitle,
      image: [`${SITE_URL}${ogImage}`, `${SITE_URL}/images/${t.slug}.webp`],
      author: { "@type": "Person", name: "Juan Camilo Salazar", url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: "Juan Camilo Salazar",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/images/camiloPaginaWeb.webp` },
      },
      datePublished: t.isoDate,
      dateModified: t.isoDate,
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
      inLanguage: lang === "es" ? "es-ES" : "en-US",
      keywords: t.keywords.join(", "),
      articleSection: t.section,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.ui.home, item: `${SITE_URL}${prefix || "/"}` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}${prefix}/blog` },
        { "@type": "ListItem", position: 3, name: t.shortTitle, item: pageUrl },
      ],
    },
  ];

  const ctaBtn = {
    fontWeight: 700,
    padding: "14px 32px",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "0.95rem",
    display: "inline-block",
  };

  return (
    <Layout>
      <SEO
        title={t.seoTitle}
        description={t.subtitle}
        image={ogImage}
        imageAlt={t.ogAlt}
        imageWidth={1200}
        imageHeight={630}
        type="article"
        date={t.isoDate}
        keywords={t.keywords}
        category={t.section}
        languages={["es", "en"]}
        paths={t.alternatePaths}
        appendSiteName={false}
        schema={schema}
      />

      {/* ── HERO ── la imagen va de fondo y el texto en flujo normal: en móvil el hero crece en vez de recortarse */}
      <header style={{ position: "relative", overflow: "hidden", minHeight: "420px", display: "flex", alignItems: "center" }}>
        <Image
          src={`/images/${t.slug}.webp`}
          alt={t.heroAlt}
          width={1280}
          height={500}
          priority
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
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
              {t.tags.map((tag) => (
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
              {t.title}
            </h1>
            <p style={{ color: "#cbd5e1", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "24px", maxWidth: "700px" }}>
              {t.subtitle}
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
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                  }}
                >
                  JC
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.88rem" }}>Juan Camilo Salazar</div>
                  <time dateTime={t.isoDate} style={{ color: "var(--text-subtle)", fontSize: "0.78rem" }}>
                    {t.dateLabel}
                  </time>
                </div>
              </div>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>·</span>
              <span style={{ color: "var(--text-subtle)", fontSize: "0.85rem" }}>⏱ {t.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── RESPUESTA RÁPIDA + ÍNDICE ── */}
      <div style={{ background: "linear-gradient(135deg, #0d1b4b, #1a1a2e)", padding: "48px 24px" }}>
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
            alignItems: "start",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <span style={eyebrow("#93c5fd")}>{t.ui.quickAnswer}</span>
            <p style={{ color: "#e2e8f0", fontSize: "1.02rem", lineHeight: 1.75, margin: "10px 0 0" }}>{t.intro}</p>
          </div>
          <nav aria-label={t.ui.toc} style={{ minWidth: 0 }}>
            <span style={eyebrow("#93c5fd")}>{t.ui.toc}</span>
            <ol style={{ margin: "10px 0 0", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
              {t.toc.map(([id, label]) => (
                <li key={id} style={{ color: "var(--text-subtle)" }}>
                  <a href={`#${id}`} style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "0.93rem" }}>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* ── QUÉ ES ── */}
      <Block id={t.toc[0][0]} kicker={t.s.what.kicker} title={t.s.what.title} slide={slide(2)} alt={t.s.what.alt}>
        {t.s.what.body}
      </Block>

      {/* ── POR QUÉ AHORA ── */}
      <section id={t.toc[1][0]} style={{ background: "var(--surface-2)", padding: "72px 24px", scrollMarginTop: "72px" }}>
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            alignItems: "center",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <span style={eyebrow("var(--violet)")}>{t.s.why.kicker}</span>
            <h2 style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--ink)", lineHeight: 1.25, margin: "8px 0 24px" }}>
              {t.s.why.title}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {t.reasons.map((r) => (
                <div
                  key={r.num}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "20px 22px",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: r.color }} />
                  <div style={{ display: "flex", gap: "12px", alignItems: "baseline", marginBottom: "6px" }}>
                    <span style={{ color: r.color, fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.08em" }}>{r.num}</span>
                    <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)" }}>{r.title}</h3>
                  </div>
                  <p style={{ margin: 0, color: "var(--text-soft)", lineHeight: 1.7, fontSize: "0.95rem" }}>{r.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ maxWidth: "360px", width: "100%", justifySelf: "center" }}>
            <SlideImage src={slide(3)} alt={t.s.why.alt} />
          </div>
        </div>
      </section>

      {/* ── BYTECODE ── */}
      <Block id={t.toc[2][0]} kicker={t.s.bytecode.kicker} title={t.s.bytecode.title} color="#0ea5e9" slide={slide(4)} alt={t.s.bytecode.alt} flip>
        <p style={{ marginBottom: "14px" }}>{t.s.bytecode.intro}</p>
        <div style={{ overflowX: "auto", borderRadius: "14px", border: "1px solid var(--border)", marginBottom: "14px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <caption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
              {t.s.bytecode.caption}
            </caption>
            <thead>
              <tr style={{ background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)" }}>
                <th style={{ padding: "12px 14px", textAlign: "left", color: "#94a3b8", fontWeight: 600 }}> </th>
                <th style={{ padding: "12px 14px", textAlign: "left", color: "#94a3b8", fontWeight: 600 }}>Java · C# · Python</th>
                <th style={{ padding: "12px 14px", textAlign: "left", color: "#93c5fd", fontWeight: 700 }}>Rust</th>
              </tr>
            </thead>
            <tbody>
              {t.compare.map((row, i) => (
                <tr key={row.k} style={{ background: i % 2 ? "var(--surface-2)" : "var(--surface)" }}>
                  <td style={{ padding: "12px 14px", color: "var(--ink)", fontWeight: 600 }}>{row.k}</td>
                  <td style={{ padding: "12px 14px", color: "var(--text-soft)" }}>{row.a}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <span
                      style={{
                        background: "linear-gradient(135deg, #0072ff, #0d47a1)",
                        color: "#fff",
                        borderRadius: "20px",
                        padding: "3px 12px",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.b}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ margin: 0 }}>{t.s.bytecode.outro}</p>
      </Block>

      {/* ── SINTAXIS ── */}
      <Block id={t.toc[3][0]} kicker={t.s.syntax.kicker} title={t.s.syntax.title} bg="var(--surface-2)" slide={slide(5)} alt={t.s.syntax.alt}>
        <p style={{ marginBottom: 0 }}>{t.s.syntax.intro}</p>
        <CodeBlock code={t.code.syntax} label="main.rs" />
        <p style={{ marginTop: "14px", marginBottom: 0 }}>{t.s.syntax.outro}</p>
      </Block>

      {/* ── ARRAYS ── */}
      <Block id={t.toc[4][0]} kicker={t.s.arrays.kicker} title={t.s.arrays.title} color="var(--violet)" slide={slide(6)} alt={t.s.arrays.alt} flip>
        <p style={{ marginBottom: 0 }}>{t.s.arrays.intro}</p>
        <CodeBlock code={t.code.arrays} label="main.rs" />
        <ul style={{ paddingLeft: "20px", margin: "14px 0 0", display: "flex", flexDirection: "column", gap: "8px" }}>
          {t.s.arrays.items.map((li, i) => (
            <li key={i}>{li}</li>
          ))}
        </ul>
      </Block>

      {/* ── ITERADORES ── */}
      <Block id={t.toc[5][0]} kicker={t.s.iter.kicker} title={t.s.iter.title} bg="var(--surface-2)" color="#0ea5e9" slide={slide(7)} alt={t.s.iter.alt}>
        <p style={{ marginBottom: 0 }}>{t.s.iter.intro}</p>
        <CodeBlock code={t.code.iter} label="main.rs" />
        <p style={{ marginTop: "14px", marginBottom: 0 }}>{t.s.iter.outro}</p>
      </Block>

      {/* ── OWNERSHIP ── */}
      <Block id={t.toc[6][0]} kicker={t.s.own.kicker} title={t.s.own.title} color="#f97316" slide={slide(8)} alt={t.s.own.alt} flip>
        <p style={{ marginBottom: 0 }}>{t.s.own.intro}</p>
        <CodeBlock code={t.code.own} label={t.ui.bad} tone="bad" />
        <p style={{ margin: "14px 0 0" }}>{t.s.own.mid}</p>
        <CodeBlock code={t.code.ownFix} label={t.ui.good} tone="good" />
      </Block>

      {/* ── VENTAJAS ── */}
      <section id={t.toc[7][0]} style={{ background: "var(--surface-2)", padding: "72px 24px", scrollMarginTop: "72px" }}>
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            alignItems: "center",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <span style={eyebrow("var(--brand)")}>{t.s.adv.kicker}</span>
            <h2 style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--ink)", lineHeight: 1.25, margin: "8px 0 24px" }}>
              {t.s.adv.title}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
              {t.advantages.map((a) => (
                <div
                  key={a.num}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderTop: `4px solid ${a.color}`,
                    borderRadius: "14px",
                    padding: "18px 20px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ color: a.color, fontWeight: 800, fontSize: "1.4rem" }}>{a.num}</div>
                  <h3 style={{ margin: "4px 0 6px", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>{a.title}</h3>
                  <p style={{ margin: 0, color: "var(--text-soft)", fontSize: "0.9rem", lineHeight: 1.6 }}>{a.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ maxWidth: "360px", width: "100%", justifySelf: "center" }}>
            <SlideImage src={slide(9)} alt={t.s.adv.alt} />
          </div>
        </div>
      </section>

      {/* ── EMPEZAR ── */}
      <Block id={t.toc[8][0]} kicker={t.s.start.kicker} title={t.s.start.title} slide={slide(10)} alt={t.s.start.alt} flip>
        <p style={{ marginBottom: 0 }}>{t.s.start.intro}</p>
        <CodeBlock code={t.code.start} label="terminal" />
        <p style={{ margin: "14px 0 0" }}>{t.s.start.outro}</p>
      </Block>

      {/* ── FAQ ── */}
      <section id={t.toc[9][0]} style={{ background: "var(--surface-2)", padding: "72px 24px", scrollMarginTop: "72px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--ink)", textAlign: "center", marginBottom: "40px" }}>
            {t.ui.faq}
          </h2>
          {t.faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} />
          ))}
        </div>
      </section>

      {/* ── LEE TAMBIÉN (enlaces internos) ── */}
      <section style={{ background: "var(--surface)", padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--ink)", marginBottom: "18px" }}>{t.ui.related}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
            {t.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                style={{
                  display: "block",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  textDecoration: "none",
                }}
              >
                <div style={{ color: "var(--ink)", fontWeight: 700, fontSize: "0.98rem", lineHeight: 1.4, marginBottom: "6px" }}>
                  {r.title}
                </div>
                <div style={{ color: "var(--text-soft)", fontSize: "0.88rem", lineHeight: 1.55 }}>{r.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUENTES ── */}
      <section style={{ background: "var(--surface)", padding: "48px 24px 0" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "14px" }}>{t.ui.sources}</h2>
          <ul style={{ paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
            {t.sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--brand)", fontSize: "0.92rem" }}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <div style={{ background: "var(--surface)", padding: "56px 24px 72px" }}>
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
            <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, marginBottom: "12px" }}>{t.cta.title}</h2>
            <p style={{ color: "var(--text-subtle)", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto 32px" }}>{t.cta.body}</p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/blog"
                style={{ ...ctaBtn, background: "linear-gradient(135deg, #0072ff, #0d47a1)", color: "#fff" }}
              >
                {t.cta.more}
              </Link>
              <Link
                href="/"
                style={{
                  ...ctaBtn,
                  fontWeight: 600,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#e2e8f0",
                }}
              >
                {t.cta.contact}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

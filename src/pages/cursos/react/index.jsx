import Link from "next/link";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { getAllFilesFrontMatter, stripOrderPrefix } from "../../../../lib/mdx";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const COURSE_SLUG = "react";
const COURSE_URL = `/cursos/${COURSE_SLUG}`;

const APRENDIZAJES = [
  "Qué es React y por qué revolucionó cómo se hacen las interfaces",
  "Cómo funciona el DOM virtual y la composición de componentes",
  "A escribir JSX: HTML y JavaScript en un mismo componente",
  "Cómo crear componentes reutilizables y pasarles datos con props",
  "A hacer tu interfaz interactiva con estado usando useState",
  "A cargar datos y sincronizar tu app con useEffect",
  "A construir una app real (lista de tareas) desde cero",
];

const REACT_ATOM = (
  <svg viewBox="0 0 120 120" width="170" height="170" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="60" rx="54" ry="22" fill="none" stroke="#61dafb" strokeWidth="3" transform="rotate(0 60 60)" />
    <ellipse cx="60" cy="60" rx="54" ry="22" fill="none" stroke="#61dafb" strokeWidth="3" transform="rotate(60 60 60)" />
    <ellipse cx="60" cy="60" rx="54" ry="22" fill="none" stroke="#61dafb" strokeWidth="3" transform="rotate(120 60 60)" />
    <circle cx="60" cy="60" r="9" fill="#61dafb" />
    <circle cx="60" cy="38" r="4" fill="#61dafb" />
  </svg>
);

const CursoReact = ({ chapters }) => {
  const sorted = [...chapters].sort((a, b) => a.order - b.order);
  const firstSlug = sorted[0]?.slug;

  return (
    <div>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: "radial-gradient(circle at 75% 20%, rgba(97,218,251,0.18) 0%, transparent 45%), linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 60%, #0a2540 100%)",
          color: "#fff",
          padding: "72px 24px 64px",
        }}
      >
        <div style={{ position: "absolute", right: "-40px", top: "-30px", opacity: 0.5 }}>
          {REACT_ATOM}
        </div>
        <div style={{ position: "absolute", left: "-60px", bottom: "-50px", opacity: 0.15 }}>
          {REACT_ATOM}
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(97,218,251,0.15)",
              border: "1px solid rgba(97,218,251,0.5)",
              color: "#7dd3fc",
              borderRadius: "20px",
              padding: "4px 14px",
              fontSize: "0.78rem",
              fontWeight: 600,
              marginBottom: "18px",
            }}
          >
            Curso gratuito · Temática React
          </span>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "16px", lineHeight: 1.2 }}>
            Curso de React: Construye tus primeras interfaces
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: 1.7, marginBottom: "28px" }}>
            Aprende la teoría y la práctica de React desde cero: componentes, JSX, props, estado y
            efectos, con diagramas, teoría clara y un proyecto real paso a paso.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "28px",
              fontSize: "0.9rem",
              color: "#94a3b8",
            }}
          >
            <span>📚 {sorted.length} capítulos</span>
            <span>⏱️ ~84 min en total</span>
            <span>🆓 100% gratis</span>
            <span>⚛️ De cero a un proyecto real</span>
          </div>
          {firstSlug && (
            <Link
              href={`${COURSE_URL}/${firstSlug}`}
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #61dafb, #0072ff)",
                color: "#0a0a1a",
                padding: "12px 28px",
                borderRadius: "10px",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              Empezar curso →
            </Link>
          )}
        </div>
      </div>

      <main style={{ maxWidth: "820px", margin: "0 auto", padding: "56px 24px" }}>
        <section style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px", color: "#1a1a2e" }}>
            Qué vas a aprender
          </h2>
          <ul
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", listStyle: "none", padding: 0, margin: 0 }}
            className="max-sm:grid-cols-1"
          >
            {APRENDIZAJES.map((item) => (
              <li key={item} style={{ display: "flex", gap: "10px", fontSize: "0.95rem", color: "#374151", lineHeight: 1.6 }}>
                <span style={{ color: "#61dafb", fontWeight: 700 }}>⚛</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px", color: "#1a1a2e" }}>Temario</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {sorted.map((chapter) => (
              <Link
                key={chapter.slug}
                href={`${COURSE_URL}/${chapter.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "18px 20px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#e8f9ff",
                    color: "#0284c7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                  }}
                >
                  {chapter.order}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, color: "#1a1a2e", fontSize: "1rem", marginBottom: "4px" }}>{chapter.title}</p>
                  <p style={{ color: "#64748b", fontSize: "0.88rem", margin: 0 }}>{chapter.subtitle}</p>
                </div>
                <span style={{ flexShrink: 0, color: "#94a3b8", fontSize: "0.85rem" }}>{chapter.duration}</span>
              </Link>
            ))}
          </div>
        </section>

        <section
          style={{
            marginTop: "56px",
            background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)",
            borderRadius: "20px",
            padding: "40px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>{REACT_ATOM}</div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>
            ¿Listo para empezar a construir interfaces con React?
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "24px", lineHeight: 1.7, maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
            Sin conocimientos previos de React, solo con las bases de JavaScript. Teoría simple,
            diagramas y un proyecto real al final.
          </p>
          {firstSlug && (
            <Link
              href={`${COURSE_URL}/${firstSlug}`}
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #61dafb, #0072ff)",
                color: "#0a0a1a",
                padding: "14px 32px",
                borderRadius: "10px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Empezar curso →
            </Link>
          )}
        </section>
      </main>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  const activeLocale = locale || "es";
  const rawChapters = await getAllFilesFrontMatter(`cursos/${COURSE_SLUG}`, activeLocale);
  const chapters = rawChapters.map((chapter) => ({
    ...chapter,
    slug: stripOrderPrefix(chapter.slug),
  }));

  return {
    props: {
      ...(await serverSideTranslations(activeLocale, ["common"])),
      chapters,
      activeLocale,
    },
  };
};

export default function CursoReactPage({ chapters, activeLocale }) {
  return (
    <Layout>
      <SEO
        title="Curso de React Gratis: Construye tus primeras interfaces | Salazar Code"
        description="Aprende React desde cero gratis: componentes, JSX, props, estado con useState y efectos con useEffect, con teoría, diagramas y un proyecto real."
        keywords={["curso de react", "aprender react", "react para principiantes", "componentes react", "useState react", "curso gratis react"]}
        noindex={activeLocale !== "es"}
      />
      <CursoReact chapters={chapters} />
    </Layout>
  );
}

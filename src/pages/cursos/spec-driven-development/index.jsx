import Link from "next/link";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { getAllFilesFrontMatter, stripOrderPrefix } from "../../../../lib/mdx";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const COURSE_SLUG = "spec-driven-development";
const COURSE_URL = `/cursos/${COURSE_SLUG}`;

const APRENDIZAJES = [
  "Qué es Spec-Driven Development y por qué la IA lo necesita",
  "La importancia de definir stack y arquitectura antes de escribir código",
  "El flujo completo: de idea vaga a tareas verificables",
  "Cómo generar especificaciones completas usando IA",
  "Implementar cada tarea con Claude Code, OpenCode y otras herramientas",
  "Construir una app real (QuickNotes) usando el método SDD",
  "Buenas prácticas y los errores más comunes al trabajar con IA",
];

const SDD_ICON = (
  <svg viewBox="0 0 120 120" width="170" height="170" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="15" width="100" height="90" rx="12" fill="none" stroke="#0072ff" strokeWidth="3" />
    <rect x="20" y="28" width="40" height="8" rx="3" fill="#0072ff" opacity="0.8" />
    <rect x="20" y="44" width="80" height="4" rx="2" fill="#94a3b8" opacity="0.5" />
    <rect x="20" y="54" width="70" height="4" rx="2" fill="#94a3b8" opacity="0.5" />
    <rect x="20" y="64" width="60" height="4" rx="2" fill="#94a3b8" opacity="0.5" />
    <circle cx="85" cy="80" r="18" fill="#10b981" opacity="0.15" />
    <path d="M78 80 L83 86 L93 74" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="20" y="82" width="12" height="12" rx="3" fill="#f59e0b" opacity="0.6" />
    <rect x="38" y="82" width="12" height="12" rx="3" fill="#0072ff" opacity="0.6" />
    <rect x="56" y="82" width="12" height="12" rx="3" fill="#7c3aed" opacity="0.6" />
  </svg>
);

const CursoSDD = ({ chapters }) => {
  const sorted = [...chapters].sort((a, b) => a.order - b.order);
  const firstSlug = sorted[0]?.slug;

  return (
    <div>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: "radial-gradient(circle at 75% 20%, rgba(0,114,255,0.18) 0%, transparent 45%), linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 60%, #0d1b4b 100%)",
          color: "#fff",
          padding: "72px 24px 64px",
        }}
      >
        <div style={{ position: "absolute", right: "-40px", top: "-30px", opacity: 0.5 }}>
          {SDD_ICON}
        </div>
        <div style={{ position: "absolute", left: "-60px", bottom: "-50px", opacity: 0.15 }}>
          {SDD_ICON}
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(0,114,255,0.15)",
              border: "1px solid rgba(0,114,255,0.5)",
              color: "#93c5fd",
              borderRadius: "20px",
              padding: "4px 14px",
              fontSize: "0.78rem",
              fontWeight: 600,
              marginBottom: "18px",
            }}
          >
            Curso gratuito · Metodología
          </span>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "16px", lineHeight: 1.2 }}>
            Spec-Driven Development: Desarrolla software con especificaciones e IA
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: 1.7, marginBottom: "28px" }}>
            Aprende a construir software de forma profesional definiendo QUÉ construir antes de
            escribir una línea de código, y cómo usar la IA para ejecutar cada paso con precisión.
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
            <span>⏱️ ~90 min en total</span>
            <span>🆓 100% gratis</span>
            <span>🤖 Con IA (Claude Code, OpenCode)</span>
          </div>
          {firstSlug && (
            <Link
              href={`${COURSE_URL}/${firstSlug}`}
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #0072ff, #7c3aed)",
                color: "#fff",
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
                <span style={{ color: "#0072ff", fontWeight: 700 }}>✓</span>
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
                    background: "#eff6ff",
                    color: "#0072ff",
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
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>{SDD_ICON}</div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>
            ¿Listo para dejar de programar a ciegas?
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "24px", lineHeight: 1.7, maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
            Spec-Driven Development te da el control de dirección mientras la IA se encarga
            de la ejecución. Especifica, planifica, implementa.
          </p>
          {firstSlug && (
            <Link
              href={`${COURSE_URL}/${firstSlug}`}
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #0072ff, #7c3aed)",
                color: "#fff",
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

export default function CursoSDDPage({ chapters, activeLocale }) {
  return (
    <Layout>
      <SEO
        title="Curso de Spec-Driven Development Gratis: Desarrolla software con IA | Salazar Code"
        description="Aprende Spec-Driven Development gratis: cómo generar especificaciones con IA e implementarlas con Claude Code, OpenCode y más. 7 capítulos con proyecto real."
        keywords={["spec driven development", "desarrollo con ia", "especificaciones con ia", "claude code curso", "opencode curso", "metodologia desarrollo software"]}
        noindex={activeLocale !== "es"}
        languages={["es"]}
      />
      <CursoSDD chapters={chapters} />
    </Layout>
  );
}

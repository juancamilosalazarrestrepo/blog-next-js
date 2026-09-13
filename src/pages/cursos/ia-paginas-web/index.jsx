import Link from "next/link";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { getAllFilesFrontMatter, stripOrderPrefix } from "../../../../lib/mdx";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const COURSE_SLUG = "ia-paginas-web";
const COURSE_URL = `/cursos/${COURSE_SLUG}`;

const APRENDIZAJES = [
  "Por qué la IA cambió por completo cómo se hacen las páginas web",
  "Cómo instalar las herramientas gratis: Node.js y OpenCode",
  "A escribir prompts que logren exactamente lo que quieres",
  "Cómo diseñar una web moderna con una conversación con la IA",
  "A subir tu código a GitHub como respaldo seguro",
  "Cómo desplegar tu web gratis en Vercel con tu propio dominio",
];

const CursoIA = ({ chapters }) => {
  const sorted = [...chapters].sort((a, b) => a.order - b.order);
  const firstSlug = sorted[0]?.slug;

  return (
    <div>
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%)",
          color: "#fff",
          padding: "72px 24px 56px",
        }}
      >
        <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(0,114,255,0.2)",
              border: "1px solid rgba(0,114,255,0.5)",
              color: "#93c5fd",
              borderRadius: "20px",
              padding: "4px 14px",
              fontSize: "0.78rem",
              fontWeight: 600,
              marginBottom: "18px",
            }}
          >
            Curso gratuito · Temática IA
          </span>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 800, marginBottom: "16px", lineHeight: 1.2 }}>
            Curso de IA: Crea tu primera página web desde cero
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: 1.7, marginBottom: "28px" }}>
            Aprende a usar la inteligencia artificial con OpenCode para construir una web real
            gratis, paso a paso, y desplegarla en Vercel con tu propio dominio. Sin saber
            programar.
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
            <span>⏱️ ~78 min en total</span>
            <span>🆓 100% gratis</span>
            <span>🌐 Tu dominio propio</span>
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
                <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span>
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

export default function CursoIAPage({ chapters, activeLocale }) {
  return (
    <Layout>
      <SEO
        title="Curso de IA Gratis: Crea tu primera página web | Salazar Code"
        description="Aprende a usar la inteligencia artificial con OpenCode para crear una página web gratis desde cero y desplegarla en Vercel con tu propio dominio."
        keywords={["curso de ia", "crear web con ia", "opencode", "curso gratis desarrollo web", "desplegar en vercel", "inteligencia artificial web"]}
        noindex={activeLocale !== "es"}
        languages={["es"]}
      />
      <CursoIA chapters={chapters} />
    </Layout>
  );
}

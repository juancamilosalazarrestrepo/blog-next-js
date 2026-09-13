import Layout from "../../components/Layout";
import Link from "next/link";
import Banners from "../../components/Banners";
import banner1 from "../../../public/images/background.webp";
import banner2 from "../../../public/images/banner2.webp";
import LogosSlider from "../../components/LogosSlide";
import SEO from "../../components/SEO";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const CURSOS = [
  {
    url: "/cursos/javascript",
    titulo: "Curso de JavaScript: Lógica de Programación",
    descripcion:
      "Aprende a pensar como programador desde cero: variables, operadores, condicionales, bucles y funciones, con teoría simple y ejemplos de código.",
    imagen: "/images/cursos/javascript.svg",
    capitulos: "6 capítulos",
    duracion: "~70 min",
    nivel: "Principiante",
    acento: "#f7df1e",
    tags: ["Variables", "Condicionales", "Bucles", "Funciones"],
  },
  {
    url: "/cursos/ia-paginas-web",
    titulo: "Curso de IA: Crea tu primera página web desde cero",
    descripcion:
      "Construye y publica tu primera web usando inteligencia artificial con OpenCode, y despliégala gratis en Vercel sin saber programar.",
    imagen: "/images/cursos/ia-paginas-web.svg",
    capitulos: "7 capítulos",
    duracion: "~78 min",
    nivel: "Principiante",
    acento: "#a855f7",
    tags: ["OpenCode", "HTML & CSS", "Vercel", "Prompts"],
  },
  {
    url: "/cursos/react",
    titulo: "Curso de React: Construye tus primeras interfaces",
    descripcion:
      "Domina los fundamentos de React: componentes, JSX, props, estado y efectos, hasta construir tu propia aplicación de lista de tareas.",
    imagen: "/images/cursos/react.svg",
    capitulos: "6 capítulos",
    duracion: "~84 min",
    nivel: "Intermedio",
    acento: "#61dafb",
    tags: ["JSX", "Props", "useState", "useEffect"],
  },
  {
    url: "/cursos/spec-driven-development",
    titulo: "Spec-Driven Development: Software con especificaciones e IA",
    descripcion:
      "Aprende el flujo profesional para desarrollar con IA: escribir especificaciones claras, planificar el trabajo e implementarlo sin perder el control.",
    imagen: "/images/cursos/spec-driven-development.svg",
    capitulos: "7 capítulos",
    duracion: "~90 min",
    nivel: "Intermedio",
    acento: "#22d3ee",
    tags: ["Especificaciones", "Planificación", "IA", "Flujo de trabajo"],
  },
];

const IconoCapitulos = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconoReloj = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const IconoNivel = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20v-6" />
    <path d="M12 20V8" />
    <path d="M20 20V4" />
  </svg>
);

const TarjetaCurso = ({ curso }) => (
  <Link href={curso.url} style={{ textDecoration: "none", display: "block", height: "100%" }}>
    <article
      style={{
        background: "#fff",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.05)",
        transition: "transform 0.35s cubic-bezier(.25,.46,.45,.94), box-shadow 0.35s cubic-bezier(.25,.46,.45,.94)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,114,255,0.14), 0 4px 12px rgba(0,0,0,0.06)";
        const img = e.currentTarget.querySelector("img");
        if (img) img.style.transform = "scale(1.06)";
        const flecha = e.currentTarget.querySelector("[data-cta-arrow]");
        if (flecha) flecha.style.transform = "translateX(5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
        const img = e.currentTarget.querySelector("img");
        if (img) img.style.transform = "scale(1)";
        const flecha = e.currentTarget.querySelector("[data-cta-arrow]");
        if (flecha) flecha.style.transform = "translateX(0)";
      }}
    >
      {/* Portada */}
      <div style={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden", background: "#0a0a1a" }}>
        <img
          src={curso.imagen}
          alt={curso.titulo}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.45s cubic-bezier(.25,.46,.45,.94)",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            background: "rgba(255,255,255,0.94)",
            color: "#0b1120",
            borderRadius: "999px",
            padding: "5px 12px",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Gratis
        </span>
      </div>

      {/* Contenido */}
      <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "10px", lineHeight: 1.35 }}>
          {curso.titulo}
        </h3>
        <p style={{ color: "#6b7280", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "16px" }}>
          {curso.descripcion}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "18px" }}>
          {curso.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "#334155",
                background: "#f1f5f9",
                border: "1px solid #e2e8f0",
                borderRadius: "999px",
                padding: "4px 10px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            color: "#64748b",
            fontSize: "0.8rem",
            fontWeight: 600,
            marginTop: "auto",
            paddingTop: "16px",
            borderTop: "1px solid #eef2f7",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <IconoCapitulos /> {curso.capitulos}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <IconoReloj /> {curso.duracion}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <IconoNivel /> {curso.nivel}
          </span>
        </div>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "18px",
            color: "#0072ff",
            fontWeight: 700,
            fontSize: "0.92rem",
          }}
        >
          Ver curso
          <span data-cta-arrow style={{ display: "inline-block", transition: "transform 0.3s ease" }}>
            &rarr;
          </span>
        </span>
      </div>

      {/* Línea de acento */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #0072ff, " + curso.acento + ")" }} />
    </article>
  </Link>
);

const Cursos = () => {
  const images = [banner1, banner2];

  return (
    <div>
      <div style={{ position: "relative", width: "100%", margin: 0, zIndex: 2 }}>
        <Banners images={images} />
      </div>

      <main className="py-8 container mx-auto px-6 md:px-12 lg:px-24 xl:px-44">
        <header style={{ textAlign: "center", marginTop: "40px", marginBottom: "44px" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#1a1a2e",
              position: "relative",
              paddingBottom: "14px",
              marginBottom: "18px",
            }}
          >
            Cursos
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "4px",
                background: "linear-gradient(135deg, #0072ff, #00c6ff)",
                borderRadius: "2px",
                display: "block",
              }}
            />
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.98rem", lineHeight: 1.7, maxWidth: "640px", margin: "0 auto" }}>
            Cursos gratuitos y en español para aprender programación, React e inteligencia artificial
            desde cero, con teoría breve, diagramas y ejercicios prácticos.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {CURSOS.map((curso) => (
            <TarjetaCurso key={curso.url} curso={curso} />
          ))}
        </div>

        <div className="w-full mt-20 mb-20">
          <LogosSlider />
        </div>
      </main>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "es", ["common"])),
    },
  };
};

export default function CursosPage() {
  return (
    <Layout>
      <SEO
        title="Cursos gratuitos de programación e IA | Salazar Code"
        description="Cursos gratuitos en español de JavaScript, React, inteligencia artificial y Spec-Driven Development, creados por Juan Camilo Salazar."
        keywords={["cursos de programacion", "curso javascript gratis", "curso react", "curso de inteligencia artificial", "Salazar Code"]}
        languages={["es"]}
      />
      <Cursos />
    </Layout>
  );
}

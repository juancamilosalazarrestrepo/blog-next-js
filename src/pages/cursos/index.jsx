import Image from "next/image";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banners from "../../components/Banners";
import banner1 from "../../../public/images/background.webp"
import banner2 from "../../../public/images/banner2.webp";
import LogosSlider from "../../components/LogosSlide";
import certificados from "../../../data/certificados/certificados";
import SEO from "../../components/SEO";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const Certificados = ({ certificados }) => {
  const images = [banner1, banner2];



  return (
    <div className="">
      <div
        style={{ position: "relative", width: "1wv", margin: "0", zIndex: "2" }}
      >
        <Banners images={images} />
      </div>

      <main className="py-8 container mx-auto px-44 ">

        <section style={{ marginBottom: "56px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "20px", color: "#1a1a2e" }}>
            Cursos
          </h2>
          <Link
            href="/cursos/javascript"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "24px",
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
              textDecoration: "none",
              maxWidth: "560px",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: "56px",
                height: "56px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0072ff, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
              }}
            >
              🟨
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, color: "#1a1a2e", fontSize: "1.05rem", marginBottom: "4px" }}>
                Curso de JavaScript: Lógica de Programación
              </p>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                6 capítulos gratis · ~70 min · Variables, condicionales, bucles y funciones
              </p>
            </div>
            <span style={{ flexShrink: 0, color: "#0072ff", fontWeight: 700 }}>Ver curso →</span>
          </Link>
          <Link
            href="/cursos/ia-paginas-web"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "24px",
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
              textDecoration: "none",
              maxWidth: "560px",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: "56px",
                height: "56px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0072ff, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
              }}
            >
              🤖
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, color: "#1a1a2e", fontSize: "1.05rem", marginBottom: "4px" }}>
                Curso de IA: Crea tu primera página web desde cero
              </p>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                7 capítulos gratis · ~78 min · Con OpenCode y despliega gratis en Vercel
              </p>
            </div>
            <span style={{ flexShrink: 0, color: "#0072ff", fontWeight: 700 }}>Ver curso →</span>
          </Link>
          <Link
            href="/cursos/react"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "24px",
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
              textDecoration: "none",
              maxWidth: "560px",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: "56px",
                height: "56px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #61dafb, #0072ff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
              }}
            >
              ⚛️
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, color: "#1a1a2e", fontSize: "1.05rem", marginBottom: "4px" }}>
                Curso de React: Construye tus primeras interfaces
              </p>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                6 capítulos gratis · ~84 min · Componentes, JSX, props, estado y efectos
              </p>
            </div>
            <span style={{ flexShrink: 0, color: "#0072ff", fontWeight: 700 }}>Ver curso →</span>
          </Link>
          <Link
            href="/cursos/spec-driven-development"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "24px",
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
              textDecoration: "none",
              maxWidth: "560px",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: "56px",
                height: "56px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0072ff, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
              }}
            >
              📋
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, color: "#1a1a2e", fontSize: "1.05rem", marginBottom: "4px" }}>
                Spec-Driven Development: Desarrolla software con especificaciones e IA
              </p>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                7 capítulos gratis · ~90 min · Especificaciones, planificación e implementación con IA
              </p>
            </div>
            <span style={{ flexShrink: 0, color: "#0072ff", fontWeight: 700 }}>Ver curso →</span>
          </Link>
        </section>

        <div className="grid grid-cols-3 gap-4 content-center max-sm:grid-cols-1 max-sm:w-full  max-sm:px-8 mt-20">
          {certificados.map((proyecto, index) => {
            return (
              <Link
                href={proyecto.url}
                key={proyecto.url}
                className="max-w-sm max-sm:w-full"
              >
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                  <Image src={proyecto.imagen} className="rounded-t-lg" />

                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                      {proyecto.titulo}
                    </h5>

                    <p className="mb-3 font-normal text-gray-700 ">
                      {proyecto.description}
                    </p>
                    <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white buttonColor rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                      Leer mas
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
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
      ...(await serverSideTranslations(locale || 'es', ['common'])), certificados },
  };
};

export default function BlogTemplate({ certificados }) {
  return (
    <Layout>
      <SEO 
        title="Cursos y Certificaciones | Salazar Code"
        description="Aprende y certifícate con los mejores cursos de desarrollo web, inteligencia artificial y programación ofrecidos por Juan Camilo Salazar."
        keywords={["cursos de programacion", "certificados tech", "aprender a programar", "desarrollo web", "Salazar Code"]}
      />
      <Certificados certificados={certificados} />
    </Layout>
  );
}

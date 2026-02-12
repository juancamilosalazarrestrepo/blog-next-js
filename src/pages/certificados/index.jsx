import Image from "next/image";
import Layout from "../../components/Layout";
import Link from "next/link";
import LogosSlider from "../../components/LogosSlide";
import certificados from "../../../data/certificados/certificados";
import styles from "./index.module.css";

const Certificados = ({ certificados }) => {
  return (
    <div>
      <main className="py-8 container mx-auto px-6 md:px-12 lg:px-24 xl:px-44 mt-1">
        {/* Título de sección */}
        <h2 style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "#1a1a2e",
          textAlign: "center",
          marginBottom: "40px",
          marginTop: "40px",
          position: "relative",
          paddingBottom: "14px",
        }}>
          Certificados
          <span style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "4px",
            background: "linear-gradient(135deg, #0072ff, #00c6ff)",
            borderRadius: "2px",
            display: "block",
          }} />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificados.map((proyecto) => (
            <Link href={proyecto.url} key={proyecto.url} style={{ textDecoration: "none" }}>
              <div style={{
                background: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.04)",
                transition: "transform 0.35s cubic-bezier(.25,.46,.45,.94), box-shadow 0.35s cubic-bezier(.25,.46,.45,.94)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,114,255,0.12), 0 4px 12px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                }}
              >
                <div style={{ overflow: "hidden", position: "relative", height: "300px", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Image
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    width={600}
                    height={450}
                    style={{ objectFit: "contain", width: "100%", height: "100%", transition: "transform 0.4s ease" }}
                  />
                </div>
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "8px", lineHeight: 1.3 }}>
                    {proyecto.titulo}
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "0.88rem", lineHeight: 1.5, flex: 1, marginBottom: "16px" }}>
                    {proyecto.description}
                  </p>
                  <div className={styles.lineaAzul}></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="w-full mt-20 mb-20">
          <LogosSlider />
        </div>
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: { certificados },
  };
};

export default function CertificadosTemplate({ certificados }) {
  return (
    <Layout>
      <Certificados certificados={certificados} />
    </Layout>
  );
}

import Layout from "../../components/Layout";
import LogosSlider from "../../components/LogosSlide";
import ServicesSection from "../../components/ServicesSection";
import Portfolio from "../../components/PortfolioSection";

const Services = () => {
  return (
    <div>
      <main className="py-8 container mx-auto px-6 md:px-12 lg:px-24 xl:px-44">
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
          Servicios
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

        <div className="w-full mb-20">
          <ServicesSection />
          <Portfolio />
          <LogosSlider />
        </div>
      </main>
    </div>
  );
};

export default function ServicesTemplate() {
  return (
    <Layout>
      <Services />
    </Layout>
  );
}


import Layout from "../../components/Layout";


import LogosSlider from "../../components/LogosSlide";
import certificados from "../../../data/certificados/certificados";
import SEO from "../../components/SEO";

const Precios = () => {

  return (
    <div className="">
      <main className="py-2 container mx-auto px-44 mt-1">
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

export default function BlogTemplate({ certificados }) {
  return (
    <Layout>
      <SEO 
        title="Precios y Cotizaciones | Salazar Code"
        description="Consulta las opciones de precios y cotizaciones de servicios tecnológicos. Paquetes de desarrollo web, eCommerce, y consultorías estructurados para tu negocio."
        keywords={["precios desarrollo web", "cotización página web", "costo ecommerce", "tarifas programador", "Salazar Code precios"]}
      />
      <Precios />
    </Layout>
  );
}

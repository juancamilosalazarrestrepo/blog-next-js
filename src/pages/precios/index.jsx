
import Layout from "../../components/Layout";


import LogosSlider from "../../components/LogosSlide";
import certificados from "../../../data/certificados/certificados";
import SEO from "../../components/SEO";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['common'])), certificados },
  };
};

const preciosSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta hacer una página web en Colombia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El costo varía según el tipo de sitio: una landing page o web corporativa básica tiene un precio menor que una tienda online o una plataforma a medida. Trabajamos con paquetes y cotizaciones personalizadas según tus objetivos de negocio.",
      },
    },
    {
      "@type": "Question",
      "name": "¿Qué incluyen los paquetes de desarrollo web?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los paquetes incluyen diseño responsivo, optimización SEO técnica, alta velocidad de carga, formularios de contacto e integración con analítica. Los planes superiores añaden e-commerce, panel administrable e integraciones con IA.",
      },
    },
    {
      "@type": "Question",
      "name": "¿Cómo solicito una cotización?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Puedes solicitar una cotización gratuita por WhatsApp o desde el formulario de contacto. Te respondemos con una propuesta a medida según el alcance de tu proyecto.",
      },
    },
  ],
};

export default function BlogTemplate({ certificados }) {
  return (
    <Layout>
      <SEO
        title="Precios y Cotizaciones | Salazar Code"
        description="Consulta las opciones de precios y cotizaciones de servicios tecnológicos. Paquetes de desarrollo web, eCommerce, y consultorías estructurados para tu negocio."
        keywords={["precios desarrollo web", "cotización página web", "costo ecommerce", "tarifas programador", "Salazar Code precios"]}
        schema={preciosSchema}
      />
      <Precios />
    </Layout>
  );
}

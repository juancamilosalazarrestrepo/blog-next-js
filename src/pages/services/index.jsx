import Layout from "../../components/Layout";
import LogosSlider from "../../components/LogosSlide";
import ServicesShowcase from "../../components/ServicesShowcase";
import Portfolio from "../../components/PortfolioSection";
import SEO from "../../components/SEO";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Services = () => {
  return (
    <div>
      <ServicesShowcase />
      <main className="py-8 container mx-auto px-6 md:px-12 lg:px-24 xl:px-44">
        <div className="w-full mb-20">
          <Portfolio />
          <LogosSlider />
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['common'])),
    },
  };
}

export default function ServicesTemplate() {
  return (
    <Layout>
      <SEO 
        title="Servicios de Desarrollo Web e IA | Salazar Code"
        description="Servicios profesionales de desarrollo web Full Stack (React, Next.js, .NET), integraciones de Inteligencia Artificial (Agentes IA) y consultoría tecnológica."
        keywords={["servicios desarrollo web", "agentes ia", "inteligencia artificial empresas", "react nextjs developer", "Salazar Code servicios"]}
      />
      <Services />
    </Layout>
  );
}

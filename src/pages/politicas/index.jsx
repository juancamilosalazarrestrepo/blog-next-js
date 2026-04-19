
import Layout from "../../components/Layout";

import banner1 from "../../../public/images/background.jpg"
import banner2 from "../../../public/images/banner2.webp";
import LogosSlider from "../../components/LogosSlide";
import certificados from "../../../data/certificados/certificados";
import SEO from "../../components/SEO";

const Precios = () => {
  const images = [banner1, banner2];

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
        title="Políticas de Privacidad | Salazar Code"
        description="Políticas de Privacidad y Tratamiento de Datos Personales para los servicios y plataformas de desarrollo de Salazar Code."
        keywords={["politicas de privacidad", "tratamiento de datos", "privacidad código web", "desarrollo web legal"]}
      />
      <Precios />
    </Layout>
  );
}

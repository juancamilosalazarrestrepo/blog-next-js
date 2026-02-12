
import Layout from "../../components/Layout";


import LogosSlider from "../../components/LogosSlide";
import certificados from "../../../data/certificados/certificados";

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
      <Precios />
    </Layout>
  );
}

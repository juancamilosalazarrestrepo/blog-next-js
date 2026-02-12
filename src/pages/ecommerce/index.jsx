import Layout from "../../components/Layout";
import BannersEcommerce from "../../components/BannerEcommerce";
import banner1 from "../../../public/images/background.jpg"
import LogosSlider from "../../components/LogosSlide";
import certificados from "../../../data/certificados/certificados";
import AdvantageSections from "../../components/AdvantageSections";
import ShopifyServices from "../../components/ShopifyServices";
import Portfolio from "../../components/PortfolioSection";

const Ecommerce = () => {
  const images = [banner1];

  return (
    <div className="">
      <div style={{ width: "1wv", margin: "0", zIndex: "-15" }}>
        <BannersEcommerce images={images} />
      </div>
      <main className="py-2 container mx-auto px-44 mt-1">
        <div className="w-full mt-20 mb-20">
          <div className="sloganContainer">
            <h1 className="sloganText">"Convierte tu idea en una tienda online poderosa con Shopify"</h1>
          </div>
          <AdvantageSections />
          <ShopifyServices />
          <Portfolio />
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
      <Ecommerce />
    </Layout>
  );
}

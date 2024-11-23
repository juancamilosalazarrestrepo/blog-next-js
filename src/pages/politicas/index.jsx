import * as React from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banners from "../../components/Banners";
import banner1 from "../../../public/images/background.jpg"
import banner2 from "../../../public/images/banner2.webp";
import calculatorDark from "../../../public/images/calculadoradark.webp";
import cloneChatgpt from "../../../public/images/cloneChatGPT.webp";
import LogosSlider from "../../components/LogosSlide";
import certificados from "../../../data/certificados/certificados";
import Camilo from "../../../public/images/camiloPaginaWeb.png";

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
      <Precios />
    </Layout>
  );
}

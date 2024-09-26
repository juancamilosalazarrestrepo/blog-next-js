import * as React from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import Link from "next/link";
import banner1 from "../../../public/images/banneBlog.webp";
import banner2 from "../../../public/images/banner2.webp";
import LogosSlider from "../../components/LogosSlide";
import certificados from "../../../data/certificados/certificados";
import { GoogleAnalytics } from "@next/third-parties/google";
import styles from "./index.module.css";


const Certificados = ({ certificados }) => {
  const images = [banner1, banner2];

  return (
    <div className="">
      <GoogleAnalytics gaId="G-9FDM09CLBH" />
      <main className="py-2 container mx-auto px-44 mt-1 containerSoloCards">
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
                    {/* <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white buttonColor rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 ">
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
                    </p> */}
                    <div className={styles.lineaAzul}></div>
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

export const getStaticProps = async () => {
  return {
    props: { certificados },
  };
};

export default function BlogTemplate({ certificados }) {
  return (
    <Layout>
      <Certificados certificados={certificados} />
    </Layout>
  );
}

import * as React from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banners from "../../components/Banners";
import banner1 from "../../../public/images/banneBlog.webp";
import banner2 from "../../../public/images/banner2.webp";
import calculatorDark from "../../../public/images/calculadoradark.webp";
import cloneChatgpt from "../../../public/images/cloneChatGPT.webp";
import LogosSlider from "../../components/LogosSlide";
import proyectos from "../../../data/proyectos/projectos";
import Camilo from "../../../public/images/camilo1992.webp";


const Portfolio = ({proyectos}) => {
  const images = [banner1, banner2];

 

  return (
    <div className="">
      <div
        style={{ position: "relative", width: "1wv", margin: "0", zIndex: "2" }}
      >
        <Banners images={images} />
      </div>

      <main className="py-8 container mx-auto px-44 ">
      <div className="mt-1">
          <h1 className="text-3xl mb-3 font-bold text-center title">Juan Camilo Salazar Restrepo</h1>
              <hr/>
          <div className="flex gap-8 mb-8 mt-8">
            
            <Image
              src={Camilo}
              width={320}
              height={320}
              alt=""
              className="rounded-lg shadow-xl w-72 h-72"
            />

            <div>
             
              <p>
                Licenciado en Informática y Medios Audiovisuales de la
                Universidad de Córdoba, especializado en el desarrollo de
                software utilizando <strong>React</strong>, <strong>Node.js</strong>, <strong>SQL</strong> y <strong>Express</strong>, con
                conocimientos avanzados en <strong>JavaScript</strong>, <strong>HTML5</strong> y <strong>CSS</strong>. Tengo
                experiencia en la creación de <strong>SPA (Single Page Applications) </strong> con
                server side rendering utilizando <strong>Next.js</strong> y en la creación de
                APIs con Express o dentro de proyectos de Next.js, así como en
                el consumo de <strong>APIs</strong> con <strong>fetch</strong> o <strong>axios</strong>. También he desarrollado
                <strong>aplicaciones móviles</strong> con <strong>React Native</strong>. Además, cuento con
                habilidades en frameworks CSS como <strong>Material UI</strong>, <strong>Bootstrap</strong> y
                <strong>TailwindCSS</strong>, así como en el manejo de <strong>bases de datos SQL</strong> con
                <strong>MySQL</strong> y <strong>SQL Server</strong>. Tengo experiencia en el control de versiones
                en plataformas como <strong>GitHub</strong> y <strong>BitBucket</strong>, y he desplegado
                aplicaciones de Next.js y React en <strong>AWS</strong>, <strong>Vercel</strong>, <strong>Netlify</strong> y <strong>Heroku</strong>.
                También he trabajado con librerías de JavaScript y React como
                <strong>ChartJS</strong>, <strong>ReactChart</strong> y <strong>React Flow</strong> para la creación de gráficos.
                Tengo experiencia en la implementacion de microservicios en <strong>Azure</strong>, como <strong>Azure functions</strong> y haciendo uso de <strong>blob storage</strong> de azure.
                En el back tengo experiencia en la creacion de servidores y apis , con frameworks como <strong>Node.js</strong> y <strong>Express</strong> . ademas de optimizar el procesamiento de grandes cantidades de datos procesandolos como <strong>streams</strong>.
                {" "}
              </p>
            </div>
          </div>
          </div>
      
        <div className="grid grid-cols-3 gap-4 content-center max-sm:grid-cols-1 max-sm:w-full  max-sm:px-8 mt-20">
          {proyectos.map((proyecto, index) => {
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
                    <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white buttonColor rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                      Leer mas
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </p>
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
    props: { proyectos },
  };
};

export default function BlogTemplate({ proyectos }) {
  return (
    <Layout>
      <Portfolio  proyectos={proyectos} />
    </Layout>
  );
}

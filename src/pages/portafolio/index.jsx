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

const Portfolio = () => {
  const images = [banner1, banner2];

  const proyectos = [
    {
      titulo: "Calculadora en React Native",
      imagen: calculatorDark,
      description:
        "Calculadora desarrollada en React Native, con un diseño moderno y un modo oscuro para mejorar la experiencia del usuario al realizar operaciones matemáticas básicas.",
      url: "/portafolio/calculadora",
    },
    {
      titulo: "Clone de ChatGpt con Next.js",
      imagen: cloneChatgpt,
      description:
        "Clon de ChatGPT creado con Next.js y Tailwind CSS, que permite interactuar con un chatbot generador de respuestas a través de la API de GPT-3 de OpenAI",
      url: "/portafolio/clonechatgpt",
    },
    {
      titulo: "Clone de Mercadolibre",
      imagen: calculatorDark,
      description:
        "Clon de ChatGPT creado con Next.js y Tailwind CSS, que permite interactuar con un chatbot generador de respuestas a través de la API de GPT-3 de OpenAI",
      url: "/portafolio/calculadora",
    },
    {
      titulo: "Tarjeta animada con html y css",
      imagen: calculatorDark,
      description:
        "Calculadora desarrollada en React Native, con un diseño moderno y un modo oscuro para mejorar la experiencia del usuario al realizar operaciones matemáticas básicas.",
      url: "/portafolio/calculadora",
    },
    {
      titulo: "Landing page parallax effect",
      imagen: calculatorDark,
      description:
        "Clon de ChatGPT creado con Next.js y Tailwind CSS, que permite interactuar con un chatbot generador de respuestas a través de la API de GPT-3 de OpenAI",
      url: "/portafolio/calculadora",
    },
    {
      titulo: "Clone de ChatGpt con Next.js",
      imagen: calculatorDark,
      description:
        "Clon de ChatGPT creado con Next.js y Tailwind CSS, que permite interactuar con un chatbot generador de respuestas a través de la API de GPT-3 de OpenAI",
      url: "/portafolio/calculadora",
    },
    {
      titulo: "Calculadora en React Native",
      imagen: calculatorDark,
      description:
        "Calculadora desarrollada en React Native, con un diseño moderno y un modo oscuro para mejorar la experiencia del usuario al realizar operaciones matemáticas básicas.",
      url: "/portafolio/calculadora",
    },
    {
      titulo: "Clone de ChatGpt con Next.js",
      imagen: calculatorDark,
      description:
        "Clon de ChatGPT creado con Next.js y Tailwind CSS, que permite interactuar con un chatbot generador de respuestas a través de la API de GPT-3 de OpenAI",
      url: "/portafolio/calculadora",
    },
    {
      titulo: "Clone de ChatGpt con Next.js",
      imagen: calculatorDark,
      description:
        "Clon de ChatGPT creado con Next.js y Tailwind CSS, que permite interactuar con un chatbot generador de respuestas a través de la API de GPT-3 de OpenAI",
      url: "/portafolio/calculadora",
    },
  ];

  return (
    <div className="">
      <div
        style={{ position: "relative", width: "1wv", margin: "0", zIndex: "2" }}
      >
        <Banners images={images} />
      </div>

      <main className="py-8 container mx-auto  max-sm:w-full ">
        <h2 className=" font-sans font-black text-3xl text-center mb-4 ">
          Juan Camilo Salazar Restrepo
        </h2>
        <p className="px-36 mb-9">
          Soy licenciado en Informática y Medios Audiovisuales por la
          Universidad de Córdoba, especializado en el desarrollo de software
          utilizando React, Node.js, SQL y Express, con conocimientos avanzados
          en JavaScript, HTML5 y CSS. Tengo experiencia en la creación de SPA
          (Single Page Applications) con server side rendering utilizando
          Next.js y en la creación de APIs con Express o dentro de proyectos de
          Next.js, así como en el consumo de APIs con fetch o axios. También he
          desarrollado aplicaciones móviles con React Native. Además, cuento con
          habilidades en frameworks CSS como Material UI, Bootstrap y
          TailwindCSS, así como en el manejo de bases de datos SQL con MySQL y
          SQL Server. Tengo experiencia en el control de versiones en
          plataformas como GitHub o BitBucket, y he desplegado aplicaciones de
          Next.js y React en Vercel, Netlify y Heroku. También he trabajado con
          librerías de JavaScript y React como ChartJS, ReactChart y React Flow
          para la creación de gráficos. Con dos años de experiencia en el
          desarrollo web, estoy interesado en desempeñarme como programador en
          una empresa de desarrollo de software, donde pueda colaborar de manera
          efectiva con otros programadores para el crecimiento de la empresa.
          Soy una persona empática, colaboradora y con excelente rendimiento
          trabajando en equipo, siempre dispuesto a aprender y aportar mis
          habilidades para el crecimiento de la empresa.
        </p>
        <div className="grid grid-cols-3 gap-4 content-center max-sm:grid-cols-1 max-sm:w-full px-36 max-sm:px-8 ">
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
                    <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
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
        <div className="w-full mt-20">
          <LogosSlider />
        </div>
      </main>
    </div>
  );
};

export default function BlogTemplate({ posts }) {
  return (
    <Layout>
      <Portfolio />
    </Layout>
  );
}

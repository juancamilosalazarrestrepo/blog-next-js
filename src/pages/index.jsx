import * as React from "react";
import { NextPage, GetStaticProps } from "next";
import { getAllFilesFrontMatter } from "lib/mdx";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import Banners from "../components/Banners";
import banner1 from "../../public/images/background.jpg";
import banner3 from "../../public/images/background3.png";
import banner2 from "../../public/images/banner2.webp";
import whatsappIconBig from "../../public/images/whatsappBig.png";
import EffectParticle from "../components/EffectParticle";

import Layout from "../components/Layout";
import LogosSlider from "../components/LogosSlide";
import proyectos from "../../data/proyectos/projectos";
import Image from "next/image";
import Camilo from "../../public/images/camiloPaginaWeb.png";

const Home = ({ posts, lastProjects }) => {
  const [search, setSearch] = React.useState("");
  const phoneNumber = "573042093951";
  const filteredPosts = posts.filter((frontMatter) =>
    frontMatter.title.toLowerCase().includes(search.toLowerCase())
  );

  const images = [banner1];

  return (
    <div className="">
      <div className="whatsappButtom">
        <a
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={whatsappIconBig}
            width={60}
            height={60}
            alt="whatsapp button"
            style={{
              filter: "drop-shadow(5px 5px 8px rgba(100, 50, 0, 0.2))",
              borderRadius: "8px", // Opcional: añade un borde redondeado
            }}
          />
        </a>
      </div>
      <div
        style={{ position: "relative", width: "1wv", margin: "0", zIndex: "2" }}
      >
        <Banners images={images} />
      </div>

      <main>
        <div className="py-8 container mx-auto px-44 ">
          <div className="mt-1 containerPerfil">
            {/*   <h1 className="font-bold text-2xl mb-8 subTittle">
            Ultimos proyectos
          </h1> */}
            <div className="grid grid-cols-3 gap-4 content-center max-sm:grid-cols-1 max-sm:w-full  max-sm:px-8 mb-20 proyectosBanner">
              {lastProjects.map((proyecto, index) => {
                return (
                  <Link
                    href={proyecto.url}
                    key={proyecto.url}
                    className="max-w-sm max-sm:w-full shadow-2xl"
                  >
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                      <Image src={proyecto.imagen} className="rounded-t-lg" />

                      <div className="p-5 h-64">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 tittleCard ">
                          {proyecto.titulo}
                        </h5>

                        <p className="mb-3 font-normal text-gray-700 descriptionCard">
                          {proyecto.description}
                        </p>
                        <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white buttonColor rounded-lg 0 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
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
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <h1 className="text-3xl font-bold text-center title">
              Juan Camilo Salazar Restrepo
            </h1>
            <h1 className="text-large mb-3 text-center subtile-job">
              Desarrollador FullStack
            </h1>
            <hr />
            <div className="flex gap-8 mb-8 mt-8 perfil">
              <Image
                src={Camilo}
                width={320}
                height={320}
                alt=""
                className="rounded-lg shadow-xl w-72 h-72 imagenPerfil"
              />

              <div>
                <p className="textDescription">
                  Desarrollador de software con pasión por la innovación tecnológica. Experto en la creación de aplicaciones web y móviles utilizando tecnologías modernas como Next.js, React, Node.js, SQL y Express.

                  En cuanto al desarrollo frontend, poseo un conocimiento avanzado en React, JavaScript, HTML5 y CSS, y tengo una experiencia significativa en la creación de SPA (Single Page Applications) con renderizado del lado del servidor usando Next.js. También tengo experiencia en desarrollo con Angular. Además, tengo gran creatividad y pericia en el uso de CSS para crear estilos personalizados, y soy competente en marcos de trabajo de CSS como Material UI, Bootstrap y TailwindCSS. He trabajado con bibliotecas de JavaScript y React como ChartJS, ReactChart y React Flow para la creación de gráficos interactivos.

                  En el desarrollo backend, he creado varios servidores y APIs en Node.js con Express. Además, tengo experiencia en el desarrollo de backends con C# y .NET, conectándolos a bases de datos SQL como MySQL o SQL Server. También tengo experiencia en la optimización del procesamiento de grandes volúmenes de datos manejándolos como flujos y hasta migrando funciones a microservicios en Azure.

                  En el campo de los microservicios, he implementado soluciones en Azure, incluyendo Azure Functions y Azure Blob Storage.

                  Mi experiencia en control de versiones incluye plataformas como GitHub y BitBucket. He desplegado aplicaciones de Next.js y React en servicios como AWS, Vercel, Netlify y Heroku.

                  A lo largo de mis años de experiencia, he desarrollado diferentes tipos de proyectos, como aplicaciones con backend y frontend para paneles administrativos o páginas de aterrizaje, así como extensiones para Google Chrome para monitorear acciones de los usuarios en el navegador y guardarlas en bases de datos para el seguimiento del tiempo. También he desarrollado scripts de automatización de procesos que permiten a las empresas ahorrar tiempo y costos operativos, incrementando así la productividad.

                  En cuanto al desarrollo móvil, he creado aplicaciones con React Native y planeo aprender Kotlin.

                  Mi objetivo es seguir creciendo profesionalmente en el campo del desarrollo de software, aportando mi experiencia y conocimientos para crear soluciones innovadoras y de alto impacto.
                </p>
              </div>
            </div>
          </div>
          <h1 className="font-bold text-2xl mb-8 mt-8 subTittle">
            Proyectos Recientes
          </h1>
          <div className="grid grid-cols-3 gap-4 content-center max-sm:grid-cols-1 max-sm:w-full  max-sm:px-8 mb-20 proyectosBannerMobile">
            {lastProjects.map((proyecto, index) => {
              return (
                <Link
                  href={proyecto.url}
                  key={proyecto.url}
                  className="max-w-sm max-sm:w-full shadow-2xl"
                >
                  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                    <Image src={proyecto.imagen} className="rounded-t-lg" />

                    <div className="p-5 h-64">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 tittleCard ">
                        {proyecto.titulo}
                      </h5>

                      <p className="mb-3 font-normal text-gray-700 descriptionCard">
                        {proyecto.description}
                      </p>
                      <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white buttonColor rounded-lg 0 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
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
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <h1 className="font-bold text-2xl mb-8 mt-8 subTittle">
            Articulos Recientes
          </h1>
          <div className="grid grid-cols-3 gap-4 content-center max-sm:grid-cols-1 max-sm:w-full  max-sm:px-8">
            {posts.map((post, index) => {
              return (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  className="max-w-sm max-sm:w-full shadow-2xl"
                >
                  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                    <img src={post.thumb} className="rounded-t-lg" />

                    <div className="p-5">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 tittleCard">
                        {post.title}
                      </h5>

                      <p className="mb-3 font-normal text-gray-700 descriptionCard">
                        Here are the biggest enterprise technology acquisitions
                        of 2021 so far, in reverse chronological order.
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
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="w-full mt-20">
          <LogosSlider />
        </div>
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  let posts = await getAllFilesFrontMatter("posts");
  console.log(posts);
  posts = posts.slice(0, 3);
  console.log(proyectos);
  const lastProjects = proyectos.slice(0, 3);

  return {
    props: { posts, lastProjects },
  };
};

export default function Template({ posts, lastProjects }) {
  return (
    <Layout>
      <Home posts={posts} lastProjects={lastProjects} />
    </Layout>
  );
}

import * as React from "react";
import { NextPage, GetStaticProps } from "next";
import { getAllFilesFrontMatter } from "lib/mdx";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import Banners from "../components/Banners";
import banner1 from "../../public/images/banneBlog.webp";
import banner2 from "../../public/images/banner2.webp";
import Layout from "../components/Layout";
import LogosSlider from "../components/LogosSlide";
import proyectos from "../../data/proyectos/projectos";
import Image from "next/image";
import Camilo from "../../public/images/camilo.webp"

const Home = ({ posts, lastProjects }) => {
  const [search, setSearch] = React.useState("");
  const filteredPosts = posts.filter((frontMatter) =>
    frontMatter.title.toLowerCase().includes(search.toLowerCase())
  );

  const images = [banner1, banner2];

  return (
    <div className="">
      <div
        style={{ position: "relative", width: "1wv", margin: "0", zIndex: "2" }}
      >
        <Banners images={images} />
      </div>
      <main>
        <div className="py-8 container mx-auto px-44 ">
        
          <h1 className="font-bold text-2xl mb-8">Ultimos proyectos</h1>
          <div className="grid grid-cols-3 gap-4 content-center max-sm:grid-cols-1 max-sm:w-full  max-sm:px-8">
            {lastProjects.map((proyecto, index) => {
              return (
                <Link
                  href={proyecto.url}
                  key={proyecto.url}
                  className="max-w-sm max-sm:w-full shadow-2xl"
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
          <h1 className="font-bold text-2xl mb-8 mt-8">Ultimos Articulos</h1>
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
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                        {post.title}
                      </h5>

                      <p className="mb-3 font-normal text-gray-700 ">
                        Here are the biggest enterprise technology acquisitions
                        of 2021 so far, in reverse chronological order.
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
          <div className="flex gap-8 mb-8 mt-8">
            <Image src={Camilo}  width={320} height={320} alt="" className="rounded-lg shadow-2xl w-72 h-72"/>
            <p>Licenciado en Informática y Medios Audiovisuales por la
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
          para la creación de gráficos. </p>
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
  posts = posts.slice(0, 3);
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

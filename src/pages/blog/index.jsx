import * as React from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banners from "../../components/Banners";
import banner1 from "../../../public/images/background.jpg";
import banner2 from "../../../public/images/banner2.webp";
import { NextPage, GetStaticProps } from "next";
import { getAllFilesFrontMatter } from "lib/mdx";

const Blog = ({ posts }) => {
  const [search, setSearch] = React.useState("");
  const filteredPosts = posts.filter((frontMatter) =>
    frontMatter.title.toLowerCase().includes(search.toLowerCase())
  );

  const images = [banner1, banner2];

  return (
    <div className="">
      <div style={{ width: "1wv", margin: "0", zIndex: "-15" }}>
        <Banners images={images} />
      </div>

      <main className="py-8 container mx-auto px-44">
        <div className="relative w-full mb-4">
          <input
            type="text"
            aria-label="Buscar articulos"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar articulos"
            className="px-4 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500   block w-full rounded-md bg-white
             text-gray-900 "
          />
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-6 content-center max-sm:grid-cols-1 max-sm:w-full max-sm:px-8">
          {filteredPosts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="block"
            >
              <div className="bg-white border border-gray-200 rounded-lg shadow h-[500px] flex flex-col hover:shadow-xl transition-shadow duration-300">
                {/* Contenedor de imagen con altura fija */}
                <div className="relative w-full h-64 overflow-hidden rounded-t-lg bg-gray-100">
                  <img
                    src={post.thumb}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Contenido con flex para distribuir espacio */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Título con máximo 2 líneas */}
                  <h5
                    className="mb-2 text-xl font-bold tracking-tight text-gray-900"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: "3.5rem",
                    }}
                    title={post.title}
                  >
                    {post.title}
                  </h5>

                  {/* Descripción con máximo 2 líneas */}
                  <p
                    className="mb-4 font-normal text-gray-700 flex-1"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                    title={post.subtitle}
                  >
                    {post.subtitle}
                  </p>

                  {/* Botón siempre pegado al fondo */}
                  <div className="mt-auto">
                    <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                      Read more
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
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllFilesFrontMatter("posts");

  return {
    props: { posts },
  };
};

export default function BlogTemplate({ posts }) {
  return (
    <Layout>
      <Blog posts={posts} />
    </Layout>
  );
}

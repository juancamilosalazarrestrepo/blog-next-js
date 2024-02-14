import * as React from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banners from "../../components/Banners";
import banner1 from "../../../public/images/banneBlog.webp";
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
        <div className="grid grid-cols-3 gap-4 content-center max-sm:grid-cols-1 max-sm:w-full  max-sm:px-8">
        {filteredPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="max-w-sm">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
              
                <img
                  className="rounded-t-lg"
                  src={post.thumb}
                  alt=""
                />
              
              <div className="p-5">
              
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                   {post.title}
                  </h5>
                
                <p className="mb-3 font-normal text-gray-700 ">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <p
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                >
                  Read more
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

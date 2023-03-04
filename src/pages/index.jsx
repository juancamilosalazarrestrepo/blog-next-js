import * as React from "react";
import { NextPage, GetStaticProps } from "next";
import { getAllFilesFrontMatter } from "lib/mdx";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import Banners from "../components/Banners";
import banner1 from "../../public/images/banneBlog.webp";
import banner2 from "../../public/images/banner2.webp";
import Layout from "../components/Layout"

const Home = ({ posts }) => {
  const [search, setSearch] = React.useState("");
  const filteredPosts = posts.filter((frontMatter) =>
    frontMatter.title.toLowerCase().includes(search.toLowerCase())
  );

  const images = [banner1,banner2]

  return (
    <div className="">
    
     
      <div style={{ position:"relative",  width: "1wv", margin: "0", zIndex: "2" }}>
      <Banners images={images}/>
      </div>
      
      <main className="py-8 container mx-auto px-44">
        <div className="relative w-full mb-4">
          <input
            type="text"
            aria-label="Search Articles"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Articles"
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

        {filteredPosts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="block rounded border mb-4 border-gray-200 p-4 hover:bg-gray-300"
          >
            {post.title}
          </Link>
        ))}
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

export default function Template({posts}) {
  return (
    <Layout>
      <Home posts={posts}/>
    </Layout>
  )
}

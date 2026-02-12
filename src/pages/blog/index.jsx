import * as React from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banners from "../../components/Banners";
import banner1 from "../../../public/images/background.jpg";
import banner2 from "../../../public/images/banner2.webp";
import { getAllFilesFrontMatter } from "lib/mdx";

const Blog = ({ posts }) => {
  const [search, setSearch] = React.useState("");
  const filteredPosts = posts.filter((frontMatter) =>
    frontMatter.title.toLowerCase().includes(search.toLowerCase())
  );

  const images = [banner1, banner2];

  return (
    <div>
      <div style={{ position: "relative", width: "100%", margin: "0", zIndex: "2" }}>
        <Banners images={images} />
      </div>

      <main className="py-8 container mx-auto px-6 md:px-12 lg:px-24 xl:px-44">
        {/* Título de sección */}
        <h2 style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "#1a1a2e",
          textAlign: "center",
          marginBottom: "40px",
          position: "relative",
          paddingBottom: "14px",
        }}>
          Artículos
          <span style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "4px",
            background: "linear-gradient(135deg, #0072ff, #00c6ff)",
            borderRadius: "2px",
            display: "block",
          }} />
        </h2>

        {/* Search */}
        <div className="relative w-full mb-8">
          <input
            type="text"
            aria-label="Buscar articulos"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar articulos..."
            style={{
              padding: "12px 48px 12px 20px",
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              width: "100%",
              fontSize: "0.95rem",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              outline: "none",
              transition: "all 0.3s ease",
            }}
          />
          <svg
            className="absolute right-4 top-3.5 h-5 w-5 text-gray-400"
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                background: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.04)",
                transition: "transform 0.35s cubic-bezier(.25,.46,.45,.94), box-shadow 0.35s cubic-bezier(.25,.46,.45,.94)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,114,255,0.12), 0 4px 12px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                }}
              >
                {/* Image */}
                <div style={{ overflow: "hidden", position: "relative", height: "200px" }}>
                  <Image
                    src={post.thumb}
                    alt={post.title}
                    width={600}
                    height={400}
                    style={{ objectFit: "cover", width: "100%", height: "100%", transition: "transform 0.4s ease" }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h5
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#1a1a2e",
                      marginBottom: "8px",
                      lineHeight: 1.3,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                    title={post.title}
                  >
                    {post.title}
                  </h5>

                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "0.88rem",
                      lineHeight: 1.5,
                      flex: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      marginBottom: "16px",
                    }}
                    title={post.subtitle}
                  >
                    {post.subtitle}
                  </p>

                  <div style={{ marginTop: "auto" }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "linear-gradient(135deg, #0072ff, #0575e6)",
                      color: "#fff",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      padding: "10px 20px",
                      borderRadius: "10px",
                      boxShadow: "0 3px 10px rgba(0,114,255,0.2)",
                    }}>
                      Leer más →
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

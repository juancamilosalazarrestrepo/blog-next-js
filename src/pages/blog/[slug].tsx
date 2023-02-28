import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

import { MDXRemote } from "next-mdx-remote";
import ViewsCounter from "@/components/ViewCounter";
import { getFiles, getFileBySlug } from "../../../lib/mdx";

type Props = {
  frontMatter: {
    title: string;
    slug: string;
    image: string;
    wordCount: number;
    readingTime: {
      minutes: number;
      text: string;
      time: number;
      words: number;
    };
  };
  mdxSource: {
    compiledSource: string;
  };
};

import MDXComponents from "@/components/MDXComponents";
import Banners from "@/components/Banners";

const DynamicPost: NextPage<Props> = ({ frontMatter, mdxSource }) => {
  console.log("front matter",frontMatter)
  return (
    <div>
      <h1 className="mb-8 text-4xl text-center font-bold mt-7">
        {frontMatter.title}
      </h1>
      <div>
      <Image src={frontMatter.image}  width={1920} height={600} alt="imagen"/>

      </div>
      <article className="prose mx-auto max-w-none w-3/4">
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </article>
      <ViewsCounter slug={frontMatter.slug} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const post = await getFiles("posts");
  const paths = post.map((post) => ({
    params: { slug: post.replace(/\.mdx/, "") },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getFileBySlug("posts", String(params?.slug));
  return {
    props: { ...post },
  };
};

export default DynamicPost;

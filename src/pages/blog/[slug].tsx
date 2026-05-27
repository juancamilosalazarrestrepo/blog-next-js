import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import ViewsCounter from "@/components/ViewCounter";
import { getFiles, getFileBySlug } from "../../../lib/mdx";

type Props = {
  frontMatter: {
    title: string;
    slug: string;
    image: string;
    imageOG: string;
    thumb: string;
    subtitle: string;
    wordCount: number;
    readingTime: {
      minutes: number;
      text: string;
      time: number;
      words: number;
    };
  };
  mdxSource: MDXRemoteSerializeResult;
};

import MDXComponents from "@/components/MDXComponents";

const DynamicPost: NextPage<Props> = ({ frontMatter, mdxSource }) => {
  return (
    <div>
      <SEO
        title={frontMatter.title}
        description={frontMatter.subtitle}
        image={frontMatter.imageOG || frontMatter.image}
        imageAlt={frontMatter.title}
        type="article"
        author="Juan Camilo Salazar"
        keywords={['desarrollo web', 'blog', 'programacion', frontMatter.title]}
      />
      <div>
        <div style={{ overflow: "hidden", borderRadius: "0 0 16px 16px" }}>
          <Image
            className="overflow-hidden object-cover h-96 mb-14"
            src={frontMatter.image}
            width={1920}
            height={500}
            alt={frontMatter.title}
            style={{
              objectFit: "cover",
              width: "100%",
              maxHeight: "400px",
            }}
          />
        </div>
        <article className="prose mx-auto max-w-3xl px-6 md:px-8">
          <MDXRemote {...mdxSource} components={MDXComponents} />
          <div className="flex justify-center mt-8">
            <ViewsCounter slug={frontMatter.slug} />
          </div>
        </article>
      </div>
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

export default function Template({ frontMatter, mdxSource }: Props) {
  return (
    <Layout>
      <DynamicPost frontMatter={frontMatter} mdxSource={mdxSource} />
    </Layout>
  );
}

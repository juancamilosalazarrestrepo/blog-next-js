import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import ViewsCounter from "@/components/ViewCounter";
import { getFiles, getFileBySlug } from "../../../lib/mdx";
import { getTranslatedSlug } from "../../../lib/postTranslations";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type Props = {
  frontMatter: {
    title: string;
    slug: string;
    image: string;
    imageOG: string;
    thumb: string;
    subtitle: string;
    wordCount: number;
    date?: string;
    keywords?: string[];
    readingTime: {
      minutes: number;
      text: string;
      time: number;
      words: number;
    };
  };
  mdxSource: MDXRemoteSerializeResult;
  // Ruta del post en cada idioma en que existe (el slug cambia entre idiomas).
  alternatePaths: Record<string, string>;
};

import MDXComponents from "@/components/MDXComponents";

const DynamicPost: NextPage<Props> = ({ frontMatter, mdxSource, alternatePaths }) => {
  return (
    <div>
      <SEO
        title={frontMatter.title}
        description={frontMatter.subtitle}
        image={frontMatter.imageOG || frontMatter.image}
        imageAlt={frontMatter.title}
        type="article"
        author="Juan Camilo Salazar"
        date={frontMatter.date}
        keywords={frontMatter.keywords?.length ? frontMatter.keywords : ['web development', 'blog', 'programming', frontMatter.title]}
        languages={Object.keys(alternatePaths)}
        paths={alternatePaths}
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

// Slugs that have their own dedicated page file and shouldn't use the dynamic route
const DEDICATED_PAGES_ES = ['agentes-ia-programacion-2026', 'consejos-skills-claude-code', 'gpt-6-astra-vs-fable-5-1-programar'];
const DEDICATED_PAGES_EN = ['ai-agents-programming-2026'];

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: { params: { slug: string }; locale: string }[] = [];

  for (const locale of locales || ['es']) {
    const files = await getFiles("posts", locale);
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      if (locale === 'es' && DEDICATED_PAGES_ES.includes(slug)) continue;
      if (locale === 'en' && DEDICATED_PAGES_EN.includes(slug)) continue;
      paths.push({ params: { slug }, locale });
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = String(params?.slug);
  const currentLocale = locale || 'es';
  const post = await getFileBySlug("posts", slug, currentLocale);

  const alternatePaths: Record<string, string> = { [currentLocale]: `/blog/${slug}` };
  const translation = getTranslatedSlug(slug, currentLocale);
  if (translation) alternatePaths[translation.locale] = `/blog/${translation.slug}`;

  return {
    props: {
      ...post,
      alternatePaths,
      ...(await serverSideTranslations(currentLocale, ['common'])),
    },
  };
};

export default function Template({ frontMatter, mdxSource, alternatePaths }: Props) {
  return (
    <Layout>
      <DynamicPost frontMatter={frontMatter} mdxSource={mdxSource} alternatePaths={alternatePaths} />
    </Layout>
  );
}

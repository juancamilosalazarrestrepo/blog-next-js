import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import CourseLayout from "@/components/CourseLayout";
import MDXComponents from "@/components/MDXComponents";
import { MDXRemote } from "next-mdx-remote";
import { getFiles, getFileBySlug, getAllFilesFrontMatter, stripOrderPrefix } from "../../../../lib/mdx";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const COURSE_TYPE = "cursos/ia-paginas-web";
const COURSE_URL = "/cursos/ia-paginas-web";
const COURSE_LABEL = "IA: Página Web";

export const getStaticPaths = async ({ locales }) => {
  const paths = [];
  for (const locale of locales || ["es"]) {
    const files = await getFiles(COURSE_TYPE, locale);
    for (const file of files) {
      const capitulo = stripOrderPrefix(file.replace(/\.mdx$/, ""));
      paths.push({ params: { capitulo }, locale });
    }
  }
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params, locale }) => {
  const activeLocale = locale || "es";
  const files = await getFiles(COURSE_TYPE, activeLocale);
  const fileName = files.find((f) => stripOrderPrefix(f.replace(/\.mdx$/, "")) === params.capitulo);
  if (!fileName) {
    return { notFound: true };
  }
  const { mdxSource, frontMatter } = await getFileBySlug(COURSE_TYPE, fileName.replace(/\.mdx$/, ""), activeLocale);

  const rawChapters = await getAllFilesFrontMatter(COURSE_TYPE, activeLocale);
  const chapters = rawChapters.map((chapter) => ({
    ...chapter,
    slug: stripOrderPrefix(chapter.slug),
  }));

  const toSerializable = (value) => JSON.parse(JSON.stringify(value ?? null));

  return {
    props: {
      ...(await serverSideTranslations(activeLocale, ["common"])),
      mdxSource,
      frontMatter: toSerializable({ ...frontMatter, slug: params.capitulo }),
      chapters: toSerializable(chapters),
      activeLocale,
    },
  };
};

export default function CapituloPage({ mdxSource, frontMatter, chapters, activeLocale }) {
  return (
    <Layout>
      <SEO
        title={`${frontMatter.title} | Curso de IA: Página Web`}
        description={frontMatter.subtitle}
        type="article"
        keywords={frontMatter.keywords?.length ? frontMatter.keywords : ["curso de ia", "crear web con ia", frontMatter.title]}
        noindex={activeLocale !== "es"}
        languages={["es"]}
      />
      <CourseLayout chapters={chapters} currentSlug={frontMatter.slug} courseUrl={COURSE_URL} courseLabel={COURSE_LABEL}>
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </CourseLayout>
    </Layout>
  );
}

import fs from "fs";
import * as matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import { serialize } from "next-mdx-remote/serialize";
import mdxPrism from "mdx-prism";
import remarkSlug from "remark-slug";
import remarkAutolinkHeadings from "remark-autolink-headings";
import codeTitle from "remark-code-titles";

const root = process.cwd();

function getPostsDir(type, locale = 'es') {
  const localePath = path.join(root, "data", type, locale);
  if (fs.existsSync(localePath)) return localePath;
  return path.join(root, "data", type);
}

export async function getFiles(type, locale = 'es') {
  const dir = getPostsDir(type, locale);
  return fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
}

export async function getFileBySlug(type, slug, locale = 'es') {
  const dir = getPostsDir(type, locale);
  const source = slug
    ? fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf8")
    : fs.readFileSync(path.join(root, "data", `${type}.mdx`), "utf8");
  let { data, content } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkSlug, remarkAutolinkHeadings, codeTitle],
      rehypePlugins: [mdxPrism],
    },
  });
  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      title: data.title,
      image: data.image,
      thumb: data.thumb,
      subtitle: data.subtitle,
      imageOG: data.imageOG,
      date: data.date || null,
      keywords: data.keywords || [],
    },
  };
}

export async function getAllFilesFrontMatter(type, locale = 'es') {
  const dir = getPostsDir(type, locale);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

  return files
    .reduce((allPost, postSlug) => {
      const source = fs.readFileSync(path.join(dir, postSlug), "utf8");
      const { data } = matter(source);

      return [
        {
          ...data,
          slug: postSlug.replace(".mdx", ""),
        },
        ...allPost,
      ];
    }, [])
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

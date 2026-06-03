import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://salazarcode.com';
const ROOT = process.cwd();

function getSlugs(locale) {
  const dir = path.join(ROOT, 'data', 'posts', locale);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''));
}

function getPostDates(locale) {
  const dir = path.join(ROOT, 'data', 'posts', locale);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => {
      const source = fs.readFileSync(path.join(dir, f), 'utf8');
      const { data } = matter(source);
      return {
        slug: f.replace('.mdx', ''),
        date: data.date || data.lastmod || null,
      };
    });
}

function formatDate(date) {
  if (!date) return new Date().toISOString().split('T')[0];
  return new Date(date).toISOString().split('T')[0];
}

export async function getServerSideProps({ res }) {
  const esSlugs = getSlugs('es');
  const enSlugs = getSlugs('en');
  const esDates = getPostDates('es');
  const enDates = getPostDates('en');

  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/agentes-ai', priority: '0.9', changefreq: 'monthly' },
    { loc: '/desarrollo-web', priority: '0.9', changefreq: 'monthly' },
    { loc: '/blog', priority: '0.8', changefreq: 'daily' },
    { loc: '/portafolio', priority: '0.8', changefreq: 'monthly' },
    { loc: '/proyectos', priority: '0.8', changefreq: 'monthly' },
    { loc: '/certificados', priority: '0.7', changefreq: 'monthly' },
    { loc: '/services', priority: '0.7', changefreq: 'monthly' },
    { loc: '/contact', priority: '0.6', changefreq: 'yearly' },
    { loc: '/terminos', priority: '0.3', changefreq: 'yearly' },
    { loc: '/politicas', priority: '0.3', changefreq: 'yearly' },
    { loc: '/consultoria-ia', priority: '0.8', changefreq: 'monthly' },
  ];

  const staticXml = staticPages.map(p =>
    `  <url>\n    <loc>${SITE_URL}${p.loc}</loc>\n    <lastmod>2026-05-26</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
  ).join('\n');

  const esBlogXml = esSlugs.map(slug => {
    const entry = esDates.find(p => p.slug === slug);
    return `  <url>\n    <loc>${SITE_URL}/blog/${slug}</loc>\n    <lastmod>${formatDate(entry?.date)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
  }).join('\n');

  const enBlogXml = enSlugs.map(slug => {
    const entry = enDates.find(p => p.slug === slug);
    return `  <url>\n    <loc>${SITE_URL}/en/blog/${slug}</loc>\n    <lastmod>${formatDate(entry?.date)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
  }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticXml}
${esBlogXml}
${enBlogXml}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}

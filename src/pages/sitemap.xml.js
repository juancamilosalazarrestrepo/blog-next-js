import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://salazarcode.com';
const ROOT = process.cwd();

function getSlugs(dir) {
  const files = fs.readdirSync(path.join(ROOT, 'data', dir));
  return files.map(f => f.replace('.mdx', ''));
}

function formatDate(date) {
  if (!date) return new Date().toISOString().split('T')[0];
  return new Date(date).toISOString().split('T')[0];
}

function getPostDates(dir) {
  const files = fs.readdirSync(path.join(ROOT, 'data', dir));
  return files.map(f => {
    const source = fs.readFileSync(path.join(ROOT, 'data', dir, f), 'utf8');
    const { data } = matter(source);
    return {
      slug: f.replace('.mdx', ''),
      date: data.date || data.lastmod || null,
    };
  });
}

export async function getServerSideProps({ res }) {
  const postSlugs = getSlugs('posts');
  const postDates = getPostDates('posts');

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
    { loc: '/cursos', priority: '0.7', changefreq: 'monthly' },
    { loc: '/ecommerce', priority: '0.7', changefreq: 'monthly' },
    { loc: '/precios', priority: '0.6', changefreq: 'monthly' },
    { loc: '/elements', priority: '0.5', changefreq: 'monthly' },
    { loc: '/terminos', priority: '0.3', changefreq: 'yearly' },
    { loc: '/politicas', priority: '0.3', changefreq: 'yearly' },
    { loc: '/consultoria-ia', priority: '0.8', changefreq: 'monthly' },
    { loc: '/videoCardElementPage', priority: '0.5', changefreq: 'monthly' },
  ];

  const projectDetailPages = [
    '/proyectos/velmax_consultorios',
    '/proyectos/nice_gradient',
    '/proyectos/dr_machado_diagnostics',
    '/proyectos/luxury_booking_engine',
    '/proyectos/sistema_gestion_inmobiliaria',
    '/proyectos/aplicacion_movil_para_restaurantes',
    '/proyectos/calculadora',
    '/proyectos/clonechatgpt',
  ];

  const portfolioDetailPages = [
    '/portafolio/calculadora',
    '/portafolio/clonechatgpt',
    '/portafolio/sneakersCards',
  ];

  const staticXml = staticPages.map(p =>
    `  <url>\n    <loc>${SITE_URL}${p.loc}</loc>\n    <lastmod>2026-05-26</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
  ).join('\n');

  const projectXml = projectDetailPages.map(p =>
    `  <url>\n    <loc>${SITE_URL}${p}</loc>\n    <lastmod>2026-05-26</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
  ).join('\n');

  const portfolioXml = portfolioDetailPages.map(p =>
    `  <url>\n    <loc>${SITE_URL}${p}</loc>\n    <lastmod>2026-05-26</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
  ).join('\n');

  const blogXml = postSlugs.map(slug => {
    const entry = postDates.find(p => p.slug === slug);
    return `  <url>\n    <loc>${SITE_URL}/blog/${slug}</loc>\n    <lastmod>${formatDate(entry?.date)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
  }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${projectXml}
${portfolioXml}
${blogXml}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}

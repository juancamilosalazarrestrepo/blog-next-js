import Head from 'next/head';
import { useRouter } from 'next/router';
import { SITE_URL } from '../../lib/site';

const SEO = ({
  title = 'Desarrollador Full Stack | Especialista en Next.js, React y .NET',
  description = 'Portafolio de Juan Camilo Salazar. Desarrollador Full Stack especializado en Next.js, React, .NET y desarrollo web moderno.',
  image = '/images/camiloPaginaWeb.webp',
  imageAlt = 'Juan Camilo Salazar - Desarrollador Full Stack',
  type = 'website',
  date,
  author = 'Juan Camilo Salazar',
  keywords = ['desarrollador web', 'react', 'nextjs', '.net', 'full stack', 'portfolio'],
  category = undefined,
  noindex = false,
  canonical = undefined,
  schema = undefined,
  // Idiomas en que existe de verdad el contenido. Una página solo en español
  // debe pasar ['es']: así /en/... canonicaliza a la versión en español y no
  // se anuncia un hreflang "en" que serviría contenido duplicado.
  languages = ['es', 'en'],
  // Ruta por idioma cuando no coincide entre idiomas, ej. { es: '/blog/codigo-limpio', en: '/blog/clean-code' }.
  paths = {},
  imageWidth = 1200,
  imageHeight = 630,
  // Con títulos largos, el sufijo de marca empuja la keyword fuera del corte de Google.
  appendSiteName = true,
}) => {
  const router = useRouter();
  const { locale, asPath } = router;
  const siteUrl = SITE_URL;
  const siteName = 'Juan Camilo Salazar';
  const twitterHandle = '@juancsalazarc';

  const urlFor = (lang) => {
    // Sin query ni hash: ?utm_... no debe acabar en el canonical ni en el hreflang.
    const pagePath = paths?.[lang] ?? asPath.split(/[?#]/)[0];
    const prefix = lang !== 'es' ? `/${lang}` : '';
    // En la home, "/en/" redirige a "/en": el hreflang debe apuntar a la URL final.
    return `${siteUrl}${prefix}${prefix && pagePath === '/' ? '' : pagePath}`;
  };
  // Si el visitante está en un idioma que la página no tiene, la versión válida es la primera.
  const pageLocale = languages.includes(locale) ? locale : languages[0];
  const currentUrl = canonical || urlFor(pageLocale);
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const fullTitle = !appendSiteName || title.includes(siteName) ? title : `${title} | ${siteName}`;

  const toOgLocale = (lang) => (lang === 'en' ? 'en_US' : 'es_ES');
  const ogLocale = toOgLocale(pageLocale);
  const ogLocaleAlternates = languages.filter((lang) => lang !== pageLocale).map(toOgLocale);

  const defaultSchema = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": imageUrl,
    "author": {
      "@type": "Person",
      "name": author,
      "url": currentUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/camiloPaginaWeb.webp`
      }
    },
    "datePublished": date || new Date().toISOString().split('T')[0],
    "dateModified": date || new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "inLanguage": pageLocale === 'en' ? 'en-US' : 'es-ES'
  } : {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": currentUrl,
    "image": imageUrl,
    "inLanguage": pageLocale === 'en' ? 'en-US' : 'es-ES'
  };

  const schemaData = schema || defaultSchema;

  const defaultLang = languages.includes('es') ? 'es' : languages[0];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={currentUrl} />

      {/* hreflang solo para los idiomas en que existe el contenido */}
      {languages.map((lang) => (
        <link key={`hreflang-${lang}`} rel="alternate" hrefLang={lang} href={urlFor(lang)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={urlFor(defaultLang)} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={ogLocale} />
      {ogLocaleAlternates.map((alt) => (
        <meta key={`og-alt-${alt}`} property="og:locale:alternate" content={alt} />
      ))}

      {type === 'article' && date && (
        <>
          <meta property="article:published_time" content={date} />
          <meta property="article:author" content={author} />
          {category && <meta property="article:section" content={category} />}
          {keywords && keywords.length > 0 && (
            <meta property="article:tag" content={keywords.join(', ')} />
          )}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        // Escapar "<" evita que un "</script>" en el contenido rompa el tag (XSS)
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData).replace(/</g, '\\u003c') }}
      />
    </Head>
  );
};

export default SEO;

import Head from 'next/head';
import { useRouter } from 'next/router';

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
}) => {
  const router = useRouter();
  const { locale, locales, asPath } = router;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.salazarcode.com';
  const siteName = 'Juan Camilo Salazar';
  const twitterHandle = '@juancsalazarc';

  const currentUrl = canonical || `${siteUrl}${locale !== 'es' ? `/${locale}` : ''}${asPath}`;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  const ogLocale = locale === 'en' ? 'en_US' : 'es_ES';
  const ogLocaleAlternate = locale === 'en' ? 'es_ES' : 'en_US';

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
    "inLanguage": locale === 'en' ? 'en-US' : 'es-ES'
  } : {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": currentUrl,
    "image": imageUrl,
    "inLanguage": locale === 'en' ? 'en-US' : 'es-ES'
  };

  const schemaData = schema || defaultSchema;

  const esUrl = `${siteUrl}${asPath}`;
  const enUrl = `${siteUrl}/en${asPath}`;

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

      {/* hreflang for bilingual SEO */}
      <link rel="alternate" hrefLang="es" href={esUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={esUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlternate} />

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </Head>
  );
};

export default SEO;

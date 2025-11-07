import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * Componente SEO reutilizable para optimización en motores de búsqueda
 * @param {Object} props - Propiedades del componente
 * @param {string} props.title - Título de la página (se añade " | Juan Camilo Salazar" automáticamente)
 * @param {string} props.description - Descripción meta de la página
 * @param {string} props.image - URL de la imagen para Open Graph (relativa o absoluta)
 * @param {string} props.imageAlt - Texto alternativo para la imagen OG
 * @param {string} props.type - Tipo de contenido: 'website' o 'article'
 * @param {string} props.date - Fecha de publicación (para artículos)
 * @param {string} props.author - Autor del contenido
 * @param {string[]} props.keywords - Array de palabras clave
 * @param {string} props.category - Categoría del contenido
 * @param {boolean} props.noindex - Si true, evita que se indexe la página
 * @param {string} props.canonical - URL canónica personalizada
 * @param {Object} props.schema - Schema.org personalizado (opcional)
 */
const SEO = ({
  title = 'Desarrollador Full Stack | Especialista en Next.js, React y .NET',
  description = 'Portafolio de Juan Camilo Salazar. Desarrollador Full Stack especializado en Next.js, React, .NET y desarrollo web moderno. Explora mis proyectos y artículos sobre programación.',
  image = '/images/og-default.jpg',
  imageAlt = 'Juan Camilo Salazar - Desarrollador Full Stack',
  type = 'website',
  date,
  author = 'Juan Camilo Salazar',
  keywords = ['desarrollador web', 'react', 'nextjs', '.net', 'full stack', 'portfolio'],
  category,
  noindex = false,
  canonical,
  schema,
}) => {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tudominio.com';
  const siteName = 'Juan Camilo Salazar';
  const twitterHandle = '@tuusuario'; // Cambia esto por tu usuario real
  
  // Construir URL completa de la página actual
  const currentUrl = canonical || `${siteUrl}${router.asPath}`;
  
  // Construir URL completa de la imagen
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  // Título completo con branding
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  // Schema.org por defecto
  const defaultSchema = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": imageUrl,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": date,
    "dateModified": date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  } : {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": currentUrl,
    "image": imageUrl
  };

  const schemaData = schema || defaultSchema;

  return (
    <Head>
      {/* Título y descripción básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Keywords */}
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Autor */}
      <meta name="author" content={author} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="es_ES" />
      
      {/* Metadatos específicos para artículos */}
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData)
        }}
      />
    </Head>
  );
};

export default SEO;

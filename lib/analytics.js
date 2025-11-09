/**
 * Utilidades para Google Analytics
 * Funciones helper para trackear eventos personalizados
 */

// Página vista
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Evento genérico
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Eventos predefinidos útiles

// Click en proyecto
export const trackProjectClick = (projectName) => {
  event({
    action: 'click_project',
    category: 'Projects',
    label: projectName,
  });
};

// Lectura de artículo
export const trackArticleRead = (articleTitle, readTime) => {
  event({
    action: 'read_article',
    category: 'Blog',
    label: articleTitle,
    value: readTime,
  });
};

// Click en botón de contacto
export const trackContactClick = (source) => {
  event({
    action: 'contact_click',
    category: 'Engagement',
    label: source,
  });
};

// Descarga de CV
export const trackCVDownload = () => {
  event({
    action: 'download_cv',
    category: 'Downloads',
    label: 'CV PDF',
  });
};

// Click en red social
export const trackSocialClick = (platform, url) => {
  event({
    action: 'social_click',
    category: 'Social',
    label: platform,
    value: url,
  });
};

// Búsqueda en el blog
export const trackSearch = (searchTerm) => {
  event({
    action: 'search',
    category: 'Blog',
    label: searchTerm,
  });
};

// Click en enlace externo
export const trackExternalLink = (url) => {
  event({
    action: 'external_link',
    category: 'Navigation',
    label: url,
  });
};

// Tiempo en página
export const trackTimeOnPage = (pageName, seconds) => {
  event({
    action: 'time_on_page',
    category: 'Engagement',
    label: pageName,
    value: seconds,
  });
};

// Pares de posts traducidos. El slug cambia entre idiomas, así que el hreflang no
// puede derivarse de la URL actual: /en/blog/codigo-limpio no existe (404).
// Solo pares servidos por blog/[slug] en ambos idiomas; las páginas JSX dedicadas
// no emiten hreflang y un par con ellas quedaría sin enlace de retorno.
const ES_TO_EN = {
  'codigo-limpio': 'clean-code',
  'consejos-eficiendia-programacion': 'programming-efficiency-tips',
  'frameworks-javascript': 'top-5-javascript-frameworks',
  'nextjs-16-caching-inteligente': 'nextjs-16-intelligent-caching',
  'robotic-process-automatization': 'robotic-process-automation',
  'tendencias-desarrolloweb': 'web-development-trends',
  'top-5-librerias-de-automatizacion': 'top-5-automation-libraries',
};

const EN_TO_ES = Object.fromEntries(Object.entries(ES_TO_EN).map(([es, en]) => [en, es]));

export function getTranslatedSlug(slug, locale) {
  const map = locale === 'es' ? ES_TO_EN : EN_TO_ES;
  if (!map[slug]) return null;
  return { locale: locale === 'es' ? 'en' : 'es', slug: map[slug] };
}

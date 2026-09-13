/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
  },
  localePath: require('path').resolve('./public/locales'),
  // En desarrollo, releer los JSON de traduccion en cada render para que los
  // cambios en public/locales se vean sin reiniciar el servidor.
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}

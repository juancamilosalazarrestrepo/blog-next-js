import Script from 'next/script';

/**
 * Componente Google Analytics para Next.js
 * Implementa gtag.js de forma optimizada
 */
const GoogleAnalytics = ({ measurementId }) => {
  // No renderizar en desarrollo
  if (process.env.NODE_ENV !== 'production' || !measurementId) {
    return null;
  }

  return (
    <>
      {/* Script de Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      
      {/* Inicialización de gtag */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { pageview } from '../../lib/analytics'
import { Analytics } from '@vercel/analytics/react'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://salazarcode.com'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Salazar Code',
  legalName: 'Juan Camilo Salazar',
  url: SITE_URL,
  logo: `${SITE_URL}/images/camiloPaginaWeb.webp`,
  description:
    'Desarrollo de páginas web profesionales, e-commerce y soluciones con inteligencia artificial. Especialistas en Next.js, React y .NET.',
  founder: {
    '@type': 'Person',
    name: 'Juan Camilo Salazar',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+57-304-209-3951',
    contactType: 'sales',
    areaServed: 'CO',
    availableLanguage: ['Spanish', 'English'],
  },
  sameAs: [
    'https://github.com/juancamilosalazarrestrepo',
    'https://www.linkedin.com/in/juancamilosalazarrestrepo',
    'https://www.instagram.com/salazarcode14/',
  ],
}

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c') }}
        />
      </Head>
      <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default appWithTranslation(App, nextI18NextConfig)

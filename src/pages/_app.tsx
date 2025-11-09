import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { pageview } from '../../lib/analytics'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  // Track page views on route change
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
      {/* Google Analytics */}
      <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      
      {/* Tu aplicación */}
      <Component {...pageProps} />
    </>
  )
}

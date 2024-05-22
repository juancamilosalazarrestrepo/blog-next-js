import { Html, Head, Main, NextScript } from 'next/document'
import GoogleAnalytics from '../pages/GoogleAnalytics'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
      <GoogleAnalytics />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

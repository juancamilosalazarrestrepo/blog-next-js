import { Html, Head, Main, NextScript } from 'next/document'
import { GoogleAnalytics } from '@next/third-parties/google'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <GoogleAnalytics gaId="G-9FDM09CLBH" />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

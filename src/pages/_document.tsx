import { Html, Head, Main, NextScript } from "next/document";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function Document() {
  return (
    // Sin lang fijo: Next usa el locale activo, así /en/... declara lang="en".
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&family=Parkinsans:wght@300..800&family=Roboto:wght@400;500;700&family=Teko:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <GoogleAnalytics gaId="G-9FDM09CLBH" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

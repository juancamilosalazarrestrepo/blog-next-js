import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";
import { GoogleAnalytics } from "@next/third-parties/google";
import { isDarkReady, themeInitScript } from "../../lib/theme";

type Props = DocumentInitialProps & { darkReady: boolean };

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<Props> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, darkReady: isDarkReady(ctx.pathname) };
  }

  render() {
    return (
      // Sin lang fijo: Next usa el locale activo, así /en/... declara lang="en".
      <Html data-dark-ready={this.props.darkReady ? "true" : undefined}>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
}

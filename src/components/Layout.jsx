import NavBar from "./NavBar";
import Head from "next/head";
import Footer from "./Footer"
import { GoogleAnalytics } from '@next/third-parties/google'


export default function Layout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="py-10 shadow-xl ">
        <div className="relative z-50">
          <div className="fixed z-50 shadow-md bg-white w-full py-6 top-0 left-0 right-0">
            <NavBar />
          </div>
        </div>
      </header>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      <div>{children}</div>
      <Footer />
    </>
  );
}

import NavBar from "./NavBar";
import Head from "next/head";
import Footer from "./Footer"
import GoogleAnalytics from '../pages/GoogleAnalytics';
import { GoogleTagManager } from '@next/third-parties/google'


export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Salazar Code</title>
        <meta name="description" content="Desarrollador de Software" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="py-10 shadow-xl ">
        <div className="relative z-10">
          <div className="fixed bg-white w-full py-6 top-0 left-0 right-0">
            <NavBar />
          </div>
        </div>
      </header>
      <GoogleTagManager gtmId="G-9FDM09CLBH" />
      <div>{children}</div>
      <Footer/>
    </>
  );
}

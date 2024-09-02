import NavBar from "./NavBar";
import Head from "next/head";
import Footer from "./Footer"


export default function LayoutSections({ children }) {
  return (
    <>
      <Head>
        <title>Salazar Code</title>
        <meta name="description" content="Fullstack Developer" />
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
      <div>{children}</div>
      <Footer/>
    </>
  );
}

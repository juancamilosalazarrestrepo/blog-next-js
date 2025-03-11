import Link from "next/link";
import logo from "../../public/images/locosc.webp";
import contactIcon from "../../public/images/customer-service.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function NavBar() {
  const [activeURL, setActiveURL] = useState("");
  const router = useRouter();
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  // traeme el valor despues de la barra de direccion del navegador
  useEffect(() => {
    // Obtiene la URL del router
    setActiveURL(router.asPath);
  }, [router.asPath]);

  const toggleBurgerMenu = () => {
    console.log("hola");
    setOpenBurgerMenu(!openBurgerMenu);
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-2 flex justify-between">
          <div className="flex items-center md:gap-x-14">
            <Link href="/" aria-label="Home">
              <Image src={logo} width={200} height={60} />
            </Link>
            <div className="hidden md:flex md:gap-x-8 px-8">
              <Link
                href="/portafolio"
                className={`inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100  ${
                  activeURL === "/portafolio" ? "active" : ""
                }`}
              >
                Portafolio
              </Link>
              <Link
                href="/blog"
                className={`inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 ${
                  activeURL === "/blog" ? "active" : ""
                }`}
              >
                Blog
              </Link>
           {/*    <Link
                href="/precios"
                className={`inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100  ${
                  activeURL === "/precios" ? "active" : ""
                }`}
              >
                Precios
              </Link> */}
              {console.log("este", activeURL)}
              <Link
                href="/proyectos"
                className={`inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100  ${
                  activeURL === "/proyectos" ? " active" : ""
                }`}
              >
                Proyectos
              </Link>

             {/*  <Link
                href="/cursos"
                className={`inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100  ${
                  activeURL === "/cursos" ? "active" : ""
                }`}
              >
                Cursos
              </Link> */}
              <Link
                href="/certificados"
                className={`inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100  ${
                  activeURL === "/certificados" ? "active" : ""
                }`}
              >
                Certificados
              </Link>
              <Link
                href="/ecommerce"
                className={`inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100  ${
                  activeURL === "/ecommerce" ? "active" : ""
                }`}
              >
                Desarrollo de E-commerce
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <a
              className=" max-sm:hidden group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#0575E6] text-white hover:text-slate-100 hover:bg-[#021B79] active:bg-[#021B79] active:text-blue-100 focus-visible:outline-[#021B79]"
              href="/contact"
            >
              <span>Comunícate conmigo</span>
            </a>{" "}
            <div className="-mr-1 md:hidden">
              <div data-headlessui-state="">
                <button
                  className="relative z-10 flex h-8 w-8 items-center justify-center [&amp;:not(:focus-visible)]:focus:outline-none"
                  aria-label="Toggle Navigation"
                  type="button"
                  aria-expanded="false"
                  data-headlessui-state=""
                  id="headlessui-popover-button-:R3p6:"
                  onClick={toggleBurgerMenu}
                >
                  <Link href="/contact">
                    <Image src={contactIcon}></Image>
                  </Link>
                </button>
              </div>
            </div>
            <div className="-mr-1 md:hidden">
              <div data-headlessui-state="">
                <button
                  className="relative z-10 flex h-8 w-8 items-center justify-center [&amp;:not(:focus-visible)]:focus:outline-none"
                  aria-label="Toggle Navigation"
                  type="button"
                  aria-expanded="false"
                  data-headlessui-state=""
                  id="headlessui-popover-button-:R3p6:"
                >
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    onClick={toggleBurgerMenu}
                  >
                    <path
                      d="M0 1H14M0 7H14M0 13H14"
                      className="origin-center transition"
                    ></path>
                    <path
                      d="M2 2L12 12M12 2L2 12"
                      className="origin-center transition scale-90 opacity-0"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <nav
        className={`burgerMenuSection ${openBurgerMenu ? "open" : "closed"}`}
      >
        <Link
          href="/portafolio"
          className={`menuItem inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100  ${
            activeURL === "/portafolio" ? "active" : ""
          }`}
        >
          Portafolio
        </Link>
        <Link
          href="/blog"
          className={`menuItem inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 ${
            activeURL === "/blog" ? "active" : ""
          }`}
        >
          Blog
        </Link>
        <Link
          href="/precios"
          className={`menuItem inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100  ${
            activeURL === "/precios" ? "active" : ""
          }`}
        >
          Precios
        </Link>
        {console.log("este", activeURL)}
        <Link
          href="/proyectos"
          className={`menuItem inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100  ${
            activeURL === "/proyectos" ? " active" : ""
          }`}
        >
          Proyectos
        </Link>

        <Link
          href="/cursos"
          className={`menuItem inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100  ${
            activeURL === "/cursos" ? "active" : ""
          }`}
        >
          Cursos
        </Link>
        <Link
          href="/certificados"
          className={`menuItem inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100  ${
            activeURL === "/certificados" ? "active" : ""
          }`}
        >
          Certificados
        </Link>

        <Link
          href="/contact"
          className={`menuItem inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100  ${
            activeURL === "/contact" ? "active" : ""
          }`}
        >
          Contacto
        </Link>
      </nav>
    </div>
  );
}

import Link from "next/link";
import logo from "../../public/images/locosc.webp"
import Image from "next/image";



export default function NavBar() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="relative z-2 flex justify-between">
        <div className="flex items-center md:gap-x-12">
          <Link href="/" aria-label="Home" >
            <Image src={logo} width={200} height={60} />
          </Link>
          <div className="hidden md:flex md:gap-x-6">
          <Link
            href="/portafolio"
            className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
            Portafolio
          </Link>
          <Link
            href="/blog"
            className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
             Blog
          </Link>
          <Link
            href="/precios"
            className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
             Precios
          </Link>
          <Link
            href="/proyectos"
            className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
             Proyectos
          </Link>

          <Link
            href="/cursos"
            className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
             Cursos
          </Link>
          <Link
            href="/certificados"
            className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
             Certificados
          </Link>
          </div>
        </div>
        <div className="flex items-center gap-x-5 md:gap-x-8">
          <a
            className=" max-sm:hidden group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#0575E6] text-white hover:text-slate-100 hover:bg-[#021B79] active:bg-[#021B79] active:text-blue-100 focus-visible:outline-[#021B79]"
            href="/register"
          >
            <span>
              Comunícate conmigo
            </span>
          </a>
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
  );
}

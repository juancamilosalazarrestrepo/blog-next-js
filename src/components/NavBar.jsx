import Link from "next/link";
import logo from "../../public/images/locosc.webp";
import contactIcon from "../../public/images/customer-service.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function NavBar() {
  const { t } = useTranslation("common");
  const [activeURL, setActiveURL] = useState("");
  const router = useRouter();
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);

  useEffect(() => {
    setActiveURL(router.asPath);
  }, [router.asPath]);

  const toggleBurgerMenu = () => {
    setOpenBurgerMenu(!openBurgerMenu);
  };

  return (
    <div>
      <div className={styles.navbarContainer}>
        <nav className={styles.navbarContent}>
          <div className={styles.menuItemsContainer}>
            <Link href="/" aria-label="Home">
              <Image src={logo} width={200} height={60} alt="SalazarCode" />
            </Link>
            <div className={styles.linksContainer}>
              <Link
                href="/portafolio"
                className={`inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 ${activeURL === "/portafolio" ? "active" : ""}`}
              >
                {t("nav.portfolio")}
              </Link>
              <Link
                href="/blog"
                className={`inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 ${activeURL === "/blog" ? "active" : ""}`}
              >
                {t("nav.blog")}
              </Link>
              <Link
                href="/proyectos"
                className={`inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 ${activeURL === "/proyectos" ? " active" : ""}`}
              >
                {t("nav.projects")}
              </Link>
              <Link
                href="/certificados"
                className={`inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 ${activeURL === "/certificados" ? "active" : ""}`}
              >
                {t("nav.certificates")}
              </Link>
              <Link
                href="/services"
                className={`inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 ${activeURL === "/services" ? "active" : ""}`}
              >
                {t("nav.services")}
              </Link>
              <Link
                href="/elements"
                className={`inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 ${activeURL === "/elements" ? "active" : ""}`}
              >
                {t("nav.uiComponents")}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-x-3 md:gap-x-5">
            <a
              className="max-sm:hidden group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#0575E6] text-white hover:text-slate-100 hover:bg-[#021B79] active:bg-[#021B79] active:text-blue-100 focus-visible:outline-[#021B79]"
              href="/contact"
            >
              <span>{t("nav.contact")}</span>
            </a>
            <LanguageSwitcher />
            <div className="-mr-1 md:hidden">
              <button
                className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
                aria-label="Toggle Navigation"
                type="button"
                onClick={toggleBurgerMenu}
              >
                <Link href="/contact">
                  <Image src={contactIcon} alt="contact" />
                </Link>
              </button>
            </div>
            <div className="-mr-1 md:hidden">
              <button
                className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
                aria-label="Toggle Navigation"
                type="button"
                onClick={toggleBurgerMenu}
              >
                <svg
                  aria-hidden="true"
                  className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M0 1H14M0 7H14M0 13H14" className="origin-center transition" />
                  <path d="M2 2L12 12M12 2L2 12" className="origin-center transition scale-90 opacity-0" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>
      <nav className={`burgerMenuSection ${openBurgerMenu ? "open" : "closed"}`}>
        <Link href="/portafolio" className={`menuItem inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 ${activeURL === "/portafolio" ? "active" : ""}`}>
          {t("nav.portfolio")}
        </Link>
        <Link href="/blog" className={`menuItem inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 ${activeURL === "/blog" ? "active" : ""}`}>
          {t("nav.blog")}
        </Link>
        <Link href="/proyectos" className={`menuItem inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 ${activeURL === "/proyectos" ? " active" : ""}`}>
          {t("nav.projects")}
        </Link>
        <Link href="/certificados" className={`menuItem inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 ${activeURL === "/certificados" ? "active" : ""}`}>
          {t("nav.certificates")}
        </Link>
        <Link href="/services" className={`menuItem inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 ${activeURL === "/contact" ? "active" : ""}`}>
          {t("nav.services")}
        </Link>
        <Link href="/contact" className={`menuItem inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 ${activeURL === "/contact" ? "active" : ""}`}>
          {t("nav.contact")}
        </Link>
      </nav>
    </div>
  );
}

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Image from "next/image";
import laptops from "../../public/images/laptop.png";
import phones from "../../public/images/phones.png";
import mobileBg from "../../public/images/mobile_banner_bg.webp";
import styles from "../styles/Banners.module.css";
import { useTranslation } from "next-i18next";
import LavaBackground from "./LavaBackground";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Banners({ images }) {
  const { t } = useTranslation("common");

  return (
    <div>
      {/* Mobile Header */}
      <div className={styles.headerMobile}>
        <Image
          src={mobileBg}
          alt="Abstract tech background"
          className={styles.heroMobileBgImage}
          placeholder="empty"
        />
        <div className={styles.heroMobileOverlay}></div>

        <h1 className="headerTextMobile" style={{ margin: 0, padding: 0 }}>Fullstack Developer.</h1>
        <h2 className="headerSubTextMobile" style={{ margin: 0, padding: 0 }}>Juan Camilo Salazar Restrepo</h2>
        <p className="headerParagraphMobile">
          {t("banner.tagline")}
        </p>
        <div className="socialNETSContainer">
          <a href="https://www.facebook.com/profile.php?id=61557592842009" className="text-white hover:text-gray-900" aria-label="Facebook">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="https://www.instagram.com/salazarcode14/" className="text-white hover:text-gray-900" aria-label="Instagram">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="https://github.com/juancamilosalazarrestrepo" className="text-white hover:text-gray-900" aria-label="GitHub">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/juancamilosalazarrestrepo/" className="text-white hover:text-gray-900" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 50 50" fill="currentColor">
              <path d="M41,4H9C6.21,4,4,6.24,4,9v32c0,2.76,2.21,5,5,5h32c2.76,0,5-2.21,5-5V9C46,6.21,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
            </svg>
          </a>
        </div>
        <div className="containerButtonsMobile">
          <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-[#fff] buttonHoverText text-blue hover:text-slate-100 hover:bg-[#fff] active:bg-[#021B79] active:text-blue-100" href="/contact">
            <span>{t("banner.contact")}</span>
          </a>
          <a style={{ color: "white", border: "1px solid white", borderRadius: "9999px", padding: "7px 20px", textAlign: "center" }} className="buttonHoverText group inline-flex items-center justify-center text-sm font-semibold focus:outline-none hover:bg-white hover:text-[#021B79] active:bg-white active:text-[#021B79]" href="/portafolio">
            <span>{t("banner.portfolio")}</span>
          </a>
        </div>
      </div>

      {/* Desktop Header */}
      <div className={styles.headerDesktop}>
        <Swiper
          className={styles.swiperBannerContainer}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={1}
        >
          {images
            ? images.map((img, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className={styles.sliderContainer}>
                    <LavaBackground />
                    <div className={styles.letfHeaderSection}>
                      <div className="flex flex-col gap-6 items-start">
                        <span className="inline-block px-4 py-1.5 bg-transparent border border-white text-white text-xs font-bold uppercase tracking-widest rounded-full">
                          Fullstack Developer & AI
                        </span>
                        <div className="space-y-3">
                          <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] text-white">
                            Juan Camilo<br />
                            <span className="font-light">Salazar Restrepo</span>
                          </h1>
                          <p className="text-lg lg:text-xl text-white leading-relaxed max-w-xl" style={{ fontWeight: 300 }}>
                            {t("banner.tagline")}
                          </p>
                        </div>
                        <div className="flex flex-row gap-4 mt-2">
                          <a
                            href="/contact"
                            className="flex items-center justify-center gap-2 bg-[#1152d4] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1152d4]/90 transition-all shadow-xl shadow-[#1152d4]/30"
                          >
                            {t("banner.contact")}
                          </a>
                          <a
                            href="/portafolio"
                            className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all"
                          >
                            {t("banner.portfolio")}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Background image */}
                    <Image
                      src={img}
                      width={1920}
                      height={500}
                      className={`w-100 anchoBanner ${styles.heroBgImage}`}
                      placeholder="blur"
                      alt="Banner background"
                    />

                    {/* Imágenes decorativas */}
                    <div>
                      <div className={styles.heroImagesWrapper}>
                        <Image
                          src={laptops}
                          alt="Laptop"
                          width={700}
                          height={700}
                          className={styles.heroLaptop}
                          placeholder="blur"
                        />
                        <Image
                          src={phones}
                          alt="Phones"
                          width={500}
                          height={500}
                          className={styles.heroPhones}
                          placeholder="blur"
                        />
                      </div>
                    </div>

                  </div>
                </SwiperSlide>
              );
            })
            : null}
        </Swiper>
      </div>
    </div>
  );
}

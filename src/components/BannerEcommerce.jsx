import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Image from "next/image";
import smallImage from "../../public/images/jsframe.png";
import laptop from "../../public/images/laptop.png";
import designer from "../../public/images/designer.png"
import phones from "../../public/images/phones.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Roboto } from "next/font/google";

const roboto = Roboto({
    subsets: ["latin"], // Idiomas soportados
    weight: ["400", "700"], // Pesos (opcional)
    style: ["normal", "italic"], // Estilos opcionales
    display: "swap", // Mejora el rendimiento (opcional)
});

// <uniquifier>: Use a unique and descriptive class name

export default function BannersEcommerce({ images }) {
    console.log("images", images);
    return (
        <div>
            <div className="sm:hidden headerMobile">
                <span className="headerTextMobile">Frontend</span>
                <span className="headerTextMobile">Developer.</span>
                <span className="headerSubTextMobile ">Juan Camilo Salazar Restrepo</span>
                <p className="headerParagraphMobile ">Especialista en desarrollo de software
                    impulsemos tus proyectos rumbo al éxito.</p>
                <div className="socialNETSContainer">
                    <a
                        href="https://www.facebook.com/profile.php?id=61557592842009"
                        className="text-white hover:text-gray-900 "
                    >
                        <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="sr-only">Facebook page</span>
                    </a>
                    <a
                        href="https://www.instagram.com/salazarcode14/"
                        className="text-white hover:text-gray-900 "
                    >
                        <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="sr-only">Instagram page</span>
                    </a>
                    <a
                        href="https://www.instagram.com/salazarcode14/"
                        className="text-white hover:text-gray-900 "
                    >
                        <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                        <span className="sr-only">Twitter page</span>
                    </a>
                    <a
                        href="https://github.com/juancamilosalazarrestrepo"
                        className="text-white hover:text-gray-900 "
                    >
                        <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="sr-only">GitHub account</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/juancamilosalazarrestrepo/"
                        className="text-white hover:text-gray-900 "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7"
                            viewBox="0 0 50 50"
                            fill="currentColor"

                        >
                            {" "}
                            <path d="M41,4H9C6.21,4,4,6.24,4,9v32c0,2.76,2.21,5,5,5h32c2.76,0,5-2.21,5-5V9C46,6.21,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
                        </svg>
                        <span className="sr-only">LinkedIn account</span>
                    </a>
                </div>
                <div className="containerButtonsMobile">
                    <a
                        style={{}}
                        className=" group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#fff] buttonHoverText text-blue hover:text-slate-100 hover:bg-[#fff] active:bg-[#021B79] active:text-blue-100 focus-visible:outline-[#021B79]"
                        href="/contact"
                    >
                        <span>Solicita una consulta gratuita</span>
                    </a>
                    <a
                        style={{
                            color: "white", // Texto blanco
                            border: "1px solid white", // Borde blanco de 1px
                            borderRadius: "9999px", // Para que siga siendo redondeado
                            padding: "7px 20px", // Espaciado interno
                            textAlign: "center",
                        }}
                        className="buttonHoverText group inline-flex items-center justify-center text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-white hover:text-[#021B79] active:bg-white active:text-[#021B79] hover:bg-[#fff] focus-visible:outline-white"
                        href="/portafolio"
                    >
                        <span>ver portafolio</span>
                    </a>
                </div>
            </div>

            <div className="max-sm:hidden">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={0}
                    slidesPerView={1}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                /* breakpoints= {{
              768: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 10
              }
            }}*/
                >
                    {images
                        ? images.map((img, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    {" "}
                                    <div
                                        style={{
                                            position: "relative",
                                            width: "100%",
                                            height: "500px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "52%",
                                                left: "43%",
                                                transform: "translate(-50%, -50%)",
                                                width: "900px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                }}
                                            >


                                                <span
                                                    style={{
                                                        fontSize: "60px",
                                                        color: "white",
                                                        fontWeight: "500",
                                                        fontFamily: "Roboto",
                                                        padding: "0px",
                                                        margin: "0px",
                                                        marginBottom: "10px",
                                                        lineHeight: "60px"
                                                    }}
                                                >
                                                    Tecnología que genera <span style={{

                                                        color: "yellow",

                                                    }}>experiencias de compra.</span>
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: "20px",
                                                        color: "white",
                                                        fontWeight: "100",
                                                    }}
                                                >
                                                    Desarrollo y personalización de e-commerce en Shopify para hacer crecer tu <br/> negocio online
                                                </span>
                                            </div>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "20px",

                                                    marginTop: "20px",
                                                }}
                                            >
                                                <a
                                                    style={{}}
                                                    className=" max-sm:hidden group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#0575E6] buttonHoverText text-white hover:text-slate-100 hover:bg-[#fff] active:bg-[#021B79] active:text-blue-100 focus-visible:outline-[#021B79]"
                                                    href="/contact"
                                                >
                                                    <span>Solicita una consulta gratuita</span>
                                                </a>
                                                <a
                                                    style={{
                                                        color: "white", // Texto blanco
                                                        border: "1px solid white", // Borde blanco de 1px
                                                        borderRadius: "9999px", // Para que siga siendo redondeado
                                                        padding: "7px 20px", // Espaciado interno
                                                        textAlign: "center",
                                                    }}
                                                    className="buttonHoverText group inline-flex items-center justify-center text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-white hover:text-[#021B79] active:bg-white active:text-[#021B79] hover:bg-[#fff] focus-visible:outline-white"
                                                    href="/portafolio"
                                                >
                                                    <span>Contacta por whatsapp</span>
                                                </a>
                                            </div>
                                        </div>

                                        <div>
                                            <div
                                                className="imageDesigner"

                                            >
                                                {/* Imagen en el fondo */}
                                                <Image
                                                    src={laptop}
                                                    alt="Laptop"
                                                    width={1000}
                                                    height={1000}
                                                    style={{
                                                        position: "absolute",
                                                        top: 50,
                                                        left: 50,
                                                        zIndex: 1, // Detrás
                                                        scale: "1.2",
                                                    }}
                                                    className="w-100 computer"
                                                    placeholder="blur"
                                                />

                                                {/* Imagen encima */}

                                            </div>
                                        </div>
                                        {/* Texto sobre la imagen */}

                                        {/* Imagen */}
                                        <Image
                                            src={img}
                                            width={1920}
                                            height={500}
                                            className="w-100 anchoBanner"
                                            placeholder="blur"
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                zIndex: -1, // Asegura que esté detrás del texto
                                            }}
                                        />
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

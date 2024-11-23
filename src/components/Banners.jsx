import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Image from "next/image";
import smallImage from "../../public/images/jsframe.webp";
import laptop from "../../public/images/laptop.png";
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

export default function Banners({ images }) {
  console.log("images", images);
  return (
    <div>
      <div className="sm:hidden">
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
                    <Image
                      src={smallImage}
                      height={500}
                      className="w-100"
                      placeholder="blur"
                    />
                  </SwiperSlide>
                );
              })
            : null}
        </Swiper>
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
                      <div>
                        {" "}
                        <span
                          //className="parkinsans-123456"
                          style={{
                            fontSize: "120px",
                            color: "white",
                            fontWeight: "700",
                            position: "absolute",
                            top: "35%",
                            left: "35%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10, // Asegura que esté sobre la imagen
                            //fontFamily: "drugs",
                            /*   fontFamily: roboto.style.fontFamily,
                          fontWeight: "bold",
                          fontStyle: "italic", */
                            fontFamily: "Teko",
                          }}
                        >
                          Juan Camilo
                        </span>
                        <span
                          style={{
                            fontSize: "128px",
                            color: "white",
                            fontWeight: "300",
                            position: "absolute",
                            top: "55%",
                            left: "35%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10, // Asegura que esté sobre la imagen
                            fontFamily: "Teko",
                          }}
                        >
                          Salazar Restrepo
                        </span>
                        <span
                          style={{
                            fontSize: "20px",
                            color: "white",
                            fontWeight: "100",
                            position: "absolute",
                            top: "71%",
                            left: "32.5%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10, // Asegura que esté sobre la imagen
                          }}
                        >
                          Especialista en desarrollo de software , impulsemos
                          tus <br />
                          proyectos rumbo al éxito.
                        </span>
                        <a
                          style={{
                            position: "absolute",
                            top: "83%",
                            left: "25.6%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10, // Asegura que esté sobre la imagen
                          }}
                          className=" max-sm:hidden group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#0575E6] buttonHoverText text-white hover:text-slate-100 hover:bg-[#fff] active:bg-[#021B79] active:text-blue-100 focus-visible:outline-[#021B79]"
                          href="/contact"
                        >
                          <span>Comunícate conmigo</span>
                        </a>
                        <a
                          style={{
                            position: "absolute",
                            top: "83%",
                            left: "33.5%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10, // Asegura que esté sobre la imagen
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

                      <div>
                        <div
                          style={{
                            position: "relative",
                            width: "500px",
                            height: "500px",
                            left: "54%",
                          }}
                        >
                          {/* Imagen en el fondo */}
                          <Image
                            src={laptop}
                            alt="Laptop"
                            width={700}
                            height={700}
                            style={{
                              position: "absolute",
                              top: 50,
                              left: 50,
                              zIndex: 1, // Detrás
                              scale: "1.2",
                            }}
                            className="w-100"
                            placeholder="blur"
                          />

                          {/* Imagen encima */}
                          <Image
                            src={phones}
                            alt="Phones"
                            width={500}
                            height={500}
                            style={{
                              position: "absolute",
                              top: "30%", // Ajusta la posición vertical
                              left: "-25%", // Ajusta la posición horizontal
                              zIndex: 2, // Encima
                              scale: "0.9",
                            }}
                            className="w-100"
                            placeholder="blur"
                          />
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

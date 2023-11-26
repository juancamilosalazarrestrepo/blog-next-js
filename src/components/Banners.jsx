import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Image from "next/image";
import smallImage from "../../public/images/jsframe.webp";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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
                  //sizes="(max-width: 640px) 700px , (min-width:1000px) 1920px"
                  // srcset="../../public/images/eficience.jpg x1 , ../../banner2.webp x2 , ../../banneBlog.webp x3"
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
                <Image
                  src={img}
                  width={1920}
                  height={500}
                  //sizes="(max-width: 640px) 700px , (min-width:1000px) 1920px"
                  // srcset="../../public/images/eficience.jpg x1 , ../../banner2.webp x2 , ../../banneBlog.webp x3"
                  className="w-100"
                  placeholder="blur"
                />
              </SwiperSlide>
            );
          })
        : null}
    </Swiper>
      </div>
    </div>
   
  );
}

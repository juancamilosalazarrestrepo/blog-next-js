import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Banners({ images }) {
  console.log("images", images);
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {images
        ? images.map((img, index) => {
            return (
              <SwiperSlide key={index}>
                {" "}
                <Image src={img} width={1920} height={500} placeholder="blur" />
              </SwiperSlide>
            );
          })
        : null}
      ...
    </Swiper>
  );
}

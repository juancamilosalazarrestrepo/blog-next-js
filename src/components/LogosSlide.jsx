import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import awsLogo from "../../public/images/logos/awsLogo.webp";
import reactLogo from "../../public/images/logos/reactLogo.webp";
import nodeLogo from "../../public/images/logos/nodeLogo.webp";
import expressLogo from "../../public/images/logos/expressLogo.webp";
import vercelLogo from "../../public/images/logos/vercelLogo.webp";
import nextJsLogo from "../../public/images/logos/nextJsLogo.webp";
import reactNativeLogo from "../../public/images/logos/reactNativeLogo.webp";
import sqlServerLogo from "../../public/images/logos/sqlServeLogo.webp";
import angulaLogo from "../../public/images/logos/angular.webp";
import dotNetLogo from "../../public/images/logos/netlogo.webp";
import azureLogo from "../../public/images/logos/azureLogo.webp";

import "swiper/css";

export default function LogosSlider() {
  const images = [
    awsLogo, reactLogo, expressLogo, nodeLogo, vercelLogo,
    nextJsLogo, reactNativeLogo, sqlServerLogo, angulaLogo,
    dotNetLogo, azureLogo,
  ];

  return (
    <div className="logoSliderContainer">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img}
              height={500}
              className="w-100"
              placeholder="blur"
              alt={`Technology logo ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

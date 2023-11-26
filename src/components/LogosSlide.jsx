import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Image from "next/image";
import smallImage from "../../public/images/jsframe.webp";
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

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function LogosSlider() {
  let images =[awsLogo,reactLogo,expressLogo,nodeLogo,vercelLogo,nextJsLogo,reactNativeLogo,sqlServerLogo,angulaLogo,dotNetLogo,azureLogo]
  return (
    <div className="logoSliderContainer">
      <div className="sm:hidden">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={3}
          loop={true}
          
       
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
          spaceBetween={1}
          slidesPerView={4}
          loop={true}
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
                    isDuplicate={true}
                      src={img}
                 
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

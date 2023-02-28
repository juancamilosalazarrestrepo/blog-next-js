import Image from "next/image";

import banner1 from "../../public/images/banneBlog.webp";
import banner2 from "../../public/images/banner2.webp";
import { useState } from "react";

const images = [banner1, banner2];
//const [bannerImg, setBannerImg] = useState("banner1");

/*const changeImage = () => {
  setBannerImg(banner2);
};*/

export default function MainSlider() {
  let bannerSelected;

  return (
    <div className="w-full">
      <Image src={banner1} width={1920} height={500} placeholder="blur" />
      {/*<button onClick={changeImage}>cambiar image</>*/}
    </div>
  );
}

import * as React from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banners from "../../components/Banners";
import banner1 from "../../../public/images/banneBlog.webp";
import banner2 from "../../../public/images/banner2.webp";
import calculatorDark from "../../../public/images/calculadoradark.webp";
import cloneChatgpt from "../../../public/images/cloneChatGPT.webp";
import LogosSlider from "../../components/LogosSlide";
import certificados from "../../../data/certificados/certificados";
import Camilo from "../../../public/images/camilo1992.webp";
import ContactForm from "../../components/contactForm";
import contacStyles from "./contact.module.css";
import phoneIcon from "../../../public/images/phoneIcon.png";
import emailIcon from "../../../public/images/emailIcon.png";
import facebookIcon from "../../../public/images/facebook.png";
import instagramIcon from "../../../public/images/instagram.png";
import spotifyIcon from "../../../public/images/spotify.png";
import youtubeIcon from "../../../public/images/youtube.png";
import linkedinIcon from "../../../public/images/linkedin.png";
import tiktokIcon from "../../../public/images/tiktok.png";
import githubIcon from "../../../public/images/github.png";
import behanceIcon from "../../../public/images/behance.png";

const Contact = () => {
  const images = [banner1, banner2];

  return (
    <div className={contacStyles.backgroundContainer}>
      <main className={`container mt-1 ${contacStyles.mainSectionContact}`}>
        <div className={contacStyles.containerContact}>
          <div className={contacStyles.containerContactInfo}>
            <span className={contacStyles.contactFormTitle}>Contactame</span>
            <div className={contacStyles.textContactInfo}>
              "Mi nombre es Camilo y estoy entusiasmado por la oportunidad de
              colaborar contigo. Con mi experiencia y conocimientos, estoy listo
              para contribuir de manera significativa a tu proyecto, para hacer
              realidad tu visión y llevarlo al siguiente nivel."
            </div>
            <div className={contacStyles.infoListInfo}>
              <div className={contacStyles.infoItem}>
                <Image
                  src={emailIcon}
                  width={16}
                  height={16}
                  style={{ objectFit: "contain", marginRight: "15px" }}
                />
                juancamilosalazarrestrepo@gmail.com
              </div>
              <div className={contacStyles.infoItem}>
                <Image
                  src={phoneIcon}
                  width={16}
                  height={16}
                  style={{ objectFit: "contain", marginRight: "15px" }}
                />
                +57 3042093951
              </div>

              <div className={contacStyles.socialIconsContainer}>
                <Image
                  src={facebookIcon}
                  width={24}
                  height={24}
                  style={{ objectFit: "contain", marginRight: "15px" }}
                />
                <Image
                  src={instagramIcon}
                  width={24}
                  height={24}
                  style={{ objectFit: "contain", marginRight: "15px" }}
                />
                <Image
                  src={linkedinIcon}
                  width={24}
                  height={24}
                  style={{ objectFit: "contain", marginRight: "15px" }}
                />
                {/*   <Image
                  src={spotifyIcon}
                  width={24}
                  height={24}
                  style={{ objectFit: "contain", marginRight: "15px" }}
                /> */}
                <Image
                  src={youtubeIcon}
                  width={24}
                  height={24}
                  style={{ objectFit: "contain", marginRight: "15px" }}
                />
                {/*   <Image
                  src={tiktokIcon}
                  width={24}
                  height={24}
                  style={{ objectFit: "contain", marginRight: "15px" }}
                /> */}
                <Image
                  src={behanceIcon}
                  width={24}
                  height={24}
                  style={{ objectFit: "contain", marginRight: "15px" }}
                />
                <Image
                  src={githubIcon}
                  width={24}
                  height={24}
                  style={{ objectFit: "contain", marginRight: "15px" }}
                />
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col items-center justify-center ${contacStyles.containerFormContact} `}
          >
            <h1 className={contacStyles.contactFormTitle}>
              Enviame un mensaje
            </h1>
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: { certificados },
  };
};

export default function BlogTemplate({ certificados }) {
  return (
    <Layout>
      <Contact />
      <div className=" mt-20 mb-20 mt-20">
        <LogosSlider />
      </div>
    </Layout>
  );
}

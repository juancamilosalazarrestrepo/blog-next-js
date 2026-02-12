import Image from "next/image";
import Layout from "../../components/Layout";
import LogosSlider from "../../components/LogosSlide";
import ContactForm from "../../components/contactForm";
import contacStyles from "./contact.module.css";
import phoneIcon from "../../../public/images/phoneIcon.png";
import emailIcon from "../../../public/images/emailIcon.png";
import facebookIcon from "../../../public/images/facebook.png";
import instagramIcon from "../../../public/images/instagram.png";
import youtubeIcon from "../../../public/images/youtube.png";
import linkedinIcon from "../../../public/images/linkedin.png";
import behanceIcon from "../../../public/images/behance.png";
import githubIcon from "../../../public/images/github.png";

const Contact = () => {
  return (
    <div className={contacStyles.backgroundContainer}>
      <main className={`container mt-1 ${contacStyles.mainSectionContact}`}>
        <div className={contacStyles.containerContact}>
          <div className={contacStyles.containerContactInfo}>
            <span className={contacStyles.contactCard}>Contáctame</span>
            <div className={contacStyles.textContactInfo}>
              Mi nombre es Camilo y estoy entusiasmado por la oportunidad de
              colaborar contigo. Con mi experiencia y conocimientos, estoy listo
              para contribuir de manera significativa a tu proyecto.
            </div>
            <div className={contacStyles.infoListInfo}>
              <div className={contacStyles.infoItem}>
                <Image
                  src={emailIcon}
                  width={16}
                  height={16}
                  alt="Email"
                  style={{ objectFit: "contain", marginRight: "15px" }}
                />
                juancamilosalazarrestrepo@gmail.com
              </div>
              <div className={contacStyles.infoItem}>
                <Image
                  src={phoneIcon}
                  width={16}
                  height={16}
                  alt="Teléfono"
                  style={{ objectFit: "contain", marginRight: "15px" }}
                />
                +57 3042093951
              </div>

              <div className={contacStyles.socialIconsContainer}>
                <a href="https://www.facebook.com/profile.php?id=61557592842009" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Image className={contacStyles.socialIcon} src={facebookIcon} width={24} height={24} alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/salazarcode14/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Image className={contacStyles.socialIcon} src={instagramIcon} width={24} height={24} alt="Instagram" />
                </a>
                <a href="https://www.linkedin.com/in/juancamilosalazarrestrepo/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Image className={contacStyles.socialIcon} src={linkedinIcon} width={24} height={24} alt="LinkedIn" />
                </a>
                <a href="https://www.youtube.com/@SalazarCode" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Image className={contacStyles.socialIcon} src={youtubeIcon} width={24} height={24} alt="YouTube" />
                </a>
                <a href="https://www.behance.net/Mediaproducciones" target="_blank" rel="noopener noreferrer" aria-label="Behance">
                  <Image className={contacStyles.socialIcon} src={behanceIcon} width={24} height={24} alt="Behance" />
                </a>
                <a href="https://github.com/juancamilosalazarrestrepo" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Image className={contacStyles.socialIcon} src={githubIcon} width={24} height={24} alt="GitHub" />
                </a>
              </div>
            </div>
          </div>
          <div className={`flex flex-col items-center justify-center ${contacStyles.containerFormContact}`}>
            <h1 className={contacStyles.contactFormTitle}>
              Envíame un mensaje
            </h1>
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default function ContactTemplate() {
  return (
    <Layout>
      <Contact />
      <div className="mt-20 mb-20">
        <LogosSlider />
      </div>
    </Layout>
  );
}

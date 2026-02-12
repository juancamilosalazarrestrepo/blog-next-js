import styles from "../styles/VideoCard.module.css";
import userImage from "../../public/images/camiloPaginaWeb.webp";
import Image from "next/image";

// Importa los estilos como módulo

const VideoCardComponent = () => {


    return (
        <div className={styles.componentContainer}>
            <div className={styles.card}>
                <div className={styles.box}>
                    <div className={styles.imgBx}>
                        <video
                            className={styles.coverVideo}
                            autoPlay
                            muted
                            loop

                            controls={false}
                        >
                            <source src="/images/cover.mp4" type="video/mp4" />
                            Tu navegador no soporta la etiqueta <code>video</code>.
                        </video>
                    </div>
                </div>
                <div className={styles.box}>

                    <div className={styles.content}>
                        <h2>Juan Salazar<br /><span>Fullstack Developer</span></h2>
                        <ul>
                            <li>Posts<span>62</span> </li>
                            <li>Followers <span>1501</span> </li>
                            <li>Following<span>98</span> </li>
                        </ul>
                        <button>Contactar</button>
                    </div>
                </div>
                <div className={styles.circle}>
                    <div className={styles.imgBx}>
                        <Image
                            className={styles.userImage}
                            src={userImage}
                            alt="User Image"
                            width={500}
                            height={500}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCardComponent;

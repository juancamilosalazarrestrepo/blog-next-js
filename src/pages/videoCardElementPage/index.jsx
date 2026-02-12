import { useState } from "react";
import Layout from "../../components/Layout";
import VideoCardComponent from "../../components/VideoCardComponent";
import styles from "../../styles/CodeViewer.module.css";

const jsxCode = `import styles from "../styles/VideoCard.module.css";
import userImage from "../../public/images/camiloPaginaWeb.webp";
import Image from "next/image";

const VideoCardComponent = () => {
    return (
        <div className={styles.componentContainer}>
            <video
                className={styles.backgroundVideo}
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/images/cover.mp4" type="video/mp4" />
            </video>
            <div className={styles.backgroundOverlay}></div>
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

export default VideoCardComponent;`;

const cssCode = `.componentContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #021E73;
}

.card {
  position: relative;
  width: 320px;
  height: 430px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card .box {
  position: relative;
  width: 110%;
  height: 200px;
  background: #f00;
  border-radius: 15px;
}

/* Efecto de recorte sólido original */
.card .box:nth-child(1)::before {
  content: ' ';
  position: absolute;
  top: 105px;
  left: -1px;
  width: 20px;
  height: 20px;
  background: transparent;
  z-index: 2;
  border-bottom-left-radius: 20px;
  box-shadow: -6px 6px #021E73;
}

.card .box:nth-child(2) {
  background: #fff;
  height: 220px;
  width: 100%;
}

.card .circle {
  position: absolute;
  width: 180px;
  height: 180px;
  top: 50%;
  left: -70px;
  transform: translateY(-50%);
  background: transparent;
  border-radius: 50%;
  border: 10px solid #021E73;
}

.card .box .content button {
  position: relative;
  top: 65px;
  padding: 8px 30px;
  border: none;
  outline: none;
  background: #03a9f4;
  border-radius: 30px;
  color: #fff;
  font-size: 1em;
  letter-spacing: 0.2em;
  font-weight: 500;
  cursor: pointer;
  border: 4px solid #021E73;
  box-shadow: 0 0 0 8px #fff;
  transition: 0.5s;
}
/* ... resto de estilos ... */`;

const VideoCardElementPage = () => {
  const [activeTab, setActiveTab] = useState("jsx");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = activeTab === "jsx" ? jsxCode : cssCode;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="">
      <main>
        <div className="w-full">
          <VideoCardComponent />
        </div>

        <section className={styles.container}>
          <h2 className={styles.title}>Implementación del Componente</h2>
          <div className={styles.viewerWrapper}>
            <div className={styles.header}>
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${activeTab === "jsx" ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab("jsx")}
                >
                  VideoCardComponent.jsx
                </button>
                <button
                  className={`${styles.tab} ${activeTab === "css" ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab("css")}
                >
                  VideoCard.module.css
                </button>
              </div>
              <button
                className={`${styles.copyButton} ${copied ? styles.copySuccess : ""}`}
                onClick={handleCopy}
              >
                {copied ? "¡Copiado!" : "Copiar código"}
              </button>
            </div>
            <div className={styles.codeArea}>
              <pre>
                <code>{activeTab === "jsx" ? jsxCode : cssCode}</code>
              </pre>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default function BlogTemplate() {
  return (
    <Layout>
      <VideoCardElementPage />
    </Layout>
  );
}

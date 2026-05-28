import React from "react";
import styles from "../styles/AIBanner.module.css";
import Image from "next/image";
import Link from "next/link";

const AIBanner = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Consultorías AI para empresas — Estrategia y entrega rápida</h1>
          <p className={styles.subtitle}>Aceleramos tu producto con modelos personalizados, automatización y despliegue. Sesión inicial gratuita.</p>
          <div className={styles.ctaRow}>
            <Link href="/contact" className={styles.ctaButton}>
              Solicitar consultoría
            </Link>
            <Link href="#contact" className={styles.ctaGhost}>
              Contactar ahora
            </Link>
          </div>
        </div>
        <div className={styles.imageWrap} aria-hidden="true">
          <Image src="/images/rpa-imagen.webp" alt="Ilustración RPA / Inteligencia Artificial" width={520} height={360} />
        </div>
      </div>
    </section>
  );
};

export default AIBanner;

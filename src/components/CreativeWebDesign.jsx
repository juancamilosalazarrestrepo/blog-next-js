import React, { useEffect, useRef } from 'react';
import styles from '../styles/CreativeWebDesign.module.css';

const CreativeWebDesign = () => {
    const interactiveBlobRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const interactiveBlob = interactiveBlobRef.current;
        const container = containerRef.current;
        
        if (!interactiveBlob || !container) return;

        let currentX = container.offsetWidth / 2;
        let currentY = container.offsetHeight / 2;
        let targetX = currentX;
        let targetY = currentY;
        let animationFrameId;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            // Calculate mouse position relative to the container
            targetX = e.clientX - rect.left;
            targetY = e.clientY - rect.top;
        };

        // Escucha el evento mousemove en toda la ventana, pero restringe las coordenadas al contenedor
        // o mejor aún, escucha en el contenedor para que solo se mueva cuando pasas el mouse por encima.
        window.addEventListener('mousemove', handleMouseMove);

        const animateMouseBlob = () => {
            currentX += (targetX - currentX) * 0.12;
            currentY += (targetY - currentY) * 0.12;

            if (interactiveBlob) {
                interactiveBlob.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
            
            animationFrameId = requestAnimationFrame(animateMouseBlob);
        };

        animateMouseBlob();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className={styles.bannerContainer} ref={containerRef}>
            <div className={styles.lavaWrapper}>
                <div className={`${styles.blob} ${styles.blobPurple}`}></div>
                <div className={`${styles.blob} ${styles.blobPink}`}></div>
                <div className={`${styles.blob} ${styles.blobBlue}`}></div>
                <div className={`${styles.blob} ${styles.blobYellow}`}></div>
                <div className={`${styles.blob} ${styles.blobOrange}`}></div>
                <div className={`${styles.blob} ${styles.blobLime}`}></div>
                <div className={`${styles.blob} ${styles.blobCyan}`}></div>
                <div className={`${styles.blob} ${styles.blobTeal}`}></div>
                <div className={`${styles.blob} ${styles.blobIndigo}`}></div>
                <div className={`${styles.blob} ${styles.blobRose}`}></div>
                
                <div className={`${styles.blob} ${styles.blobInteractive}`} ref={interactiveBlobRef}></div>
            </div>

            <div className={styles.content}>
                <div className={styles.icon}>✨</div>
                <div className={styles.badge}>Diseño Web Creativo</div>
                <h2 className={styles.title}>Impacto Visual y Experiencias Únicas</h2>
                <p className={styles.subtitle}>
                    Transformamos ideas en interfaces asombrosas. Desarrollamos sitios web con diseños vibrantes, micro-interacciones fluidas y estética de vanguardia para destacar tu marca.
                </p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                <defs>
                    <filter id="vibrant-goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="45" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
                    </filter>
                </defs>
            </svg>
        </section>
    );
};

export default CreativeWebDesign;

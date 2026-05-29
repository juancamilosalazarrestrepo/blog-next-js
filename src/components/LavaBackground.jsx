import React, { useEffect, useRef } from 'react';
import styles from '../styles/LavaBackgroundBlue.module.css';

const LavaBackground = () => {
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
            targetX = e.clientX - rect.left;
            targetY = e.clientY - rect.top;
        };

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
        <div className={styles.lavaWrapper} ref={containerRef}>
            <div className={`${styles.blob} ${styles.blobDeepBlue}`}></div>
            <div className={`${styles.blob} ${styles.blobMidBlue}`}></div>
            <div className={`${styles.blob} ${styles.blobLightBlue}`}></div>
            <div className={`${styles.blob} ${styles.blobGrad1}`}></div>
            <div className={`${styles.blob} ${styles.blobGrad2}`}></div>
            <div className={`${styles.blob} ${styles.blobGrad3}`}></div>
            <div className={`${styles.blob} ${styles.blobGrad4}`}></div>
            <div className={`${styles.blob} ${styles.blobGrad5}`}></div>
            <div className={`${styles.blob} ${styles.blobGrad6}`}></div>
            
            <div className={`${styles.blob} ${styles.blobInteractive}`} ref={interactiveBlobRef}></div>

            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                <defs>
                    <filter id="blue-goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 38 -17" result="goo" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default LavaBackground;

import React, { useEffect, useRef } from 'react';
import styles from '../styles/AuroraBackground.module.css';

const BANDS = [
    { color: [80, 250, 123],  speed: 0.00035, amp: 70,  phase: 0,    yFrac: 0.38, thick: 190 },
    { color: [139, 233, 253], speed: 0.00050, amp: 55,  phase: 1.8,  yFrac: 0.30, thick: 150 },
    { color: [189, 147, 249], speed: 0.00028, amp: 80,  phase: 3.2,  yFrac: 0.45, thick: 170 },
    { color: [255, 121, 198], speed: 0.00060, amp: 45,  phase: 0.9,  yFrac: 0.22, thick: 120 },
    { color: [0,   180, 216], speed: 0.00042, amp: 90,  phase: 2.5,  yFrac: 0.52, thick: 200 },
    { color: [100, 255, 180], speed: 0.00020, amp: 60,  phase: 4.1,  yFrac: 0.15, thick: 140 },
];

const AuroraBackground = () => {
    const canvasRef    = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas    = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        let animId;
        let startTime = performance.now();

        const resize = () => {
            canvas.width  = container.offsetWidth;
            canvas.height = container.offsetHeight;
            drawStars();
        };

        const stars = [];
        const drawStars = () => {
            stars.length = 0;
            const count = Math.floor((canvas.width * canvas.height) / 4000);
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: Math.random() * 1.2 + 0.2,
                    a: Math.random() * 0.7 + 0.3,
                });
            }
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(container);

        const frame = (now) => {
            const t = (now - startTime) * 0.001;
            const W = canvas.width;
            const H = canvas.height;

            ctx.clearRect(0, 0, W, H);

            // Stars
            stars.forEach(s => {
                ctx.save();
                ctx.globalAlpha = s.a;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.fill();
                ctx.restore();
            });

            // Aurora bands
            const STEPS = 120;
            BANDS.forEach(band => {
                const [r, g, b] = band.color;
                const yBase = H * band.yFrac;

                ctx.save();
                ctx.globalCompositeOperation = 'screen';

                const path = new Path2D();
                for (let i = 0; i <= STEPS; i++) {
                    const x = (i / STEPS) * W;
                    const nx = x * 0.004;
                    const y = yBase
                        + Math.sin(nx + t * band.speed * 1200 + band.phase) * band.amp
                        + Math.sin(nx * 2.1 + t * band.speed * 700)         * band.amp * 0.4
                        + Math.cos(nx * 0.7 + t * band.speed * 900 + 1)     * band.amp * 0.25;
                    if (i === 0) path.moveTo(x, y);
                    else path.lineTo(x, y);
                }
                for (let i = STEPS; i >= 0; i--) {
                    const x = (i / STEPS) * W;
                    const nx = x * 0.004;
                    const yBot = yBase + band.thick
                        + Math.sin(nx + t * band.speed * 1200 + band.phase + 0.5) * band.amp * 0.55;
                    path.lineTo(x, yBot);
                }
                path.closePath();

                const grad = ctx.createLinearGradient(0, yBase - band.amp, 0, yBase + band.thick + band.amp);
                grad.addColorStop(0,    `rgba(${r},${g},${b},0)`);
                grad.addColorStop(0.25, `rgba(${r},${g},${b},0.18)`);
                grad.addColorStop(0.5,  `rgba(${r},${g},${b},0.32)`);
                grad.addColorStop(0.75, `rgba(${r},${g},${b},0.14)`);
                grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);

                ctx.fillStyle = grad;
                ctx.fill(path);
                ctx.restore();
            });

            animId = requestAnimationFrame(frame);
        };

        animId = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
        };
    }, []);

    return (
        <div className={styles.wrapper} ref={containerRef}>
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
};

export default AuroraBackground;

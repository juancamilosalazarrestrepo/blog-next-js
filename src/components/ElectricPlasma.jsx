import React, { useEffect, useRef } from 'react';
import styles from '../styles/ElectricPlasma.module.css';

const BOLT_COLORS = ['#00f5ff', '#7b68ee', '#ffffff', '#bf5fff', '#00bfff'];

function midpointDisplace(ctx, x1, y1, x2, y2, disp, alpha, color) {
    if (disp < 1.5) {
        ctx.save();
        ctx.globalAlpha    = Math.max(0, alpha);
        ctx.strokeStyle    = color;
        ctx.lineWidth      = Math.max(0.2, disp * 0.35);
        ctx.shadowColor    = color;
        ctx.shadowBlur     = 8;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
        return;
    }
    const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * disp;
    const my = (y1 + y2) / 2 + (Math.random() - 0.5) * disp;
    midpointDisplace(ctx, x1, y1, mx, my, disp / 2, alpha, color);
    midpointDisplace(ctx, mx, my, x2, y2, disp / 2, alpha, color);
    if (Math.random() < 0.28) {
        const bx = mx + (Math.random() - 0.5) * disp * 1.4;
        const by = my + disp * (Math.random() * 0.7 + 0.4);
        midpointDisplace(ctx, mx, my, bx, by, disp / 2.5, alpha * 0.55, color);
    }
}

const ElectricPlasma = () => {
    const canvasRef    = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas    = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        let animId;
        let tick     = 0;
        const mouse  = { x: null, y: null };
        const bolts  = [];

        const resize = () => {
            canvas.width  = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(container);

        const spawnBolt = () => {
            const W = canvas.width;
            const H = canvas.height;
            let x1, y1, x2, y2;

            if (mouse.x !== null && Math.random() < 0.45) {
                x1 = mouse.x + (Math.random() - 0.5) * 40;
                y1 = mouse.y + (Math.random() - 0.5) * 40;
            } else {
                x1 = Math.random() * W;
                y1 = Math.random() * H * 0.4;
            }
            x2 = x1 + (Math.random() - 0.5) * W * 0.6;
            y2 = y1 + Math.random() * H * 0.55 + 80;
            x2 = Math.max(0, Math.min(W, x2));
            y2 = Math.max(0, Math.min(H, y2));

            bolts.push({
                x1, y1, x2, y2,
                disp:  Math.min(W, H) * 0.22,
                color: BOLT_COLORS[Math.floor(Math.random() * BOLT_COLORS.length)],
                alpha: 0.9,
                born:  tick,
            });
        };

        const frame = () => {
            tick++;
            const W = canvas.width;
            const H = canvas.height;

            ctx.fillStyle = 'rgba(0,0,8,0.22)';
            ctx.fillRect(0, 0, W, H);

            if (tick % 8 === 0) spawnBolt();
            if (tick % 18 === 0) spawnBolt();

            for (let i = bolts.length - 1; i >= 0; i--) {
                const b = bolts[i];
                b.alpha -= 0.028;
                if (b.alpha <= 0) { bolts.splice(i, 1); continue; }
                midpointDisplace(ctx, b.x1, b.y1, b.x2, b.y2, b.disp, b.alpha, b.color);
            }

            animId = requestAnimationFrame(frame);
        };

        ctx.fillStyle = '#000008';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        frame();

        const onMove  = (e) => { const r = container.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
        const onLeave = () => { mouse.x = null; mouse.y = null; };
        const onClick = (e) => { const r = container.getBoundingClientRect(); const x = e.clientX - r.left; const y = e.clientY - r.top; for (let i = 0; i < 4; i++) { const b = { x1: x, y1: y, x2: x + (Math.random()-0.5)*canvas.width*0.7, y2: y + Math.random()*canvas.height*0.5 + 60, disp: Math.min(canvas.width, canvas.height)*0.25, color: BOLT_COLORS[Math.floor(Math.random()*BOLT_COLORS.length)], alpha: 1, born: tick }; bolts.push(b); } };

        container.addEventListener('mousemove', onMove);
        container.addEventListener('mouseleave', onLeave);
        container.addEventListener('click', onClick);

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
            container.removeEventListener('mousemove', onMove);
            container.removeEventListener('mouseleave', onLeave);
            container.removeEventListener('click', onClick);
        };
    }, []);

    return (
        <div className={styles.wrapper} ref={containerRef}>
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
};

export default ElectricPlasma;

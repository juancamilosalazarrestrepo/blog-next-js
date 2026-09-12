import React, { useEffect, useRef } from 'react';
import styles from '../styles/InkDrop.module.css';

const PALETTE = [
    'rgba(29,53,87,0.65)',
    'rgba(120,40,120,0.60)',
    'rgba(20,90,120,0.60)',
    'rgba(180,30,60,0.55)',
    'rgba(40,120,80,0.55)',
    'rgba(80,20,140,0.60)',
    'rgba(160,80,20,0.55)',
];

class Drop {
    constructor(x, y) {
        this.x        = x;
        this.y        = y;
        this.r        = Math.random() * 4 + 2;
        this.maxR     = Math.random() * 100 + 50;
        this.grow     = Math.random() * 1.8 + 0.8;
        this.color    = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        this.opacity  = 0.85;
        this.alive    = true;
        this.ripples  = [];
        for (let i = 0; i < 3; i++) {
            this.ripples.push({
                r: 0, maxR: this.maxR * (0.4 + i * 0.3),
                grow: this.grow * 0.6, opacity: 0.3 - i * 0.08
            });
        }
    }
    update() {
        if (this.r < this.maxR) {
            this.r    += this.grow;
            this.grow *= 0.978;
        } else {
            this.opacity -= 0.004;
        }
        this.ripples.forEach(rp => {
            if (rp.r < rp.maxR) { rp.r += rp.grow; rp.grow *= 0.97; }
            else rp.opacity -= 0.006;
        });
        if (this.opacity <= 0) this.alive = false;
    }
    draw(ctx) {
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';

        // Ripples
        this.ripples.forEach(rp => {
            if (rp.opacity <= 0 || rp.r <= 0) return;
            ctx.save();
            ctx.globalAlpha = Math.max(0, rp.opacity);
            ctx.beginPath();
            ctx.arc(this.x, this.y, rp.r, 0, Math.PI * 2);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 1.2;
            ctx.stroke();
            ctx.restore();
        });

        // Main drop
        ctx.globalAlpha = Math.max(0, this.opacity);
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grad.addColorStop(0,   this.color);
        grad.addColorStop(0.6, this.color);
        grad.addColorStop(1,   this.color.replace(/[\d.]+\)$/, '0)'));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
    }
}

const InkDrop = () => {
    const canvasRef    = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas    = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        let animId;
        const drops = [];
        let lastSpawn = 0;
        let lastPos   = null;

        const resize = () => {
            const prev = ctx.getImageData(0, 0, canvas.width, canvas.height);
            canvas.width  = container.offsetWidth;
            canvas.height = container.offsetHeight;
            fillBg();
            try { ctx.putImageData(prev, 0, 0); } catch (_) {}
        };

        const fillBg = () => {
            ctx.fillStyle = '#faf8f5';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        resize();
        fillBg();

        const ro = new ResizeObserver(resize);
        ro.observe(container);

        const frame = (now) => {
            for (let i = drops.length - 1; i >= 0; i--) {
                drops[i].update();
                drops[i].draw(ctx);
                if (!drops[i].alive) drops.splice(i, 1);
            }
            animId = requestAnimationFrame(frame);
        };
        animId = requestAnimationFrame(frame);

        const spawnDrop = (x, y) => {
            drops.push(new Drop(x, y));
            if (drops.length > 60) drops.splice(0, drops.length - 60);
        };

        const onMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const now = performance.now();
            if (now - lastSpawn > 60 && (!lastPos || Math.hypot(x - lastPos.x, y - lastPos.y) > 12)) {
                spawnDrop(x, y);
                lastSpawn = now;
                lastPos   = { x, y };
            }
        };

        const onClick = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            for (let i = 0; i < 4; i++) spawnDrop(x + (Math.random()-0.5)*30, y + (Math.random()-0.5)*30);
        };

        container.addEventListener('mousemove', onMove);
        container.addEventListener('click',     onClick);

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
            container.removeEventListener('mousemove', onMove);
            container.removeEventListener('click',     onClick);
        };
    }, []);

    return (
        <div className={styles.wrapper} ref={containerRef}>
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
};

export default InkDrop;

import React, { useEffect, useRef } from 'react';
import styles from '../styles/Fireflies.module.css';

const COLORS = ['#fef08a', '#bef264', '#f0fdf4', '#fde68a', '#d9f99d', '#ffffff'];
const COUNT  = 90;

class Firefly {
    constructor(W, H) {
        this.W  = W;
        this.H  = H;
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.r  = Math.random() * 1.6 + 0.6;
        this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.angle  = Math.random() * Math.PI * 2;
        this.speed  = Math.random() * 0.35 + 0.08;
        this.angV   = (Math.random() - 0.5) * 0.06;
        this.pulse  = Math.random() * Math.PI * 2;
        this.pSpeed = Math.random() * 0.045 + 0.018;
        this.glowR  = this.r * (Math.random() * 5 + 4);
        this.trail  = [];
        this.maxTrail = Math.floor(Math.random() * 8 + 4);
    }
    update(mouse) {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrail) this.trail.shift();

        this.angV += (Math.random() - 0.5) * 0.012;
        this.angV  = Math.max(-0.08, Math.min(0.08, this.angV));
        this.angle += this.angV;

        if (mouse.x !== null) {
            const dx   = this.x - mouse.x;
            const dy   = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90 && dist > 0) {
                const force = (90 - dist) / 90;
                this.x += (dx / dist) * force * 2.5;
                this.y += (dy / dist) * force * 2.5;
            }
        }

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x < 0)       { this.x = 0;       this.angle = Math.PI - this.angle; }
        if (this.x > this.W)  { this.x = this.W;   this.angle = Math.PI - this.angle; }
        if (this.y < 0)       { this.y = 0;         this.angle = -this.angle; }
        if (this.y > this.H)  { this.y = this.H;    this.angle = -this.angle; }

        this.pulse += this.pSpeed;
        this.opacity = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(this.pulse));
    }
    draw(ctx) {
        // Trail
        if (this.trail.length > 1) {
            for (let i = 1; i < this.trail.length; i++) {
                const t   = i / this.trail.length;
                const prev = this.trail[i - 1];
                const cur  = this.trail[i];
                ctx.save();
                ctx.globalAlpha = t * this.opacity * 0.25;
                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y);
                ctx.lineTo(cur.x, cur.y);
                ctx.strokeStyle = this.color;
                ctx.lineWidth   = this.r * t;
                ctx.stroke();
                ctx.restore();
            }
        }

        // Glow
        ctx.save();
        ctx.globalAlpha = this.opacity * 0.22;
        const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glowR);
        glow.addColorStop(0,   this.color);
        glow.addColorStop(0.5, this.color + '88');
        glow.addColorStop(1,   'transparent');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glowR, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        ctx.restore();

        // Core
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur  = 6;
        ctx.fill();
        ctx.restore();
    }
}

const Fireflies = () => {
    const canvasRef    = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas    = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx   = canvas.getContext('2d');
        let animId;
        const mouse = { x: null, y: null };
        let flies   = [];

        const resize = () => {
            canvas.width  = container.offsetWidth;
            canvas.height = container.offsetHeight;
            flies = Array.from({ length: COUNT }, () => new Firefly(canvas.width, canvas.height));
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(container);

        const frame = () => {
            const W = canvas.width;
            const H = canvas.height;
            ctx.fillStyle = 'rgba(1,10,5,0.18)';
            ctx.fillRect(0, 0, W, H);
            flies.forEach(f => { f.W = W; f.H = H; f.update(mouse); f.draw(ctx); });
            animId = requestAnimationFrame(frame);
        };

        ctx.fillStyle = '#010a05';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        frame();

        const onMove  = (e) => { const r = container.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
        const onLeave = () => { mouse.x = null; mouse.y = null; };
        container.addEventListener('mousemove',  onMove);
        container.addEventListener('mouseleave', onLeave);

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
            container.removeEventListener('mousemove',  onMove);
            container.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return (
        <div className={styles.wrapper} ref={containerRef}>
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
};

export default Fireflies;

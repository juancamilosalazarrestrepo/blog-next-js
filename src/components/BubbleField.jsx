import React, { useEffect, useRef } from 'react';
import styles from '../styles/BubbleField.module.css';

const COLORS = [
    ['rgba(125,211,252,0.55)', 'rgba(125,211,252,0)'],
    ['rgba(167,139,250,0.55)', 'rgba(167,139,250,0)'],
    ['rgba(52,211,153,0.50)', 'rgba(52,211,153,0)'],
    ['rgba(244,114,182,0.50)', 'rgba(244,114,182,0)'],
    ['rgba(251,191,36,0.50)',  'rgba(251,191,36,0)'],
    ['rgba(99,102,241,0.50)',  'rgba(99,102,241,0)'],
    ['rgba(45,212,191,0.50)',  'rgba(45,212,191,0)'],
];

class Bubble {
    constructor(canvas) {
        this.canvas = canvas;
        this.spawn();
    }
    spawn() {
        this.r      = Math.random() * 38 + 12;
        this.x      = Math.random() * this.canvas.width;
        this.y      = this.canvas.height + this.r + Math.random() * 200;
        this.vy     = -(Math.random() * 0.55 + 0.25);
        this.wobble = Math.random() * Math.PI * 2;
        this.wSpeed = Math.random() * 0.022 + 0.008;
        this.wAmp   = Math.random() * 1.8 + 0.6;
        this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.opacity    = 0;
        this.fadeIn = true;
        this.popping    = false;
        this.popScale   = 1;
        this.alive      = true;
    }
    update(mouse) {
        if (this.popping) {
            this.popScale += 0.09;
            this.opacity  -= 0.055;
            if (this.opacity <= 0) this.alive = false;
            return;
        }
        if (this.fadeIn && this.opacity < 1) this.opacity += 0.02;
        else this.fadeIn = false;

        this.wobble += this.wSpeed;
        this.x += Math.sin(this.wobble) * this.wAmp;
        this.y += this.vy;

        if (mouse.x !== null) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            if (Math.sqrt(dx * dx + dy * dy) < this.r + 18) {
                this.popping = true;
            }
        }
        if (this.y < -this.r * 3) this.alive = false;
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, this.opacity));
        ctx.translate(this.x, this.y);
        ctx.scale(this.popScale, this.popScale);

        const grad = ctx.createRadialGradient(-this.r * 0.32, -this.r * 0.32, 0, 0, 0, this.r);
        grad.addColorStop(0,   'rgba(255,255,255,0.45)');
        grad.addColorStop(0.45, this.color[0]);
        grad.addColorStop(1,    this.color[1]);

        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(-this.r * 0.34, -this.r * 0.34, this.r * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.38)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, this.r - 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = this.color[0];
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
    }
}

const BubbleField = () => {
    const canvasRef    = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas    = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx  = canvas.getContext('2d');
        let animId;
        const mouse = { x: null, y: null };

        const resize = () => {
            canvas.width  = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(container);

        const MAX = 55;
        const bubbles = [];
        for (let i = 0; i < MAX; i++) {
            const b = new Bubble(canvas);
            b.y = Math.random() * canvas.height;
            bubbles.push(b);
        }

        const frame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = bubbles.length - 1; i >= 0; i--) {
                bubbles[i].update(mouse);
                bubbles[i].draw(ctx);
                if (!bubbles[i].alive) {
                    bubbles.splice(i, 1);
                    bubbles.push(new Bubble(canvas));
                }
            }
            animId = requestAnimationFrame(frame);
        };
        frame();

        const onMove  = (e) => { const r = container.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
        const onLeave = () => { mouse.x = null; mouse.y = null; };
        container.addEventListener('mousemove', onMove);
        container.addEventListener('mouseleave', onLeave);

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
            container.removeEventListener('mousemove', onMove);
            container.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return (
        <div className={styles.wrapper} ref={containerRef}>
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
};

export default BubbleField;

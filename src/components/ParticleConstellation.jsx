import React, { useEffect, useRef } from 'react';
import styles from '../styles/ParticleConstellation.module.css';

const PARTICLE_COUNT = 110;
const CONNECTION_DIST = 140;
const MOUSE_RADIUS = 130;
const COLORS = ['#7dd3fc', '#a78bfa', '#34d399', '#f472b6', '#fbbf24', '#e0f2fe', '#c4b5fd'];

const ParticleConstellation = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        let animId;
        const mouse = { x: null, y: null };
        let tick = 0;

        const resize = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };
        resize();

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.8 + 0.8;
                this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
                this.baseOpacity = Math.random() * 0.5 + 0.5;
                this.pulseSpeed = Math.random() * 0.018 + 0.008;
                this.pulseOffset = Math.random() * Math.PI * 2;
            }

            update() {
                if (mouse.x !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MOUSE_RADIUS && dist > 0) {
                        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                        this.vx += (dx / dist) * force * 0.25;
                        this.vy += (dy / dist) * force * 0.25;
                    }
                }

                this.vx *= 0.988;
                this.vy *= 0.988;

                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed > 1.8) {
                    this.vx = (this.vx / speed) * 1.8;
                    this.vy = (this.vy / speed) * 1.8;
                }

                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) { this.x = 0; this.vx *= -1; }
                if (this.x > canvas.width) { this.x = canvas.width; this.vx *= -1; }
                if (this.y < 0) { this.y = 0; this.vy *= -1; }
                if (this.y > canvas.height) { this.y = canvas.height; this.vy *= -1; }

                this.opacity = this.baseOpacity * (0.65 + 0.35 * Math.sin(tick * this.pulseSpeed + this.pulseOffset));
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();

                ctx.globalAlpha = this.opacity * 0.25;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
                const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 4);
                glow.addColorStop(0, this.color);
                glow.addColorStop(1, 'transparent');
                ctx.fillStyle = glow;
                ctx.fill();
                ctx.restore();
            }
        }

        const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

        const frame = () => {
            tick++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DIST) {
                        const alpha = (1 - dist / CONNECTION_DIST) * 0.55;
                        ctx.save();
                        ctx.globalAlpha = alpha;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const grad = ctx.createLinearGradient(
                            particles[i].x, particles[i].y,
                            particles[j].x, particles[j].y
                        );
                        grad.addColorStop(0, particles[i].color);
                        grad.addColorStop(1, particles[j].color);
                        ctx.strokeStyle = grad;
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }

            particles.forEach(p => { p.update(); p.draw(); });
            animId = requestAnimationFrame(frame);
        };

        frame();

        const onMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        const onLeave = () => { mouse.x = null; mouse.y = null; };

        container.addEventListener('mousemove', onMove);
        container.addEventListener('mouseleave', onLeave);

        return () => {
            cancelAnimationFrame(animId);
            resizeObserver.disconnect();
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

export default ParticleConstellation;

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import ThreeScene from "./three/ThreeScene";
import styles from "../styles/DtfStudioSection.module.css";

// Aurora boreal en WebGL detrás de la sección; three.js se carga en un chunk aparte.
const loadAurora = () => import("./three/scenes/auroraBorealis");

const LIVE_URL = "https://dtf.salazarcode.com";
const LOGO = "/images/proyectos/dtf-studio/logo.webp";
const LPI_OPTIONS = [25, 30, 35, 40, 45];
const FABRICS = [
  { key: "fabricBlack", bg: "#0b0d0c", ink: "#a3e635" },
  { key: "fabricWhite", bg: "#f4f4f2", ink: "#111111" },
  { key: "fabricRed", bg: "#9f1239", ink: "#ffffff" },
  { key: "fabricBlue", bg: "#1e3a8a", ink: "#a3e635" },
];

// Semitono animado: una forma luminosa que se mueve, muestreada en una rejilla de puntos cuyo
// radio depende del brillo. La lineatura elegida cambia la separación de la rejilla.
function HalftoneCanvas({ lpi, fabric }) {
  const canvasRef = useRef(null);
  const settings = useRef({ lpi, fabric });
  settings.current = { lpi, fabric };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let visible = true;
    let width = 1;
    let height = 1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth || 1;
      height = canvas.clientHeight || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reducedMotion) draw(2);
    };

    const brightness = (x, y, t) => {
      const nx = x / width - 0.5;
      const ny = y / height - 0.5;
      const ax = Math.sin(t * 0.7) * 0.22;
      const ay = Math.cos(t * 0.5) * 0.14;
      const bx = Math.cos(t * 0.45 + 1.4) * 0.26;
      const by = Math.sin(t * 0.62 + 0.6) * 0.18;
      const blobA = Math.exp(-((nx - ax) ** 2 + (ny - ay) ** 2) * 9);
      const blobB = Math.exp(-((nx - bx) ** 2 + (ny - by) ** 2) * 14) * 0.85;
      const ripple = Math.sin(nx * 9 + ny * 5 - t * 1.6) * 0.12;
      return Math.max(0, Math.min(1, blobA + blobB + ripple));
    };

    const draw = (t) => {
      const { lpi: currentLpi, fabric: currentFabric } = settings.current;
      ctx.fillStyle = currentFabric.bg;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = currentFabric.ink;

      // Rejilla girada 45°, como una trama de impresión real.
      const step = 340 / currentLpi;
      const maxRadius = step * 0.62;
      const angle = Math.PI / 4;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const span = Math.hypot(width, height) / 2 + step;
      const cx = width / 2;
      const cy = height / 2;

      ctx.beginPath();
      for (let u = -span; u <= span; u += step) {
        for (let v = -span; v <= span; v += step) {
          const x = cx + u * cos - v * sin;
          const y = cy + u * sin + v * cos;
          if (x < -step || y < -step || x > width + step || y > height + step) continue;
          const r = Math.sqrt(brightness(x, y, t)) * maxRadius;
          if (r < 0.35) continue;
          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, Math.PI * 2);
        }
      }
      ctx.fill();
    };

    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      if (visible) draw(now / 1000);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    // Arranca visible: en pestañas en segundo plano el observer puede no entregar el callback inicial.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    const drawStill = () => draw(2);
    if (reducedMotion) {
      drawStill();
      canvas.addEventListener("redraw", drawStill);
    } else {
      draw(0);
      frame = requestAnimationFrame(tick);
    }

    return () => {
      canvas.removeEventListener("redraw", drawStill);
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  // Con movimiento reducido no hay bucle: se redibuja al cambiar los controles.
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    canvasRef.current?.dispatchEvent(new Event("redraw"));
  }, [lpi, fabric]);

  return <canvas ref={canvasRef} className={styles.halftoneCanvas} aria-hidden="true" />;
}

export default function DtfStudioSection() {
  const { t } = useTranslation("common");
  const [lpi, setLpi] = useState(40);
  const [fabric, setFabric] = useState(FABRICS[0]);
  const stageRef = useRef(null);

  // Inclinación 3D de la captura según la posición del cursor.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (event) => {
      const rect = stage.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      stage.style.setProperty("--tilt-x", `${(-current.y * 6).toFixed(2)}deg`);
      stage.style.setProperty("--tilt-y", `${(current.x * 9).toFixed(2)}deg`);
      stage.style.setProperty("--glare-x", `${(50 + current.x * 40).toFixed(1)}%`);
      frame = requestAnimationFrame(tick);
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const features = ["feature1", "feature2", "feature3", "feature4", "feature5", "feature6"];

  return (
    <section className={styles.section} aria-labelledby="dtf-section-title">
      <ThreeScene load={loadAurora} background="#02060d" />
      <div className={styles.vignette} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.logo}>
            <Image src={LOGO} alt="" width={64} height={64} className={styles.logoIcon} aria-hidden="true" />
            DTF STUDIO
          </div>

          <h2 id="dtf-section-title" className={styles.title}>
            {t("dtfSection.title")} <span className={styles.titleHighlight}>{t("dtfSection.titleHighlight")}</span>
          </h2>

          <p className={styles.description}>{t("dtfSection.description")}</p>

          <ul className={styles.features}>
            {features.map((key) => (
              <li key={key} className={styles.feature}>
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t(`dtfSection.${key}`)}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              {t("dtfSection.ctaLive")}
              <span aria-hidden="true">↗</span>
            </a>
            <Link href="/proyectos/dtf_studio" className={styles.btnGhost}>
              {t("dtfSection.ctaCase")}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className={styles.stage} ref={stageRef}>
          <div className={styles.window}>
            <div className={styles.windowBar}>
              <span /><span /><span />
              <div className={styles.windowUrl}>dtf.salazarcode.com</div>
            </div>
            <div className={styles.windowBody}>
              <Image
                src="/images/proyectos/dtf-studio/portada.webp"
                alt={t("dtfSection.imageAlt")}
                width={1912}
                height={906}
                sizes="(max-width: 960px) 92vw, 640px"
                className={styles.screenshot}
              />
              <div className={styles.glare} aria-hidden="true" />
            </div>
          </div>

          {/* Logo en espiral relleno con los colores de la aurora */}
          <div className={styles.logoOrb} role="img" aria-label={t("dtfSection.logoAlt")}>
            <span className={styles.logoOrbit} />
            <span className={styles.logoGlow}>
              <span className={styles.logoSpiral} style={{ "--logo-mask": `url(${LOGO})` }} />
            </span>
          </div>

          <div className={styles.liveCard}>
            <div className={styles.liveHeader}>
              <span className={styles.livePulse} />
              {t("dtfSection.liveTitle")}
              <span className={styles.liveMeta}>{lpi} LPI</span>
            </div>
            <HalftoneCanvas lpi={lpi} fabric={fabric} />
            <div className={styles.liveControls}>
              <span className={styles.liveLabel}>{t("dtfSection.liveLpi")}</span>
              <div className={styles.lpiGroup} role="radiogroup" aria-label={t("dtfSection.liveLpi")}>
                {LPI_OPTIONS.map((value) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={lpi === value}
                    className={`${styles.lpiButton} ${lpi === value ? styles.lpiActive : ""}`}
                    onClick={() => setLpi(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.liveControls}>
              <span className={styles.liveLabel}>{t("dtfSection.liveFabric")}</span>
              <div className={styles.fabricGroup} role="radiogroup" aria-label={t("dtfSection.liveFabric")}>
                {FABRICS.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    role="radio"
                    aria-checked={fabric.key === option.key}
                    aria-label={t(`dtfSection.${option.key}`)}
                    title={t(`dtfSection.${option.key}`)}
                    className={`${styles.fabricSwatch} ${fabric.key === option.key ? styles.fabricActive : ""}`}
                    style={{ background: option.bg }}
                    onClick={() => setFabric(option)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

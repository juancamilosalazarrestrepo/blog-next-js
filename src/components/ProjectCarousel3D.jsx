import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/ProjectCarousel3D.module.css";

// three.js se descarga en un chunk aparte, solo en el cliente.
const loadScene = () => import("./three/scenes/projectCarousel");

// `slides`: [{ title, description, image, url, cta }]
export default function ProjectCarousel3D({ slides }) {
  const containerRef = useRef(null);
  const controlsRef = useRef(null);
  const router = useRouter();
  const [index, setIndex] = useState(0);

  // Solo se remonta la escena si cambian los proyectos (por ejemplo, al cambiar de idioma).
  const slidesKey = slides.map((slide) => slide.url + slide.title).join("|");

  useEffect(() => {
    let cleanup = null;
    let cancelled = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    loadScene().then((mod) => {
      if (cancelled || !containerRef.current) return;
      cleanup = mod.default(containerRef.current, {
        slides,
        reducedMotion,
        onChange: setIndex,
        onReady: (controls) => (controlsRef.current = controls),
        onOpen: (i) => router.push(slides[i].url),
      });
    });

    return () => {
      cancelled = true;
      cleanup?.();
      controlsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slidesKey]);

  const slide = slides[index];
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className={styles.banner} aria-label="Proyectos destacados">
      <div ref={containerRef} className={styles.stage} aria-hidden="true" />

      <div className={styles.overlay}>
        <div key={index} className={styles.info} aria-live="polite">
          <span className={styles.counter}>
            {pad(index + 1)} / {pad(slides.length)}
          </span>
          <h3 className={styles.title}>{slide.title}</h3>
          <p className={styles.description}>{slide.description}</p>
          <Link href={slide.url} className={styles.cta}>
            {slide.cta} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Proyecto anterior"
            onClick={() => controlsRef.current?.goTo(index - 1)}
          >
            ‹
          </button>
          <div className={styles.dots}>
            {slides.map((s, i) => (
              <button
                key={s.url}
                type="button"
                aria-label={s.title}
                aria-current={i === index}
                className={i === index ? styles.dotActive : styles.dot}
                onClick={() => controlsRef.current?.goTo(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Proyecto siguiente"
            onClick={() => controlsRef.current?.goTo(index + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

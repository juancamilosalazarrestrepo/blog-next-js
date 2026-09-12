import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const SLUG = "vision-computadora-mediapipe";
const TITLE =
  "Visión por Computadora en Tiempo Real: Face Tracking, Finger Tracking, Reconocimiento de Objetos y Lenguaje de Señas";
const SUBTITLE =
  "Construimos un sistema de visión por computadora con Python y MediaPipe capaz de rastrear rostros y manos, detectar objetos e interpretar letras en lenguaje de señas en tiempo real.";
const DATE = "4 de agosto de 2026";
const READ_TIME = "9 min de lectura";

const modules = [
  {
    num: "01",
    title: "Face Tracking",
    color: "#0072ff",
    icon: "🧑‍💻",
    body: "MediaPipe Face Mesh detecta 468 puntos de referencia sobre el rostro en cada frame, permitiendo ubicar ojos, cejas, nariz y boca, y calcular la orientación de la cabeza en tiempo real.",
  },
  {
    num: "02",
    title: "Finger Tracking",
    color: "#7c3aed",
    icon: "🖐️",
    body: "MediaPipe Hands detecta 21 puntos por mano, reconstruyendo la posición de cada dedo en el espacio: qué dedos están extendidos, distancias entre puntas y coordenadas normalizadas.",
  },
  {
    num: "03",
    title: "Lenguaje de Señas",
    color: "#10b981",
    icon: "🤟",
    body: "Sobre los landmarks de la mano, un clasificador entrenado con TensorFlow traduce la posición de los dedos a letras del alfabeto dactilológico en tiempo real.",
  },
  {
    num: "04",
    title: "Reconocimiento de Objetos",
    color: "#f59e0b",
    icon: "🎯",
    body: "YOLOv8 identifica decenas de clases de objetos —personas, vehículos, señales, animales— dibujando cajas delimitadoras con su nivel de confianza sobre cada frame.",
  },
];

const stack = [
  { tech: "Python", uso: "Lenguaje base de todo el sistema" },
  { tech: "OpenCV", uso: "Captura de video, dibujo de anotaciones y preprocesamiento de frames" },
  { tech: "MediaPipe (Face Mesh / Hands)", uso: "Detección de landmarks faciales y de manos en tiempo real" },
  { tech: "TensorFlow / Keras", uso: "Entrenamiento del clasificador de letras en lenguaje de señas" },
  { tech: "YOLOv8 (Ultralytics)", uso: "Detección y clasificación de objetos en la escena" },
  { tech: "NumPy", uso: "Procesamiento vectorial de coordenadas y landmarks" },
];

const pipeline = [
  { step: "Captura", detail: "OpenCV lee el frame de la cámara web en tiempo real.", color: "#0072ff" },
  { step: "Preprocesamiento", detail: "Conversión de color (BGR a RGB) y redimensionado del frame.", color: "#7c3aed" },
  { step: "Inferencia por módulo", detail: "Rostro, manos, señas y objetos se procesan de forma independiente sobre el mismo frame.", color: "#0ea5e9" },
  { step: "Postprocesamiento", detail: "Normalización de coordenadas y suavizado temporal para evitar parpadeo en las detecciones.", color: "#10b981" },
  { step: "Renderizado", detail: "Se dibujan landmarks, cajas delimitadoras y etiquetas con OpenCV.", color: "#f59e0b" },
  { step: "Salida", detail: "El frame anotado se muestra en tiempo real o se transmite a otra aplicación.", color: "#ef4444" },
];

const useCases = [
  { icon: "♿", title: "Accesibilidad", body: "Traducción de lenguaje de señas a texto para facilitar la comunicación." },
  { icon: "✋", title: "Interfaces sin contacto", body: "Control de aplicaciones mediante gestos de mano." },
  { icon: "🛡️", title: "Seguridad y monitoreo", body: "Conteo y clasificación de objetos y personas en una escena." },
  { icon: "🎓", title: "Educación", body: "Herramientas interactivas para aprender el alfabeto dactilológico." },
];

const faqs = [
  {
    q: "¿Se necesita una GPU para correr este sistema?",
    a: "No es obligatorio. MediaPipe está optimizado para CPU y corre en tiempo real en equipos convencionales. YOLO se beneficia de una GPU, pero también funciona en CPU con una tasa de frames menor.",
  },
  {
    q: "¿Cómo se entrenó el modelo de lenguaje de señas?",
    a: "Se entrenó sobre coordenadas de landmarks de mano extraídas con MediaPipe, no sobre imágenes crudas, lo que simplifica el modelo y mejora su precisión ante cambios de fondo o iluminación.",
  },
  {
    q: "¿Se pueden agregar más gestos o letras?",
    a: "Sí. Al basarse en landmarks normalizados, agregar una nueva clase implica capturar ejemplos adicionales y reentrenar el clasificador, sin modificar el resto del pipeline.",
  },
  {
    q: "¿Los cuatro módulos pueden correr al mismo tiempo?",
    a: "Sí, están diseñados para activarse de forma independiente o simultánea sobre el mismo stream de video, según los recursos de hardware disponibles.",
  },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e5e7eb", transition: "all 0.2s" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <span style={{ fontWeight: 600, color: "#1a1a2e", fontSize: "1rem", lineHeight: 1.5 }}>
          {faq.q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: open ? "linear-gradient(135deg, #0072ff, #7c3aed)" : "#f1f5f9",
            color: open ? "#fff" : "#64748b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "1.1rem",
            transition: "all 0.2s",
          }}
        >
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p style={{ color: "#4b5563", lineHeight: 1.75, paddingBottom: "20px", margin: 0, fontSize: "0.97rem" }}>
          {faq.a}
        </p>
      )}
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['common'])),
    },
  };
}

export default function VisionComputadoraMediapipe() {
  return (
    <Layout>
      <Head>
        <title>{TITLE} | Juan Camilo Salazar</title>
        <meta name="description" content={SUBTITLE} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={SUBTITLE} />
        <meta property="og:image" content={`/images/${SLUG}.webp`} />
        <meta property="article:published_time" content="2026-08-04" />
        <meta
          name="keywords"
          content="vision por computadora, computer vision, face tracking, finger tracking, reconocimiento de objetos, lenguaje de señas, MediaPipe, OpenCV, YOLO, inteligencia artificial python"
        />
      </Head>

      {/* ── HERO ── */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: "420px" }}>
        <Image
          src={`/images/${SLUG}.webp`}
          alt="Visión por computadora en tiempo real: detección de objetos, rostros y manos"
          width={1280}
          height={500}
          priority
          style={{
            width: "100%",
            height: "420px",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(10,10,26,0.55) 0%, rgba(10,10,26,0.92) 100%)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", zIndex: 1 }}>
          <div style={{ maxWidth: "860px", margin: "0 auto", width: "100%", padding: "0 24px" }}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "18px" }}>
              {["Visión por Computadora", "MediaPipe", "Deep Learning"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(0,114,255,0.25)",
                    border: "1px solid rgba(0,114,255,0.5)",
                    color: "#93c5fd",
                    borderRadius: "20px",
                    padding: "4px 14px",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.2,
                marginBottom: "16px",
              }}
            >
              {TITLE}
            </h1>
            <p style={{ color: "#cbd5e1", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "24px", maxWidth: "700px" }}>
              {SUBTITLE}
            </p>
            <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #0072ff, #7c3aed)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                  }}
                >
                  👁️
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.88rem" }}>Juan Camilo Salazar</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.78rem" }}>{DATE}</div>
                </div>
              </div>
              <span style={{ color: "#64748b", fontSize: "0.85rem" }}>·</span>
              <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>⏱ {READ_TIME}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BANNER RESUMEN ── */}
      <div style={{ background: "linear-gradient(135deg, #0d1b4b, #1a1a2e)", padding: "40px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.75, maxWidth: "680px", margin: "0 auto" }}>
            Un mismo pipeline de video, cuatro capacidades corriendo en tiempo real: rostro, manos, lenguaje de señas y objetos —
            todo sobre una cámara web estándar, sin GPU obligatoria.
          </p>
          <div style={{ display: "flex", gap: "32px", justifyContent: "center", marginTop: "32px", flexWrap: "wrap" }}>
            {[
              { num: "4", label: "Módulos de visión" },
              { num: "25+", label: "FPS en CPU estándar" },
              { num: "489", label: "Landmarks rostro + mano" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0072ff" }}>{s.num}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.82rem", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MÓDULOS ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1a1a2e", textAlign: "center", marginBottom: "8px" }}>
            Los Cuatro Módulos del Sistema
          </h2>
          <p style={{ color: "#6b7280", textAlign: "center", marginBottom: "56px", fontSize: "1rem" }}>
            Cada uno resuelve un problema distinto sobre la misma base técnica de landmarks y detección
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
            {modules.map((m) => (
              <div
                key={m.num}
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  padding: "32px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "4px",
                    background: m.color,
                    borderRadius: "4px 0 0 4px",
                  }}
                />
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: "52px",
                      height: "52px",
                      borderRadius: "14px",
                      background: `${m.color}18`,
                      border: `2px solid ${m.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                    }}
                  >
                    {m.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: m.color,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        #{m.num}
                      </span>
                      <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.3 }}>
                        {m.title}
                      </h3>
                    </div>
                    <p style={{ color: "#4b5563", lineHeight: 1.7, fontSize: "0.95rem", margin: 0 }}>{m.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STACK TECNOLÓGICO ── */}
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1a1a2e", textAlign: "center", marginBottom: "40px" }}>
            Stack Tecnológico
          </h2>
          <div style={{ overflowX: "auto", borderRadius: "16px", border: "1px solid #e5e7eb" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}>
              <thead>
                <tr style={{ background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)" }}>
                  <th style={{ textAlign: "left", padding: "16px 20px", color: "#94a3b8", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.04em" }}>
                    TECNOLOGÍA
                  </th>
                  <th style={{ textAlign: "left", padding: "16px 20px", color: "#94a3b8", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.04em" }}>
                    USO EN EL PROYECTO
                  </th>
                </tr>
              </thead>
              <tbody>
                {stack.map((row, i) => (
                  <tr key={row.tech} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 700, color: "#1a1a2e", fontSize: "0.92rem" }}>
                      <span
                        style={{
                          background: "linear-gradient(135deg, #0072ff, #0d47a1)",
                          color: "#fff",
                          borderRadius: "20px",
                          padding: "4px 14px",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          display: "inline-block",
                        }}
                      >
                        {row.tech}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px", color: "#4b5563", fontSize: "0.92rem", lineHeight: 1.5 }}>
                      {row.uso}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── PIPELINE / ARQUITECTURA ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1a1a2e", textAlign: "center", marginBottom: "8px" }}>
            Arquitectura del Pipeline
          </h2>
          <p style={{ color: "#6b7280", textAlign: "center", marginBottom: "56px", fontSize: "1rem" }}>
            Del frame de la cámara a la anotación en pantalla, en seis pasos
          </p>

          <div style={{ position: "relative", paddingLeft: "56px" }}>
            <div
              style={{
                position: "absolute",
                left: "27px",
                top: "40px",
                bottom: "40px",
                width: "2px",
                background: "linear-gradient(to bottom, #0072ff, #7c3aed, #0ea5e9, #10b981, #f59e0b, #ef4444)",
              }}
            />
            {pipeline.map((p, i) => (
              <div key={p.step} style={{ position: "relative", marginBottom: i < pipeline.length - 1 ? "36px" : 0 }}>
                <div
                  style={{
                    position: "absolute",
                    left: "-56px",
                    top: "2px",
                    width: "56px",
                    height: "56px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: p.color,
                      border: "4px solid #f8fafc",
                      boxShadow: `0 0 0 2px ${p.color}`,
                    }}
                  />
                </div>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "20px 24px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: p.color, letterSpacing: "0.08em" }}>
                      PASO {i + 1}
                    </span>
                    <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "#1a1a2e" }}>{p.step}</h3>
                  </div>
                  <p style={{ margin: 0, color: "#4b5563", fontSize: "0.92rem", lineHeight: 1.6 }}>{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CASOS DE USO ── */}
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1a1a2e", textAlign: "center", marginBottom: "40px" }}>
            Casos de Uso
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {useCases.map((u) => (
              <div
                key={u.title}
                style={{
                  background: "linear-gradient(135deg, #f0f7ff, #f5f3ff)",
                  border: "1px solid #dbeafe",
                  borderRadius: "18px",
                  padding: "28px 24px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{u.icon}</div>
                <h3 style={{ margin: "0 0 8px", fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>{u.title}</h3>
                <p style={{ margin: 0, color: "#4b5563", fontSize: "0.9rem", lineHeight: 1.6 }}>{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1a1a2e", textAlign: "center", marginBottom: "40px" }}>
            Preguntas Frecuentes
          </h2>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} />
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)",
              borderRadius: "24px",
              padding: "48px 40px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>👁️</div>
            <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, marginBottom: "12px" }}>
              ¿Quieres un sistema de visión por computadora a la medida de tu proyecto?
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>
              Desde reconocimiento de gestos hasta detección de objetos en producción, construyo soluciones de
              <strong style={{ color: "#93c5fd" }}> visión por computadora en tiempo real</strong> adaptadas a tu caso de uso.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="/blog"
                style={{
                  background: "linear-gradient(135deg, #0072ff, #0d47a1)",
                  color: "#fff",
                  fontWeight: 700,
                  padding: "14px 32px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  display: "inline-block",
                }}
              >
                Ver más artículos →
              </a>
              <a
                href="/"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#e2e8f0",
                  fontWeight: 600,
                  padding: "14px 32px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  display: "inline-block",
                }}
              >
                Contactar
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

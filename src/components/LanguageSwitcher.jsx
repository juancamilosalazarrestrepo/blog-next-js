import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

const FLAG_ES = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="16" style={{ borderRadius: "3px", display: "block" }}>
    <rect width="60" height="30" fill="#c60b1e"/>
    <rect y="7.5" width="60" height="15" fill="#ffc400"/>
  </svg>
);

const FLAG_EN = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="16" style={{ borderRadius: "3px", display: "block" }}>
    <rect width="60" height="30" fill="#012169"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
    <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
  </svg>
);

export default function LanguageSwitcher() {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  const [open, setOpen] = useState(false);

  const isEs = locale === "es";
  const isEn = locale === "en";

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Switch language"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 10px",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          background: "var(--surface)",
          cursor: "pointer",
          fontSize: "0.78rem",
          fontWeight: 600,
          color: "var(--text)",
          transition: "all 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)"}
        onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"}
      >
        {isEs ? <FLAG_ES /> : <FLAG_EN />}
        <span>{isEs ? "ES" : "EN"}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            background: "var(--surface)",
            borderRadius: "10px",
            border: "1px solid var(--border)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            overflow: "hidden",
            minWidth: "130px",
            zIndex: 1000,
          }}
        >
          <Link
            href={{ pathname, query }}
            as={asPath}
            locale="es"
            onClick={() => setOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              fontSize: "0.83rem",
              fontWeight: isEs ? 700 : 500,
              color: isEs ? "var(--brand)" : "var(--text)",
              background: isEs ? "color-mix(in srgb, var(--brand) 8%, var(--surface))" : "transparent",
              textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => { if (!isEs) e.currentTarget.style.background = "var(--surface-2)" }}
            onMouseLeave={e => { if (!isEs) e.currentTarget.style.background = "transparent" }}
          >
            <FLAG_ES />
            <span>Español</span>
            {isEs && <span style={{ marginLeft: "auto", color: "var(--brand)" }}>✓</span>}
          </Link>
          <Link
            href={{ pathname, query }}
            as={asPath}
            locale="en"
            onClick={() => setOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              fontSize: "0.83rem",
              fontWeight: isEn ? 700 : 500,
              color: isEn ? "var(--brand)" : "var(--text)",
              background: isEn ? "color-mix(in srgb, var(--brand) 8%, var(--surface))" : "transparent",
              textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => { if (!isEn) e.currentTarget.style.background = "var(--surface-2)" }}
            onMouseLeave={e => { if (!isEn) e.currentTarget.style.background = "transparent" }}
          >
            <FLAG_EN />
            <span>English</span>
            {isEn && <span style={{ marginLeft: "auto", color: "var(--brand)" }}>✓</span>}
          </Link>
        </div>
      )}
    </div>
  );
}

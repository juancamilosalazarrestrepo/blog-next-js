import Link from "next/link";
import { useRouter } from "next/router";

const CourseLayout = ({
  chapters,
  currentSlug,
  children,
  courseUrl = "/cursos/javascript",
  courseLabel = "JavaScript",
}) => {
  const router = useRouter();
  const sorted = [...chapters].sort((a, b) => a.order - b.order);
  const currentIndex = sorted.findIndex((c) => c.slug === currentSlug);
  const current = sorted[currentIndex];
  const prev = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const next = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;

  return (
    <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "32px 24px 80px" }}>
      <nav style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "24px" }}>
        <Link href="/cursos" style={{ color: "#64748b" }}>
          Cursos
        </Link>
        {" / "}
        <Link href={courseUrl} style={{ color: "#64748b" }}>
          {courseLabel}
        </Link>
        {" / "}
        <span style={{ color: "#1a1a2e", fontWeight: 600 }}>{current?.title}</span>
      </nav>

      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }} className="max-md:flex-col">
        <aside
          className="max-md:hidden"
          style={{
            width: "260px",
            flexShrink: 0,
            position: "sticky",
            top: "100px",
            borderRight: "1px solid #e5e7eb",
            paddingRight: "20px",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: "#94a3b8",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Temario
          </p>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
            {sorted.map((chapter) => {
              const isActive = chapter.slug === currentSlug;
              return (
                <li key={chapter.slug}>
                  <Link
                    href={`${courseUrl}/${chapter.slug}`}
                    style={{
                      display: "block",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      fontSize: "0.88rem",
                      textDecoration: "none",
                      color: isActive ? "#0072ff" : "#374151",
                      background: isActive ? "#eff6ff" : "transparent",
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    {chapter.order}. {chapter.title}
                  </Link>
                </li>
              );
            })}
          </ol>
        </aside>

        <div className="md:hidden" style={{ marginBottom: "24px", width: "100%" }}>
          <select
            value={currentSlug}
            onChange={(e) => {
              router.push(`${courseUrl}/${e.target.value}`, undefined, { locale: router.locale });
            }}
            aria-label="Seleccionar capítulo"
            style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.9rem" }}
          >
            {sorted.map((chapter) => (
              <option key={chapter.slug} value={chapter.slug}>
                {chapter.order}. {chapter.title}
              </option>
            ))}
          </select>
        </div>

        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: "24px" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0072ff", marginBottom: "6px" }}>
              Capítulo {current?.order}
            </p>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#1a1a2e", marginBottom: "8px", lineHeight: 1.25 }}>
              {current?.title}
            </h1>
            {current?.duration && (
              <p style={{ color: "#64748b", fontSize: "0.9rem" }}>⏱️ {current.duration}</p>
            )}
          </div>
          <article className="prose" style={{ maxWidth: "720px" }}>
            {children}
          </article>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "48px",
              paddingTop: "24px",
              borderTop: "1px solid #e5e7eb",
              gap: "16px",
            }}
          >
            {prev ? (
              <Link href={`${courseUrl}/${prev.slug}`} style={{ color: "#0072ff", fontWeight: 600, fontSize: "0.9rem" }}>
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`${courseUrl}/${next.slug}`}
                style={{ color: "#0072ff", fontWeight: 600, fontSize: "0.9rem", textAlign: "right" }}
              >
                {next.title} →
              </Link>
            ) : (
              <span style={{ color: "#10b981", fontWeight: 700, fontSize: "0.9rem" }}>🎉 Fin del curso (por ahora)</span>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseLayout;

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isDarkReady, THEME_STORAGE_KEY } from "../../../lib/theme";

const ThemeContext = createContext({ theme: "light", ready: false, toggleTheme: () => {} });

function readStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function ThemeProvider({ children }) {
  const { pathname } = useRouter();
  const ready = isDarkReady(pathname);
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(readStoredTheme());
  }, []);

  // En cada navegación: oscuro solo si la página destino ya está migrada.
  useEffect(() => {
    if (theme === null) return;
    const root = document.documentElement;
    if (ready && theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
  }, [ready, theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: theme ?? "light", ready, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

import { useEffect, useState } from "react";
import { ThemeContext } from "./useTheme";

// Apply theme class immediately on load to prevent flash
const stored = localStorage.getItem("theme");
const initialDark = stored ? stored === "dark" : true;
document.documentElement.classList.add(initialDark ? "dark" : "light");

export default function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored ? stored === "dark" : true; // default dark
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

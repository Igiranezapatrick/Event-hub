"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "eventhub-theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);
    const preferredTheme = savedTheme
      ? (savedTheme as "light" | "dark")
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    updateTheme(preferredTheme);
  }, []);

  function updateTheme(value: "light" | "dark") {
    window.localStorage.setItem(STORAGE_KEY, value);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(value);
    document.documentElement.style.colorScheme = value;
    setTheme(value);
  }

  function toggleTheme() {
    updateTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <button
      type="button"
      aria-label="Toggle light and dark mode"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/80 text-muted-foreground transition hover:bg-muted hover:text-foreground"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

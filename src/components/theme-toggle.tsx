import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground/80 transition hover:border-[color:var(--sun-deep)] hover:text-[color:var(--sun-deep)]"
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useContract } from "../contracts/contract-provider";

export type ThemeProviderProps = {
  children: React.ReactNode;
};

const BRANDING_STORAGE_KEY = "theme-branding";
const MODE_STORAGE_KEY = "theme-mode";

export function ThemeProvider({ children }: ThemeProviderProps) {
  const contract = useContract();
  const themeConfig = contract.theme;

  const themes = themeConfig.themes ?? [];

  /**
   * ============================
   * 1️⃣ Branding (CSS theme-*)
   * ============================
   */
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    // Remove branding antigo
    root.classList.forEach((cls) => {
      if (cls.startsWith("theme-")) {
        root.classList.remove(cls);
      }
    });

    const storedBranding = localStorage.getItem(BRANDING_STORAGE_KEY);

    const isValidBranding = themes.some((t) => t.id === storedBranding);

    if (storedBranding && isValidBranding) {
      root.classList.add(`theme-${storedBranding}`);
    }
  }, [themes]);

  /**
   * ============================
   * 2️⃣ Mode (light / dark / system)
   * ============================
   */
  const getStoredMode = (): "light" | "dark" | "system" => {
    if (typeof window === "undefined") return "light";

    const stored = localStorage.getItem(MODE_STORAGE_KEY);

    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }

    return "light";
  };

  const defaultMode = getStoredMode();

  /**
   * ============================
   * 3️⃣ Provider
   * ============================
   */
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultMode}
      enableSystem={defaultMode === "system" && themeConfig.allowToggle}
      enableColorScheme
      disableTransitionOnChange
      storageKey={MODE_STORAGE_KEY}
    >
      {children}
    </NextThemesProvider>
  );
}

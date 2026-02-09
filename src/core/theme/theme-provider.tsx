import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useContract } from "../contracts/contract-provider";

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const contract = useContract();
  const themeConfig = contract.theme;

  /**
   * ============================
   * 1️⃣ THEMES VISUAIS (CSS)
   * ============================
   */

  const themes = themeConfig.themes ?? [];

  // Tema visual default = primeiro da lista
  const defaultVisualTheme = themes[0];

  React.useEffect(() => {
    if (!defaultVisualTheme) return;

    const root = document.documentElement;

    // Remove qualquer theme-*
    root.classList.forEach((cls) => {
      if (cls.startsWith("theme-")) {
        root.classList.remove(cls);
      }
    });

    root.classList.add(`theme-${defaultVisualTheme.id}`);
  }, [defaultVisualTheme?.id]);

  /**
   * ============================
   * 2️⃣ MODE (light / dark / system)
   * ============================
   */

  const requestedDefaultMode = themeConfig.defaultTheme; // "light" | "dark" | "system"

  const supportedModes = new Set(
    defaultVisualTheme?.supports ?? ["light", "dark"],
  );

  // Se o modo default não for suportado pelo tema visual, faz fallback
  const resolvedDefaultMode =
    requestedDefaultMode === "system"
      ? supportedModes.has("light") && supportedModes.has("dark")
        ? "system"
        : supportedModes.has("dark")
          ? "dark"
          : "light"
      : supportedModes.has(requestedDefaultMode)
        ? requestedDefaultMode
        : supportedModes.has("dark")
          ? "dark"
          : "light";

  const enableSystem =
    resolvedDefaultMode === "system" && themeConfig.allowToggle;

  /**
   * ============================
   * 3️⃣ STORAGE
   * ============================
   */

  const storageKey = themeConfig.allowToggle ? "theme-mode" : null;

  /**
   * ============================
   * 4️⃣ PROVIDER
   * ============================
   */

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={resolvedDefaultMode}
      enableSystem={enableSystem}
      enableColorScheme
      disableTransitionOnChange
      storageKey={storageKey as any}
    >
      {children}
    </NextThemesProvider>
  );
}

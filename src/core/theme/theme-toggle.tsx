import { useTheme } from "next-themes";
import { useContract } from "../contracts/contract-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Mode = "light" | "dark";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { theme: themeConfig } = useContract();

  const themes = themeConfig.themes ?? [];

  const [mounted, setMounted] = useState(false);

  /**
   * ============================
   * Branding ativo (fonte da verdade)
   * ============================
   */
  const activeBranding = useRef<string | null>(null);
  const hasBootstrapped = useRef(false);

  /**
   * ============================
   * Mount guard
   * ============================
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * ============================
   * Helpers (DOM)
   * ============================
   */
  function clearBranding() {
    document.documentElement.classList.forEach((cls) => {
      if (cls.startsWith("theme-")) {
        document.documentElement.classList.remove(cls);
      }
    });
  }

  function applyBranding(themeId: string | null) {
    clearBranding();
    if (themeId) {
      document.documentElement.classList.add(`theme-${themeId}`);
    }
  }

  /**
   * ============================
   * Apply theme (único ponto de controle)
   * ============================
   */
  function applyTheme(themeId: string, mode?: Mode) {
    const theme = themes.find((t) => t.id === themeId);
    if (!theme) return;

    // Tema base (light / dark)
    if (themeId === "light" || themeId === "dark") {
      activeBranding.current = null;
      applyBranding(null);
      setTheme(themeId);
      return;
    }

    // Tema com branding
    activeBranding.current = theme.id;
    applyBranding(theme.id);

    const preferredMode = (mode ?? theme.supports[0]) as Mode;
    if (resolvedTheme !== preferredMode) {
      setTheme(preferredMode);
    }
  }

  /**
   * ============================
   * Bootstrap inicial
   * ============================
   */
  useEffect(() => {
    if (!mounted || hasBootstrapped.current) return;

    const defaultThemeId = themeConfig.defaultTheme;
    const defaultTheme = themes.find((t) => t.id === defaultThemeId);

    if (!defaultTheme) {
      hasBootstrapped.current = true;
      return;
    }

    // Caso 1: default é light ou dark puro
    if (defaultTheme.id === "light" || defaultTheme.id === "dark") {
      activeBranding.current = null;
      applyBranding(null);
      setTheme(defaultTheme.id as Mode);
      hasBootstrapped.current = true;
      return;
    }

    // Caso 2: default é um tema de empresa
    activeBranding.current = defaultTheme.id;
    applyBranding(defaultTheme.id);

    const preferredMode = defaultTheme.supports[0] as Mode;
    setTheme(preferredMode);

    hasBootstrapped.current = true;
  }, [mounted, themes, themeConfig.defaultTheme, setTheme]);

  /**
   * ============================
   * Reaplica branding ao mudar light/dark
   * ============================
   */
  useEffect(() => {
    if (!mounted) return;
    applyBranding(activeBranding.current);
  }, [mounted, resolvedTheme]);

  /**
   * ============================
   * Guards
   * ============================
   */
  if (!mounted) return null;
  if (!themeConfig.allowToggle) return null;

  /**
   * ============================
   * Toggle simples (somente light/dark)
   * ============================
   */

  const isPureLightDark =
    themes.length === 2 &&
    themes.every((t) => t.id === "light" || t.id === "dark");

  const isSingleBrandingWithLightDark =
    themes.length === 1 && themes[0].supports?.length === 2;

  const shouldRenderSimpleToggle =
    isPureLightDark || isSingleBrandingWithLightDark;

  if (shouldRenderSimpleToggle) {
    const isDark = resolvedTheme === "dark";

    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle theme"
        className="text-primary hover:text-primary/80 transition-colors"
      >
        {isDark ? (
          <Sun className="h-10 w-10" />
        ) : (
          <Moon className="h-10 w-10" />
        )}
      </Button>
    );
  }

  /**
   * ============================
   * Dropdown (multi-themes)
   * ============================
   */
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          <Palette className="h-10 w-10" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {themes.flatMap((theme) =>
          theme.id === "light" || theme.id === "dark" ? (
            <DropdownMenuItem
              className="cursor-pointer"
              key={theme.id}
              onClick={() => applyTheme(theme.id)}
            >
              {theme.label}
            </DropdownMenuItem>
          ) : (
            theme.supports.map((mode) => (
              <DropdownMenuItem
                className="cursor-pointer"
                key={`${theme.id}-${mode}`}
                onClick={() => applyTheme(theme.id, mode as Mode)}
              >
                {theme.label} · {mode}
              </DropdownMenuItem>
            ))
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

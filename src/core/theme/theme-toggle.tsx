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

const BRANDING_STORAGE_KEY = "theme-branding";

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

  /**
   * ============================
   * Mount
   * ============================
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * ============================
   * Bootstrap branding salvo
   * ============================
   */
  useEffect(() => {
    if (!mounted) return;

    const storedBranding = localStorage.getItem(BRANDING_STORAGE_KEY);
    const isValid = themes.some((t) => t.id === storedBranding);

    if (storedBranding && isValid) {
      activeBranding.current = storedBranding;
      applyBranding(storedBranding);
    }
  }, [mounted, themes]);

  /**
   * ============================
   * Helpers DOM
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
   * Apply Theme (controle único)
   * ============================
   */
  function applyTheme(themeId: string, mode?: Mode) {
    const theme = themes.find((t) => t.id === themeId);
    if (!theme) return;

    // Light / Dark puro
    if (themeId === "light" || themeId === "dark") {
      activeBranding.current = null;
      localStorage.removeItem(BRANDING_STORAGE_KEY);
      applyBranding(null);
      setTheme(themeId);
      return;
    }

    // Tema com branding
    activeBranding.current = theme.id;
    localStorage.setItem(BRANDING_STORAGE_KEY, theme.id);
    applyBranding(theme.id);

    const preferredMode = (mode ?? theme.supports[0]) as Mode;
    setTheme(preferredMode);
  }

  /**
   * ============================
   * Reaplica branding ao trocar mode
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
   * Toggle simples (light/dark)
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
        className="text-primary hover:text-primary/80 transition-colors border"
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
          className="text-primary hover:text-primary/80 transition-colors border"
        >
          <Palette className="h-10 w-10" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {themes.flatMap((theme) =>
          theme.id === "light" || theme.id === "dark" ? (
            <DropdownMenuItem
              key={theme.id}
              className="cursor-pointer"
              onClick={() => applyTheme(theme.id)}
            >
              {theme.label}
            </DropdownMenuItem>
          ) : (
            theme.supports.map((mode) => (
              <DropdownMenuItem
                key={`${theme.id}-${mode}`}
                className="cursor-pointer"
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

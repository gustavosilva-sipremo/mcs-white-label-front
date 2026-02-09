import { useEffect, useState } from "react";
import { useContract } from "../../core/contracts/contract-provider";
import { ThemeToggle } from "../../core/theme/theme-toggle";

export function Header() {
  const contract = useContract();
  const [brandingId, setBrandingId] = useState<string>("default");

  /**
   * Detecta branding ativo a partir da classe do <html>
   */
  useEffect(() => {
    const root = document.documentElement;

    const brandingClass = Array.from(root.classList).find((cls) =>
      cls.startsWith("theme-"),
    );

    if (brandingClass) {
      setBrandingId(brandingClass.replace("theme-", ""));
    } else {
      setBrandingId("default");
    }
  }, []);

  /**
   * Resolve logo por branding (com fallback)
   */
  const logoSrc =
    contract.branding.logo[brandingId as keyof typeof contract.branding.logo] ??
    contract.branding.logo.default;

  return (
    <header className="flex items-center justify-between w-full px-6 py-4 border-b bg-background border-border">
      {/* Logo */}
      <img
        src={logoSrc}
        alt={`${contract.app.name} logo`}
        className="h-10 w-auto select-none dark:invert"
        draggable={false}
      />

      {/* Theme toggle */}
      {contract.theme.allowToggle && <ThemeToggle />}
    </header>
  );
}

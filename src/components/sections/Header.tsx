import { useEffect, useState } from "react";
import { useContract } from "../../core/contracts/contract-provider";
import { ThemeToggle } from "../../core/theme/theme-toggle";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const contract = useContract();
  const [brandingId, setBrandingId] = useState<string>("default");

  useEffect(() => {
    const root = document.documentElement;

    const brandingClass = Array.from(root.classList).find((cls) =>
      cls.startsWith("theme-"),
    );

    setBrandingId(
      brandingClass ? brandingClass.replace("theme-", "") : "default",
    );
  }, []);

  const logoSrc =
    contract.branding.logo[brandingId as keyof typeof contract.branding.logo] ??
    contract.branding.logo.default;

  return (
    <header className="flex items-center w-full gap-4 px-6 py-4 border-b bg-background border-border">
      {/* Menu hamburger */}
      <button
        type="button"
        aria-label="Abrir menu"
        onClick={onMenuClick}
        className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors"
      >
        {/* Ícone hamburger simples (sem lib) */}
        <span className="sr-only">Abrir menu</span>
        <div className="space-y-1">
          <span className="block h-0.5 w-5 bg-primary" />
          <span className="block h-0.5 w-5 bg-primary" />
          <span className="block h-0.5 w-5 bg-primary" />
        </div>
      </button>

      {/* Logo */}
      <img
        src={logoSrc}
        alt={`${contract.app.name} logo`}
        className="h-10 w-auto select-none dark:invert"
        draggable={false}
      />

      <div className="flex-1" />

      {contract.theme.allowToggle && <ThemeToggle />}
    </header>
  );
}

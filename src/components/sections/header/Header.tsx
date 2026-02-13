import { useContract } from "@/core/contracts/contract-provider";
import { ThemeToggle } from "@/core/theme/theme-toggle";
import { BrandingLogo } from "@/components/others/BrandingLogo";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const contract = useContract();

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
      <BrandingLogo className="w-32 h-auto" />

      <div className="flex-1" />

      {contract.theme.allowToggle && <ThemeToggle />}
    </header>
  );
}

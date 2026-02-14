import { useContract } from "@/core/contracts/contract-provider";
import { BrandingLogo } from "@/components/others/BrandingLogo";
import { Toolbar } from "@/components/sections/header/Toolbar";
import { Profile } from "@/components/sections/header/Profile";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const contract = useContract();

  // Exemplo de usuário, você pode puxar do contract ou contexto
  const user = {
    name: "Gustavo Silva",
    accountType: "Sipremo",
  };

  return (
    <header className="flex items-center w-full gap-4 px-6 py-4 border-b bg-background border-border shadow-sm">
      {/* Menu hamburger */}
      <button
        type="button"
        aria-label="Abrir menu"
        onClick={onMenuClick}
        className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors"
      >
        <span className="sr-only">Abrir menu</span>
        <div className="space-y-1">
          <span className="block h-0.5 w-5 bg-primary" />
          <span className="block h-0.5 w-5 bg-primary" />
          <span className="block h-0.5 w-5 bg-primary" />
        </div>
      </button>

      {/* Logo */}
      <a href="/">
        <BrandingLogo className="w-32 h-auto" />
      </a>

      <div className="flex-1" />

      {/* Toolbar: idioma, mapa, tema */}
      <Toolbar allowThemeToggle={contract.theme.allowToggle} />

      {/* Profile */}
      <Profile name={user.name} accountType={user.accountType} />
    </header>
  );
}

import { Menu } from "lucide-react";
import { useContract } from "@/core/contracts/contract-provider";
import { getBrandingLogoClass } from "@/lib/utils";
import { BrandingLogo } from "@/components/others/BrandingLogo";
import { Toolbar } from "@/components/sections/header/Toolbar";
import { Profile } from "@/components/sections/header/Profile";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const contract = useContract();

  const user = {
    name: "Gustavo Silva",
    accountType: "Sipremo",
  };

  const logoClass = getBrandingLogoClass(contract);

  return (
    <header className="flex items-center w-full gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b bg-background border-border shadow-sm overflow-hidden max-h-20">
      {/* Menu */}
      <button
        type="button"
        aria-label="Abrir menu"
        onClick={onMenuClick}
        className="flex items-center border justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors"
      >
        <Menu className="w-6 h-6 text-primary" />
      </button>

      {/* Logo */}
      <a href="/" draggable={false} className="flex-shrink-0">
        <BrandingLogo
          className={`hidden sm:block h-auto ${logoClass}`}
        />
      </a>

      <div className="flex-1" />

      {/* Toolbar */}
      <Toolbar
        allowThemeToggle={contract.theme.allowToggle}
        compactMobile
      />

      {/* Profile */}
      <Profile
        name={user.name}
        accountType={user.accountType}
      />
    </header>
  );
}
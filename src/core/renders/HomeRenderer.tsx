import { useContract } from "../contracts/contract-provider";
import { ThemeToggle } from "../theme/theme-toggle";
import { useEffect, useState } from "react";

export function HomeRenderer() {
  const contract = useContract();
  const [brandingId, setBrandingId] = useState<string>("default");

  /**
   * Guard de render
   */
  if (!contract.renders.home?.enabled) {
    return null;
  }

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
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      {/* Logo */}
      <img
        src={logoSrc}
        alt={`${contract.app.name} logo`}
        className="h-28 text-primary w-auto select-none dark:invert"
        draggable={false}
      />

      {/* Texto Teste */}
      <div className="max-w-md p-6 mx-auto transition-colors duration-300 border-2 rounded-xl bg-card text-card-foreground border-primary shadow-sm hover:shadow-md">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-primary">
          Lorem Ipsum
        </h1>
        <p className="text-sm leading-relaxed text-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fuga
          reprehenderit, dolorum est esse veritatis assumenda tempora
          repellendus tenetur asperiores molestias aspernatur sint a
          exercitationem similique laudantium sequi? Dolore, porro!
        </p>
      </div>

      {/* Theme toggle */}
      <ThemeToggle />
    </main>
  );
}

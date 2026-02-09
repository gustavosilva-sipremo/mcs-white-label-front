import { ReactNode } from "react";
import { Header } from "../../../components/sections/Header";
import { useContract } from "../../contracts/contract-provider";

interface LayoutRendererProps {
  children: ReactNode;
}

export function LayoutRenderer({ children }: LayoutRendererProps) {
  const contract = useContract();

  /**
   * Flags de layout (controladas por contrato no futuro)
   */
  const showHeader = true;
  const showFooter = true;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      {showHeader && <Header />}

      {/* Conteúdo principal */}
      <main role="main" className="flex flex-1 flex-col focus:outline-none">
        {children}
      </main>

      {/* Footer */}
      {showFooter && (
        <footer className="border-t border-border p-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {contract.app.name}
        </footer>
      )}
    </div>
  );
}

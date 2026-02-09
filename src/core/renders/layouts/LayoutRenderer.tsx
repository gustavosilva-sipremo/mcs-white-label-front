import { ReactNode, useState } from "react";
import { Header } from "@/components/sections/Header";
import { Sidebar } from "@/components/sections/Sidebar";
import { useContract } from "@/core/contracts/contract-provider";

interface LayoutRendererProps {
  children: ReactNode;
}

export function LayoutRenderer({ children }: LayoutRendererProps) {
  const contract = useContract();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /**
   * Flags de layout (controladas por contrato no futuro)
   */
  const showHeader = true;
  const showFooter = true;
  const showSidebar = true;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      {showSidebar && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          {/* Conteúdo provisório do menu */}
          <a className="px-3 py-2 rounded hover:bg-muted" href="#">
            Home
          </a>
          <a className="px-3 py-2 rounded hover:bg-muted" href="#">
            Relatórios
          </a>
        </Sidebar>
      )}

      {/* Área principal */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        {showHeader && <Header onMenuClick={() => setSidebarOpen(true)} />}

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
    </div>
  );
}

import { ReactNode, useCallback, useState } from "react";
import { Header } from "@/components/sections/Header";
import { Sidebar } from "@/components/sections/Sidebar";
import { useContract } from "@/core/contracts/contract-provider";

interface LayoutRendererProps {
  children: ReactNode;
}

export function LayoutRenderer({ children }: LayoutRendererProps) {
  const { app } = useContract();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Sidebar (overlay, não ocupa layout) */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar}>
        <nav className="flex flex-col gap-1">
          <a
            href="/"
            className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
          >
            Home
          </a>
          <hr />
          <a
            href="/users"
            className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
          >
            Usuários
          </a>
        </nav>
      </Sidebar>

      {/* Área principal */}
      <div className="flex min-h-screen flex-col">
        <Header onMenuClick={openSidebar} />

        <main
          role="main"
          tabIndex={-1}
          className="flex flex-1 flex-col outline-none"
        >
          {children}
        </main>

        <footer className="border-t border-border bg-background px-6 py-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {app.name}
        </footer>
      </div>
    </div>
  );
}

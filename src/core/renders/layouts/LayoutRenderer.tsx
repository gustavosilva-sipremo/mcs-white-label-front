import { ReactNode, useCallback, useState } from "react";
import { Header } from "@/components/sections/Header";
import { Sidebar } from "@/components/sections/Sidebar";
import { useContract } from "@/core/contracts/contract-provider";

interface LayoutRendererProps {
  children: ReactNode;
}

interface SidebarCategory {
  title: string;
  links: { label: string; href: string }[];
}

const sidebarCategories: SidebarCategory[] = [
  {
    title: "Geral",
    links: [
      { label: "Home", href: "/" },
      { label: "Relatórios", href: "/reports" },
    ],
  },
  {
    title: "Gestão",
    links: [
      { label: "Usuários", href: "/users" },
      { label: "Notificados", href: "/notify" },
    ],
  },
];

export function LayoutRenderer({ children }: LayoutRendererProps) {
  const { app } = useContract();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Sidebar (overlay, não ocupa layout) */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar}>
        <nav className="flex flex-col gap-4 p-3">
          {sidebarCategories.map((category) => (
            <div key={category.title}>
              <p className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
                {category.title}
              </p>
              <hr />
              <div className="flex flex-col gap-1 mt-2">
                {category.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
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

import { useCallback, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/sections/Header";
import { Sidebar } from "@/components/sections/Sidebar";
import { useContract } from "@/core/contracts/contract-provider";

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

function PageLoader({ loading }: { loading: boolean }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed top-0 left-0 h-1 bg-primary z-50"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
}

export function LayoutRenderer() {
  const { app } = useContract();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  // Detecta mudança de rota para ativar carregamento
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300); // simula carregamento mínimo
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <PageLoader loading={loading} />

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

      <div className="flex min-h-screen flex-col">
        <Header onMenuClick={openSidebar} />

        <main
          role="main"
          tabIndex={-1}
          className="flex flex-1 flex-col outline-none relative overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col flex-1"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="border-t border-border bg-background px-6 py-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {app.name}
        </footer>
      </div>
    </div>
  );
}

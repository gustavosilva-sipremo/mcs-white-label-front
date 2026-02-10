import { useCallback, useState, useEffect, JSX } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/sections/Header";
import { Sidebar } from "@/components/sections/Sidebar";
import { useContract } from "@/core/contracts/contract-provider";

import {
  Home,
  FileText,
  Users,
  UserCheck,
  UserPlus,
  File,
  Beaker,
  LogIn,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Tipos ---
interface SidebarLink {
  label: string;
  href: string;
  icon: JSX.Element;
}

interface SidebarCategory {
  title: string;
  links: SidebarLink[];
}

// --- Categorias ---
const sidebarCategories: SidebarCategory[] = [
  {
    title: "Geral",
    links: [
      { label: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
      {
        label: "Relatórios",
        href: "/reports",
        icon: <FileText className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "Gestão",
    links: [
      {
        label: "Usuários",
        href: "/users",
        icon: <Users className="w-5 h-5" />,
      },
      {
        label: "Usuários Externos",
        href: "/external-users",
        icon: <UserPlus className="w-5 h-5" />,
      },
      {
        label: "Equipes",
        href: "/teams",
        icon: <UserCheck className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "Configurações",
    links: [
      {
        label: "Formulários",
        href: "/forms",
        icon: <File className="w-5 h-5" />,
      },
      { label: "Testes", href: "/tests", icon: <Beaker className="w-5 h-5" /> },
    ],
  },
  {
    title: "Acesso",
    links: [
      { label: "Login", href: "/login", icon: <LogIn className="w-5 h-5" /> },
      { label: "Sair", href: "/logout", icon: <LogOut className="w-5 h-5" /> },
    ],
  },
];

// --- Loader da página ---
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

// --- Layout Principal ---
export function LayoutRenderer() {
  const { app } = useContract();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <PageLoader loading={loading} />

      {/* --- Sidebar --- */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar}>
        {sidebarCategories.map((category) => (
          <div key={category.title}>
            <p className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
              {category.title}
            </p>
            <hr className="border-border mb-2" />
            <div className="flex flex-col gap-1">
              {category.links.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold scale-105"
                        : "hover:bg-muted hover:scale-105",
                    )}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </Sidebar>

      {/* --- Conteúdo Principal --- */}
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

import { useCallback, useState, JSX } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Header } from "@/components/sections/header/Header";
import { Sidebar } from "@/components/sections/sidebar/Sidebar";
import { PageLoader } from "@/components/others/PageLoader";
import { Footer } from "@/components/sections/footer/Footer";

import {
  Home,
  Users,
  UserCheck,
  LogOut,
  MessageCircleMore,
  FlaskConical,
  UserLock,
  ChartLine,
  FileText,
  Building2,
  Blocks,
  ClipboardPen,
  Workflow,
} from "lucide-react";

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

// --- Categorias do Sidebar ---
const sidebarCategories: SidebarCategory[] = [
  {
    title: "Geral",
    links: [
      { label: "Página Inicial", href: "/", icon: <Home className="w-5 h-5" /> },
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
        icon: <UserLock className="w-5 h-5" />,
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
        label: "Questionários",
        href: "/questions",
        icon: <ClipboardPen className="w-5 h-5" />,
      },
      {
        label: "Mensagens",
        href: "/messages",
        icon: <MessageCircleMore className="w-5 h-5" />,
      },
      {
        label: "Fluxos",
        href: "/flows",
        icon: <Workflow className="w-5 h-5" />,
      },
      { label: "Testes", href: "/tests", icon: <FlaskConical className="w-5 h-5" /> },
    ],
  },
  {
    title: "Informações",
    links: [
      {
        label: "Relatórios",
        href: "/reports",
        icon: <ChartLine className="w-5 h-5" />,
      },
      {
        label: "Documentos",
        href: "/documents",
        icon: <FileText className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "Sipremo",
    links: [
      {
        label: "Empresas",
        href: "/companies",
        icon: <Building2 className="w-5 h-5" />,
      },
      {
        label: "Contratos",
        href: "/contracts",
        icon: <Blocks className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "Acesso",
    links: [
      { label: "Sair", href: "/logout", icon: <LogOut className="w-5 h-5 text-red-500" /> },
    ],
  },
];

// --- Layout Principal ---
export function DashLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  // força o PageLoader a remontar a cada troca de rota
  const loaderKey = location.pathname;

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <PageLoader key={loaderKey} />

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

        <Footer />
      </div>
    </div>
  );
}

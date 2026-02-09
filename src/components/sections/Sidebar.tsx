import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export function Sidebar({ isOpen, onClose, children }: SidebarProps) {
  return (
    <>
      {/* Overlay (mobile / drawer) */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-border bg-background shadow-xl",
          "transform transition-transform duration-300 ease-out",
          "lg:static lg:translate-x-0 lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-hidden={!isOpen}
      >
        {/* Header interno do sidebar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="text-sm font-semibold tracking-wide text-foreground">
            Menu
          </span>

          {/* Botão fechar (mobile) */}
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
            aria-label="Fechar menu"
          >
            ✕
          </button>
        </div>

        {/* Conteúdo do sidebar */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {children ?? (
            <span className="px-2 text-sm text-muted-foreground">
              Sidebar vazia
            </span>
          )}
        </nav>
      </aside>
    </>
  );
}

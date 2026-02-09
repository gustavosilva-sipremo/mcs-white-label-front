import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export function Sidebar({ isOpen, onClose, children }: SidebarProps) {
  /**
   * ESC fecha a sidebar
   * + trava scroll do body
   */
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm",
          "transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Sidebar */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu lateral"
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-72 flex-col",
          "bg-background border-r border-border shadow-2xl",
          "transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header interno */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="text-sm font-semibold tracking-wide">Menu</span>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Fechar menu"
          >
            ✕
          </button>
        </div>

        {/* Conteúdo */}
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

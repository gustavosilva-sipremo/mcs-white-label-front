import { User, Plus } from "lucide-react";

export function UsersRenderer() {
  return (
    <section className="flex flex-1 flex-col gap-8 p-6">
      {/* Header da página */}
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Usuários
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Gerencie os usuários do sistema, permissões e status de acesso.
        </p>
      </header>

      {/* Container principal (futuro DataTable) */}
      <div className="relative flex flex-1 flex-col rounded-xl border border-border bg-card shadow-sm">
        {/* Top bar (ações futuras) */}
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          <span className="text-sm font-medium text-foreground">
            Lista de usuários
          </span>

          {/* Ação principal */}
          <button
            type="button"
            disabled
            className="
              inline-flex items-center gap-2 rounded-md
              bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground
              transition-all
              hover:bg-primary/90 hover:shadow-sm
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            <Plus className="h-4 w-4" />
            Novo usuário
          </button>
        </div>

        {/* Empty state / conteúdo */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-7 w-7" />
          </div>

          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Nenhum usuário cadastrado
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Quando houver usuários, eles aparecerão listados aqui.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

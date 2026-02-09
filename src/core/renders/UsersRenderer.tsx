import { User, Plus, Download, FileText, FileSpreadsheet } from "lucide-react";
import { UsersTable } from "@/components/others/users-table";
import { mockUsers } from "@/mocks/mock-users";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UsersRenderer() {
  const hasUsers = mockUsers.length > 0;

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

      {/* Container principal */}
      <div className="relative flex flex-1 flex-col rounded-xl border border-border bg-card shadow-sm">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <span className="text-sm font-medium text-foreground">
            Lista de usuários
          </span>

          {/* Ações */}
          <div className="flex items-center gap-2">
            {/* Exportar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled>
                <Button variant="outline" size="sm" disabled className="gap-2">
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled className="gap-2">
                  <FileText className="h-4 w-4" />
                  Exportar como PDF
                </DropdownMenuItem>

                <DropdownMenuItem disabled className="gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  Exportar como CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Novo usuário */}
            <Button size="sm" disabled className="gap-2">
              <Plus className="h-4 w-4" />
              Novo usuário
            </Button>
          </div>
        </div>

        {/* Conteúdo */}
        {hasUsers ? (
          <div className="flex-1 p-4">
            <UsersTable data={mockUsers} />
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}

import { useState } from "react";
import { User, Plus, FileSpreadsheet } from "lucide-react";

import { UsersTable } from "@/components/sections/forms/users/table/UsersTable";
import { CreateInternalUserModal } from "@/components/sections/forms/users/modal/CreateInternalUserModal";
import { mockUsers } from "@/mocks/mock-users";

import { Button } from "@/components/ui/button";

export function UsersRenderer() {
  const hasUsers = mockUsers.length > 0;
  const [openCreateUser, setOpenCreateUser] = useState(false);

  // Função simples para exportar CSV
  const handleExportCSV = () => {
    if (!mockUsers.length) return;

    const headers = Object.keys(mockUsers[0]);
    const csvRows = [
      headers.join(","), // cabeçalho
      ...mockUsers.map((row) =>
        headers.map((field) => `"${(row as any)[field]}"`).join(","),
      ),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "usuarios.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="flex flex-1 flex-col gap-8 p-6">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Usuários
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Gerencie os usuários do sistema, permissões e status de acesso.
        </p>
      </header>

      {/* Container */}
      <div className="relative flex flex-1 flex-col rounded-xl border border-border bg-card shadow-sm">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <span className="text-sm font-medium text-foreground">
            Lista de usuários
          </span>

          {/* Ações */}
          <div className="flex items-center gap-2">
            {/* Exportar CSV */}
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleExportCSV}
              disabled={!hasUsers}
            >
              <FileSpreadsheet className="h-4 w-4" />
              Exportar CSV
            </Button>

            {/* Novo usuário */}
            <Button
              size="sm"
              className="gap-2"
              onClick={() => setOpenCreateUser(true)}
            >
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

      {/* Modal genérico */}
      <CreateInternalUserModal
        open={openCreateUser}
        onOpenChange={setOpenCreateUser}
      />
    </section>
  );
}

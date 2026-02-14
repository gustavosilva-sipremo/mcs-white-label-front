import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { UserModel } from "@/mocks/mock-users";

export const usersColumns: ColumnDef<UserModel>[] = [
  {
    id: "actions",
    header: () => (
      <div className="text-center font-medium text-muted-foreground">Ações</div>
    ),
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex justify-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label={`Editar ${user.username}`}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:bg-destructive/10"
            aria-label={`Excluir ${user.username}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  },

  {
    accessorKey: "username",
    header: "Usuário",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("username")}</span>
    ),
  },

  {
    accessorKey: "name",
    header: "Nome",
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("email")}</span>
    ),
  },

  {
    accessorKey: "phone",
    header: "Telefone",
  },

  {
    accessorKey: "sector",
    header: "Setor",
  },

  {
    accessorKey: "function",
    header: "Função",
  },

  {
    accessorKey: "accountType",
    header: "Tipo",
    cell: ({ row }) => {
      const value = row.getValue<string>("accountType");

      // Map de tipos de usuário para labels e cores (raridade/importância)
      const accountTypeMap: Record<
        string,
        { label: string; className: string }
      > = {
        common: { label: "Comum", className: "bg-gray-200 text-gray-800" }, // Cinza
        admin: { label: "Administrador", className: "bg-blue-600 text-white" }, // Azul
        guest: { label: "Convidado", className: "bg-purple-500 text-white" }, // Roxo
        sipremo: { label: "Sipremo", className: "bg-red-500 text-white" }, // Vermelho
      };

      const typeInfo = accountTypeMap[value] ?? {
        label: value,
        className: "bg-gray-300 text-gray-800",
      };

      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${typeInfo.className}`}
        >
          {typeInfo.label}
        </span>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("createdAt")}
      </span>
    ),
  },

  {
    accessorKey: "updatedAt",
    header: "Atualizado em",
    cell: ({ row }) => (
      <span className="text-sm text-primary">{row.getValue("updatedAt")}</span>
    ),
  },
];

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
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
      const value = row.getValue<"admin" | "user">("accountType");

      return (
        <Badge variant={value === "admin" ? "default" : "secondary"}>
          {value === "admin" ? "Administrador" : "Comum"}
        </Badge>
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

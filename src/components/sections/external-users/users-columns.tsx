import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { UserModel } from "@/mocks/mock-external-users";

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
            aria-label={`Editar ${user.name}`}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:bg-destructive/10"
            aria-label={`Excluir ${user.name}`}
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
    accessorKey: "department",
    header: "Setor",
  },

  {
    accessorKey: "role",
    header: "Função",
  },

  {
    accessorKey: "accountType",
    header: "Tipo",
    cell: ({ row }) => {
      const value = row.original.accountType;

      const typeMap: Record<
        UserModel["accountType"],
        { label: string; variant: "default" | "secondary" | "destructive" }
      > = {
        official: { label: "Oficial", variant: "default" },
        user: { label: "Usuário", variant: "secondary" },
        area: { label: "Área", variant: "destructive" },
      };

      const typeInfo = typeMap[value] ?? {
        label: "Desconhecido",
        variant: "secondary",
      };

      return <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>;
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

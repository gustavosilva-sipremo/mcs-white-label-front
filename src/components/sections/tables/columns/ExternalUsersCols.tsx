import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { UserModel } from "@/mocks/mock-external-users";
import {
  createActionsColumn,
  textColumn,
  dateColumn,
  SortableHeader,
} from "./CommonColumns";
import { getAccountTypeLabel } from "@/lib/utils";

export const usersColumns: ColumnDef<UserModel>[] = [
  createActionsColumn<UserModel>(),

  textColumn<UserModel>("name", "Nome"),
  textColumn<UserModel>("email", "Email", { muted: true }),
  textColumn<UserModel>("phone", "Telefone"),
  textColumn<UserModel>("sector", "Setor"),
  textColumn<UserModel>("function", "Função"),

  {
    accessorKey: "accountType",
    header: ({ column }) => (
      <SortableHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => {
      const variantMap = {
        official: "default",
        user: "secondary",
        area: "destructive",
      } as const;

      const value = row.original.accountType;

      return (
        <Badge variant={variantMap[value] ?? "secondary"}>
          {getAccountTypeLabel(value)}
        </Badge>
      );
    },
    enableSorting: true,
  },


  dateColumn<UserModel>("createdAt", "Criado em"),
  dateColumn<UserModel>("updatedAt", "Atualizado em", "primary"),
];

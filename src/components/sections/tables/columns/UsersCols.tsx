import { ColumnDef } from "@tanstack/react-table";
import { UserModel } from "@/mocks/mock-users";
import {
  createActionsColumn,
  textColumn,
  dateColumn,
  SortableHeader,
} from "./CommonColumns";
import { getAccountTypeLabel } from "@/lib/utils";

export const usersColumns: ColumnDef<UserModel>[] = [
  createActionsColumn<UserModel>(),

  textColumn<UserModel>("username", "Usuário", { bold: true }),
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
      const value = row.getValue<string>("accountType");

      const classMap: Record<string, string> = {
        common: "bg-gray-200 text-gray-800",
        admin: "bg-blue-600 text-white",
        guest: "bg-purple-500 text-white",
        sipremo: "bg-red-500 text-white",
      };

      return (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${classMap[value] ?? "bg-gray-300 text-gray-800"
            }`}
        >
          {getAccountTypeLabel(value)}
        </span>
      );
    },
    enableSorting: true,
  },

  dateColumn<UserModel>("createdAt", "Criado em"),
  dateColumn<UserModel>("updatedAt", "Atualizado em", "primary"),
];

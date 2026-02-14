import { DataTable } from "./DataTable";
import { usersColumns } from "./users-columns";
import { UserModel } from "@/mocks/mock-users";

const searchableColumns = [
  { label: "Usuário", value: "username" },
  { label: "Nome", value: "name" },
  { label: "Email", value: "email" },
  { label: "Setor", value: "sector" },
  { label: "Função", value: "function" },
] satisfies { label: string; value: keyof UserModel }[];

export function UsersTable({ data }: { data: UserModel[] }) {
  return (
    <DataTable
      data={data}
      columns={usersColumns}
      searchableColumns={searchableColumns}
    />
  );
}

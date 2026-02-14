import { DataTable } from "./DataTable";
import { usersColumns } from "@/components/sections/external-users/users-columns";
import { UserModel } from "@/mocks/mock-external-users";

const searchableColumns = [
  { label: "Nome", value: "name" },
  { label: "Email", value: "email" },
  { label: "Setor", value: "sector" },
  { label: "Função", value: "function" },
  { label: "Tipo", value: "accountType" },
] satisfies { label: string; value: keyof UserModel }[];

export function ExternalUsersTable({ data }: { data: UserModel[] }) {
  return (
    <DataTable
      data={data}
      columns={usersColumns}
      searchableColumns={searchableColumns}
    />
  );
}

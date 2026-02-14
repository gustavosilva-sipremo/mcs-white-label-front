import { UsersSection } from "@/components/sections/users/UsersSection";
import { ExternalUsersTable } from "@/components/sections/tables/ExternalUsersTable";
import { CreateExternalUserModal } from "@/components/sections/forms/users/modal/CreateExternalUserModal";
import { mockUsers } from "@/mocks/mock-external-users";
import { exportCSV } from "@/lib/utils";

export function ExternalUsersRenderer() {
  return (
    <UsersSection
      title="Usuários Externos"
      description="Gerencie os usuários externos, órgãos oficiais e áreas de trabalho."
      table={ExternalUsersTable}
      modal={CreateExternalUserModal}
      mockData={mockUsers}
      exportCSV={() => exportCSV(mockUsers, "usuarios_externos.csv")}
    />
  );
}

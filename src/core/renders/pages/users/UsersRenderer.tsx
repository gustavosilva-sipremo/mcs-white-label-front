import { UsersSection } from "@/components/sections/users/UsersSection";
import { UsersTable } from "@/components/sections/tables/UsersTable";
import { CreateInternalUserModal } from "@/components/sections/forms/users/modal/CreateInternalUserModal";
import { mockUsers } from "@/mocks/mock-users";
import { exportCSV } from "@/lib/utils";

export function UsersRenderer() {
  return (
    <UsersSection
      title="Usuários"
      description="Gerencie os usuários do sistema, permissões e status de acesso."
      table={UsersTable}
      modal={CreateInternalUserModal}
      mockData={mockUsers}
      exportCSV={() => exportCSV(mockUsers, "usuarios.csv")}
    />
  );
}

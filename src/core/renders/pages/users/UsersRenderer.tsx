import { UsersSection } from "@/components/sections/users/UsersSection";
import { UsersTable } from "@/components/sections/tables/UsersTable";
import { CreateInternalUserModal } from "@/components/sections/forms/users/modal/CreateInternalUserModal";
import { mockUsers } from "@/mocks/mock-users";

export function UsersRenderer() {
  const handleExportCSV = () => {
    if (!mockUsers.length) return;
    const headers = Object.keys(mockUsers[0]);
    const csvRows = [
      headers.join(","),
      ...mockUsers.map((row) =>
        headers.map((field) => `"${(row as any)[field]}"`).join(",")
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
    <UsersSection
      title="Usuários"
      description="Gerencie os usuários do sistema, permissões e status de acesso."
      table={UsersTable}
      modal={CreateInternalUserModal}
      mockData={mockUsers}
      exportCSV={handleExportCSV}
    />
  );
}

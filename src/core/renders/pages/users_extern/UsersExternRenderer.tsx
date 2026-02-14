import { UsersSection } from "@/components/sections/users/UsersSection";
import { ExternalUsersTable } from "@/components/sections/tables/ExternalUsersTable";
import { CreateExternalUserModal } from "@/components/sections/forms/users/modal/CreateExternalUserModal";
import { mockUsers } from "@/mocks/mock-external-users";


export function ExternalUsersRenderer() {
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
    link.setAttribute("download", "usuarios_externos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <UsersSection
      title="Usuários Externos"
      description="Gerencie os usuários externos, órgãos oficiais e áreas de trabalho."
      table={ExternalUsersTable}
      modal={CreateExternalUserModal}
      mockData={mockUsers}
      exportCSV={handleExportCSV}
    />
  );
}

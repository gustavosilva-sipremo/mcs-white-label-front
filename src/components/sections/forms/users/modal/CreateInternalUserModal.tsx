// /modal/CreateInternalUserModal.tsx
import { CreateUserModalBase } from "./CreateUserModalBase";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateInternalUserModal({ open, onOpenChange }: Props) {
  return (
    <CreateUserModalBase
      open={open}
      onOpenChange={onOpenChange}
      title="Novo usuário"
      description="Preencha as informações para criar um novo usuário interno."
      requiredFields={["name", "username", "accountType", "password"]}
      accountOptions={[
        { value: "admin", label: "Administrador" },
        { value: "common", label: "Usuário comum" },
      ]}
      withUsername
      withPassword
      onSubmit={(data) => {
        console.log("Usuário interno:", data);
      }}
    />
  );
}

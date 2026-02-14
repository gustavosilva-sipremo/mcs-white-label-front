// /modal/CreateExternalUserModal.tsx
import { CreateUserModalBase } from "./CreateUserModalBase";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateExternalUserModal({ open, onOpenChange }: Props) {
  return (
    <CreateUserModalBase
      open={open}
      onOpenChange={onOpenChange}
      title="Novo usuário externo"
      description="Crie um usuário externo ao sistema."
      requiredFields={["name", "accountType"]}
      accountOptions={[
        { value: "official", label: "Órgãos Oficiais" },
        { value: "user", label: "Usuário" },
        { value: "area", label: "Área" },
      ]}
      onSubmit={(data) => {
        console.log("Usuário externo:", data);
      }}
    />
  );
}

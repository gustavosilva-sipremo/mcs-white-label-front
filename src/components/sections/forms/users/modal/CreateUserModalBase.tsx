// /modal/CreateUserModalBase.tsx
import { useState } from "react";
import { UserPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { PhoneInput } from "@/components/sections/forms/users/inputs/PhoneInput";
import { TextInput } from "@/components/sections/forms/users/inputs/TextInput";
import { EmailInput } from "@/components/sections/forms/users/inputs/EmailInput";
import { AccountTypeSelect } from "@/components/sections/forms/users/inputs/AccountTypeSelect";

import { PasswordFields } from "@/components/sections/forms/users/fields/PasswordFields";
import { Responsibilities } from "@/components/sections/forms/users/fields/Responsibilities";
import { Label } from "@/components/ui/label";

interface BaseFormData {
  name: string;
  username?: string;
  email?: string;
  phone?: string;
  sectors: string[];
  functions: string[];
  accountType: string;
  password?: string;
  confirmPassword?: string;
}

interface CreateUserModalBaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description?: string;

  requiredFields: (keyof BaseFormData)[];
  accountOptions: { value: string; label: string }[];

  withUsername?: boolean;
  withPassword?: boolean;

  onSubmit: (data: BaseFormData) => void;
}

export function CreateUserModalBase({
  open,
  onOpenChange,
  title,
  description,
  requiredFields,
  accountOptions,
  withUsername = false,
  withPassword = false,
  onSubmit,
}: CreateUserModalBaseProps) {
  const initialState: BaseFormData = {
    name: "",
    username: "",
    email: "",
    phone: "",
    sectors: [],
    functions: [],
    accountType: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState<BaseFormData>(initialState);

  const handleChange = <K extends keyof BaseFormData>(
    field: K,
    value: string | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value as any }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const missing = requiredFields.filter((field) => {
      const val = formData[field];
      return Array.isArray(val) ? val.length === 0 : !val;
    });

    if (missing.length > 0) {
      alert(`Preencha os campos obrigatórios: ${missing.join(", ")}`);
      return;
    }

    onSubmit(formData);
    onOpenChange(false);
    setFormData(initialState);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setFormData(initialState);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <UserPlus className="h-5 w-5 text-primary" />
            {title}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInput
              label="Nome completo"
              required
              value={formData.name}
              onChange={(val) => handleChange("name", val)}
            />

            {withUsername && (
              <TextInput
                label="Usuário"
                required
                value={formData.username ?? ""}
                onChange={(val) => handleChange("username", val)}
              />
            )}

            <EmailInput
              label="E-mail"
              value={formData.email ?? ""}
              onChange={(val) => handleChange("email", val)}
            />

            <div className="space-y-2">
              <Label>Telefone</Label>
              <PhoneInput
                value={formData.phone ?? ""}
                onChange={(val) => handleChange("phone", val)}
              />
            </div>

            <AccountTypeSelect
              label="Tipo de conta"
              required
              value={formData.accountType}
              options={accountOptions}
              onChange={(val) => handleChange("accountType", val)}
            />
          </div>

          <Responsibilities
            sectors={formData.sectors}
            functions={formData.functions}
            onChange={(field, value) => handleChange(field, value)}
          />

          {withPassword && (
            <div className="rounded-lg border border-border p-4">
              <PasswordFields
                password={formData.password ?? ""}
                confirmPassword={formData.confirmPassword ?? ""}
                onChange={(field, value) => handleChange(field, value)}
                horizontal={false}
                showMismatchError={true}
              />
            </div>
          )}

          <DialogFooter className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit">Criar usuário</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

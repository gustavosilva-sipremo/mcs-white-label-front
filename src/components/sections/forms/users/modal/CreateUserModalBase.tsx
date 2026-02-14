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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { PhoneInput } from "@/components/sections/forms/users/PhoneInput";
import { PasswordFields } from "@/components/sections/forms/users/PasswordFields";
import { Responsibilities } from "@/components/sections/forms/users/Responsibilities";

interface BaseFormData {
  name: string;
  username?: string;
  email?: string;
  phone?: string;
  sectors: string[];
  roles: string[];
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
    roles: [],
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
            <div className="space-y-2">
              <Label>Nome completo *</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            {withUsername && (
              <div className="space-y-2">
                <Label>Usuário *</Label>
                <Input
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>E-mail</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Telefone</Label>
              <PhoneInput
                value={formData.phone ?? ""}
                onChange={(value) => handleChange("phone", value)}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Tipo de conta *</Label>
              <Select
                value={formData.accountType}
                onValueChange={(value) => handleChange("accountType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {accountOptions.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="cursor-pointer"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Responsibilities
            sectors={formData.sectors}
            roles={formData.roles}
            onChange={(field, value) => handleChange(field, value)}
          />

          {withPassword && (
            <div className="rounded-lg border border-border p-4">
              <PasswordFields
                password={formData.password ?? ""}
                confirmPassword={formData.confirmPassword ?? ""}
                onChange={(field, value) => handleChange(field, value)}
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

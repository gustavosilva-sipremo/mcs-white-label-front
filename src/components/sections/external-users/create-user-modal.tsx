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

import { PhoneInput } from "@/components/others/PhoneInput";
import { Responsibilities } from "@/components/others/Responsibilities";

interface CreateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  sectors: string[];
  roles: string[];
  accountType: string;
}

export function CreateExternalUserModal({
  open,
  onOpenChange,
}: CreateUserModalProps) {
  const initialState: FormData = {
    name: "",
    email: "",
    phone: "",
    sectors: [],
    roles: [],
    accountType: "",
  };

  const [formData, setFormData] = useState<FormData>(initialState);

  const handleChange = <K extends keyof FormData>(
    field: K,
    value: string | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value as any }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields: (keyof FormData)[] = ["name", "accountType"];

    const missing = requiredFields.filter((field) => {
      const val = formData[field];
      return Array.isArray(val) ? val.length === 0 : !val;
    });

    if (missing.length > 0) {
      alert(`Preencha os campos obrigatórios: ${missing.join(", ")}`);
      return;
    }

    console.log("Novo usuário:", formData);
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
            Novo usuário externo
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Preencha as informações abaixo para criar um novo usuário no
            sistema.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados principais */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Nome completo *</Label>
              <Input
                placeholder="Ex: Gustavo Silva"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>E-mail</Label>
              <Input
                type="email"
                placeholder="email@empresa.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Telefone</Label>
              <PhoneInput
                value={formData.phone}
                onChange={(value) => handleChange("phone", value)}
              />
            </div>

            {/* Tipo de conta */}
            <div className="space-y-2 sm:col-span-2">
              <Label>Tipo de conta *</Label>
              <Select
                value={formData.accountType}
                onValueChange={(value) => handleChange("accountType", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o tipo de conta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="official">Órgãos Oficiais</SelectItem>
                  <SelectItem value="user">Usuário</SelectItem>
                  <SelectItem value="area">Área</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Responsabilidades */}
          <Responsibilities
            sectors={formData.sectors}
            roles={formData.roles}
            onChange={(field, value) => handleChange(field, value)}
          />

          {/* Ações */}
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
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

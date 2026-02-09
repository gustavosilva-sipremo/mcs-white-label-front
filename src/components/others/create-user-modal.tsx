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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PasswordFields } from "@/components/others/PasswordFields";

interface CreateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateUserModal({ open, onOpenChange }: CreateUserModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    accountType: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange<K extends keyof typeof formData>(
    field: K,
    value: string,
  ) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Apenas visual / funcional por enquanto
    console.log("Novo usuário:", formData);

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Novo usuário
          </DialogTitle>

          <DialogDescription>
            Preencha as informações abaixo para criar um novo usuário no
            sistema.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados principais */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Nome completo</Label>
              <Input
                placeholder="Ex: Gustavo Silva"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Usuário</Label>
              <Input
                placeholder="Ex: g.silva"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
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
              <Input
                placeholder="+55 (11) 99999-0000"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Departamento</Label>
              <Input
                placeholder="Ex: Tecnologia"
                value={formData.department}
                onChange={(e) => handleChange("department", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Cargo</Label>
              <Input
                placeholder="Ex: Frontend Developer"
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Tipo de conta</Label>
              <Select
                value={formData.accountType}
                onValueChange={(value) => handleChange("accountType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de conta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="common">Usuário comum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Senha */}
          <div className="rounded-lg border border-border p-4">
            <p className="mb-3 text-sm font-medium text-foreground">
              Segurança
            </p>

            <PasswordFields
              password={formData.password}
              confirmPassword={formData.confirmPassword}
              onChange={(field, value) => handleChange(field, value)}
            />
          </div>

          {/* Ações */}
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>

            <Button type="submit">Criar usuário</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

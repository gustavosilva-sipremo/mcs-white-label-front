import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface EmailInputProps {
  label: string;
  value: string;
  required?: boolean;
  onChange: (value: string, isValid: boolean) => void; // retorna também status de validade
  placeholder?: string; // opcional para personalizar
}

export function EmailInput({
  label,
  value,
  required = false,
  onChange,
  placeholder = "Digite seu email", // placeholder padrão
}: EmailInputProps) {
  const [isValid, setIsValid] = useState(true);

  // Validação simples de email
  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleChange = (val: string) => {
    const valid = validateEmail(val);
    setIsValid(valid || val === ""); // vazio não mostra erro
    onChange(val, valid);
  };

  return (
    <div className="space-y-1">
      <Label>
        {label}
        {required ? " *" : ""}
      </Label>
      <Input
        type="email"
        value={value}
        placeholder={placeholder} // adicionado
        onChange={(e) => handleChange(e.target.value)}
        className={!isValid ? "border-destructive focus:ring-destructive" : ""}
      />
      {!isValid && <p className="text-sm text-destructive">Email inválido</p>}
    </div>
  );
}

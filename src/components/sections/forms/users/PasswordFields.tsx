import { useState, useEffect } from "react";
import { PasswordInput } from "./PasswordInput";

interface PasswordFieldsProps {
  password?: string;
  confirmPassword?: string;
  onChange?: (field: "password" | "confirmPassword", value: string) => void;
  /** Se true, mostra os campos lado a lado; caso contrário, em coluna */
  horizontal?: boolean;
  /** Permite que o componente mostre erro de senhas diferentes internamente */
  showMismatchError?: boolean;
}

export function PasswordFields({
  password = "",
  confirmPassword = "",
  onChange = () => {},
  horizontal = true,
  showMismatchError = true,
}: PasswordFieldsProps) {
  const [mismatch, setMismatch] = useState(false);

  // Verifica se as senhas coincidem
  useEffect(() => {
    if (password && confirmPassword) {
      setMismatch(password !== confirmPassword);
    } else {
      setMismatch(false);
    }
  }, [password, confirmPassword]);

  return (
    <div
      className={`grid gap-4 ${
        horizontal ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
      }`}
    >
      {password !== undefined && (
        <PasswordInput
          id="password"
          label="Senha"
          placeholder="Digite a senha"
          value={password}
          onChange={(val) => onChange("password", val)}
        />
      )}

      {confirmPassword !== undefined && (
        <PasswordInput
          id="confirmPassword"
          label="Confirmar senha"
          placeholder="Confirme a senha"
          value={confirmPassword}
          onChange={(val) => onChange("confirmPassword", val)}
        />
      )}

      {showMismatchError && mismatch && (
        <p className="text-sm text-red-600 col-span-full">
          As senhas não coincidem.
        </p>
      )}
    </div>
  );
}

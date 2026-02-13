import { useState, useMemo } from "react";
import { PasswordFields } from "@/components/sections/forms/users/PasswordFields";
import { Button } from "@/components/ui/button";

export function PassResetRenderer() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    console.log("Nova senha:", password);
    // Aqui você chama API de reset de senha
  };

  // Validação: botão desabilitado se vazio ou se as senhas não coincidirem
  const isInvalid = useMemo(() => {
    return !password || !confirmPassword || password !== confirmPassword;
  }, [password, confirmPassword]);

  return (
    <>
      <PasswordFields
        password={password}
        confirmPassword={confirmPassword}
        onChange={(field, value) =>
          field === "password" ? setPassword(value) : setConfirmPassword(value)
        }
      />

      {password && confirmPassword && password !== confirmPassword && (
        <p className="text-sm text-red-600">As senhas não coincidem.</p>
      )}

      <Button
        onClick={handleResetPassword}
        className="w-full py-3 text-lg mt-6 font-medium"
        disabled={isInvalid}
      >
        Redefinir senha
      </Button>
    </>
  );
}

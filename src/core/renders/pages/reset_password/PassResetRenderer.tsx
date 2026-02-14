import { useState, useMemo } from "react";
import { PasswordFields } from "@/components/sections/forms/users/fields/PasswordFields";
import { Button } from "@/components/ui/button";

export function PassResetRenderer() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    console.log("Nova senha:", password);
    // Chamada à API de reset de senha
  };

  const isInvalid = useMemo(
    () => !password || !confirmPassword || password !== confirmPassword,
    [password, confirmPassword],
  );

  return (
    <>
      <PasswordFields
        password={password}
        confirmPassword={confirmPassword}
        onChange={(field, value) =>
          field === "password" ? setPassword(value) : setConfirmPassword(value)
        }
        horizontal={false}
        showMismatchError={true}
      />

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

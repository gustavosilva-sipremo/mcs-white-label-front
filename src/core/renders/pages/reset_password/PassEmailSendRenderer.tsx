import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EmailInput } from "@/components/sections/forms/users/inputs/EmailInput";

export function PassEmailSendRenderer() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleSendCode = () => {
    if (!isEmailValid) {
      alert("Informe um email válido");
      return;
    }

    console.log("Enviar código para:", email);
    // Aqui você chama API que verifica e envia email
  };

  return (
    <>
      <EmailInput
        label="E-mail"
        value={email}
        required
        onChange={(val, valid) => {
          setEmail(val);
          setIsEmailValid(valid);
        }}
      />

      <Button
        onClick={handleSendCode}
        className="w-full mt-6 py-3 text-lg text-primary-foreground font-medium"
      >
        Enviar código
      </Button>
    </>
  );
}

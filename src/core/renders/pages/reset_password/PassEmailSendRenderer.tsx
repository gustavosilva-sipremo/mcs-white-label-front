import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PassEmailSendRenderer() {
  const [email, setEmail] = useState("");

  const handleSendCode = () => {
    console.log("Enviar código para:", email);
    // Aqui você chama API que verifica e envia email
  };

  return (
    <>
      <div className="flex flex-col">
        <Label htmlFor="email" className="text-gray-700 font-medium">
          E-mail
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1"
        />
      </div>

      <Button
        onClick={handleSendCode}
        className="w-full py-3 text-lg font-medium"
      >
        Enviar código
      </Button>
    </>
  );
}

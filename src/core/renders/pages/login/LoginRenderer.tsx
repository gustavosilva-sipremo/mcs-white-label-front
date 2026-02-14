import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/sections/forms/users/inputs/PasswordInput";
import { EmailInput } from "@/components/sections/forms/users/inputs/EmailInput";

export function LoginRenderer() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!isEmailValid) {
      alert("Informe um email válido");
      return;
    }

    console.log("Login com:", { email, password });
    // chamar API de login aqui
  };

  const handleForgotPassword = () => {
    navigate("/password/send");
  };

  return (
    <>
      {/* Título */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-6">
        Acesse sua conta
      </h1>

      {/* Campo Email */}
      <EmailInput
        label="Email"
        value={email}
        required
        onChange={(val, valid) => {
          setEmail(val);
          setIsEmailValid(valid);
        }}
      />

      {/* Campo Senha */}
      <div className="flex flex-col mt-4">
        <PasswordInput
          id="password"
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChange={setPassword}
        />
      </div>

      {/* Botão Entrar */}
      <Button
        onClick={handleLogin}
        className="w-full mt-6 py-3 text-lg text-primary-foreground font-medium"
      >
        Entrar
      </Button>

      {/* Esqueci minha senha */}
      <Button
        variant="link"
        onClick={handleForgotPassword}
        className="w-full mt-4 text-sm text-primary hover:underline"
      >
        Esqueci minha senha
      </Button>
    </>
  );
}

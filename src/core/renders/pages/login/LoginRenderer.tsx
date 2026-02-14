import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/sections/forms/users/PasswordInput";

export function LoginRenderer() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login com:", { user, password });
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

      {/* Campo Usuário */}
      <div className="flex flex-col">
        <Label htmlFor="user" className="font-medium text-foreground">
          Usuário
        </Label>
        <Input
          id="user"
          placeholder="Digite seu usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="mt-4"
        />
      </div>

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

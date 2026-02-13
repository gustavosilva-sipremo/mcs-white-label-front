import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export function LoginRenderer() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="flex flex-col mt-4 relative">
        <Label htmlFor="password" className="font-medium text-foreground">
          Senha
        </Label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 pr-12"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          className="absolute right-3 top-[26px] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
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

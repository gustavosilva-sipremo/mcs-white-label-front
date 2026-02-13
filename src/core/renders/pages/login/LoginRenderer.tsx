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
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6">
        Acesse sua conta
      </h1>

      {/* Campo Usuário */}
      <div className="flex flex-col">
        <Label htmlFor="user" className="text-gray-700 font-medium">
          Usuário
        </Label>
        <Input
          id="user"
          placeholder="Digite seu usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="mt-1"
        />
      </div>

      {/* Campo Senha */}
      <div className="flex flex-col relative">
        <Label htmlFor="password" className="text-gray-700 font-medium">
          Senha
        </Label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-9 right-3 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Botão Entrar */}
      <Button onClick={handleLogin} className="w-full py-3 text-lg font-medium">
        Entrar
      </Button>

      {/* Esqueci minha senha */}
      <Button
        variant="link"
        className="w-full text-center text-sm text-purple-600 hover:underline"
        onClick={handleForgotPassword}
      >
        Esqueci minha senha
      </Button>
    </>
  );
}

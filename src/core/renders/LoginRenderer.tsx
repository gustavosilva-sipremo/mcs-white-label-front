import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import sipremoLogo from "/favicons/sipremo_cloud_logo_white.svg";
import empresaLogo from "/images/sipremo_logo_white.svg";

export function LoginRenderer() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log("Login com:", { user, password });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Pattern elegante no background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)/0.1) 2px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)/0.1) 2px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Marca d'água Sipremo */}
      <div className="hidden md:flex absolute left-0 top-0 h-full w-full items-center justify-center invert overflow-hidden pointer-events-none select-none">
        <img
          src={sipremoLogo}
          alt="Sipremo Logo"
          className="absolute -left-[50%] w-[200%] top-1/2 transform -translate-y-1/2 opacity-20"
        />
      </div>

      {/* Formulário centralizado */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 sm:px-12 md:px-24 z-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10">
          {/* Logo da empresa no topo */}
          <div className="flex justify-center mb-8">
            <img
              src={empresaLogo}
              alt="Empresa Logo"
              className="w-36 sm:w-full h-auto select-none"
            />
          </div>

          {/* Título */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6">
            Acesse sua conta
          </h1>

          {/* Formulário */}
          <div className="flex flex-col gap-5">
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
                className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
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
            <Button
              onClick={handleLogin}
              className="w-full py-3 text-lg font-medium"
            >
              Entrar
            </Button>

            {/* Esqueci minha senha */}
            <Button
              variant="link"
              className="w-full text-center text-sm text-purple-600 hover:underline"
              onClick={() => alert("Funcionalidade de esqueci minha senha")}
            >
              Esqueci minha senha
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface PasswordFieldsProps {
  password?: string;
  confirmPassword?: string;
  onChange?: (field: "password" | "confirmPassword", value: string) => void;
}

export function PasswordFields({
  password = "",
  confirmPassword = "",
  onChange = () => {},
}: PasswordFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Senha */}
      {"password" in { password } && (
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => onChange("password", e.target.value)}
              className="pr-10"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Confirmar senha */}
      {"confirmPassword" in { confirmPassword } && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar senha</Label>

          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChange={(e) => onChange("confirmPassword", e.target.value)}
              className="pr-10"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              aria-label={
                showConfirmPassword ? "Ocultar senha" : "Mostrar senha"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

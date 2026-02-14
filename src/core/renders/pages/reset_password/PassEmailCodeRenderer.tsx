import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CodeInput } from "@/components/others/CodeInput";

const CODE_LENGTH = 6;
const RESEND_TIME = 60;

export function PassEmailCodeRenderer() {
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(RESEND_TIME);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerifyCode = () => {
    if (code.length < CODE_LENGTH) {
      setError("Código incompleto");
      return;
    }

    console.log("Código verificado:", code);
    setError("Código inválido. Tente novamente.");
  };

  const handleResend = () => {
    setTimer(RESEND_TIME);
    setError("");
    setCode("");
  };

  return (
    <div
      className="
        flex flex-col justify-center
        w-full
        max-w-xs
        mx-auto
        px-4
        overflow-x-hidden
        max-h-[100svh]
      "
    >
      <h1 className="text-xl font-semibold text-center mb-1">
        Verificação
      </h1>

      <p className="text-xs text-muted-foreground text-center mb-4">
        Digite o código enviado para seu e-mail
      </p>

      <div className="flex flex-col items-center gap-2 w-full">
        <Label className="text-xs font-medium">
          Código
        </Label>

        <CodeInput
          length={CODE_LENGTH}
          error={Boolean(error)}
          onComplete={(value) => {
            setError("");
            setCode(value);
          }}
        />

        {error && (
          <span className="text-xs text-destructive mt-1">
            {error}
          </span>
        )}
      </div>

      <Button
        onClick={handleVerifyCode}
        disabled={!code}
        className="w-full mt-6 h-11 text-sm font-semibold"
      >
        Verificar código
      </Button>

      <div className="mt-3 text-center">
        {timer > 0 ? (
          <span className="text-xs text-muted-foreground">
            Reenviar código em {timer}s
          </span>
        ) : (
          <button
            onClick={handleResend}
            className="text-xs font-medium text-primary"
          >
            Reenviar código
          </button>
        )}
      </div>
    </div>
  );
}

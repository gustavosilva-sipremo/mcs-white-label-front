import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CODE_LENGTH = 6;

export function PassEmailCodeRenderer() {
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9a-zA-Z]*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, CODE_LENGTH);
    const chars = paste.split("").filter((c) => /^[0-9a-zA-Z]$/.test(c));

    const newCode = [...code];
    chars.forEach((c, i) => {
      if (i < CODE_LENGTH) newCode[i] = c;
    });

    setCode(newCode);

    const nextIndex = Math.min(chars.length, CODE_LENGTH - 1);
    inputsRef.current[nextIndex]?.focus();
  };

  const handleVerifyCode = () => {
    console.log("Código verificado:", code.join(""));
  };

  return (
    <>
      {/* Título */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-6">
        Digite o código enviado
      </h1>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <Label className="font-medium text-foreground">Código</Label>

          <div className="flex gap-2">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  if (el) inputsRef.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                className="
                  w-12 h-12 text-center text-xl rounded-lg border
                  bg-background text-foreground
                  border-border
                  focus:outline-none
                  focus:border-primary
                  focus:ring-1 focus:ring-ring
                "
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleVerifyCode}
          disabled={code.some((c) => c === "")}
          className="w-full mt-6 py-3 text-lg font-medium"
        >
          Verificar código
        </Button>
      </div>
    </>
  );
}

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
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6">
        Digite o código enviado
      </h1>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <Label className="text-gray-700 font-medium">Código</Label>

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
                className="w-12 h-12 text-center border rounded-lg text-xl focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none"
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleVerifyCode}
          className="w-full py-3 text-lg font-medium"
          disabled={code.some((c) => c === "")}
        >
          Verificar código
        </Button>
      </div>
    </>
  );
}

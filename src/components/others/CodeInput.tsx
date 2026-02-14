import { useEffect, useRef, useState } from "react";

type CodeInputProps = {
    length: number;
    error?: boolean;
    onComplete: (code: string) => void;
};

export function CodeInput({
    length,
    error,
    onComplete,
}: CodeInputProps) {
    const [code, setCode] = useState<string[]>(
        Array(length).fill(""),
    );

    const inputsRef = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (!/^[0-9a-zA-Z]*$/.test(value)) return;

        const next = [...code];
        next[index] = value.slice(-1);
        setCode(next);

        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        if (index === length - 1 && next.every(Boolean)) {
            navigator.vibrate?.(15);
            onComplete(next.join(""));
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            const next = [...code];
            next[index - 1] = "";
            setCode(next);
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const chars = e.clipboardData
            .getData("text")
            .slice(0, length)
            .split("")
            .filter((c) => /^[0-9a-zA-Z]$/.test(c));

        if (!chars.length) return;

        const next = Array(length).fill("");
        chars.forEach((c, i) => (next[i] = c));

        setCode(next);
        inputsRef.current[Math.min(chars.length, length - 1)]?.focus();
    };

    return (
        <div
            className="
        grid
        grid-cols-6
        gap-2
        w-full
        max-w-full
      "
        >
            {code.map((digit, i) => (
                <input
                    key={i}
                    ref={(el) => {
                        if (el) inputsRef.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    className={`
            w-full
            aspect-square
            max-w-[3rem]
            justify-self-center
            text-center text-xl font-semibold
            rounded-lg border
            bg-background
            transition-all
            focus:outline-none
            focus:ring-2 focus:ring-primary/30
            ${error ? "border-destructive animate-shake" : "border-border"}
          `}
                />
            ))}
        </div>
    );
}

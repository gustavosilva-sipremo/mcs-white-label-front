import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Country = "BR" | "US";

interface PhoneInputProps {
  value: string; // valor final: +5511940028922
  onChange: (value: string) => void;
}

const COUNTRIES = {
  BR: {
    name: "Brasil",
    flag: "🇧🇷",
    ddi: "+55",
    mask: (digits: string) => {
      const d = digits.slice(0, 11);
      return d
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{1})(\d{4})(\d{0,4})$/, "$1 $2-$3");
    },
    maxLength: 11,
  },
  US: {
    name: "Estados Unidos",
    flag: "🇺🇸",
    ddi: "+1",
    mask: (digits: string) => {
      const d = digits.slice(0, 10);
      return d
        .replace(/^(\d{3})(\d)/, "($1) $2")
        .replace(/(\d{3})(\d{0,4})$/, "$1-$2");
    },
    maxLength: 10,
  },
};

export function PhoneInput({ value, onChange }: PhoneInputProps) {
  const [country, setCountry] = useState<Country>("BR");
  const [rawDigits, setRawDigits] = useState("");

  // Inicializa rawDigits quando value externo mudar
  useEffect(() => {
    if (!value) return setRawDigits("");
    const ddi = COUNTRIES[country].ddi.replace("+", "");
    if (value.startsWith(`+${ddi}`)) {
      setRawDigits(value.slice(ddi.length + 1)); // remove +DDI
    }
  }, [value, country]);

  function handleNumberChange(val: string) {
    const onlyDigits = val.replace(/\D/g, "");
    const newDigits = onlyDigits.slice(0, COUNTRIES[country].maxLength);
    setRawDigits(newDigits);

    // Atualiza somente se diferente
    const newValue = `+${COUNTRIES[country].ddi.replace("+", "")}${newDigits}`;
    if (newValue !== value) {
      onChange(newValue);
    }
  }

  function handleCountryChange(newCountry: Country) {
    setCountry(newCountry);

    // Ajusta rawDigits para não exceder novo país
    setRawDigits((prev) => prev.slice(0, COUNTRIES[newCountry].maxLength));

    const ddi = COUNTRIES[newCountry].ddi.replace("+", "");
    const newValue = `+${ddi}${rawDigits.slice(0, COUNTRIES[newCountry].maxLength)}`;
    if (newValue !== value) {
      onChange(newValue);
    }
  }

  const maskedValue = COUNTRIES[country].mask(rawDigits);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Select
          value={country}
          onValueChange={(v) => handleCountryChange(v as Country)}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="BR">🇧🇷 +55</SelectItem>
            <SelectItem value="US">🇺🇸 +1</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder={country === "BR" ? "(11) 9 4002-8922" : "(415) 555-2671"}
          value={maskedValue}
          onChange={(e) => handleNumberChange(e.target.value)}
        />
      </div>
    </div>
  );
}

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface AccountTypeSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  required?: boolean;
  onChange: (value: string) => void;
}

export function AccountTypeSelect({
  label,
  value,
  options,
  required = false,
  onChange,
}: AccountTypeSelectProps) {
  return (
    <div className="space-y-2 sm:col-span-2">
      <Label>
        {label}
        {required ? " *" : ""}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="cursor-pointer"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

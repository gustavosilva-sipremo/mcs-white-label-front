import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TextInputProps {
  label: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}

export function TextInput({
  label,
  value,
  required = false,
  onChange,
}: TextInputProps) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required ? " *" : ""}
      </Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

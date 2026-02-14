// src/components/sections/forms/users/inputs/FilterSelectInput.tsx
import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FilterSelectInputProps {
  label: string;
  options: string[];
  selected: string[];
  placeholder?: string;
  onChange: (selected: string[]) => void;
}

export function FilterSelectInput({
  label,
  options,
  selected,
  placeholder = "Filtrar...",
  onChange,
}: FilterSelectInputProps) {
  const [filter, setFilter] = useState("");

  const filteredOptions = useMemo(
    () => options.filter((o) => o.toLowerCase().includes(filter.toLowerCase())),
    [filter, options],
  );

  const toggleSelection = (item: string) => {
    const newList = selected.includes(item)
      ? selected.filter((i) => i !== item)
      : [...selected, item];
    onChange(newList);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {/* Input de filtro */}
      <Input
        placeholder={placeholder}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* Chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {selected.map((item) => (
            <span
              key={item}
              className="inline-flex items-center bg-primary/20 text-primary px-2 py-1 rounded-full text-sm font-medium cursor-pointer select-none hover:bg-primary/30"
              onClick={() => toggleSelection(item)}
            >
              {item} &times;
            </span>
          ))}
        </div>
      )}

      {/* Dropdown */}
      <div className="max-h-40 overflow-y-auto border rounded-md p-2 bg-background mt-1">
        {filteredOptions.map((item) => (
          <label
            key={item}
            className={`flex items-center justify-between cursor-pointer rounded-md px-2 py-1 text-sm transition ${
              selected.includes(item)
                ? "bg-primary/10 border border-primary text-primary font-medium"
                : "hover:bg-primary/5 text-foreground"
            }`}
          >
            <span>{item}</span>
            <input
              type="checkbox"
              className="hidden"
              checked={selected.includes(item)}
              onChange={() => toggleSelection(item)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

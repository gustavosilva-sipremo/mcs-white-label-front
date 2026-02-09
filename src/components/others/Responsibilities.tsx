// src/components/users/Responsibilities.tsx
import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ResponsibilitiesProps {
  sectors: string[];
  roles: string[];
  onChange: (field: "sectors" | "roles", value: string[]) => void;
}

const SECTORS = [
  "Tecnologia",
  "Financeiro",
  "RH",
  "Marketing",
  "Jurídico",
  "Vendas",
  "Suporte",
  "Logística",
];
const ROLES = [
  "Desenvolvedor Frontend",
  "Desenvolvedor Backend",
  "Analista",
  "Gerente",
  "Coordenador",
  "Estagiário",
  "Designer",
  "Product Owner",
];

export function Responsibilities({
  sectors,
  roles,
  onChange,
}: ResponsibilitiesProps) {
  const [sectorFilter, setSectorFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const filteredSectors = useMemo(
    () =>
      SECTORS.filter((s) =>
        s.toLowerCase().includes(sectorFilter.toLowerCase()),
      ),
    [sectorFilter],
  );

  const filteredRoles = useMemo(
    () =>
      ROLES.filter((r) => r.toLowerCase().includes(roleFilter.toLowerCase())),
    [roleFilter],
  );

  const toggleSelection = (
    list: string[],
    item: string,
    field: "sectors" | "roles",
  ) => {
    const newList = list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
    onChange(field, newList);
  };

  const renderChips = (list: string[], field: "sectors" | "roles") =>
    list.length > 0 ? (
      <div className="flex flex-wrap gap-2 mb-2">
        {list.map((item) => (
          <span
            key={item}
            className="inline-flex items-center bg-primary/20 text-primary px-2 py-1 rounded-full text-sm font-medium cursor-pointer select-none transition hover:bg-primary/30"
            onClick={() => toggleSelection(list, item, field)}
          >
            {item} &times;
          </span>
        ))}
      </div>
    ) : null;

  const renderDropdown = (
    list: string[],
    selected: string[],
    field: "sectors" | "roles",
  ) => (
    <div className="max-h-40 overflow-y-auto border rounded-md p-2 bg-background">
      {list.map((item) => (
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
            onChange={() => toggleSelection(selected, item, field)}
          />
        </label>
      ))}
    </div>
  );

  return (
    <div className="rounded-lg border border-border p-4 bg-background space-y-4">
      <p className="text-sm font-semibold text-foreground">Responsabilidades</p>

      {/* Setores */}
      <div className="space-y-2">
        <Label>Setores</Label>
        <Input
          placeholder="Filtrar setores..."
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
        />
        {renderChips(sectors, "sectors")}
        {renderDropdown(filteredSectors, sectors, "sectors")}
      </div>

      {/* Funções */}
      <div className="space-y-2">
        <Label>Funções</Label>
        <Input
          placeholder="Filtrar funções..."
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        />
        {renderChips(roles, "roles")}
        {renderDropdown(filteredRoles, roles, "roles")}
      </div>
    </div>
  );
}

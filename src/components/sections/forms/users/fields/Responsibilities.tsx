import { FilterSelectInput } from "@/components/sections/forms/users/inputs/FilterSelectInput";

interface ResponsibilitiesProps {
  sectors: string[];
  functions: string[];
  onChange: (field: "sectors" | "functions", value: string[]) => void;
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
  "Outro",
];
const FUNCTIONS = [
  "Desenvolvedor Frontend",
  "Desenvolvedor Backend",
  "Analista",
  "Gerente",
  "Coordenador",
  "Estagiário",
  "Designer",
  "Product Owner",
  "Outro",
];

export function Responsibilities({
  sectors,
  functions,
  onChange,
}: ResponsibilitiesProps) {
  return (
    <div className="rounded-lg border border-border p-4 bg-background space-y-4">
      <p className="text-sm font-semibold text-foreground">Responsabilidades</p>

      <FilterSelectInput
        label="Setores"
        options={SECTORS}
        selected={sectors}
        placeholder="Filtrar setores..."
        onChange={(value) => onChange("sectors", value)}
      />

      <FilterSelectInput
        label="Funções"
        options={FUNCTIONS}
        selected={functions}
        placeholder="Filtrar funções..."
        onChange={(value) => onChange("functions", value)}
      />
    </div>
  );
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Exporta um array de objetos para CSV
 */
export function exportCSV<T extends Record<string, any>>(
  data: T[],
  fileName: string,
) {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);

  const csvRows = [
    headers.join(","), // cabeçalho
    ...data.map((row) =>
      headers
        .map((field) => {
          const value = row[field];

          // Se for array de objetos com "name", transforma em string de nomes
          if (
            Array.isArray(value) &&
            value.every((v) => v && typeof v === "object" && "name" in v)
          ) {
            return `"${value.map((v: any) => v.name).join(", ")}"`;
          }

          // Se for array simples de strings/números, junta com vírgula
          if (Array.isArray(value)) {
            return `"${value.join(", ")}"`;
          }

          // Valor normal
          return `"${String(value ?? "")}"`;
        })
        .join(","),
    ),
  ];

  const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
  const encodedUri = encodeURI(csvContent);

  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exporta os types de conta para um label legível
 */
export function getAccountTypeLabel(value: string): string {
  const map: Record<string, string> = {
    // externos
    official: "Oficial",
    user: "Usuário",
    area: "Área",

    // internos
    common: "Comum",
    admin: "Administrador",
    guest: "Convidado",
    sipremo: "Sipremo",
  };

  return map[value] ?? value;
}

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
    headers.join(","),
    ...data.map((row) =>
      headers.map((field) => `"${String(row[field] ?? "")}"`).join(","),
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

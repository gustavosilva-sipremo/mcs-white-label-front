/**
 * Label genérico para tipos de conta
 * Pode ser usado por users internos e externos
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

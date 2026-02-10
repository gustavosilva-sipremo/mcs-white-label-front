export interface OccurrenceCard {
  messagesSent: number;
  messagesConfirmed: number;
  avgResponseTime: number; // minutos
  totalTime: number; // minutos
  startDate: string; // YYYY-MM-DD HH:mm:ss
}

export interface UserInfo {
  name: string;
  status: "pendente" | "informado";
}

export interface OccurrenceMock {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD HH:mm:ss
  cards: OccurrenceCard;
  users: UserInfo[];
  // Dados para gráficos
  confirmationsByUser: Record<string, number>;
  usersBySector: Record<string, number>;
  usersByFunction: Record<string, number>;
  usersByTeam: Record<string, number>;
}

// Função auxiliar para gerar números com variação
const fluctuate = (base: number, variance: number) =>
  Math.max(0, Math.floor(base + (Math.random() - 0.5) * variance));

const sectors = ["Financeiro", "RH", "TI", "Operações"];
const functions = ["Gerente", "Analista", "Assistente", "Supervisor"];
const teams = ["Time A", "Time B", "Time C"];

const names = [
  "Ocorrência Alpha",
  "Ocorrência Beta",
  "Ocorrência Gamma",
  "Ocorrência Delta",
  "Ocorrência Epsilon",
];

// Gera mock de usuários
const generateUsers = (): UserInfo[] => {
  const count = fluctuate(8, 5); // 3 a 13 usuários
  return Array.from({ length: count }, (_, i) => ({
    name: `Usuário ${i + 1}`,
    status: Math.random() < 0.7 ? "informado" : "pendente",
  }));
};

// Gera dados agregados para gráficos
const generateAggregates = (users: UserInfo[]) => {
  const bySector: Record<string, number> = {};
  const byFunction: Record<string, number> = {};
  const byTeam: Record<string, number> = {};
  const confirmationsByUser: Record<string, number> = {};

  users.forEach((u) => {
    const sector = sectors[Math.floor(Math.random() * sectors.length)];
    const func = functions[Math.floor(Math.random() * functions.length)];
    const team = teams[Math.floor(Math.random() * teams.length)];
    bySector[sector] = (bySector[sector] || 0) + 1;
    byFunction[func] = (byFunction[func] || 0) + 1;
    byTeam[team] = (byTeam[team] || 0) + 1;

    confirmationsByUser[u.name] =
      u.status === "informado" ? fluctuate(1, 2) : 0;
  });

  return { bySector, byFunction, byTeam, confirmationsByUser };
};

// Gera ocorrências
export const occurrencesMock: OccurrenceMock[] = names.map((name, idx) => {
  const users = generateUsers();
  const aggregates = generateAggregates(users);

  const start = new Date(
    2026,
    1,
    idx + 1,
    14 + Math.floor(Math.random() * 8),
    Math.floor(Math.random() * 60),
  );
  const startDate = start.toISOString().replace("T", " ").split(".")[0];

  const messagesSent = users.length * fluctuate(1, 3);
  const messagesConfirmed = users.filter(
    (u) => u.status === "informado",
  ).length;

  return {
    id: `occ-${idx + 1}`,
    name,
    date: startDate,
    cards: {
      messagesSent,
      messagesConfirmed,
      avgResponseTime: fluctuate(2, 5), // min
      totalTime: fluctuate(15, 20), // min
      startDate,
    },
    users,
    confirmationsByUser: aggregates.confirmationsByUser,
    usersBySector: aggregates.bySector,
    usersByFunction: aggregates.byFunction,
    usersByTeam: aggregates.byTeam,
  };
});

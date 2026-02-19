/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export interface Preset {
  id: number;
  name: string;
  description: string;
}

export interface Occurrence {
  id: number;
  name: string;
  description: string;
  status: "Ativa" | "Finalizada";
  date: string;
  presetId?: number;
}

/* -------------------------------------------------------------------------- */
/*                                    MOCK                                    */
/* -------------------------------------------------------------------------- */

export const PRESETS: Preset[] = [
  {
    id: 1,
    name: "Incêndio",
    description: "Fluxo padrão para incêndios",
  },
  {
    id: 2,
    name: "Derramamento",
    description: "Vazamento de óleo ou químicos",
  },
  {
    id: 3,
    name: "Ameaça à segurança",
    description: "Acesso não autorizado ou risco externo",
  },
];

export const OCCURRENCES: Occurrence[] = [
  {
    id: 1,
    name: "Incêndio no Armazém",
    description: "Equipe acionada, fogo controlado",
    status: "Ativa",
    date: "2026-02-09",
    presetId: 1,
  },
  {
    id: 2,
    name: "Incêndio em Navio",
    description: "Bombeiros no local",
    status: "Finalizada",
    date: "2026-02-01",
    presetId: 1,
  },
  {
    id: 3,
    name: "Falha no Guindaste",
    description: "Operação suspensa",
    status: "Ativa",
    date: "2026-02-07",
  },
  {
    id: 4,
    name: "Derramamento no Cais 3",
    description: "Área isolada",
    status: "Finalizada",
    date: "2026-01-30",
    presetId: 2,
  },
  {
    id: 5,
    name: "Acesso não autorizado",
    description: "Segurança acionada",
    status: "Ativa",
    date: "2026-02-05",
    presetId: 3,
  },
  {
    id: 6,
    name: "Falha no Sistema de Segurança",
    description: "Investigação em andamento",
    status: "Ativa",
    date: "2026-03-07",
  },
  {
    id: 7,
    name: "Vazamento de Óleo no Cais 5",
    description: "Equipe de emergência controlou o vazamento",
    status: "Finalizada",
    date: "2026-01-10",
  },
  {
    id: 8,
    name: "Incêndio na Área de Manutenção",
    description: "Bombeiros controlaram o fogo, investigação em andamento",
    status: "Ativa",
    date: "2026-02-01",
    presetId: 1,
  },
];

import { UserModel, mockUsers } from "./mock-users";

export interface TeamModel {
  id: string;
  name: string;
  description?: string;
  members: UserModel[];
  membersCount: number;
  createdAt: string;
  updatedAt: string;
}

export const mockTeams: TeamModel[] = [
  {
    id: "team-1",
    name: "Tecnologia",
    description: "Equipe responsável pelo desenvolvimento e infraestrutura",
    members: mockUsers.filter((u) => u.sector === "Tecnologia"),
    membersCount: mockUsers.filter((u) => u.sector === "Tecnologia").length,
    createdAt: "2024-01-05",
    updatedAt: "2024-02-10",
  },
  {
    id: "team-2",
    name: "Financeiro",
    description: "Gestão financeira e controle orçamentário",
    members: mockUsers.filter((u) => u.sector === "Financeiro"),
    membersCount: mockUsers.filter((u) => u.sector === "Financeiro").length,
    createdAt: "2024-01-15",
    updatedAt: "2024-02-08",
  },
  {
    id: "team-3",
    name: "Marketing",
    description: "Comunicação, marca e campanhas",
    members: mockUsers.filter((u) => u.sector === "Marketing"),
    membersCount: mockUsers.filter((u) => u.sector === "Marketing").length,
    createdAt: "2024-01-20",
    updatedAt: "2024-02-09",
  },
  {
    id: "team-4",
    name: "Recursos Humanos",
    description: "Gestão de pessoas e cultura",
    members: mockUsers.filter((u) => u.sector === "RH"),
    membersCount: mockUsers.filter((u) => u.sector === "RH").length,
    createdAt: "2024-01-18",
    updatedAt: "2024-02-08",
  },
  {
    id: "team-5",
    name: "Operações",
    description: "Processos operacionais e coordenação",
    members: mockUsers.filter((u) => u.sector === "Operações"),
    membersCount: mockUsers.filter((u) => u.sector === "Operações").length,
    createdAt: "2024-01-22",
    updatedAt: "2024-02-07",
  },
];

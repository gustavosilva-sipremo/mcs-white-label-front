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

// Função auxiliar para criar equipes
const createTeam = (
  id: string,
  name: string,
  description: string,
  sectorFilter?: string,
): TeamModel => {
  const members = sectorFilter
    ? mockUsers.filter((u) => u.sector === sectorFilter)
    : mockUsers;

  return {
    id,
    name,
    description,
    members,
    membersCount: members.length,
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
  };
};

export const mockTeams: TeamModel[] = [
  createTeam(
    "team-1",
    "Tecnologia",
    "Equipe responsável pelo desenvolvimento e infraestrutura",
    "Tecnologia",
  ),
  createTeam(
    "team-2",
    "Financeiro",
    "Gestão financeira e controle orçamentário",
    "Financeiro",
  ),
  createTeam(
    "team-3",
    "Marketing",
    "Comunicação, marca e campanhas",
    "Marketing",
  ),
  createTeam("team-4", "Recursos Humanos", "Gestão de pessoas e cultura", "RH"),
  createTeam(
    "team-5",
    "Operações",
    "Processos operacionais e coordenação",
    "Operações",
  ),
];

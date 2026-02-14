export type UserType = "official" | "user" | "area";

export interface UserModel {
  id: string;
  name: string;
  email: string;
  phone: string;
  sector: string;
  function: string;
  accountType: UserType;
  createdAt: string;
  updatedAt: string;
}

export const mockUsers: UserModel[] = [
  // Usuários comuns
  {
    id: "1",
    name: "Moacir Almeida",
    email: "moacir.almeida@email.com",
    phone: "+55 (11) 99299-0001",
    sector: "Tecnologia",
    function: "Frontend Developer",
    accountType: "user",
    createdAt: "2024-01-10",
    updatedAt: "2024-02-05",
  },
  {
    id: "2",
    name: "Mariano Campelo",
    email: "mariano.campelo@email.com",
    phone: "+55 (11) 97877-0003",
    sector: "RH",
    function: "Recrutadora",
    accountType: "user",
    createdAt: "2024-01-18",
    updatedAt: "2024-02-01",
  },

  // Órgãos oficiais
  {
    id: "3",
    name: "IBAMA - Inspetor Florestal",
    email: "inspetor@ibama.gov.br",
    phone: "+55 (61) 3333-4444",
    sector: "Fiscalização Ambiental",
    function: "Fiscal",
    accountType: "official",
    createdAt: "2024-01-05",
    updatedAt: "2024-02-02",
  },
  {
    id: "4",
    name: "Marinha do Brasil - Capitão Souza",
    email: "capitao.souza@marinha.mil.br",
    phone: "+55 (21) 2222-3333",
    sector: "Operações Navais",
    function: "Capitão",
    accountType: "official",
    createdAt: "2024-01-12",
    updatedAt: "2024-02-06",
  },

  // Áreas/departamentos
  {
    id: "5",
    name: "Setor de Logística",
    email: "logistica@empresa.com",
    phone: "+55 (11) 9111-2222",
    sector: "Logística",
    function: "Gestão de Estoque",
    accountType: "area",
    createdAt: "2024-01-20",
    updatedAt: "2024-02-07",
  },
  {
    id: "6",
    name: "Torre 04 - Contfunction Operacional",
    email: "torre04@empresa.com",
    phone: "+55 (11) 9333-4444",
    sector: "Contfunction Operacional",
    function: "Supervisor",
    accountType: "area",
    createdAt: "2024-01-25",
    updatedAt: "2024-02-08",
  },

  // Mais usuários comuns para balancear
  {
    id: "7",
    name: "Eduardo Filho",
    email: "eduardo.filho@email.com",
    phone: "+55 (11) 98788-0002",
    sector: "Financeiro",
    function: "Analista",
    accountType: "user",
    createdAt: "2024-01-15",
    updatedAt: "2024-02-02",
  },
  {
    id: "8",
    name: "Ana Costa",
    email: "ana.costa@email.com",
    phone: "+55 (11) 95555-0005",
    sector: "Marketing",
    function: "Social Media",
    accountType: "user",
    createdAt: "2024-01-22",
    updatedAt: "2024-02-04",
  },
];

export type UserRole = "admin" | "common";

export interface UserModel {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  accountType: UserRole;
  createdAt: string;
  updatedAt: string;
}

export const mockUsers: UserModel[] = [
  {
    id: "1",
    username: "g.silva",
    name: "Gustavo Silva",
    email: "gustavo.silva@email.com",
    phone: "+55 (11) 99999-0001",
    department: "Tecnologia",
    role: "Frontend Developer",
    accountType: "admin",
    createdAt: "2024-01-10",
    updatedAt: "2024-02-05",
  },
  {
    id: "2",
    username: "e.ramos",
    name: "Eduardo Ramos",
    email: "eduardo.ramos@email.com",
    phone: "+55 (11) 98888-0002",
    department: "Financeiro",
    role: "Analista",
    accountType: "common",
    createdAt: "2024-01-15",
    updatedAt: "2024-02-02",
  },
];

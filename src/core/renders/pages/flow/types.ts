export type ParticipantType = "user" | "sector" | "role" | "team" | "dynamic";

export interface Participant {
  type: ParticipantType;
  value: string;
  label?: string; // Nome legível (Ex: "João Silva" em vez de "id_joao")
}

export interface StageBlock {
  id: string;
  name: string;
  description?: string;
  formId: string;
  participants: Participant[];
  notifications: Participant[];
  isEvacuation: boolean;
  canCloseScenario: boolean;
  status?: "pending" | "completed" | "active"; // Para simulação visual
}

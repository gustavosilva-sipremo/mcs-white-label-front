export type CompanyMetrics = {
  forms: number;
  lists: number;
  messages: number;
  users: number;
  externalUsers: number;
  teams: number;
  authorizations: number;
};

export type CompanyUsage = {
  weeklyTriggers: number;
  monthlyTriggers: number;
  smsCostEstimate: number;
  infraCostEstimate: number;
};

export type CompanyChartData = {
  labels: string[];
  values: number[];
};

export type Company = {
  id: string;
  name: string;
  document: string;
  status: "active" | "inactive";
  createdAt: string;
  metrics: CompanyMetrics;
  usage: CompanyUsage;
  triggersChart: CompanyChartData;
};

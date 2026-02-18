import { Company } from "./types";

export const MOCK_COMPANIES: Company[] = [
  /* -------------------------------------------------------------------------- */
  /*                               PORTO SUAPE                                  */
  /* -------------------------------------------------------------------------- */
  {
    id: "1",
    name: "Porto Suape",
    document: "12.345.678/0001-90",
    status: "active",
    createdAt: "2024-01-10",

    metrics: {
      forms: 18,
      lists: 9,
      messages: 86,
      users: 22,
      externalUsers: 54,
      teams: 6,
      authorizations: 27,
    },

    usage: {
      weeklyTriggers: 680,
      monthlyTriggers: 2840,
      smsCostEstimate: 468.9,
      infraCostEstimate: 312.4,
    },

    triggersChart: {
      labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
      values: [540, 620, 710, 680],
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                              PORTO SUDESTE                                 */
  /* -------------------------------------------------------------------------- */
  {
    id: "2",
    name: "Porto Sudeste",
    document: "12.345.678/0001-90",
    status: "active",
    createdAt: "2024-01-10",

    metrics: {
      forms: 10,
      lists: 5,
      messages: 41,
      users: 14,
      externalUsers: 26,
      teams: 3,
      authorizations: 16,
    },

    usage: {
      weeklyTriggers: 310,
      monthlyTriggers: 1340,
      smsCostEstimate: 221.3,
      infraCostEstimate: 154.7,
    },

    triggersChart: {
      labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
      values: [260, 300, 340, 310],
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                   MMI                                      */
  /* -------------------------------------------------------------------------- */
  {
    id: "3",
    name: "MMI",
    document: "12.345.678/0001-90",
    status: "active",
    createdAt: "2024-01-10",

    metrics: {
      forms: 6,
      lists: 3,
      messages: 19,
      users: 8,
      externalUsers: 12,
      teams: 2,
      authorizations: 9,
    },

    usage: {
      weeklyTriggers: 140,
      monthlyTriggers: 590,
      smsCostEstimate: 96.2,
      infraCostEstimate: 72.8,
    },

    triggersChart: {
      labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
      values: [110, 130, 160, 140],
    },
  },
];

import { Authorization, RoutePermission } from "./authorization.types";

/* -------------------------------------------------------------------------- */
/*                              ROUTE METADATA                                */
/* -------------------------------------------------------------------------- */

export type RouteCapability = {
  view?: boolean;
  create?: boolean;
  update?: boolean;
  delete?: boolean;
};

export type SensitiveRoute = {
  route: string;
  category: string;
  sipremoOnly?: boolean;
  capabilities: RouteCapability;
};

/**
 * ⚠️ Somente rotas sensíveis entram aqui
 * Rotas fora desse array são públicas (não-controladas)
 */
export const SENSITIVE_ROUTES: SensitiveRoute[] = [
  // -----------------------------------------------------------------------
  // Gestão
  // -----------------------------------------------------------------------
  {
    route: "/users",
    category: "Gestão",
    capabilities: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  {
    route: "/external-users",
    category: "Gestão",
    capabilities: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  {
    route: "/teams",
    category: "Gestão",
    capabilities: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
  },

  // -----------------------------------------------------------------------
  // Informações e Recursos
  // -----------------------------------------------------------------------
  {
    route: "/reports",
    category: "Informações e Recursos",
    capabilities: {
      view: true, // somente visualização
    },
  },
  {
    route: "/tests",
    category: "Informações e Recursos",
    capabilities: {
      view: true,
    },
  },

  // -----------------------------------------------------------------------
  // Sipremo (sempre restrito)
  // -----------------------------------------------------------------------
  {
    route: "/companies",
    category: "Sipremo",
    sipremoOnly: true,
    capabilities: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  {
    route: "/contracts",
    category: "Sipremo",
    sipremoOnly: true,
    capabilities: {
      view: true,
      create: true,
      update: true,
    },
  },
  {
    route: "/questions",
    category: "Sipremo",
    sipremoOnly: true,
    capabilities: {
      view: true,
      create: true,
      update: true,
    },
  },
  {
    route: "/messages",
    category: "Sipremo",
    sipremoOnly: true,
    capabilities: {
      view: true,
      create: true,
    },
  },
  {
    route: "/authorizations",
    category: "Sipremo",
    sipremoOnly: true,
    capabilities: {
      view: true,
      update: true,
    },
  },
  {
    route: "/flows",
    category: "Sipremo",
    sipremoOnly: true,
    capabilities: {
      view: true,
      create: true,
      update: true,
    },
  },
];

/* -------------------------------------------------------------------------- */
/*                               MOCK HELPERS                                 */
/* -------------------------------------------------------------------------- */

export function createEmptyRoutePermissions(): RoutePermission[] {
  return SENSITIVE_ROUTES.map((r) => ({
    route: r.route,
    permissions: {
      view: false,
      create: false,
      update: false,
      delete: false,
    },
  }));
}

export function getCapabilitiesByRoute(route: string): RouteCapability {
  return SENSITIVE_ROUTES.find((r) => r.route === route)?.capabilities ?? {};
}

export function isSipremoRoute(route: string): boolean {
  return !!SENSITIVE_ROUTES.find((r) => r.route === route && r.sipremoOnly);
}

export const MOCK_AUTHORIZATIONS: Authorization[] = [
  {
    id: "1",
    name: "Admin Geral",
    scope: "role",
    target: "Administrador",
    routes: SENSITIVE_ROUTES.map((r) => ({
      route: r.route,
      permissions: {
        view: !!r.capabilities.view,
        create: !!r.capabilities.create,
        update: !!r.capabilities.update,
        delete: !!r.capabilities.delete,
      },
    })),
  },
  {
    id: "2",
    name: "Leitor de Relatórios",
    scope: "role",
    target: "Analista",
    routes: [
      {
        route: "/reports",
        permissions: {
          view: true,
          create: false,
          update: false,
          delete: false,
        },
      },
    ],
  },
];

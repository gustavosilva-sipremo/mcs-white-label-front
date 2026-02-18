export type Permission = {
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
};

export type RoutePermission = {
  route: string;
  permissions: Permission;
};

export type AuthorizationScope =
  | "user"
  | "sector"
  | "role"
  | "team"
  | "accountType";

export type Authorization = {
  id: string;
  name: string;
  scope: AuthorizationScope;
  target: string;
  routes: RoutePermission[];
};

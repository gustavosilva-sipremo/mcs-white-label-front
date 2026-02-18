"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
    Authorization,
    AuthorizationScope,
    Permission,
} from "./authorization.types";

import {
    SENSITIVE_ROUTES,
    createEmptyRoutePermissions,
    getCapabilitiesByRoute,
    isSipremoRoute,
} from "./authorization.mock";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type Props = {
    initialData: Authorization | null;
    onSave: (auth: Authorization) => void;
};

const ACTION_LABELS: Record<keyof Permission, string> = {
    view: "Visualizar",
    create: "Criar",
    update: "Editar",
    delete: "Excluir",
};

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export function AuthorizationForm({ initialData, onSave }: Props) {
    const [name, setName] = useState(initialData?.name ?? "");
    const [scope, setScope] = useState<AuthorizationScope>(
        initialData?.scope ?? "role"
    );
    const [target, setTarget] = useState(initialData?.target ?? "");
    const [routes, setRoutes] = useState(
        initialData?.routes ?? createEmptyRoutePermissions()
    );

    /* ---------------------------------------------------------------------- */
    /*                                HELPERS                                  */
    /* ---------------------------------------------------------------------- */

    const routesByCategory = useMemo(() => {
        return SENSITIVE_ROUTES
            .filter(route => !isSipremoRoute(route.route)) // 👈 OCULTA SIPREMO
            .reduce<Record<string, typeof SENSITIVE_ROUTES>>(
                (acc, route) => {
                    acc[route.category] ??= [];
                    acc[route.category].push(route);
                    return acc;
                },
                {}
            );
    }, []);

    function getRoutePermissions(route: string) {
        return routes.find(r => r.route === route)?.permissions;
    }

    function togglePermission(route: string, key: keyof Permission) {
        setRoutes(prev =>
            prev.map(r => {
                if (r.route !== route) return r;

                const next = {
                    ...r.permissions,
                    [key]: !r.permissions[key],
                };

                // regra implícita: sem view, sem CRUD
                if (key === "view" && r.permissions.view) {
                    next.create = false;
                    next.update = false;
                    next.delete = false;
                }

                return { ...r, permissions: next };
            })
        );
    }

    function handleSubmit() {
        onSave({
            id: initialData?.id ?? crypto.randomUUID(),
            name,
            scope,
            target,
            routes,
        });
    }

    /* ---------------------------------------------------------------------- */
    /*                                  RENDER                                 */
    /* ---------------------------------------------------------------------- */

    return (
        <div className="space-y-6">
            {/* ---------------------------------------------------------------- */}
            {/* Dados básicos                                                     */}
            {/* ---------------------------------------------------------------- */}

            <div className="space-y-2">
                <Label>Nome da autorização</Label>
                <Input
                    placeholder="Ex: Admin, Leitor, Operador..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label>Escopo</Label>
                    <select
                        className="w-full rounded-md border bg-background px-3 py-2"
                        value={scope}
                        onChange={e =>
                            setScope(e.target.value as AuthorizationScope)
                        }
                    >
                        <option value="user">Usuário</option>
                        <option value="sector">Setor</option>
                        <option value="role">Função</option>
                        <option value="team">Equipe</option>
                        <option value="accountType">Tipo de conta</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <Label>Alvo</Label>
                    <Input
                        placeholder="Ex: Financeiro, Vendas..."
                        value={target}
                        onChange={e => setTarget(e.target.value)}
                    />
                </div>
            </div>

            <Separator />

            {/* ---------------------------------------------------------------- */}
            {/* Permissões                                                        */}
            {/* ---------------------------------------------------------------- */}

            <div className="space-y-6">
                <Label className="text-base">Permissões por rota</Label>

                {Object.entries(routesByCategory).map(
                    ([category, categoryRoutes]) => (
                        <div key={category} className="space-y-3">
                            <h3 className="text-sm font-semibold text-muted-foreground">
                                {category}
                            </h3>

                            {categoryRoutes.map(routeMeta => {
                                const permissions =
                                    getRoutePermissions(routeMeta.route);
                                const capabilities = getCapabilitiesByRoute(
                                    routeMeta.route
                                );

                                if (!permissions) return null;

                                return (
                                    <div
                                        key={routeMeta.route}
                                        className="rounded-md border p-4 space-y-3"
                                    >
                                        <span className="text-sm font-medium">
                                            {routeMeta.route}
                                        </span>

                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            {(Object.keys(
                                                ACTION_LABELS
                                            ) as (keyof Permission)[]).map(
                                                action => {
                                                    if (
                                                        !capabilities[action]
                                                    ) {
                                                        return null;
                                                    }

                                                    const disabled =
                                                        action !== "view" &&
                                                        !permissions.view;

                                                    return (
                                                        <label
                                                            key={action}
                                                            className={`flex items-center gap-2 ${disabled
                                                                ? "opacity-50"
                                                                : ""
                                                                }`}
                                                        >
                                                            <Checkbox
                                                                checked={
                                                                    permissions[
                                                                    action
                                                                    ]
                                                                }
                                                                disabled={
                                                                    disabled
                                                                }
                                                                onCheckedChange={() =>
                                                                    togglePermission(
                                                                        routeMeta.route,
                                                                        action
                                                                    )
                                                                }
                                                            />
                                                            {
                                                                ACTION_LABELS[
                                                                action
                                                                ]
                                                            }
                                                        </label>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )
                )}
            </div>

            <Separator />

            <Button className="w-full" onClick={handleSubmit}>
                Salvar autorização
            </Button>
        </div>
    );
}

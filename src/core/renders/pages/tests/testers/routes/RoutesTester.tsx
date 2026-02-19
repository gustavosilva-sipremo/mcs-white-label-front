"use client";

import { Link } from "react-router-dom";
import {
    ChevronRight,
    Home,
    Users,
    Layers,
    ClipboardList,
    Sparkles,
    Lock,
    AppWindow,
    FlaskConical,
    Link2,
} from "lucide-react";

import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type RouteItem = {
    label: string;
    path?: string;
    children?: RouteItem[];
};

type RouteGroup = {
    label: string;
    icon: React.ElementType;
    children: RouteItem[];
};

/* -------------------------------------------------------------------------- */
/*                                ROUTES MAP                                  */
/* -------------------------------------------------------------------------- */

const ROUTES: RouteGroup[] = [
    {
        label: "Home",
        icon: Home,
        children: [{ label: "Página Inicial", path: "/" }],
    },
    {
        label: "Usuários",
        icon: Users,
        children: [
            { label: "Internos", path: "/users" },
            { label: "Externos", path: "/external-users" },
        ],
    },
    {
        label: "Estrutura",
        icon: Layers,
        children: [
            { label: "Times", path: "/teams" },
            { label: "Empresas", path: "/companies" },
            { label: "Contratos", path: "/contracts" },
        ],
    },
    {
        label: "Questionários",
        icon: ClipboardList,
        children: [
            { label: "Lista", path: "/questions" },
            { label: "Builder • Informações", path: "/questions/builder/informations" },
            { label: "Builder • Triggers", path: "/questions/builder/triggers" },
            { label: "Builder • Forms", path: "/questions/builder/forms" },
        ],
    },
    {
        label: "Funcionalidades",
        icon: Sparkles,
        children: [
            { label: "Mensagens", path: "/messages" },
            { label: "Autorizações", path: "/authorizations" },
            { label: "Fluxo", path: "/flow" },
            { label: "Relatórios", path: "/reports" },
            { label: "Mapa", path: "/maps" },
        ],
    },
    {
        label: "Autenticação",
        icon: Lock,
        children: [
            { label: "Login", path: "/login" },
            { label: "Reset • Enviar Email", path: "/password/send" },
            { label: "Reset • Código", path: "/password/code" },
            { label: "Reset • Nova Senha", path: "/password/reset" },
        ],
    },
    {
        label: "Outros",
        icon: AppWindow,
        children: [
            { label: "Acionamento Público", path: "/public-occurrence-trigger" },
            { label: "Termos de Uso", path: "/terms" },
        ],
    },
    {
        label: "Testes",
        icon: FlaskConical,
        children: [
            { label: "Hub de Testes", path: "/tests" },
            { label: "Forms Tester", path: "/tests/forms" },
            { label: "Routes Tester", path: "/tests/routes" },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                              UI COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

function RouteCard({ group }: { group: RouteGroup }) {
    const Icon = group.icon;

    return (
        <section className="rounded-xl border bg-background/80 p-4 shadow-sm backdrop-blur">
            {/* Header */}
            <header className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-sm font-semibold sm:text-base">{group.label}</h2>
            </header>

            {/* Links */}
            <div className="space-y-2">
                {group.children.map((route) => (
                    <RouteLink key={route.path} route={route} />
                ))}
            </div>
        </section>
    );
}

function RouteLink({ route }: { route: RouteItem }) {
    if (!route.path) return null;

    return (
        <Link
            to={route.path}
            className={cn(
                "group flex min-h-[48px] items-center justify-between rounded-lg border px-4",
                "text-sm transition-all",
                "hover:border-primary hover:bg-primary/5"
            )}
        >
            <div className="flex items-center gap-3">
                <Link2 className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                <span className="font-medium">{route.label}</span>
            </div>

            {/* Path (hidden on mobile) */}
            <div className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                <span>{route.path}</span>
                <ChevronRight className="h-4 w-4" />
            </div>
        </Link>
    );
}

/* -------------------------------------------------------------------------- */
/*                                  PAGE                                      */
/* -------------------------------------------------------------------------- */

export function RoutesTester() {
    return (
        <div className="relative w-full px-4 pb-24 pt-6 sm:px-6 lg:px-8">
            <BackgroundPattern opacity={0.06} size={64} />

            <div className="mx-auto max-w-4xl space-y-10">
                {/* Header */}
                <header className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Testes de Rotas</h1>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        Hub visual para acesso rápido às páginas da aplicação.
                    </p>
                </header>

                {/* Grid */}
                <section className="grid gap-6 sm:grid-cols-2">
                    {ROUTES.map((group) => (
                        <RouteCard key={group.label} group={group} />
                    ))}
                </section>
            </div>
        </div>
    );
}
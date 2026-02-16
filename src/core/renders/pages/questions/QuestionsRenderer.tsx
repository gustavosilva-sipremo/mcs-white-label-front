import {
    Plus,
    ListChecks,
    Users,
    FileText,
    Pencil,
    Trash2,
} from "lucide-react";

import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { Button } from "@/components/ui/button";

/* -------------------------------------------------------------------------- */
/*                                  MOCK DATA                                 */
/* -------------------------------------------------------------------------- */

const forms = [
    {
        id: "1",
        name: "Pesquisa de Satisfação",
        description:
            "Formulário interno para avaliar satisfação dos colaboradores",
        questionsCount: 12,
    },
    {
        id: "2",
        name: "Avaliação de Segurança",
        description: "Checklist mensal de segurança do trabalho",
        questionsCount: 8,
    },
];

/* -------------------------------------------------------------------------- */
/*                                UI COMPONENTS                               */
/* -------------------------------------------------------------------------- */

function BuilderCard({
    title,
    description,
    icon: Icon,
}: {
    title: string;
    description: string;
    icon: any;
}) {
    return (
        <div className="group relative flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-primary/40">
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary/20">
                    <Icon size={22} />
                </div>

                <div className="space-y-1">
                    <h3 className="text-base font-semibold leading-tight">
                        {title}
                    </h3>

                    <p className="text-sm leading-snug text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>

            <Button
                variant="secondary"
                className="mt-5 w-full gap-2"
            >
                <Plus size={16} />
                Abrir builder
            </Button>
        </div>
    );
}

function FormCard({
    name,
    description,
    questionsCount,
}: {
    name: string;
    description: string;
    questionsCount: number;
}) {
    return (
        <div className="group flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="space-y-2">
                <h3 className="line-clamp-2 text-base font-semibold">
                    {name}
                </h3>

                <p className="line-clamp-3 text-sm text-muted-foreground">
                    {description}
                </p>

                <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {questionsCount} perguntas
                </span>
            </div>

            <div className="mt-5 flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                >
                    <Pencil size={14} />
                    Editar
                </Button>

                <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1 gap-2"
                >
                    <Trash2 size={14} />
                    Remover
                </Button>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                              MAIN RENDERER                                 */
/* -------------------------------------------------------------------------- */

export function QuestionsRenderer() {
    return (
        <div className="relative w-full px-4 pb-20 pt-6 sm:px-6 lg:px-8">
            <BackgroundPattern opacity={0.06} size={64} />

            {/* Header */}
            <header className="mx-auto mb-8 max-w-5xl text-center sm:mb-12">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Questionários
                </h1>

                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                    Crie, organize e gerencie formulários, informações e
                    acionamentos
                </p>
            </header>

            <div className="mx-auto max-w-6xl space-y-12">
                {/* Builders */}
                <section>
                    <h2 className="mb-4 text-lg font-semibold sm:text-xl">
                        Builders
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <BuilderCard
                            title="Builder de Informações"
                            description="Crie listas estáticas reutilizáveis como setores, animais, categorias e mais."
                            icon={ListChecks}
                        />

                        <BuilderCard
                            title="Builder de Acionamentos"
                            description="Defina regras de acionamento por setor, função, equipes ou usuários."
                            icon={Users}
                        />

                        <BuilderCard
                            title="Builder de Formulários"
                            description="Crie novos questionários e edite os formulários existentes."
                            icon={FileText}
                        />
                    </div>
                </section>

                {/* Forms */}
                <section>
                    <h2 className="mb-4 text-lg font-semibold sm:text-xl">
                        Formulários Criados
                    </h2>

                    {forms.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center sm:p-12">
                            <p className="text-sm text-muted-foreground">
                                Nenhum formulário criado ainda.
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Use o <strong>Builder de Formulários</strong>{" "}
                                acima para criar seu primeiro questionário.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {forms.map((form) => (
                                <FormCard
                                    key={form.id}
                                    name={form.name}
                                    description={form.description}
                                    questionsCount={form.questionsCount}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

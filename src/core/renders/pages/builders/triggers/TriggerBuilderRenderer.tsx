import { useState } from "react";
import {
    Plus,
    Zap,
    Users,
    Pencil,
    Trash2,
} from "lucide-react";

import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { Button } from "@/components/ui/button";
import { TriggerActionModal } from "./TriggerActionModal";

/* -------------------------------------------------------------------------- */
/*                                  MOCK DATA                                 */
/* -------------------------------------------------------------------------- */

const triggerActions = [
    {
        id: "1",
        name: "Acionamento Feedback",
        description:
            "Seleciona usuários com base em setores e funções específicas",
        rulesCount: 1,
    },
    {
        id: "2",
        name: "Equipe de Resposta",
        description:
            "Acionamento direcionado para equipes de suporte",
        rulesCount: 2,
    },
];

/* -------------------------------------------------------------------------- */
/*                                UI COMPONENTS                               */
/* -------------------------------------------------------------------------- */

function TriggerActionCard({
    name,
    description,
    rulesCount,
}: {
    name: string;
    description?: string;
    rulesCount: number;
}) {
    return (
        <div className="group flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="space-y-3">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Zap size={20} />
                    </div>

                    <div className="space-y-0.5">
                        <h3 className="text-base font-semibold leading-tight">
                            {name}
                        </h3>

                        {description && (
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users size={14} />
                    {rulesCount} critérios configurados
                </div>
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

export function TriggerBuilderRenderer() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="relative w-full px-4 pb-20 pt-6 sm:px-6 lg:px-8">
            <BackgroundPattern opacity={0.06} size={64} />

            {/* Header */}
            <header className="mx-auto mb-8 max-w-4xl text-center sm:mb-12">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Builder de Acionamentos
                </h1>

                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                    Crie regras inteligentes para selecionar usuários por
                    setor, função, equipe ou nome
                </p>
            </header>

            <div className="mx-auto max-w-6xl space-y-8">
                {/* CTA */}
                <div className="flex justify-center sm:justify-end">
                    <Button
                        className="w-full gap-2 sm:w-auto"
                        onClick={() => setOpenModal(true)}
                    >
                        <Plus size={16} />
                        Novo acionamento
                    </Button>
                </div>

                {/* Lists */}
                {triggerActions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center sm:p-12">
                        <p className="text-sm text-muted-foreground">
                            Nenhum acionamento criado ainda.
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Crie um acionamento para definir regras de seleção
                            de usuários.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {triggerActions.map((action) => (
                            <TriggerActionCard
                                key={action.id}
                                name={action.name}
                                description={action.description}
                                rulesCount={action.rulesCount}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* MODAL */}
            <TriggerActionModal
                open={openModal}
                onOpenChange={setOpenModal}
            />
        </div>
    );
}

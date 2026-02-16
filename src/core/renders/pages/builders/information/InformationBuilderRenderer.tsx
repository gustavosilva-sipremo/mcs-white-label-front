import { useState } from "react";
import { Plus, ListChecks, Pencil, Trash2 } from "lucide-react";

import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { Button } from "@/components/ui/button";

import { InformationListModal } from "./InformationListModal";

/* -------------------------------------------------------------------------- */
/*                                  MOCK DATA                                 */
/* -------------------------------------------------------------------------- */

const informationLists = [
    {
        id: "1",
        name: "Setores",
        itemsCount: 5,
        description: "Lista de setores da empresa",
    },
    {
        id: "2",
        name: "Animais",
        itemsCount: 12,
        description: "Lista de animais cadastrados",
    },
];

/* -------------------------------------------------------------------------- */
/*                                UI COMPONENTS                               */
/* -------------------------------------------------------------------------- */

function InformationListCard({
    name,
    description,
    itemsCount,
}: {
    name: string;
    description?: string;
    itemsCount: number;
}) {
    return (
        <div className="group flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="space-y-2">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <ListChecks size={20} />
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

                <span className="inline-flex w-fit items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {itemsCount} itens
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

export function InformationBuilderRenderer() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="relative w-full px-4 pb-20 pt-6 sm:px-6 lg:px-8">
            <BackgroundPattern opacity={0.06} size={64} />

            {/* Header */}
            <header className="mx-auto mb-8 max-w-4xl text-center sm:mb-12">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Builder de Informações
                </h1>

                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                    Crie e gerencie listas de informações estáticas reutilizáveis
                    em formulários e acionamentos
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
                        Nova lista de informações
                    </Button>
                </div>

                {/* Lists */}
                {informationLists.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center sm:p-12">
                        <p className="text-sm text-muted-foreground">
                            Nenhuma lista criada ainda.
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Crie uma lista para reutilizar em formulários e
                            seleções.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {informationLists.map((list) => (
                            <InformationListCard
                                key={list.id}
                                name={list.name}
                                description={list.description}
                                itemsCount={list.itemsCount}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* MODAL */}
            <InformationListModal
                open={openModal}
                onOpenChange={setOpenModal}
            />
        </div>
    );
}

import { ReactNode, useState } from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

type TeamsSectionProps<T> = {
    title: string;
    description: string;
    table: React.ComponentType<{ data: T[] }>;
    modal: React.ComponentType<{
        open: boolean;
        onOpenChange: (open: boolean) => void;
    }>;
    mockData: T[];
    exportCSV?: () => void;
    exportMenu?: ReactNode;
    emptyIcon?: React.ComponentType<{ className?: string }>;
};

export function TeamsSection<T>({
    title,
    description,
    table: Table,
    modal: Modal,
    mockData,
    exportCSV,
    exportMenu,
    emptyIcon: EmptyIcon = Users,
}: TeamsSectionProps<T>) {
    const [openCreateTeam, setOpenCreateTeam] = useState(false);
    const hasTeams = mockData.length > 0;

    return (
        <section className="flex flex-1 flex-col gap-8 p-6">
            {/* Header */}
            <header className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    {title}
                </h1>
                <p className="max-w-2xl text-sm text-muted-foreground">
                    {description}
                </p>
            </header>

            {/* Container */}
            <div className="relative flex flex-1 flex-col rounded-xl border border-border bg-card shadow-sm">
                {/* Top bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
                    <span className="text-sm font-medium text-foreground">
                        {title}
                    </span>

                    {/* Ações */}
                    <div className="flex items-center gap-2">
                        {exportMenu || (
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={exportCSV}
                                disabled={!hasTeams || !exportCSV}
                            >
                                Exportar CSV
                            </Button>
                        )}

                        <Button
                            size="sm"
                            className="gap-2"
                            onClick={() => setOpenCreateTeam(true)}
                        >
                            Nova equipe
                        </Button>
                    </div>
                </div>

                {/* Conteúdo */}
                {hasTeams ? (
                    <div className="flex-1 p-4">
                        <Table data={mockData} />
                    </div>
                ) : (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <EmptyIcon className="h-7 w-7" />
                        </div>

                        <div className="text-center">
                            <p className="text-sm font-medium text-foreground">
                                Nenhuma equipe cadastrada
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Crie equipes para organizar os usuários do
                                projeto.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            <Modal open={openCreateTeam} onOpenChange={setOpenCreateTeam} />
        </section>
    );
}

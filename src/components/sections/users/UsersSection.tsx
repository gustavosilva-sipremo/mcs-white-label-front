import { ReactNode, useState } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

type UsersSectionProps<T> = {
    title: string;
    description: string;
    table: React.ComponentType<{ data: T[] }>;
    modal: React.ComponentType<{ open: boolean; onOpenChange: (open: boolean) => void }>;
    mockData: T[];
    exportCSV?: () => void;
    exportMenu?: ReactNode;
    emptyIcon?: React.ComponentType<{ className?: string }>;
};

export function UsersSection<T>({
    title,
    description,
    table: Table,
    modal: Modal,
    mockData,
    exportCSV,
    exportMenu,
    emptyIcon: EmptyIcon = User,
}: UsersSectionProps<T>) {
    const [openCreateUser, setOpenCreateUser] = useState(false);
    const hasUsers = mockData.length > 0;

    return (
        <section className="flex flex-1 flex-col gap-8 p-6">
            {/* Header */}
            <header className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
                <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
            </header>

            {/* Container */}
            <div className="relative flex flex-1 flex-col rounded-xl border border-border bg-card shadow-sm">
                {/* Top bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
                    <span className="text-sm font-medium text-foreground">{title}</span>

                    {/* Ações */}
                    <div className="flex items-center gap-2">
                        {exportMenu || (
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={exportCSV}
                                disabled={!hasUsers || !exportCSV}
                            >
                                Exportar CSV
                            </Button>
                        )}

                        <Button
                            size="sm"
                            className="gap-2"
                            onClick={() => setOpenCreateUser(true)}
                        >
                            Novo usuário
                        </Button>
                    </div>
                </div>

                {/* Conteúdo */}
                {hasUsers ? (
                    <div className="flex-1 p-4">
                        <Table data={mockData} />
                    </div>
                ) : (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <EmptyIcon className="h-7 w-7" />
                        </div>

                        <div className="text-center">
                            <p className="text-sm font-medium text-foreground">Nenhum usuário cadastrado</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Quando houver usuários, eles aparecerão listados aqui.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            <Modal open={openCreateUser} onOpenChange={setOpenCreateUser} />
        </section>
    );
}

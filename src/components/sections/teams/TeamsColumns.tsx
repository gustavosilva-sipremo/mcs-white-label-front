import { ColumnDef } from "@tanstack/react-table";
import { TeamModel } from "@/mocks/mock-teams";
import {
    createActionsColumn,
    textColumn,
    dateColumn,
    SortableHeader,
} from "@/components/sections/tables/columns/CommonColumns";

/**
 * Colunas da tabela de equipes
 */
export const teamsColumns: ColumnDef<TeamModel>[] = [
    createActionsColumn<TeamModel>(),

    textColumn<TeamModel>("name", "Equipe", { bold: true }),

    textColumn<TeamModel>("description", "Descrição", {
        muted: true,
    }),

    {
        accessorKey: "membersCount",
        header: ({ column }) => (
            <SortableHeader column={column} title="Membros" />
        ),
        cell: ({ row }) => {
            const value = row.getValue<number>("membersCount");

            return (
                <span className="text-sm font-medium text-foreground">
                    {value ?? 0}
                </span>
            );
        },
        enableSorting: true,
    },

    dateColumn<TeamModel>("createdAt", "Criado em"),
    dateColumn<TeamModel>("updatedAt", "Atualizado em", "primary"),
];

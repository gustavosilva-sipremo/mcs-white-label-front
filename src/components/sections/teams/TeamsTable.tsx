import { DataTable } from "@/components/sections/tables/DataTable";
import { teamsColumns } from "./TeamsColumns";
import { TeamModel } from "@/mocks/mock-teams";

const searchableColumns = [
    { label: "Equipe", value: "name" },
    { label: "Descrição", value: "description" },
] satisfies { label: string; value: keyof TeamModel }[];

export function TeamsTable({ data }: { data: TeamModel[] }) {
    return (
        <DataTable
            data={data}
            columns={teamsColumns}
            searchableColumns={searchableColumns}
            emptyMessage="Nenhuma equipe encontrada."
        />
    );
}

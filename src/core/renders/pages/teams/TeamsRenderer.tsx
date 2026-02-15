import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { TeamsSection } from "@/components/sections/teams/TeamsSection";
import { TeamsTable } from "@/components/sections/teams/TeamsTable";
import { CreateTeamModal } from "@/components/sections/teams/CreateTeamModal";
import { mockTeams } from "@/mocks/mock-teams";
import { exportCSV } from "@/lib/utils";

export function TeamsRenderer() {
    return (
        <div className="relative w-full">
            <BackgroundPattern opacity={0.1} size={64} />

            <TeamsSection
                title="Equipes"
                description="Crie e gerencie equipes, definindo os usuários que compõem cada time."
                table={TeamsTable}
                modal={CreateTeamModal}
                mockData={mockTeams}
                exportCSV={() => exportCSV(mockTeams, "equipes.csv")}
            />
        </div>
    );
}

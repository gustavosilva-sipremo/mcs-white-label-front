import { Occurrence } from "./home.mock";
import { ScenarioCard } from "./ScenarioCard";

interface ScenarioGroupProps {
    title: string;
    items: Occurrence[];
}

export function ScenarioGroup({
    title,
    items,
}: ScenarioGroupProps) {
    if (!items.length) return null;

    return (
        <div className="mb-4">
            <p className="mb-2 text-xs font-semibold text-muted-foreground">
                {title}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((occ) => (
                    <ScenarioCard
                        key={occ.id}
                        occurrence={occ}
                    />
                ))}
            </div>
        </div>
    );
}

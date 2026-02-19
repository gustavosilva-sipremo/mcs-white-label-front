import {
    Clock,
    CheckCircle,
    ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Occurrence } from "./home.mock";

interface ScenarioCardProps {
    occurrence: Occurrence;
}

export function ScenarioCard({
    occurrence,
}: ScenarioCardProps) {
    const isActive = occurrence.status === "Ativa";

    return (
        <button
            disabled={!isActive}
            className={cn(
                "group w-full rounded-xl border p-4 text-left transition",
                "flex items-center justify-between gap-3",
                isActive
                    ? "bg-background hover:bg-muted cursor-pointer"
                    : "bg-muted/50 opacity-60 cursor-not-allowed pointer-events-none"
            )}
        >
            <div className="min-w-0">
                <p className="font-medium truncate">
                    {occurrence.name}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-1">
                    {occurrence.description}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                    {occurrence.date}
                </p>
            </div>

            <div className="flex items-center gap-2">
                {isActive ? (
                    <>
                        <Clock className="w-4 h-4 text-orange-500" />
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition" />
                    </>
                ) : (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                )}
            </div>
        </button>
    );
}

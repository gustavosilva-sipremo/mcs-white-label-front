import { cn } from "@/lib/utils";

export function TypeBadge({
    icon: Icon,
    label,
    active,
    onClick,
}: {
    icon: any;
    label: string;
    active?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-1 rounded-lg border px-3 py-2 text-xs transition",
                active
                    ? "border-primary bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted",
            )}
        >
            <Icon size={14} />
            {label}
        </button>
    );
}

import { cn } from "@/lib/utils";

interface ProfileProps {
    name: string;
    accountType: string;
    className?: string;
}

export function Profile({
    name,
    accountType,
    className,
}: ProfileProps) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div
            className={cn(
                "flex items-center select-none rounded-md",
                // mobile compacto / desktop espaçado
                "p-0 sm:gap-3 sm:px-2 sm:py-1",
                className
            )}
        >
            {/* Avatar */}
            <div
                className={cn(
                    "flex items-center justify-center rounded-full bg-primary text-background font-semibold",
                    // mobile menor / desktop maior
                    "h-9 w-9 text-sm sm:h-10 sm:w-10"
                )}
                title={name}
            >
                {initials}
            </div>

            {/* Nome e tipo → só aparece no desktop */}
            <div className="hidden sm:flex flex-col text-sm leading-tight">
                <span className="font-medium text-foreground truncate">
                    {name}
                </span>
                <span className="text-xs text-muted-foreground capitalize truncate">
                    {accountType}
                </span>
            </div>
        </div>
    );
}

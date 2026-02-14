import { cn } from "@/lib/utils";

interface ProfileProps {
    name: string;
    accountType: string;
    compactMobile?: boolean;
    className?: string;
}

export function Profile({
    name,
    accountType,
    compactMobile = false,
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
                compactMobile ? "p-0" : "gap-3 px-2 py-1",
                className
            )}
        >
            {/* Avatar */}
            <div
                className={cn(
                    "flex items-center justify-center rounded-full bg-primary text-background font-semibold",
                    compactMobile
                        ? "h-9 w-9 text-sm"
                        : "h-10 w-10 text-sm"
                )}
                title={name}
            >
                {initials}
            </div>

            {/* Nome e tipo (somente desktop) */}
            {!compactMobile && (
                <div className="flex flex-col text-sm leading-tight">
                    <span className="font-medium text-foreground truncate">
                        {name}
                    </span>
                    <span className="text-xs text-muted-foreground capitalize truncate">
                        {accountType}
                    </span>
                </div>
            )}
        </div>
    );
}

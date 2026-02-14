interface ProfileProps {
    name: string;
    accountType: string;
}

export function Profile({ name, accountType }: ProfileProps) {
    // Gera iniciais a partir do nome
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="flex items-center gap-3 px-2 py-1 rounded-md select-none">
            {/* Avatar com iniciais */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-background font-semibold text-sm">
                {initials}
            </div>

            {/* Nome e tipo */}
            <div className="flex flex-col text-sm">
                <span className="font-medium text-foreground">{name}</span>
                <span className="text-xs text-muted-foreground capitalize">{accountType}</span>
            </div>
        </div>
    );
}

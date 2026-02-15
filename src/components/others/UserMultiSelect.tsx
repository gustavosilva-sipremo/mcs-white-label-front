import { useMemo, useState } from "react";
import { Plus, Check } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type SelectableUser = {
    id: string;
    name: string;
    email: string;
    username?: string;
    type?: "interno" | "externo" | string;
};

interface UserMultiSelectProps {
    users: SelectableUser[];
    value: string[];
    onChange: (value: string[]) => void;
    searchPlaceholder?: string;
    emptyMessage?: string;
    maxHeightClassName?: string;
}

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export function UserMultiSelect({
    users,
    value,
    onChange,
    searchPlaceholder = "Buscar por nome, email ou username",
    emptyMessage = "Nenhum usuário encontrado.",
    maxHeightClassName = "max-h-72",
}: UserMultiSelectProps) {
    const [search, setSearch] = useState("");

    /* ---------------------------------------------------------------------- */
    /*                                  FILTER                                 */
    /* ---------------------------------------------------------------------- */

    const filteredUsers = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return users;

        return users.filter((u) =>
            [u.name, u.email, u.username]
                .filter(Boolean)
                .some((field) => field!.toLowerCase().includes(q))
        );
    }, [users, search]);

    /* ---------------------------------------------------------------------- */
    /*                                 ACTION                                  */
    /* ---------------------------------------------------------------------- */

    const toggle = (id: string) => {
        if (value.includes(id)) {
            // Remove o usuário se já selecionado
            onChange(value.filter((v) => v !== id));
        } else {
            // Adiciona o usuário sem interferir nos demais
            onChange([...value, id]);
        }
    };

    /* ---------------------------------------------------------------------- */
    /*                               TYPE COLORS                                */
    /* ---------------------------------------------------------------------- */

    const typeColors: Record<string, string> = { interno: "bg-green-100 text-green-800", externo: "bg-blue-100 text-blue-800", default: "bg-gray-100 text-gray-600", };

    const getTypeColor = (type?: string) =>
        type ? typeColors[type.toLowerCase()] || typeColors.default : typeColors.default;

    /* ---------------------------------------------------------------------- */
    /*                                   UI                                    */
    /* ---------------------------------------------------------------------- */

    return (
        <div className="space-y-3">
            {/* Input de busca */}
            <Input
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-input shadow-sm focus:border-primary focus:ring-primary"
            />

            {/* Lista de usuários */}
            <div
                className={cn(
                    "overflow-y-auto rounded-lg border border-border shadow-sm",
                    maxHeightClassName
                )}
            >
                {filteredUsers.length === 0 && (
                    <p className="p-4 text-sm text-muted-foreground italic">{emptyMessage}</p>
                )}

                <ul>
                    {filteredUsers.map((user, index) => {
                        const selected = value.includes(user.id);
                        const key = `${user.id}-${index}`;

                        return (
                            <li
                                key={key}
                                onClick={() => toggle(user.id)}
                                className={cn(
                                    "flex cursor-pointer items-center justify-between gap-4 p-3 transition-all duration-200",
                                    "hover:bg-muted",
                                    selected
                                        ? "bg-primary/10 border-l-4 border-primary"
                                        : "bg-card border-l-4 border-transparent"
                                )}
                            >
                                {/* Nome e email */}
                                <div className="min-w-0 flex flex-col justify-center">
                                    <p className="truncate text-sm font-semibold text-foreground">
                                        {user.name}
                                    </p>
                                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                                </div>

                                {/* Tipo e checkbox */}
                                <div className="flex items-center gap-2">
                                    {user.type && (
                                        <span
                                            className={cn(
                                                "rounded-full px-3 py-1 text-xs font-medium uppercase",
                                                getTypeColor(user.type)
                                            )}
                                        >
                                            {user.type}
                                        </span>
                                    )}

                                    <div
                                        className={cn(
                                            "flex h-7 w-7 items-center justify-center rounded-full border transition-colors duration-200 flex-shrink-0",
                                            selected
                                                ? "border-primary bg-primary text-primary-foreground"
                                                : "border-border bg-card text-muted-foreground"
                                        )}
                                    >
                                        {selected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Contador de selecionados */}
            <p className="text-xs text-muted-foreground font-medium">
                {value.length} selecionado{value.length !== 1 && "s"}
            </p>
        </div>
    );
}

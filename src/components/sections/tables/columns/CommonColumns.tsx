import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

/**
 * Coluna genérica de ações (editar / excluir)
 */
export function createActionsColumn<T extends { name?: string; username?: string }>(
    options?: {
        onEdit?: (row: T) => void;
        onDelete?: (row: T) => void;
    }
): ColumnDef<T> {
    return {
        id: "actions",
        header: () => (
            <div className="text-center font-medium text-muted-foreground">
                Ações
            </div>
        ),
        cell: ({ row }) => {
            const item = row.original;
            const label = item.username ?? item.name ?? "registro";

            return (
                <div className="flex justify-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label={`Editar ${label}`}
                        onClick={() => options?.onEdit?.(item)}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        aria-label={`Excluir ${label}`}
                        onClick={() => options?.onDelete?.(item)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            );
        },
        enableSorting: false,
        enableColumnFilter: false,
    };
}

export function textColumn<T>(
    accessorKey: keyof T,
    header: string,
    options?: {
        muted?: boolean;
        bold?: boolean;
    }
): ColumnDef<T> {
    return {
        accessorKey: accessorKey as string,
        header,
        cell: ({ row }) => {
            const value = row.getValue(accessorKey as string);

            return (
                <span
                    className={[
                        options?.bold && "font-medium",
                        options?.muted && "text-muted-foreground",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {String(value ?? "")}
                </span>
            );
        },
    };
}

export function dateColumn<T>(
    accessorKey: keyof T,
    header: string,
    variant: "muted" | "primary" = "muted"
): ColumnDef<T> {
    return {
        accessorKey: accessorKey as string,
        header,
        cell: ({ row }) => (
            <span
                className={
                    variant === "primary"
                        ? "text-sm text-primary"
                        : "text-sm text-muted-foreground"
                }
            >
                {row.getValue(accessorKey as string)}
            </span>
        ),
    };
}


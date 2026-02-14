import { ColumnDef, Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    Pencil,
    Trash2,
    ArrowUp,
    ArrowDown,
    ArrowUpDown,
} from "lucide-react";

/**
 * Header reutilizável com ordenação asc / desc
 */
export function SortableHeader<T>({
    column,
    title,
}: {
    column: Column<T, unknown>;
    title: string;
}) {
    const sorted = column.getIsSorted();

    return (
        <Button
            variant="ghost"
            size="sm"
            className="
        -ml-3 h-8 px-2
        text-xs font-medium uppercase tracking-wide
        text-muted-foreground
        hover:text-foreground
        data-[state=open]:bg-transparent
      "
            onClick={() => column.toggleSorting(sorted === "asc")}
        >
            <span className="whitespace-nowrap">{title}</span>

            <span className="ml-1 flex items-center">
                {sorted === "asc" && <ArrowUp className="h-3.5 w-3.5" />}
                {sorted === "desc" && <ArrowDown className="h-3.5 w-3.5" />}
                {!sorted && (
                    <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                )}
            </span>
        </Button>
    );
}

/**
 * Coluna genérica de ações (editar / excluir)
 */
export function createActionsColumn<
    T extends { name?: string; username?: string }
>(
    options?: {
        onEdit?: (row: T) => void;
        onDelete?: (row: T) => void;
    }
): ColumnDef<T> {
    return {
        id: "actions",
        header: () => (
            <div className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
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
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
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

/**
 * Coluna de texto (ordenável)
 */
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
        header: ({ column }) => (
            <SortableHeader column={column} title={header} />
        ),
        cell: ({ row }) => {
            const value = row.getValue(accessorKey as string);

            return (
                <span
                    className={[
                        "block max-w-[240px] truncate text-sm",
                        options?.bold && "font-medium text-foreground",
                        options?.muted && "text-muted-foreground",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    title={String(value ?? "")}
                >
                    {String(value ?? "")}
                </span>
            );
        },
        enableSorting: true,
    };
}

/**
 * Coluna de data (ordenável)
 */
export function dateColumn<T>(
    accessorKey: keyof T,
    header: string,
    variant: "muted" | "primary" = "muted"
): ColumnDef<T> {
    return {
        accessorKey: accessorKey as string,
        header: ({ column }) => (
            <SortableHeader column={column} title={header} />
        ),
        cell: ({ row }) => (
            <span
                className={[
                    "text-sm whitespace-nowrap",
                    variant === "primary"
                        ? "text-primary font-medium"
                        : "text-muted-foreground",
                ].join(" ")}
            >
                {row.getValue(accessorKey as string)}
            </span>
        ),
        enableSorting: true,
    };
}

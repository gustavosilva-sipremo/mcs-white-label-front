import { useEffect, useState } from "react";
import {
    Plus,
    Trash2,
    ListChecks,
    GripVertical,
    AlertCircle,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type InformationType = "text" | "int" | "float";

interface InformationItem {
    value: string | number;
}

interface InformationListModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export function InformationListModal({
    open,
    onOpenChange,
}: InformationListModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<InformationType>("text");

    const [items, setItems] = useState<InformationItem[]>([]);
    const [newItem, setNewItem] = useState("");

    const [nameError, setNameError] = useState<string | null>(null);
    const [itemError, setItemError] = useState<string | null>(null);

    /* ---------------------------------------------------------------------- */
    /*                                HELPERS                                 */
    /* ---------------------------------------------------------------------- */

    function validateName(value: string) {
        if (!value.trim()) return "O nome da lista é obrigatório";
        if (value.trim().length < 3)
            return "O nome deve ter pelo menos 3 caracteres";
        return null;
    }

    function parseValue(
        rawValue: string
    ): string | number | null {
        const value = rawValue.trim();

        if (!value) {
            setItemError("O item não pode estar vazio");
            return null;
        }

        if (type === "text") {
            setItemError(null);
            return value;
        }

        if (type === "int") {
            if (!/^-?\d+$/.test(value)) {
                setItemError("Digite um número inteiro válido");
                return null;
            }

            setItemError(null);
            return Number(value);
        }

        if (type === "float") {
            // aceita "," ou "."
            const normalized = value.replace(",", ".");

            if (!/^-?\d+(\.\d+)?$/.test(normalized)) {
                setItemError(
                    "Digite um número decimal válido (ex: 1,5 ou 1.5)"
                );
                return null;
            }

            setItemError(null);
            return Number(normalized);
        }

        return null;
    }

    function addItem() {
        const parsedValue = parseValue(newItem);
        if (parsedValue === null) return;

        setItems((prev) => [...prev, { value: parsedValue }]);
        setNewItem("");
    }

    function removeItem(index: number) {
        setItems((prev) => prev.filter((_, i) => i !== index));
    }

    function resetState() {
        setName("");
        setDescription("");
        setType("text");
        setItems([]);
        setNewItem("");
        setNameError(null);
        setItemError(null);
    }

    function handleClose(open: boolean) {
        if (!open) resetState();
        onOpenChange(open);
    }

    function handleCreate() {
        const error = validateName(name);
        if (error) {
            setNameError(error);
            return;
        }

        console.log({
            name,
            description,
            type,
            items,
        });

        handleClose(false);
    }

    useEffect(() => {
        setNewItem("");
        setItems([]);
        setItemError(null);
    }, [type]);

    /* ---------------------------------------------------------------------- */
    /*                                   UI                                   */
    /* ---------------------------------------------------------------------- */

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ListChecks size={18} />
                        Nova lista de informações
                    </DialogTitle>

                    <DialogDescription>
                        Crie uma lista reutilizável para formulários,
                        seleções e acionamentos.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* METADATA */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Nome da lista</Label>
                            <Input
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setNameError(
                                        validateName(e.target.value)
                                    );
                                }}
                                placeholder="Ex: Setores, Animais..."
                            />
                            {nameError && (
                                <p className="flex items-center gap-1 text-xs text-destructive">
                                    <AlertCircle size={12} />
                                    {nameError}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Descrição</Label>
                            <Textarea
                                rows={3}
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            />
                        </div>

                        {/* TYPE */}
                        <div className="space-y-2">
                            <Label>Tipo da lista</Label>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { id: "text", label: "Texto" },
                                    {
                                        id: "int",
                                        label: "Número inteiro",
                                    },
                                    {
                                        id: "float",
                                        label: "Número decimal",
                                    },
                                ].map((t) => (
                                    <Badge
                                        key={t.id}
                                        className={cn(
                                            "cursor-pointer",
                                            type === t.id
                                                ? "bg-primary text-primary-foreground"
                                                : "hover:opacity-80"
                                        )}
                                        onClick={() =>
                                            setType(
                                                t.id as InformationType
                                            )
                                        }
                                    >
                                        {t.label}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ITEMS */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Itens da lista</Label>
                            <span className="text-xs text-muted-foreground">
                                {items.length} itens
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <Input
                                value={newItem}
                                onChange={(e) =>
                                    setNewItem(e.target.value)
                                }
                                placeholder={
                                    type === "text"
                                        ? "Digite um texto"
                                        : type === "int"
                                            ? "Digite um número inteiro"
                                            : "Digite um número decimal (1,5 ou 1.5)"
                                }
                                onKeyDown={(e) =>
                                    e.key === "Enter" && addItem()
                                }
                            />
                            <Button
                                variant="secondary"
                                onClick={addItem}
                            >
                                <Plus size={16} />
                            </Button>
                        </div>

                        {itemError && (
                            <p className="flex items-center gap-1 text-xs text-destructive">
                                <AlertCircle size={12} />
                                {itemError}
                            </p>
                        )}

                        {items.length > 0 && (
                            <div className="max-h-48 space-y-2 overflow-auto rounded-xl border p-3">
                                {items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="group flex items-center justify-between rounded-lg border bg-background px-3 py-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <GripVertical
                                                size={16}
                                                className="text-muted-foreground"
                                            />
                                            <span className="text-sm">
                                                {item.value}
                                            </span>
                                        </div>

                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="opacity-0 transition group-hover:opacity-100"
                                            onClick={() =>
                                                removeItem(index)
                                            }
                                        >
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => handleClose(false)}
                    >
                        Cancelar
                    </Button>

                    <Button
                        disabled={
                            !!nameError ||
                            !name ||
                            items.length === 0
                        }
                        onClick={handleCreate}
                    >
                        Criar lista
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

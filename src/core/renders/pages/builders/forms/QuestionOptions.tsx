import { useMemo, useState } from "react";
import { Plus, Database } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { Question } from "./types";

/* -------------------------------------------------------------------------- */
/*                                    MOCK                                    */
/* -------------------------------------------------------------------------- */

const MOCK_OPTION_LISTS = [
    { id: "l1", name: "Departamentos" },
    { id: "l2", name: "Cargos" },
    { id: "l3", name: "Unidades" },
    { id: "l4", name: "Filiais" },
];

/* -------------------------------------------------------------------------- */
/*                               COMPONENT                                    */
/* -------------------------------------------------------------------------- */

export function QuestionOptions({
    question,
    onUpdate,
}: {
    question: Question;
    onUpdate: (q: Question) => void;
}) {
    if (question.type !== "single" && question.type !== "multiple") {
        return null;
    }

    const mode = question.optionsMode ?? "manual";
    const [search, setSearch] = useState("");

    const setMode = (value: "manual" | "list") => {
        onUpdate({
            ...question,
            optionsMode: value,
            options: value === "manual" ? question.options : [],
            optionsListId: value === "list" ? question.optionsListId : undefined,
        });
    };

    const filteredLists = useMemo(() => {
        return MOCK_OPTION_LISTS.filter((l) =>
            l.name.toLowerCase().includes(search.toLowerCase()),
        );
    }, [search]);

    return (
        <div className="rounded-xl border bg-muted/40 p-4 space-y-4">
            <Label className="text-xs">Opções</Label>

            {/* Mode selector */}
            <div className="flex flex-wrap gap-2">
                <Button
                    size="sm"
                    variant={mode === "manual" ? "default" : "outline"}
                    onClick={() => setMode("manual")}
                >
                    Manual
                </Button>

                <Button
                    size="sm"
                    variant={mode === "list" ? "default" : "outline"}
                    onClick={() => setMode("list")}
                >
                    <Database size={14} className="mr-1" />
                    Lista existente
                </Button>
            </div>

            {/* ------------------------------------------------------------------ */}
            {/* Manual options                                                      */}
            {/* ------------------------------------------------------------------ */}
            {mode === "manual" && (
                <div className="space-y-2">
                    {question.options.map((opt, i) => (
                        <Input
                            key={i}
                            value={opt}
                            placeholder={`Opção ${i + 1}`}
                            onChange={(e) => {
                                const next = [...question.options];
                                next[i] = e.target.value;
                                onUpdate({ ...question, options: next });
                            }}
                        />
                    ))}

                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                            onUpdate({
                                ...question,
                                options: [...question.options, ""],
                            })
                        }
                    >
                        <Plus size={14} className="mr-1" />
                        Adicionar opção
                    </Button>
                </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* Existing list                                                       */}
            {/* ------------------------------------------------------------------ */}
            {mode === "list" && (
                <div className="space-y-3">
                    <Input
                        placeholder="Buscar lista pelo nome"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="space-y-1">
                        {filteredLists.length === 0 && (
                            <p className="text-xs text-muted-foreground">
                                Nenhuma lista encontrada
                            </p>
                        )}

                        {filteredLists.map((list) => {
                            const selected =
                                question.optionsListId === list.id;

                            return (
                                <button
                                    key={list.id}
                                    onClick={() =>
                                        onUpdate({
                                            ...question,
                                            optionsMode: "list",
                                            optionsListId: list.id,
                                            options: [],
                                        })
                                    }
                                    className={cn(
                                        "flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition",
                                        selected
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "hover:bg-muted",
                                    )}
                                >
                                    <span>{list.name}</span>

                                    {selected && (
                                        <span className="text-xs">
                                            Selecionado
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

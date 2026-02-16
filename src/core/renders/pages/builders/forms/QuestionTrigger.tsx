import { useMemo, useState } from "react";
import { Zap, Link2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Question, TriggerLink } from "./types";

/* -------------------------------------------------------------------------- */
/*                                    MOCK                                    */
/* -------------------------------------------------------------------------- */

const MOCK_TRIGGERS = [
    { id: "t1", name: "Enviar e-mail para gestor" },
    { id: "t2", name: "Criar ticket no suporte" },
    { id: "t3", name: "Notificar time de RH" },
    { id: "t4", name: "Bloquear acesso automaticamente" },
];

/* -------------------------------------------------------------------------- */
/*                               COMPONENT                                    */
/* -------------------------------------------------------------------------- */

export function QuestionTrigger({
    question,
    onUpdate,
}: {
    question: Question;
    onUpdate: (q: Question) => void;
}) {
    const trigger = question.trigger;
    const [search, setSearch] = useState("");

    const setTrigger = (value?: TriggerLink) => {
        onUpdate({ ...question, trigger: value });
    };

    const filteredTriggers = useMemo(() => {
        return MOCK_TRIGGERS.filter((t) =>
            t.name.toLowerCase().includes(search.toLowerCase()),
        );
    }, [search]);

    return (
        <div className="rounded-xl border p-4 space-y-4">
            <Label className="flex items-center gap-1 text-xs">
                <Zap size={14} />
                Acionamento
            </Label>

            {/* Mode selector */}
            <div className="flex flex-wrap gap-2">
                <Button
                    size="sm"
                    variant={!trigger ? "default" : "outline"}
                    onClick={() => setTrigger(undefined)}
                >
                    Nenhum
                </Button>

                <Button
                    size="sm"
                    variant={trigger?.mode === "existing" ? "default" : "outline"}
                    onClick={() =>
                        setTrigger({
                            mode: "existing",
                            triggerId: "",
                        })
                    }
                >
                    Existente
                </Button>
            </div>

            {/* Existing trigger */}
            {trigger?.mode === "existing" && (
                <div className="space-y-3">
                    <Input
                        placeholder="Buscar acionamento pelo nome"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="space-y-1">
                        {filteredTriggers.length === 0 && (
                            <p className="text-xs text-muted-foreground">
                                Nenhum acionamento encontrado
                            </p>
                        )}

                        {filteredTriggers.map((t) => {
                            const selected =
                                trigger.triggerId === t.id;

                            return (
                                <button
                                    key={t.id}
                                    onClick={() =>
                                        setTrigger({
                                            mode: "existing",
                                            triggerId: t.id,
                                        })
                                    }
                                    className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition
                                        ${selected
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "hover:bg-muted"
                                        }`}
                                >
                                    <span>{t.name}</span>

                                    {selected && (
                                        <Link2 size={14} />
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

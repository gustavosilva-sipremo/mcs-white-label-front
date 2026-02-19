import { Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Question } from "./types";

export function QuestionCondition({
    question,
    questions,
    onUpdate,
}: {
    question: Question;
    questions: Question[];
    onUpdate: (q: Question) => void;
}) {
    return (
        <div className="rounded-xl border p-4 space-y-2">
            <Label className="flex items-center gap-1 text-xs">
                <Zap size={14} />
                Exibir esta pergunta somente se
            </Label>

            <div className="grid gap-2 sm:grid-cols-2">
                <select
                    className="rounded-md border bg-background px-2 py-2 text-sm"
                    value={question.condition?.dependsOnQuestionId ?? ""}
                    onChange={(e) =>
                        onUpdate({
                            ...question,
                            condition: e.target.value
                                ? {
                                    dependsOnQuestionId: e.target.value,
                                    operator: "equals",
                                    value: "",
                                }
                                : undefined,
                        })
                    }
                >
                    <option value="">Sem condição</option>
                    {questions
                        .filter((q) => q.id !== question.id)
                        .map((q) => (
                            <option key={q.id} value={q.id}>
                                {q.title || "Pergunta sem título"}
                            </option>
                        ))}
                </select>

                {question.condition && (
                    <Input
                        placeholder="Valor esperado"
                        value={String(question.condition.value)}
                        onChange={(e) =>
                            onUpdate({
                                ...question,
                                condition: {
                                    ...question.condition!,
                                    value: e.target.value,
                                },
                            })
                        }
                    />
                )}
            </div>
        </div>
    );
}

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Question } from "./types";

export function QuestionOptions({
    question,
    onUpdate,
}: {
    question: Question;
    onUpdate: (q: Question) => void;
}) {
    if (
        question.type !== "single" &&
        question.type !== "multiple"
    )
        return null;

    return (
        <div className="rounded-xl border bg-muted/40 p-4 space-y-3">
            <Label className="text-xs">Opções</Label>

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
                <Plus size={14} /> Adicionar opção
            </Button>
        </div>
    );
}

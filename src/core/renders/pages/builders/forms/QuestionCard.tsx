import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Question } from "./types";
import { QuestionHeader } from "./QuestionHeader";
import { QuestionTypes } from "./QuestionTypes";
import { QuestionOptions } from "./QuestionOptions";
import { QuestionCondition } from "./QuestionCondition";

export function QuestionCard({
    question,
    index,
    total,
    questions,
    onUpdate,
    onRemove,
    onMove,
}: {
    question: Question;
    index: number;
    total: number;
    questions: Question[];
    onUpdate: (q: Question) => void;
    onRemove: () => void;
    onMove: (dir: "up" | "down") => void;
}) {
    return (
        <div className="rounded-2xl border bg-card p-4 sm:p-5 shadow-sm space-y-5">
            <QuestionHeader
                question={question}
                index={index}
                total={total}
                onUpdate={onUpdate}
                onMove={onMove}
                onRemove={onRemove}
            />

            <QuestionTypes question={question} onUpdate={onUpdate} />

            <div className="flex items-center gap-2">
                <Switch
                    checked={question.required}
                    onCheckedChange={(v) =>
                        onUpdate({ ...question, required: v })
                    }
                />
                <Label className="text-sm">Pergunta obrigatória</Label>
            </div>

            <QuestionOptions question={question} onUpdate={onUpdate} />

            <QuestionCondition
                question={question}
                questions={questions}
                onUpdate={onUpdate}
            />
        </div>
    );
}

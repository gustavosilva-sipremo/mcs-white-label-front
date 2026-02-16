import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { Question } from "./types";
import { QuestionHeader } from "./QuestionHeader";
import { QuestionTypes } from "./QuestionTypes";
import { QuestionOptions } from "./QuestionOptions";
import { QuestionCondition } from "./QuestionCondition";
import { QuestionTrigger } from "./QuestionTrigger";

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
        <div className="rounded-2xl border bg-card p-4 sm:p-5 shadow-sm space-y-6">
            {/* Header (título + ações) */}
            <QuestionHeader
                question={question}
                index={index}
                total={total}
                onUpdate={onUpdate}
                onMove={onMove}
                onRemove={onRemove}
            />

            {/* Tipo da pergunta */}
            <QuestionTypes question={question} onUpdate={onUpdate} />

            {/* Obrigatória */}
            <div className="flex items-center gap-2">
                <Switch
                    checked={question.required}
                    onCheckedChange={(v) =>
                        onUpdate({ ...question, required: v })
                    }
                />
                <Label className="text-sm">Pergunta obrigatória</Label>
            </div>

            {/* Opções (single / multiple) */}
            <QuestionOptions question={question} onUpdate={onUpdate} />

            {/* Condição de exibição */}
            <QuestionCondition
                question={question}
                questions={questions}
                onUpdate={onUpdate}
            />

            {/* 🔥 Acionamento */}
            <QuestionTrigger
                question={question}
                onUpdate={onUpdate}
            />
        </div>
    );
}

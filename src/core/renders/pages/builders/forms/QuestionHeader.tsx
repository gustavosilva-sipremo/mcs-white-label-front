import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Question } from "./types";

export function QuestionHeader({
    question,
    index,
    total,
    onUpdate,
    onMove,
    onRemove,
}: {
    question: Question;
    index: number;
    total: number;
    onUpdate: (q: Question) => void;
    onMove: (dir: "up" | "down") => void;
    onRemove: () => void;
}) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
                placeholder="Digite a pergunta"
                value={question.title}
                onChange={(e) =>
                    onUpdate({ ...question, title: e.target.value })
                }
                className="font-medium"
            />

            <div className="flex items-center gap-1">
                <Button
                    size="icon"
                    variant="ghost"
                    disabled={index === 0}
                    onClick={() => onMove("up")}
                >
                    <ArrowUp size={14} />
                </Button>

                <Button
                    size="icon"
                    variant="ghost"
                    disabled={index === total - 1}
                    onClick={() => onMove("down")}
                >
                    <ArrowDown size={14} />
                </Button>

                <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive"
                    onClick={onRemove}
                >
                    <Trash2 size={14} />
                </Button>
            </div>
        </div>
    );
}

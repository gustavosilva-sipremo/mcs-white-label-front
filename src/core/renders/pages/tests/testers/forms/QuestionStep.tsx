import { Question } from "@/core/renders/pages/builders/forms/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface QuestionStepProps {
    question: Question;
    value: any;
    setAnswer: (id: string, value: any) => void;
    index: number;
    total: number;
}

export function QuestionStep({ question, value, setAnswer, index, total }: QuestionStepProps) {
    // Renderiza botões de opções (single / multiple)
    const renderOptions = (isMultiple: boolean) => {
        const selectedArray = isMultiple ? value ?? [] : [value];

        return (
            <div className="space-y-2">
                {question.options.map((opt) => {
                    const selected = selectedArray.includes(opt);

                    const handleClick = () => {
                        if (isMultiple) {
                            const newArray = selected
                                ? selectedArray.filter((v: string) => v !== opt)
                                : [...selectedArray, opt];
                            setAnswer(question.id, newArray);
                        } else {
                            setAnswer(question.id, opt);
                        }
                    };

                    return (
                        <button
                            key={opt}
                            type="button"
                            onClick={handleClick}
                            className={cn(
                                "w-full rounded-md border px-3 py-2 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50",
                                selected
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border hover:bg-muted"
                            )}
                        >
                            {opt}
                        </button>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
            <Label className="font-medium text-foreground block">
                Pergunta {index + 1} de {total}: {question.title}
                {question.required && <span className="ml-1 text-destructive">*</span>}
            </Label>

            {/* Renderização do input correto */}
            {(() => {
                switch (question.type) {
                    case "text":
                    case "email":
                    case "number":
                    case "phone":
                    case "date":
                        return (
                            <Input
                                type={question.type === "text" ? "text" : question.type}
                                value={value ?? ""}
                                onChange={(e) => setAnswer(question.id, e.target.value)}
                            />
                        );

                    case "textarea":
                        return (
                            <Textarea
                                value={value ?? ""}
                                onChange={(e) => setAnswer(question.id, e.target.value)}
                            />
                        );

                    case "boolean":
                        return (
                            <div className="flex items-center gap-3">
                                <Switch
                                    checked={!!value}
                                    onCheckedChange={(v) => setAnswer(question.id, v)}
                                />
                                <span className="text-sm text-muted-foreground">{!!value ? "Sim" : "Não"}</span>
                            </div>
                        );

                    case "single":
                        return renderOptions(false);

                    case "multiple":
                        return renderOptions(true);

                    case "scale":
                        // renderiza como single-choice
                        return renderOptions(false);

                    default:
                        return null;
                }
            })()}
        </div>
    );
}

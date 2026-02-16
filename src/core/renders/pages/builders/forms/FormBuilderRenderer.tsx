import { useState } from "react";
import {
    Plus,
    Trash2,
    Zap,
    Type,
    AlignLeft,
    CheckSquare,
    Square,
    ArrowUp,
    ArrowDown,
    Mail,
    Calendar,
    Phone,
    ToggleLeft,
    Star,
    Upload,
} from "lucide-react";

import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type QuestionType =
    | "text"
    | "textarea"
    | "number"
    | "email"
    | "phone"
    | "date"
    | "boolean"
    | "single"
    | "multiple"
    | "scale"
    | "file";

type Condition = {
    dependsOnQuestionId: string;
    operator: "equals" | "not_equals" | "includes";
    value: string;
};

type Question = {
    id: string;
    title: string;
    type: QuestionType;
    required: boolean;
    options: string[];
    condition?: Condition;
};

/* -------------------------------------------------------------------------- */
/*                                UTILITIES                                   */
/* -------------------------------------------------------------------------- */

const createQuestion = (): Question => ({
    id: crypto.randomUUID(),
    title: "",
    type: "text",
    required: false,
    options: [],
});

/* -------------------------------------------------------------------------- */
/*                            SUPPORT COMPONENTS                              */
/* -------------------------------------------------------------------------- */

function TypeBadge({
    icon: Icon,
    label,
    active,
}: {
    icon: any;
    label: string;
    active?: boolean;
}) {
    return (
        <button
            className={cn(
                "flex items-center gap-1 rounded-lg border px-3 py-2 text-xs transition",
                active
                    ? "border-primary bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted",
            )}
        >
            <Icon size={14} />
            {label}
        </button>
    );
}

/* -------------------------------------------------------------------------- */
/*                            QUESTION CARD                                   */
/* -------------------------------------------------------------------------- */

function QuestionCard({
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
            {/* Header */}
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

            {/* Types */}
            <div className="flex flex-wrap gap-2">
                <TypeBadge icon={Type} label="Texto" />
                <TypeBadge icon={AlignLeft} label="Longo" />
                <TypeBadge icon={Mail} label="Email" />
                <TypeBadge icon={Phone} label="Telefone" />
                <TypeBadge icon={Calendar} label="Data" />
                <TypeBadge icon={Square} label="Única" />
                <TypeBadge icon={CheckSquare} label="Múltipla" />
                <TypeBadge icon={ToggleLeft} label="Sim / Não" />
                <TypeBadge icon={Star} label="Escala" />
                <TypeBadge icon={Upload} label="Arquivo" />
            </div>

            {/* Required */}
            <div className="flex items-center gap-2">
                <Switch
                    checked={question.required}
                    onCheckedChange={(v) =>
                        onUpdate({ ...question, required: v })
                    }
                />
                <Label className="text-sm">Pergunta obrigatória</Label>
            </div>

            {/* Options */}
            {(question.type === "single" ||
                question.type === "multiple") && (
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
                )}

            {/* Cascade */}
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
                            value={question.condition.value}
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
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                              MAIN RENDERER                                 */
/* -------------------------------------------------------------------------- */

export function FormBuilderRenderer() {
    const [questions, setQuestions] = useState<Question[]>([
        createQuestion(),
    ]);

    const updateQuestion = (id: string, data: Question) => {
        setQuestions((q) => q.map((x) => (x.id === id ? data : x)));
    };

    const moveQuestion = (index: number, dir: "up" | "down") => {
        const next = [...questions];
        const target = dir === "up" ? index - 1 : index + 1;
        [next[index], next[target]] = [next[target], next[index]];
        setQuestions(next);
    };

    return (
        <div className="relative w-full px-4 pb-24 pt-6">
            <BackgroundPattern opacity={0.06} size={64} />

            <div className="mx-auto max-w-4xl space-y-10">
                {/* Header */}
                <header className="space-y-4">
                    <Input
                        placeholder="Nome do formulário"
                        className="text-xl sm:text-2xl font-bold"
                    />
                    <Textarea placeholder="Descrição do formulário" />
                </header>

                {/* Questions */}
                <section className="space-y-6">
                    {questions.map((q, i) => (
                        <QuestionCard
                            key={q.id}
                            question={q}
                            index={i}
                            total={questions.length}
                            questions={questions}
                            onUpdate={(data) => updateQuestion(q.id, data)}
                            onRemove={() =>
                                setQuestions((qs) =>
                                    qs.filter((x) => x.id !== q.id),
                                )
                            }
                            onMove={(dir) => moveQuestion(i, dir)}
                        />
                    ))}
                </section>

                {/* Add */}
                <div className="flex justify-center">
                    <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() =>
                            setQuestions((q) => [...q, createQuestion()])
                        }
                    >
                        <Plus size={16} />
                        Adicionar pergunta
                    </Button>
                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button variant="outline">Cancelar</Button>
                    <Button>Salvar formulário</Button>
                </div>
            </div>
        </div>
    );
}

import {
    Type,
    AlignLeft,
    Mail,
    Phone,
    Calendar,
    Square,
    CheckSquare,
    ToggleLeft,
    Star,
    Upload,
} from "lucide-react";

import { Question, QuestionType } from "./types";
import { TypeBadge } from "./TypeBadge";

const TYPES: { type: QuestionType; label: string; icon: any }[] =
    [
        { type: "text", label: "Texto", icon: Type },
        { type: "textarea", label: "Texto longo", icon: AlignLeft },
        { type: "email", label: "Email", icon: Mail },
        { type: "phone", label: "Telefone", icon: Phone },
        { type: "date", label: "Data", icon: Calendar },
        { type: "single", label: "Seleção Única", icon: Square },
        { type: "multiple", label: "Seleção Múltipla", icon: CheckSquare },
        { type: "boolean", label: "Sim / Não", icon: ToggleLeft },
        { type: "scale", label: "Escala", icon: Star },
        { type: "file", label: "Arquivo", icon: Upload },
    ];

export function QuestionTypes({
    question,
    onUpdate,
}: {
    question: Question;
    onUpdate: (q: Question) => void;
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
                <TypeBadge
                    key={t.type}
                    icon={t.icon}
                    label={t.label}
                    active={question.type === t.type}
                    onClick={() =>
                        onUpdate({
                            ...question,
                            type: t.type,
                            options:
                                t.type === "single" || t.type === "multiple"
                                    ? question.options
                                    : [],
                        })
                    }
                />
            ))}
        </div>
    );
}

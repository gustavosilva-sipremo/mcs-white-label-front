import { QuestionForm } from "@/core/renders/pages/builders/forms/types";

interface FormListProps {
    forms: typeof import("./mockForms").MOCK_FORMS;
    onSelect: (form: QuestionForm) => void;
}

export function FormList({ forms, onSelect }: FormListProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {forms.map((form) => (
                <button
                    key={form.id}
                    onClick={() => onSelect(form)}
                    className="group w-full text-left rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md focus:shadow-outline focus:outline-none"
                >
                    <h3 className="text-lg font-semibold text-foreground">{form.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
                        {form.description}
                    </p>
                    <span className="inline-block mt-3 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {form.questions.length} {form.questions.length === 1 ? "pergunta" : "perguntas"}
                    </span>

                    {/* Adiciona ícone de seta ou efeito de hover opcional */}
                    <span className="absolute top-5 right-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        ➔
                    </span>
                </button>
            ))}
        </div>
    );
}

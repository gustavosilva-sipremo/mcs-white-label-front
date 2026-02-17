import { useMemo, useState, useEffect, useCallback } from "react";
import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { MOCK_FORMS } from "./mockForms";
import { FormList } from "./FormList";
import { Question, QuestionForm } from "@/core/renders/pages/builders/forms/types";
import { InlineForm } from "./InlineForm";

export function FormTester() {
    const [selectedForm, setSelectedForm] = useState<QuestionForm | null>(null);
    const [answers, setAnswers] = useState<Record<string, any>>({});

    /* Reset quando troca de formulário */
    useEffect(() => {
        setAnswers({});
    }, [selectedForm]);

    /* Perguntas visíveis considerando condições */
    const visibleQuestions: Question[] = useMemo(() => {
        if (!selectedForm) return [];
        return selectedForm.questions.filter((q) => {
            if (!q.condition) return true;

            const parentValue = answers[q.condition.dependsOnQuestionId];

            switch (q.condition.operator) {
                case "equals":
                    return parentValue === q.condition.value;
                case "not_equals":
                    return parentValue !== q.condition.value;
                case "includes":
                    return Array.isArray(parentValue) ? parentValue.includes(q.condition.value) : false;
                default:
                    return true;
            }
        });
    }, [answers, selectedForm]);

    const setAnswer = useCallback((id: string, value: any) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    }, []);

    return (
        <div className="relative w-full px-4 pb-24 pt-6 sm:px-6 lg:px-8">
            <BackgroundPattern opacity={0.06} size={64} />

            <div className="mx-auto max-w-3xl space-y-10">
                {/* Header */}
                <header className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Testes de Formulários</h1>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        Escolha um formulário para testar e preencha as perguntas simulando o comportamento real do builder.
                    </p>
                </header>

                {/* Lista de formulários */}
                {!selectedForm && <FormList forms={MOCK_FORMS} onSelect={setSelectedForm} />}

                {/* Formulário inline */}
                {selectedForm && visibleQuestions.length > 0 && (
                    <InlineForm
                        form={selectedForm}
                        visibleQuestions={visibleQuestions}
                        answers={answers}
                        setAnswer={setAnswer}
                        onClose={() => setSelectedForm(null)}
                    />
                )}
            </div>
        </div>
    );
}

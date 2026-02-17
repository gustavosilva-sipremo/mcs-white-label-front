import { useMemo, useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { MOCK_FORMS } from "./mockForms";
import { FormList } from "./FormList";
import { QuestionStep } from "./QuestionStep";
import { Question, QuestionForm } from "@/core/renders/pages/builders/forms/types";

export function FormTester() {
    const [selectedForm, setSelectedForm] = useState<QuestionForm | null>(null);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [currentStep, setCurrentStep] = useState(0);

    /* -------------------- Reset quando troca de formulário -------------------- */
    useEffect(() => {
        setAnswers({});
        setCurrentStep(0);
    }, [selectedForm]);

    /* -------------------- Perguntas visíveis considerando condições -------------------- */
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

    /* -------------------- Funções de atualização -------------------- */
    const setAnswer = useCallback((id: string, value: any) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    }, []);

    const handleNext = useCallback(() => {
        if (currentStep < visibleQuestions.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            if (window.confirm("Tem certeza que deseja enviar o formulário?")) {
                console.log("FORM ANSWERS:", answers);
                alert("Formulário enviado com sucesso 🚀");
                setSelectedForm(null);
            }
        }
    }, [currentStep, visibleQuestions.length, answers]);

    const handlePrev = useCallback(() => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
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
                    <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-6 relative">
                        {/* Topo do formulário: título + botão fechar */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-lg font-semibold">{selectedForm.name}</h2>
                                <p className="text-sm text-muted-foreground">{selectedForm.description}</p>
                            </div>

                            {/* Botão de fechar com ícone X */}
                            <button
                                onClick={() => setSelectedForm(null)}
                                className="p-2 rounded-full hover:bg-muted text-destructive"
                                aria-label="Fechar formulário"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Pergunta atual */}
                        {visibleQuestions[currentStep] && (
                            <QuestionStep
                                question={visibleQuestions[currentStep]}
                                value={answers[visibleQuestions[currentStep].id]}
                                setAnswer={setAnswer}
                                index={currentStep}
                                total={visibleQuestions.length}
                            />
                        )}

                        {/* Navegação */}
                        <div className="flex justify-between gap-2 mt-4 flex-wrap sm:flex-nowrap">
                            <button
                                className="flex-1 rounded-md border border-border px-4 py-2 text-sm hover:bg-muted disabled:opacity-50"
                                onClick={handlePrev}
                                disabled={currentStep === 0}
                            >
                                Voltar
                            </button>

                            <button
                                className="flex-1 flex items-center justify-center gap-1 rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90 disabled:opacity-50"
                                onClick={handleNext}
                            >
                                {currentStep === visibleQuestions.length - 1 ? "Enviar" : "Próximo"}
                                <span className="ml-1">→</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { QuestionStep } from "./QuestionStep";
import { Question, QuestionForm } from "@/core/renders/pages/builders/forms/types";

interface InlineFormProps {
    form: QuestionForm;
    visibleQuestions: Question[];
    answers: Record<string, any>;
    setAnswer: (id: string, value: any) => void;
    onClose: () => void;
}

export function InlineForm({ form, visibleQuestions, answers, setAnswer, onClose }: InlineFormProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = useCallback(() => {
        if (currentStep < visibleQuestions.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            if (window.confirm("Tem certeza que deseja enviar o formulário?")) {
                console.log("FORM ANSWERS:", answers);
                alert("Formulário enviado com sucesso 🚀");
                onClose();
            }
        }
    }, [currentStep, visibleQuestions.length, answers, onClose]);

    const handlePrev = useCallback(() => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    }, []);

    useEffect(() => {
        setCurrentStep(0);
    }, [form]);

    return (
        <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-6 relative">
            {/* Topo: título + botão fechar */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-lg font-semibold">{form.name}</h2>
                    <p className="text-sm text-muted-foreground">{form.description}</p>
                </div>

                <button
                    onClick={onClose}
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
    );
}

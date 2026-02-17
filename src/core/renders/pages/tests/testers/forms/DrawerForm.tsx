import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { QuestionStep } from "./QuestionStep";
import { Question, QuestionForm } from "@/core/renders/pages/builders/forms/types";
import { isQuestionAnswered } from "./FormTester";

// ShadCN UI
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface DrawerFormProps {
    form: QuestionForm;
    visibleQuestions: Question[];
    answers: Record<string, any>;
    setAnswer: (id: string, value: any) => void;
    onClose: () => void;
}

export function DrawerForm({ form, visibleQuestions, answers, setAnswer, onClose }: DrawerFormProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = useCallback(() => {
        const currentQuestion = visibleQuestions[currentStep];
        const answered = isQuestionAnswered(currentQuestion, answers[currentQuestion.id]);

        if (!answered) {
            alert("Por favor, responda a pergunta obrigatória antes de continuar.");
            return;
        }

        if (currentStep < visibleQuestions.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            if (window.confirm("Tem certeza que deseja enviar o formulário?")) {
                console.log("FORM ANSWERS:", answers);
                alert("Formulário enviado com sucesso 🚀");
                onClose();
            }
        }
    }, [currentStep, visibleQuestions, answers, onClose]);


    const handlePrev = useCallback(() => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    }, []);

    // Reset quando muda o formulário
    useEffect(() => {
        setCurrentStep(0);
    }, [form]);

    const currentQuestion = visibleQuestions[currentStep];
    const isLastStep = currentStep === visibleQuestions.length - 1;

    return (
        <Drawer open={true} onOpenChange={onClose}>
            {/* Ajuste de max-height e centralização vertical */}
            <DrawerContent className="flex flex-col w-full max-h-[100vh] sm:max-h-[80vh] mx-auto rounded-t-2xl shadow-lg overflow-hidden">

                {/* Cabeçalho */}
                <DrawerHeader className="flex justify-between items-start border-b p-4">
                    <div>
                        <DrawerTitle>{form.name}</DrawerTitle>
                        <DrawerDescription>{form.description}</DrawerDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar formulário">
                        <X size={20} />
                    </Button>
                </DrawerHeader>

                {/* Conteúdo */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {currentQuestion ? (
                        <QuestionStep
                            question={currentQuestion}
                            value={answers[currentQuestion.id]}
                            setAnswer={setAnswer}
                            index={currentStep}
                            total={visibleQuestions.length}
                        />
                    ) : (
                        <p className="text-sm text-muted-foreground">Nenhuma pergunta disponível.</p>
                    )}
                </div>

                {/* Navegação */}
                <DrawerFooter className="flex justify-between gap-2 p-4 flex-wrap border-t">
                    <Button
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        className="flex-1 border border-border hover:bg-muted disabled:opacity-50"
                        variant="outline"
                    >
                        Voltar
                    </Button>

                    <Button
                        onClick={handleNext}
                        className="flex-1 flex items-center justify-center gap-1 px-4 py-2"
                        variant={isLastStep ? "destructive" : "default"}
                    >
                        {isLastStep ? "Enviar" : "Próximo"}
                        <span className="ml-1">→</span>
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

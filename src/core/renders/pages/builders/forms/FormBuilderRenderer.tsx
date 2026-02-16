import { Plus } from "lucide-react";
import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useFormBuilder } from "./useFormBuilder";
import { QuestionCard } from "./QuestionCard";

export function FormBuilderRenderer() {
    const {
        questions,
        addQuestion,
        updateQuestion,
        removeQuestion,
        moveQuestion,
    } = useFormBuilder();

    return (
        <div className="relative w-full px-4 pb-24 pt-6">
            <BackgroundPattern opacity={0.06} size={64} />

            <div className="mx-auto max-w-4xl space-y-10">
                <header className="space-y-4">
                    <Input
                        placeholder="Nome do formulário"
                        className="text-xl sm:text-2xl font-bold"
                    />
                    <Textarea placeholder="Descrição do formulário" />
                </header>

                <section className="space-y-6">
                    {questions.map((q, i) => (
                        <QuestionCard
                            key={q.id}
                            question={q}
                            index={i}
                            total={questions.length}
                            questions={questions}
                            onUpdate={(data) => updateQuestion(q.id, data)}
                            onRemove={() => removeQuestion(q.id)}
                            onMove={(dir) => moveQuestion(i, dir)}
                        />
                    ))}
                </section>

                <div className="flex justify-center">
                    <Button variant="outline" className="gap-2" onClick={addQuestion}>
                        <Plus size={16} />
                        Adicionar pergunta
                    </Button>
                </div>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button variant="outline">Cancelar</Button>
                    <Button>Salvar formulário</Button>
                </div>
            </div>
        </div>
    );
}

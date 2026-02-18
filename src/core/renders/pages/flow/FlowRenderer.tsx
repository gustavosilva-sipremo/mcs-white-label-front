import { useState, useCallback } from "react";
import { Plus, GitBranch, ListChecks, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { StageCard } from "./StageCard";
import { StageBlock } from "./types";
import { Separator } from "@/components/ui/separator";

export function FlowRenderer() {
    // Estado inicial simulando um fluxo real de emergência
    const [stages, setStages] = useState<StageBlock[]>([
        {
            id: "stage-1",
            name: "Triagem de Campo",
            formId: "FORM_TRIAGEM_001",
            participants: [{ type: "team", value: "Brigadistas" }],
            notifications: [{ type: "role", value: "Gestor de Plantão" }],
            isEvacuation: false,
            canCloseScenario: false,
        },
    ]);

    // Usando useCallback para evitar re-renders desnecessários no StageCard
    const addStage = useCallback(() => {
        setStages(prev => {
            const nextNum = prev.length > 0
                ? Math.max(...prev.map(s => parseInt(s.id.split('-')[1]))) + 1
                : 1;

            const newStage: StageBlock = {
                id: `stage-${nextNum}`,
                name: `Estágio de Resposta ${nextNum}`,
                formId: "",
                participants: [],
                notifications: [],
                isEvacuation: false,
                canCloseScenario: false,
            };
            return [...prev, newStage];
        });
    }, [stages]);

    const updateStage = useCallback((id: string, data: Partial<StageBlock>) => {
        setStages(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    }, []);

    const deleteStage = useCallback((id: string) => {
        setStages(prev => prev.filter(s => s.id !== id));
    }, []);

    return (
        <div className="relative min-h-screen w-full px-4 pb-32 pt-8 sm:px-6 lg:px-8 bg-background/50">
            {/* Background estilizado para profundidade */}
            <BackgroundPattern opacity={0.04} size={48} />

            <div className="mx-auto max-w-2xl space-y-12 relative">
                {/* Header Adaptativo */}
                <header className="space-y-4 px-2">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                            <GitBranch className="w-5 h-5 text-primary" />
                        </div>
                        <Badge variant="outline" className="text-[10px] uppercase tracking-widest font-bold">
                            Workflow Engine
                        </Badge>
                    </div>

                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-black text-foreground tracking-tight sm:text-4xl">
                            Desenho de Fluxo
                        </h1>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed italic">
                            Configure a sequência de ações e notificações para cenários críticos.
                        </p>
                    </div>

                    {/* Quick Stats - Útil no mobile para visão geral */}
                    <div className="grid grid-cols-3 gap-2 pt-4">
                        <div className="flex flex-col items-center p-2 rounded-lg bg-muted/30 border">
                            <span className="text-lg font-bold">{stages.length}</span>
                            <span className="text-[9px] uppercase text-muted-foreground font-bold">Passos</span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-lg bg-muted/30 border">
                            <span className="text-lg font-bold">
                                {stages.filter(s => s.isEvacuation).length}
                            </span>
                            <span className="text-[9px] uppercase text-muted-foreground font-bold">Alarmes</span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-lg bg-muted/30 border">
                            <span className="text-lg font-bold">
                                {stages.filter(s => s.formId).length}
                            </span>
                            <span className="text-[9px] uppercase text-muted-foreground font-bold">Forms</span>
                        </div>
                    </div>
                </header>

                {/* Pipeline Builder */}
                <div className="flex flex-col items-center space-y-1">
                    {stages.length > 0 ? (
                        stages.map((stage, index) => (
                            <StageCard
                                key={stage.id}
                                stage={stage}
                                onDelete={deleteStage}
                                onUpdate={updateStage}
                                isLast={index === stages.length - 1}
                            />
                        ))
                    ) : (
                        <div className="py-12 text-center space-y-4 bg-muted/20 rounded-2xl border-2 border-dashed w-full max-w-md">
                            <Info className="w-8 h-8 text-muted-foreground/40 mx-auto" />
                            <p className="text-sm text-muted-foreground">Nenhum estágio definido para este fluxo.</p>
                        </div>
                    )}

                    {/* Botão "Acoplar" Refatorado */}
                    <div className="w-full max-w-md pt-4">
                        <Button
                            onClick={addStage}
                            variant="outline"
                            className="group w-full h-16 border-dashed border-2 bg-background/50 hover:bg-primary/5 hover:border-primary/50 transition-all rounded-xl flex items-center justify-between px-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <Plus className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <span className="block text-sm font-bold text-foreground">Novo Estágio</span>
                                    <span className="block text-[10px] text-muted-foreground uppercase font-medium">Acoplar ao final</span>
                                </div>
                            </div>
                            <ListChecks className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                        </Button>
                    </div>
                </div>

                {/* Footer de Status Final */}
                <footer className="flex flex-col items-center space-y-6 pt-12">
                    <Separator className="max-w-[100px] bg-primary/20" />
                    <div className="flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-primary/30 mb-2 animate-ping" />
                        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-black opacity-40">
                            Fim do Acionamento
                        </span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
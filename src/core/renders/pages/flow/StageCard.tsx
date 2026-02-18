// StageCard.tsx
import { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Users, Bell, FileText, Trash2, ArrowDown,
    Settings2, ShieldCheck, ChevronRight, Zap
} from "lucide-react";
import {
    Drawer, DrawerContent, DrawerHeader, DrawerTitle,
    DrawerTrigger, DrawerFooter, DrawerClose,
    DrawerDescription // Adicionado
} from "@/components/ui/drawer";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
    DialogDescription // Adicionado
} from "@/components/ui/dialog";
import { StageConfigForm } from "./StageConfigForm";
import { StageBlock, Participant } from "./types";

interface StageCardProps {
    stage: StageBlock;
    onDelete: (id: string) => void;
    onUpdate: (id: string, data: Partial<StageBlock>) => void;
    isLast: boolean;
}

export function StageCard({ stage, onDelete, onUpdate, isLast }: StageCardProps) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(min-width: 768px)");
        const onChange = () => setIsDesktop(mql.matches);
        mql.addEventListener("change", onChange);
        setIsDesktop(mql.matches);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    const CardUI = (
        <Card className="w-full max-w-md border-2 overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-xl active:scale-[0.98] group bg-card/50 backdrop-blur-sm">
            <div className="flex h-full">
                <div className="w-12 bg-muted/40 border-r flex flex-col items-center py-4 gap-1 group-hover:bg-primary/5 transition-colors">
                    <span className="text-[9px] font-black text-muted-foreground/50 tracking-tighter uppercase">Step</span>
                    <span className="text-lg font-bold text-primary/80 group-hover:text-primary leading-none">
                        {stage.id.split('-')[1]}
                    </span>
                </div>

                <div className="flex-1 p-4 space-y-3">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-sm font-bold text-foreground/90 group-hover:text-primary transition-colors">
                                {stage.name}
                            </CardTitle>
                            <div className="flex items-center gap-1.5">
                                <FileText className="h-3 w-3 text-muted-foreground" />
                                <span className="text-[11px] font-medium text-muted-foreground/80 truncate max-w-[180px]">
                                    {stage.formId || "Nenhum formulário"}
                                </span>
                            </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-all group-hover:translate-x-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
                                <Users className="h-2.5 w-2.5 text-blue-500" /> Ação
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {stage.participants.length > 0 ? (
                                    stage.participants.slice(0, 2).map((p: Participant, i: number) => (
                                        <Badge key={i} variant="secondary" className="px-1.5 py-0 rounded-md text-[9px] font-bold bg-blue-500/5 border-blue-200/50 text-blue-700">
                                            {p.value}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-[9px] text-muted-foreground/40 italic leading-none">Pendente</span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
                                <Bell className="h-2.5 w-2.5 text-orange-500" /> Alerta
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {stage.notifications.length > 0 ? (
                                    stage.notifications.slice(0, 2).map((n: Participant, i: number) => (
                                        <Badge key={i} variant="outline" className="px-1.5 py-0 rounded-md text-[9px] font-bold border-orange-200 text-orange-700">
                                            {n.value}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-[9px] text-muted-foreground/40 italic leading-none">Inativo</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {(stage.isEvacuation || stage.canCloseScenario) && (
                        <div className="flex gap-2 pt-1 border-t border-dashed mt-2 border-muted-foreground/20">
                            {stage.isEvacuation && (
                                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                                    <Zap className="h-2.5 w-2.5 text-red-600 fill-red-600" />
                                    <span className="text-[8px] font-black uppercase text-red-600 tracking-tighter">Evacuação</span>
                                </div>
                            )}
                            {stage.canCloseScenario && (
                                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    <ShieldCheck className="h-2.5 w-2.5 text-emerald-600" />
                                    <span className="text-[8px] font-black uppercase text-emerald-600 tracking-tighter">Finalizador</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );

    return (
        <div className="flex flex-col items-center w-full px-2 sm:px-0">
            {isDesktop ? (
                <Dialog>
                    <DialogTrigger asChild>{CardUI}</DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader className="flex flex-row items-center justify-start space-y-0 pb-4 border-b gap-4">
                            <div className="flex items-center gap-2">
                                <Settings2 className="w-5 h-5 text-primary" />
                                <DialogTitle className="text-xl tracking-tight">
                                    Configurar Estágio: <span className="text-primary">{stage.name}</span>
                                </DialogTitle>
                            </div>
                            {/* Correção do Warning: Descrição invisível para ARIA */}
                            <DialogDescription className="sr-only">
                                Ajuste as configurações de responsáveis, notificações e regras para este estágio.
                            </DialogDescription>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                onClick={(e) => { e.stopPropagation(); onDelete(stage.id); }}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </DialogHeader>
                        <StageConfigForm stage={stage} onUpdate={onUpdate} />
                    </DialogContent>
                </Dialog>
            ) : (
                <Drawer>
                    <DrawerTrigger asChild>{CardUI}</DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-md px-4 pb-8">
                            <DrawerHeader className="px-0 flex flex-row items-center justify-between border-b mb-4">
                                <div>
                                    <DrawerTitle className="text-lg font-bold uppercase tracking-tight">Estágio {stage.id.split('-')[1]}</DrawerTitle>
                                    {/* Correção do Warning: Descrição invisível para ARIA */}
                                    <DrawerDescription className="sr-only">
                                        Formulário de configuração do estágio.
                                    </DrawerDescription>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive"
                                    onClick={(e) => { e.stopPropagation(); onDelete(stage.id); }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </DrawerHeader>
                            <div className="max-h-[60vh] overflow-y-auto pr-1">
                                <StageConfigForm stage={stage} onUpdate={onUpdate} />
                            </div>
                            <DrawerFooter className="px-0 pt-4">
                                <DrawerClose asChild>
                                    <Button className="w-full h-12 font-bold uppercase tracking-widest text-xs">Concluir Alterações</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
            )}

            {!isLast && (
                <div className="py-2 flex flex-col items-center opacity-40">
                    <div className="h-8 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                    <ArrowDown className="h-4 w-4 text-primary -mt-1" />
                </div>
            )}
        </div>
    );
}
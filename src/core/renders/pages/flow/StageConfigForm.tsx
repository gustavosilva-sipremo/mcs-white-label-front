import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { StageBlock, Participant } from "./types";
import { FileText, Users, Bell, Zap, X, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StageConfigFormProps {
    stage: StageBlock;
    onUpdate: (id: string, data: Partial<StageBlock>) => void;
}

export function StageConfigForm({ stage, onUpdate }: StageConfigFormProps) {

    // Função auxiliar para remover participantes/notificações
    const removeItem = (field: 'participants' | 'notifications', index: number) => {
        const newList = [...stage[field]];
        newList.splice(index, 1);
        onUpdate(stage.id, { [field]: newList });
    };

    // Função auxiliar para adicionar (Simulando uma escolha rápida)
    const addItem = (field: 'participants' | 'notifications') => {
        const newItem: Participant = { type: 'team', value: 'Nova Equipe' };
        onUpdate(stage.id, { [field]: [...stage[field], newItem] });
    };

    return (
        <div className="space-y-8 py-2 md:py-4">
            {/* Bloco 1: Identificação e Formulário */}
            <section className="grid gap-5">
                <header className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Contexto</span>
                </header>

                <div className="grid gap-4 bg-muted/30 p-4 rounded-2xl border border-border/50">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-bold text-foreground/70 ml-1">
                            NOME DO ESTÁGIO
                        </Label>
                        <Input
                            id="name"
                            placeholder="Ex: Validação de Campo"
                            value={stage.name}
                            className="bg-background border-none shadow-sm focus-visible:ring-1 h-11"
                            onChange={(e) => onUpdate(stage.id, { name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-foreground/70 ml-1">
                            FORMULÁRIO DE COLETA
                        </Label>
                        <Select value={stage.formId} onValueChange={(val) => onUpdate(stage.id, { formId: val })}>
                            <SelectTrigger className="bg-background border-none shadow-sm h-11 transition-all">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-primary/60" />
                                    <SelectValue placeholder="Selecione o formulário" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="FORM_TRIAGEM_001">Checklist Inicial de Sinistro</SelectItem>
                                <SelectItem value="FORM_EVAC_002">Relatório de Abandono</SelectItem>
                                <SelectItem value="FORM_FINAL_003">Termo de Encerramento</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            {/* Bloco 2: Responsabilidade (Ação) */}
            <section className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600">
                            <Users className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold tracking-tight">Responsabilidade</h4>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addItem('participants')}
                        className="h-8 text-[10px] font-bold text-primary hover:bg-primary/5 gap-1"
                    >
                        <Plus className="w-3 h-3" /> ADICIONAR
                    </Button>
                </div>

                <div className={cn(
                    "flex flex-wrap gap-2 p-3 rounded-xl border-2 border-dashed transition-colors",
                    stage.participants.length > 0 ? "bg-background border-muted" : "bg-muted/20 border-muted/50"
                )}>
                    {stage.participants.length > 0 ? (
                        stage.participants.map((p, i) => (
                            <Badge key={i} variant="secondary" className="pl-2 pr-1 py-1 gap-1 border bg-blue-500/5 border-blue-200/50 text-blue-700 hover:bg-blue-500/10 transition-all">
                                <span className="text-[10px] font-bold opacity-60 uppercase">{p.type}:</span>
                                <span className="text-[11px] font-medium">{p.value}</span>
                                <button
                                    onClick={() => removeItem('participants', i)}
                                    className="ml-1 p-0.5 rounded-full hover:bg-blue-200/50 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))
                    ) : (
                        <p className="text-[11px] text-muted-foreground/60 italic px-1">Nenhum responsável definido. O fluxo ficará travado.</p>
                    )}
                </div>
            </section>

            {/* Bloco 3: Notificações (Alerta) */}
            <section className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-600">
                            <Bell className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold tracking-tight">Notificações</h4>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addItem('notifications')}
                        className="h-8 text-[10px] font-bold text-orange-600 hover:bg-orange-500/5 gap-1"
                    >
                        <Plus className="w-3 h-3" /> ADICIONAR
                    </Button>
                </div>

                <div className={cn(
                    "flex flex-wrap gap-2 p-3 rounded-xl border-2 border-dashed transition-colors",
                    stage.notifications.length > 0 ? "bg-background border-muted" : "bg-muted/20 border-muted/50"
                )}>
                    {stage.notifications.length > 0 ? (
                        stage.notifications.map((n, i) => (
                            <Badge key={i} variant="outline" className="pl-2 pr-1 py-1 gap-1 border-orange-200 text-orange-700">
                                <span className="text-[11px] font-medium">{n.value}</span>
                                <button
                                    onClick={() => removeItem('notifications', i)}
                                    className="ml-1 p-0.5 rounded-full hover:bg-orange-200 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))
                    ) : (
                        <p className="text-[11px] text-muted-foreground/60 italic px-1">Nenhum alerta automático configurado.</p>
                    )}
                </div>
            </section>

            {/* Bloco 4: Regras de Negócio */}
            <section className="pt-2">
                <div className="bg-primary/5 rounded-2xl border border-primary/10 overflow-hidden">
                    <div className="px-4 py-3 bg-primary/10 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Automações de Estágio</span>
                    </div>

                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between group cursor-pointer" onClick={() => onUpdate(stage.id, { isEvacuation: !stage.isEvacuation })}>
                            <div className="space-y-0.5">
                                <Label className="text-sm font-bold cursor-pointer">Gatilho de Evacuação</Label>
                                <p className="text-[10px] text-muted-foreground leading-none tracking-tight">Dispara sirenes e alertas de abandono de área.</p>
                            </div>
                            <Switch checked={stage.isEvacuation} onCheckedChange={(v) => onUpdate(stage.id, { isEvacuation: v })} />
                        </div>

                        <Separator className="bg-primary/10" />

                        <div className="flex items-center justify-between group cursor-pointer" onClick={() => onUpdate(stage.id, { canCloseScenario: !stage.canCloseScenario })}>
                            <div className="space-y-0.5">
                                <Label className="text-sm font-bold cursor-pointer">Permitir Encerramento</Label>
                                <p className="text-[10px] text-muted-foreground leading-none tracking-tight">Libera o botão de "Finalizar Ocorrência" neste estágio.</p>
                            </div>
                            <Switch checked={stage.canCloseScenario} onCheckedChange={(v) => onUpdate(stage.id, { canCloseScenario: v })} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
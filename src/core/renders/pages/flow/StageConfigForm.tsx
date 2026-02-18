import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { StageBlock, Participant } from "./types";
import {
    FileText, Users, Bell, Zap, X, Plus,
    Search, Database, Info, Code2, UserCircle
} from "lucide-react";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface StageConfigFormProps {
    stage: StageBlock;
    onUpdate: (id: string, data: Partial<StageBlock>) => void;
}

export function StageConfigForm({ stage, onUpdate }: StageConfigFormProps) {

    const removeItem = (field: 'participants' | 'notifications', index: number) => {
        const newList = [...stage[field]];
        newList.splice(index, 1);
        onUpdate(stage.id, { [field]: newList });
    };

    const addParticipant = (field: 'participants' | 'notifications', type: Participant['type'], value: string) => {
        const newItem: Participant = { type, value };
        onUpdate(stage.id, { [field]: [...stage[field], newItem] });
    };

    return (
        <div className="space-y-8 py-2 md:py-4">
            {/* 0. Rastreio de Dados (Inbound) */}
            <section className="space-y-3">
                <header className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Database className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Rastreio de Dados</span>
                    </div>
                    <Badge variant="outline" className="text-[9px] border-emerald-200 text-emerald-700 bg-emerald-50">Anterior: {stage.id.split('-')[1] || 'Início'}</Badge>
                </header>
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-medium">
                        <Info className="w-3 h-3" />
                        <p className="text-[11px]">Inputs mapeados do estágio anterior:</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 font-mono">
                        {["severidade", "local_id", "status_sensor"].map(f => (
                            <span key={f} className="text-[9px] bg-white border border-emerald-200 px-1.5 py-0.5 rounded text-emerald-600">
                                {`{{${f}}}`}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 1. Identificação Básica */}
            <section className="grid gap-5">
                <header className="flex items-center gap-2 text-muted-foreground px-1">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Contexto da Coleta</span>
                </header>
                <div className="grid gap-4 bg-muted/30 p-4 rounded-2xl border">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-foreground/70">NOME DO ESTÁGIO</Label>
                        <Input
                            placeholder="Ex: Validação COSE"
                            value={stage.name}
                            className="bg-background border-none shadow-sm h-11"
                            onChange={(e) => onUpdate(stage.id, { name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-foreground/70">FORMULÁRIO VINCULADO</Label>
                        <Select value={stage.formId} onValueChange={(val) => onUpdate(stage.id, { formId: val })}>
                            <SelectTrigger className="bg-background border-none shadow-sm h-11 font-medium">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-primary/60" />
                                    <SelectValue placeholder="Selecione..." />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="FORM_001">Checklist Inicial</SelectItem>
                                <SelectItem value="FORM_002">Relatório de Abandono</SelectItem>
                                <SelectItem value="FORM_003">Termo de Encerramento</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            {/* 2. Ação e Notificação */}
            <div className="grid gap-8">
                <ParticipantSection
                    title="Responsabilidade de Ação"
                    icon={<Users className="w-4 h-4" />}
                    color="blue"
                    items={stage.participants}
                    onAdd={(type: string, val: string) => addParticipant('participants', type as Participant['type'], val)}
                    onRemove={(i: number) => removeItem('participants', i)}
                />

                <ParticipantSection
                    title="Notificações Automáticas"
                    icon={<Bell className="w-4 h-4" />}
                    color="orange"
                    items={stage.notifications}
                    onAdd={(type: string, val: string) => addParticipant('notifications', type as Participant['type'], val)}
                    onRemove={(i: number) => removeItem('notifications', i)}
                />
            </div>

            {/* 3. Regras de Automação */}
            <section className="pt-2">
                <div className="bg-primary/5 rounded-2xl border border-primary/10 overflow-hidden">
                    <div className="px-4 py-3 bg-primary/10 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Regras do Motor</span>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between group">
                            <Label className="text-sm font-bold cursor-pointer">Gatilho de Evacuação</Label>
                            <Switch
                                checked={stage.isEvacuation}
                                onCheckedChange={(v) => onUpdate(stage.id, { isEvacuation: v })}
                            />
                        </div>
                        <Separator className="bg-primary/10" />
                        <div className="flex items-center justify-between group">
                            <Label className="text-sm font-bold cursor-pointer">Finalizar Fluxo</Label>
                            <Switch
                                checked={stage.canCloseScenario}
                                onCheckedChange={(v) => onUpdate(stage.id, { canCloseScenario: v })}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

/**
 * Componentes Auxiliares Organizados
 */

function ParticipantSection({ title, icon, color, items, onAdd, onRemove }: any) {
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <div className={cn("flex items-center gap-2", color === 'blue' ? 'text-blue-600' : 'text-orange-600')}>
                    <div className={cn("p-1.5 rounded-lg", color === 'blue' ? 'bg-blue-500/10' : 'bg-orange-500/10')}>
                        {icon}
                    </div>
                    <h4 className="text-sm font-bold tracking-tight text-foreground">{title}</h4>
                </div>
                <ParticipantPicker onSelect={onAdd} buttonColor={color === 'blue' ? 'text-blue-600' : 'text-orange-600'} />
            </div>

            <div className={cn(
                "flex flex-wrap gap-2 p-3 rounded-xl border-2 border-dashed transition-colors min-h-[58px]",
                items.length > 0 ? "bg-background border-muted" : "bg-muted/20 border-muted/50"
            )}>
                {items.map((p: Participant, i: number) => (
                    <Badge key={i} variant="secondary" className={cn(
                        "pl-2 pr-1 py-1 gap-1 border transition-all",
                        color === 'blue' ? "bg-blue-500/5 border-blue-200/50 text-blue-700" : "bg-orange-500/5 border-orange-200/50 text-orange-700"
                    )}>
                        <span className="text-[9px] font-black opacity-50 uppercase tracking-tighter">{p.type}:</span>
                        <span className="text-[11px] font-medium">{p.value}</span>
                        <button onClick={() => onRemove(i)} className="ml-1 p-0.5 rounded-full hover:bg-muted"><X className="w-3 h-3" /></button>
                    </Badge>
                ))}
                {items.length === 0 && <p className="text-[11px] text-muted-foreground/50 italic px-1 pt-1">Nenhum registro.</p>}
            </div>
        </section>
    );
}

function ParticipantPicker({ onSelect, buttonColor }: { onSelect: (type: Participant['type'], value: string) => void, buttonColor: string }) {
    const [open, setOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<Participant['type'] | null>(null);
    const [query, setQuery] = useState("");

    const handleSelect = (val: string) => {
        if (selectedType) {
            onSelect(selectedType, val);
            setOpen(false);
            setSelectedType(null);
            setQuery("");
        }
    };

    const types = [
        { id: 'user', label: 'Usuário', icon: UserCircle },
        { id: 'sector', label: 'Setor', icon: Database },
        { id: 'role', label: 'Função', icon: Search },
        { id: 'team', label: 'Equipe', icon: Users },
        { id: 'dynamic', label: 'Equipe Dinâmica', icon: Code2 },
    ] as const;

    return (
        <Popover open={open} onOpenChange={(val) => { setOpen(val); if (!val) setSelectedType(null); }}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className={cn("h-8 text-[10px] font-bold gap-1", buttonColor)}>
                    <Plus className="w-3 h-3" /> ADICIONAR
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-2 shadow-2xl" align="end">
                {!selectedType ? (
                    <div className="grid gap-1">
                        <p className="text-[10px] font-bold text-muted-foreground px-2 py-1 uppercase">Escolha o tipo</p>
                        {types.map((t) => (
                            <Button key={t.id} variant="ghost" className="justify-start gap-2 h-9 text-xs" onClick={() => setSelectedType(t.id)}>
                                <t.icon className="w-3.5 h-3.5 text-muted-foreground" /> {t.label}
                            </Button>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3 p-2">
                        <div className="flex items-center justify-between border-b pb-2 mb-2">
                            <span className="text-[10px] font-black uppercase text-primary">{selectedType}</span>
                            <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setSelectedType(null)}><X className="w-3 h-3" /></Button>
                        </div>

                        {selectedType === 'dynamic' ? (
                            <div className="space-y-2">
                                <Label className="text-[9px] font-bold">REGRA DA QUERY</Label>
                                <Input
                                    placeholder="Ex: [risco] > 3"
                                    className="text-[11px] font-mono h-8"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <Button className="w-full h-8 text-[10px] font-bold" onClick={() => handleSelect(query || "Query Dinâmica")}>SALVAR REGRA</Button>
                            </div>
                        ) : (
                            <Select onValueChange={handleSelect}>
                                <SelectTrigger className="h-9 text-xs">
                                    <SelectValue placeholder="Escolher item..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Segurança Patrimonial">Segurança Patrimonial</SelectItem>
                                    <SelectItem value="Brigada Alfa">Brigada Alfa</SelectItem>
                                    <SelectItem value="Diretoria de Operações">Diretoria de Operações</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}
import { useState } from "react";
import {
    Zap,
    Users,
    Trash2,
    GripVertical,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type TriggerRuleType = "sector" | "role" | "team" | "user";

interface TriggerActionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export function TriggerActionModal({
    open,
    onOpenChange,
}: TriggerActionModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [rules, setRules] = useState<TriggerRuleType[]>([]);

    function addRule(type: TriggerRuleType) {
        setRules((prev) => [...prev, type]);
    }

    function removeRule(index: number) {
        setRules((prev) => prev.filter((_, i) => i !== index));
    }

    function handleClose(open: boolean) {
        if (!open) {
            setName("");
            setDescription("");
            setRules([]);
        }
        onOpenChange(open);
    }

    /* ---------------------------------------------------------------------- */
    /*                                   UI                                   */
    /* ---------------------------------------------------------------------- */

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Zap size={18} />
                        Novo acionamento
                    </DialogTitle>

                    <DialogDescription>
                        Configure critérios para selecionar usuários
                        dinamicamente
                    </DialogDescription>
                </DialogHeader>

                {/* CONTENT */}
                <div className="space-y-6">
                    {/* METADATA */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                            <Label>Nome do acionamento</Label>
                            <Input
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                placeholder="Ex: Acionamento por setor"
                            />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                            <Label>Descrição</Label>
                            <Input
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                placeholder="Descrição opcional"
                            />
                        </div>
                    </div>

                    {/* RULE TYPES */}
                    <div className="space-y-2">
                        <Label>Adicionar critério</Label>

                        <div className="flex flex-wrap gap-2">
                            <Badge
                                onClick={() => addRule("sector")}
                                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                variant="outline"
                            >
                                + Setor
                            </Badge>

                            <Badge
                                onClick={() => addRule("role")}
                                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                variant="outline"
                            >
                                + Função
                            </Badge>

                            <Badge
                                onClick={() => addRule("team")}
                                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                variant="outline"
                            >
                                + Equipe
                            </Badge>

                            <Badge
                                onClick={() => addRule("user")}
                                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                variant="outline"
                            >
                                + Usuário específico
                            </Badge>
                        </div>
                    </div>

                    {/* RULES LIST */}
                    {rules.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label>Critérios configurados</Label>
                                <span className="text-xs text-muted-foreground">
                                    {rules.length} critérios
                                </span>
                            </div>

                            <div className="space-y-2 rounded-xl border p-3">
                                {rules.map((rule, index) => (
                                    <div
                                        key={index}
                                        className="group flex items-center justify-between rounded-lg border bg-background px-3 py-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <GripVertical
                                                size={16}
                                                className="text-muted-foreground"
                                            />

                                            <Users
                                                size={14}
                                                className="text-muted-foreground"
                                            />

                                            <span className="text-sm capitalize">
                                                {rule === "sector" &&
                                                    "Selecionar por setor"}
                                                {rule === "role" &&
                                                    "Selecionar por função"}
                                                {rule === "team" &&
                                                    "Selecionar por equipe"}
                                                {rule === "user" &&
                                                    "Selecionar usuário específico"}
                                            </span>
                                        </div>

                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="opacity-0 transition group-hover:opacity-100"
                                            onClick={() =>
                                                removeRule(index)
                                            }
                                        >
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={() => handleClose(false)}
                    >
                        Cancelar
                    </Button>

                    <Button disabled={!name || rules.length === 0}>
                        Salvar acionamento
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

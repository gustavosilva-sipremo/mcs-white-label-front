import { useState } from "react";
import { Users } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CreateTeamFormData {
    name: string;
    description?: string;
    members: string[]; // ids futuramente
}

interface CreateTeamModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateTeamModal({
    open,
    onOpenChange,
}: CreateTeamModalProps) {
    const initialState: CreateTeamFormData = {
        name: "",
        description: "",
        members: [],
    };

    const [formData, setFormData] =
        useState<CreateTeamFormData>(initialState);

    const handleChange = <K extends keyof CreateTeamFormData>(
        field: K,
        value: CreateTeamFormData[K],
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name) {
            alert("O nome da equipe é obrigatório.");
            return;
        }

        console.log("Nova equipe:", formData);

        onOpenChange(false);
        setFormData(initialState);
    };

    const handleCancel = () => {
        onOpenChange(false);
        setFormData(initialState);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <Users className="h-5 w-5 text-primary" />
                        Nova equipe
                    </DialogTitle>
                    <DialogDescription>
                        Crie uma equipe e defina os usuários que farão parte
                        dela.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nome da equipe */}
                    <div className="space-y-2">
                        <Label>Nome da equipe *</Label>
                        <Input
                            placeholder="Ex: Time de Operações"
                            value={formData.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                        />
                    </div>

                    {/* Descrição */}
                    <div className="space-y-2">
                        <Label>Descrição</Label>
                        <Input
                            placeholder="Descrição opcional da equipe"
                            value={formData.description}
                            onChange={(e) =>
                                handleChange("description", e.target.value)
                            }
                        />
                    </div>

                    {/* Placeholder membros */}
                    <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground mb-1">
                            Membros da equipe
                        </p>
                        <p>
                            A seleção de usuários será adicionada aqui
                            (internos e externos).
                        </p>
                    </div>

                    <DialogFooter className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit">Criar equipe</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

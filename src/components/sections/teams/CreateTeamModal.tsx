import { useMemo, useState } from "react";
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

import {
    UserMultiSelect,
    SelectableUser,
} from "@/components/others/UserMultiSelect";

import { mockUsers } from "@/mocks/mock-users";
import { mockExternalUsers } from "@/mocks/mock-external-users";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface CreateTeamFormData {
    name: string;
    description?: string;
    members: string[];
}

interface CreateTeamModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

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

    /* ---------------------------------------------------------------------- */
    /*                           NORMALIZED USERS                               */
    /* ---------------------------------------------------------------------- */

    const users: SelectableUser[] = useMemo(
        () => [
            ...mockUsers.map((u) => ({
                id: `interno-${u.id}`, // prefixo
                name: u.name,
                email: u.email,
                username: u.username,
                type: "Interno",
            })),
            ...mockExternalUsers.map((u) => ({
                id: `externo-${u.id}`, // prefixo
                name: u.name,
                email: u.email,
                type: "Externo",
            })),
        ],
        [],
    );


    /* ---------------------------------------------------------------------- */
    /*                                 ACTIONS                                  */
    /* ---------------------------------------------------------------------- */

    const reset = () => setFormData(initialState);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) return;

        console.log("Nova equipe:", formData);

        onOpenChange(false);
        reset();
    };

    /* ---------------------------------------------------------------------- */
    /*                                   UI                                    */
    /* ---------------------------------------------------------------------- */

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="
                    flex h-[100dvh] flex-col
                    rounded-none p-0
                    sm:h-auto sm:max-h-[90vh] sm:max-w-[680px] sm:rounded-lg
                "
            >
                {/* Header */}
                <DialogHeader className="border-b px-4 py-4 sm:px-6">
                    <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Users className="h-5 w-5 text-primary" />
                        Nova equipe
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                        Crie uma equipe e defina quem faz parte dela.
                    </DialogDescription>
                </DialogHeader>

                {/* Body */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-1 flex-col overflow-hidden"
                >
                    <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4 sm:px-6">
                        {/* Nome */}
                        <div className="space-y-1.5">
                            <Label>Nome da equipe *</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData((p) => ({
                                        ...p,
                                        name: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        {/* Descrição */}
                        <div className="space-y-1.5">
                            <Label>Descrição</Label>
                            <Input
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData((p) => ({
                                        ...p,
                                        description: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        {/* Membros */}
                        <div className="space-y-2">
                            <Label>Membros da equipe</Label>

                            <UserMultiSelect
                                users={users}
                                value={formData.members}
                                onChange={(members) =>
                                    setFormData((p) => ({
                                        ...p,
                                        members,
                                    }))
                                }
                                maxHeightClassName="max-h-[40vh] sm:max-h-72"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <DialogFooter
                        className="
                            sticky bottom-0
                            flex flex-col gap-2
                            border-t bg-background
                            px-4 py-3
                            sm:flex-row sm:justify-end sm:px-6
                        "
                    >
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full sm:w-auto"
                            onClick={() => {
                                onOpenChange(false);
                                reset();
                            }}
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            className="w-full sm:w-auto"
                            disabled={!formData.name.trim()}
                        >
                            Criar equipe
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

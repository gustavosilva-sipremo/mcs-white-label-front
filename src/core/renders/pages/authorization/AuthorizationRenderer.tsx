"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ShieldCheck } from "lucide-react";

import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { AuthorizationForm } from "./AuthorizationForm";

import { Authorization } from "./authorization.types";
import { MOCK_AUTHORIZATIONS } from "./authorization.mock";

/* -------------------------------------------------------------------------- */
/*                               MAIN RENDERER                                */
/* -------------------------------------------------------------------------- */

export function AuthorizationRenderer() {
    const [authorizations, setAuthorizations] = useState(MOCK_AUTHORIZATIONS);
    const [editing, setEditing] = useState<Authorization | null>(null);
    const [open, setOpen] = useState(false);

    function handleDelete(id: string) {
        setAuthorizations(prev => prev.filter(a => a.id !== id));
    }

    function handleSave(auth: Authorization) {
        setAuthorizations(prev => {
            const exists = prev.find(a => a.id === auth.id);
            if (exists) {
                return prev.map(a => (a.id === auth.id ? auth : a));
            }
            return [...prev, auth];
        });

        setOpen(false);
        setEditing(null);
    }

    return (
        <div className="relative w-full px-4 pb-28 pt-6 sm:px-6 lg:px-8">
            <BackgroundPattern opacity={0.06} size={64} />

            <div className="mx-auto max-w-6xl space-y-8">
                {/* ---------------------------------------------------------------- */}
                {/* Header                                                           */}
                {/* ---------------------------------------------------------------- */}
                <header className="text-center space-y-2">
                    <h1 className="text-2xl font-bold sm:text-3xl">
                        Configurações de Autorizações
                    </h1>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        Controle quem pode acessar o quê dentro do sistema
                    </p>
                </header>

                {/* ---------------------------------------------------------------- */}
                {/* Desktop Action                                                    */}
                {/* ---------------------------------------------------------------- */}
                <div className="hidden sm:flex justify-end">
                    <Button
                        onClick={() => {
                            setEditing(null);
                            setOpen(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Nova autorização
                    </Button>
                </div>

                {/* ---------------------------------------------------------------- */}
                {/* List                                                             */}
                {/* ---------------------------------------------------------------- */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {authorizations.map(auth => (
                        <Card
                            key={auth.id}
                            className="group relative p-4 transition hover:shadow-md"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4 text-primary" />
                                        <h3 className="font-semibold leading-tight">
                                            {auth.name}
                                        </h3>
                                    </div>

                                    <Badge variant="secondary" className="text-xs">
                                        {auth.scope} • {auth.target}
                                    </Badge>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => {
                                            setEditing(auth);
                                            setOpen(true);
                                        }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>

                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => handleDelete(auth.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </div>

                            <Separator className="my-3" />

                            {/* Footer */}
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>
                                    {auth.routes.length} rotas configuradas
                                </span>

                                <span className="rounded-full bg-muted px-2 py-0.5">
                                    Permissões
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* ------------------------------------------------------------------ */}
            {/* Mobile Floating Action Button                                      */}
            {/* ------------------------------------------------------------------ */}
            <div className="fixed bottom-4 left-4 right-4 sm:hidden">
                <Button
                    className="w-full shadow-lg"
                    size="lg"
                    onClick={() => {
                        setEditing(null);
                        setOpen(true);
                    }}
                >
                    <Plus className="mr-2 h-5 w-5" />
                    Nova autorização
                </Button>
            </div>

            {/* ------------------------------------------------------------------ */}
            {/* Dialog                                                             */}
            {/* ------------------------------------------------------------------ */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {editing
                                ? "Editar autorização"
                                : "Nova autorização"}
                        </DialogTitle>
                    </DialogHeader>

                    <AuthorizationForm
                        initialData={editing}
                        onSave={handleSave}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

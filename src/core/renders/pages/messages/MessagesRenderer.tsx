"use client";

import { useMemo, useState } from "react";
import { Trash2, Pencil, Info } from "lucide-react";

import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Channel = "email" | "sms" | "whatsapp";

type MessageTemplate = {
    id: string;
    name: string;
    channels: Channel[];
    headerHtml: string;
    bodyHtml: string;
    footerHtml: string;
};

/* -------------------------------------------------------------------------- */
/*                              MOCK BACKEND                                  */
/* -------------------------------------------------------------------------- */

const MOCK_VARIABLES: Record<string, string> = {
    nome: "João Silva",
    email: "joao@empresa.com",
    telefone: "(11) 98888-7777",
    data_ocorrencia: "12/02/2026",
    hora_ocorrencia: "14:32",
    link_confirmacao: "https://app.exemplo.com/confirmar/abc123",
};

const INITIAL_MESSAGES: MessageTemplate[] = [
    {
        id: "1",
        name: "Alerta de ocorrência",
        channels: ["email", "sms"],
        headerHtml: "<p>Olá {{nome}},</p>",
        bodyHtml:
            "<p>Houve uma ocorrência registrada em {{data_ocorrencia}} às {{hora_ocorrencia}}.</p>",
        footerHtml:
            "<p>Em caso de dúvidas, entre em contato pelo telefone {{telefone}}.</p>",
    },
];

/* -------------------------------------------------------------------------- */
/*                               HELPERS                                      */
/* -------------------------------------------------------------------------- */

function resolveVariables(html: string) {
    return html.replace(/{{(.*?)}}/g, (_, key) => {
        return MOCK_VARIABLES[key.trim()] ?? `{{${key}}}`;
    });
}

function sanitizeSMS(text: string) {
    return text
        .replace(/<[^>]*>?/gm, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\x00-\x7F]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function countSMSParts(text: string) {
    return Math.max(1, Math.ceil(text.length / 160));
}

/* -------------------------------------------------------------------------- */
/*                             RICH TEXT EDITOR                               */
/* -------------------------------------------------------------------------- */

type RichTextEditorProps = {
    label: string;
    value: string;
    onChange: (html: string) => void;
    onInsertVariable: (editor: Editor) => void;
};

function RichTextEditor({
    label,
    value,
    onChange,
    onInsertVariable,
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit, Link],
        content: value,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    if (!editor) return null;

    return (
        <div className="space-y-1">
            <Label>{label}</Label>

            <div className="rounded-md border">
                <div className="flex flex-wrap gap-1 border-b p-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                        B
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    >
                        I
                    </Button>

                    <Separator orientation="vertical" className="mx-1 h-6" />

                    {Object.keys(MOCK_VARIABLES).map((v) => (
                        <Button
                            key={v}
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                                editor.chain().focus().insertContent(`{{${v}}}`).run();
                                onInsertVariable(editor);
                            }}
                        >
                            {v}
                        </Button>
                    ))}
                </div>

                <EditorContent className="prose prose-sm max-w-none p-3" editor={editor} />
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                              MAIN RENDERER                                 */
/* -------------------------------------------------------------------------- */

export function MessagesRenderer() {
    const [messages, setMessages] =
        useState<MessageTemplate[]>(INITIAL_MESSAGES);

    const [editingId, setEditingId] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [channels, setChannels] = useState<Channel[]>([]);

    const [headerHtml, setHeaderHtml] = useState("");
    const [bodyHtml, setBodyHtml] = useState("");
    const [footerHtml, setFooterHtml] = useState("");

    const fullHtml = `${headerHtml}${bodyHtml}${footerHtml}`;

    const sanitizedSMS = useMemo(
        () => sanitizeSMS(fullHtml),
        [fullHtml],
    );

    const smsParts = useMemo(
        () => countSMSParts(sanitizedSMS),
        [sanitizedSMS],
    );

    function resetForm() {
        setEditingId(null);
        setName("");
        setChannels([]);
        setHeaderHtml("");
        setBodyHtml("");
        setFooterHtml("");
    }

    function handleSave() {
        if (!name || channels.length === 0) return;

        if (editingId) {
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === editingId
                        ? {
                            ...m,
                            name,
                            channels,
                            headerHtml,
                            bodyHtml,
                            footerHtml,
                        }
                        : m,
                ),
            );
        } else {
            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    name,
                    channels,
                    headerHtml,
                    bodyHtml,
                    footerHtml,
                },
            ]);
        }

        resetForm();
    }

    function handleEdit(msg: MessageTemplate) {
        setEditingId(msg.id);
        setName(msg.name);
        setChannels(msg.channels);
        setHeaderHtml(msg.headerHtml);
        setBodyHtml(msg.bodyHtml);
        setFooterHtml(msg.footerHtml);
    }

    function handleDelete(id: string) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (editingId === id) resetForm();
    }

    function toggleChannel(channel: Channel) {
        setChannels((prev) =>
            prev.includes(channel)
                ? prev.filter((c) => c !== channel)
                : [...prev, channel],
        );
    }

    return (
        <div className="relative w-full px-4 pb-24 pt-6">
            <BackgroundPattern opacity={0.06} size={64} />

            <div className="mx-auto max-w-6xl space-y-10">
                {/* HEADER */}
                <header className="text-center space-y-2">
                    <h1 className="text-2xl font-bold">Mensagens para disparo</h1>
                    <p className="text-sm text-muted-foreground">
                        Builder intuitivo com preview realista
                    </p>
                </header>

                {/* EDIT MODE BANNER */}
                {editingId && (
                    <div className="flex items-center justify-between rounded-md border border-primary bg-primary/10 p-3">
                        <div className="flex items-center gap-2 text-sm">
                            <Info className="h-4 w-4" />
                            Você está editando uma mensagem existente
                        </div>
                        <Button size="sm" variant="outline" onClick={resetForm}>
                            Sair da edição
                        </Button>
                    </div>
                )}

                {/* HUB */}
                <Card>
                    <CardHeader>
                        <CardTitle>Mensagens salvas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex items-center justify-between rounded-md border p-3",
                                    editingId === msg.id && "border-primary bg-primary/5",
                                )}
                            >
                                <div>
                                    <p className="font-medium">{msg.name}</p>
                                    <div className="mt-1 flex gap-2">
                                        {msg.channels.map((c) => (
                                            <Badge key={c} variant="secondary">
                                                {c.toUpperCase()}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button size="icon" variant="outline" onClick={() => handleEdit(msg)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="destructive" onClick={() => handleDelete(msg.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* BUILDER */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className={cn(editingId && "border-primary shadow-md")}>
                        <CardHeader>
                            <CardTitle>Construção da mensagem</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            <Input
                                placeholder="Nome da mensagem"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <div className="flex flex-wrap gap-4">
                                {(["email", "sms", "whatsapp"] as Channel[]).map((c) => (
                                    <label key={c} className="flex items-center gap-2 text-sm">
                                        <Checkbox
                                            checked={channels.includes(c)}
                                            onCheckedChange={() => toggleChannel(c)}
                                        />
                                        {c.toUpperCase()}
                                    </label>
                                ))}
                            </div>

                            <Separator />

                            <RichTextEditor
                                label="Header"
                                value={headerHtml}
                                onChange={setHeaderHtml}
                                onInsertVariable={() => { }}
                            />

                            <RichTextEditor
                                label="Body"
                                value={bodyHtml}
                                onChange={setBodyHtml}
                                onInsertVariable={() => { }}
                            />

                            <RichTextEditor
                                label="Footer"
                                value={footerHtml}
                                onChange={setFooterHtml}
                                onInsertVariable={() => { }}
                            />

                            <Button className="w-full" onClick={handleSave}>
                                {editingId ? "Salvar alterações" : "Criar mensagem"}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* PREVIEW */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Preview final</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div
                                className="prose prose-sm max-w-none rounded-md border p-3"
                                dangerouslySetInnerHTML={{
                                    __html: resolveVariables(fullHtml),
                                }}
                            />

                            <Separator />

                            <Textarea readOnly rows={6} value={sanitizedSMS} />

                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Caracteres: {sanitizedSMS.length}</span>
                                <span>Partes SMS: {smsParts}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

import {
    ClipboardPen,
    MessageCircleMore,
    Workflow,
    ArrowRight,
} from "lucide-react";

import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                CARD UI                                     */
/* -------------------------------------------------------------------------- */

interface TestCardProps {
    title: string;
    description: string;
    icon: React.ComponentType<{ size?: number }>;
    href?: string;
    enabled?: boolean;
}

function TestCard({ title, description, icon: Icon, href, enabled = false }: TestCardProps) {
    const cardContent = (
        <div
            className={cn(
                "group flex h-full flex-col justify-between rounded-2xl border bg-card p-5 shadow-sm transition-all",
                enabled
                    ? "hover:-translate-y-0.5 hover:shadow-md focus-within:shadow-md"
                    : "opacity-60 cursor-not-allowed"
            )}
        >
            <div className="space-y-4">
                <div
                    className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                        enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    )}
                >
                    <Icon size={22} />
                </div>

                <div className="space-y-1">
                    <h3 className="text-base font-semibold leading-tight text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-snug">{description}</p>
                </div>
            </div>

            <Button
                variant={enabled ? "default" : "outline"}
                disabled={!enabled}
                className="mt-6 gap-2 flex items-center justify-center"
            >
                Acessar teste <ArrowRight size={16} />
            </Button>
        </div>
    );

    if (!enabled || !href) return cardContent;

    return (
        <a href={href} className="block h-full focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-2xl">
            {cardContent}
        </a>
    );
}

/* -------------------------------------------------------------------------- */
/*                              MAIN RENDERER                                 */
/* -------------------------------------------------------------------------- */

export function TestsRenderer() {
    return (
        <div className="relative w-full px-4 pb-24 pt-6 sm:px-6 lg:px-8">
            <BackgroundPattern opacity={0.06} size={64} />

            <div className="mx-auto max-w-5xl space-y-10">
                {/* Header */}
                <header className="text-center space-y-3">
                    <h1 className="text-2xl font-bold sm:text-3xl text-foreground">Ambiente de Testes</h1>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        Simule formulários, acionamentos e fluxos antes de colocar em produção
                    </p>
                </header>

                {/* Cards */}
                <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <TestCard
                        title="Teste de Formulários"
                        description="Execute e valide formulários gerados pelo builder, com lógica de perguntas e condições."
                        icon={ClipboardPen}
                        enabled
                        href="/tests/forms"
                    />

                    <TestCard
                        title="Teste de Acionamentos"
                        description="Simule disparos de mensagens, notificações e ações automáticas."
                        icon={MessageCircleMore}
                    />

                    <TestCard
                        title="Teste de Fluxos"
                        description="Valide fluxos completos combinando formulários, decisões e acionamentos."
                        icon={Workflow}
                    />
                </section>
            </div>
        </div>
    );
}

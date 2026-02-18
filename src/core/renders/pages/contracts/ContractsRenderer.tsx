import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { FileJson2 } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                              MAIN RENDERER                                 */
/* -------------------------------------------------------------------------- */

export function ContractsRenderer() {
    return (
        <div className="relative w-full px-4 pb-24 pt-6 sm:px-6 lg:px-8">
            <BackgroundPattern opacity={0.06} size={64} />

            <div className="mx-auto max-w-5xl space-y-14">
                {/* Header */}
                <header className="text-center space-y-3">
                    <h1 className="text-2xl font-bold sm:text-3xl text-foreground">
                        Gerenciamento de Contratos
                    </h1>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        Defina a identidade, regras e capacidades de cada empresa na plataforma.
                    </p>
                </header>

                {/* Working in progress */}
                <div className="flex justify-center">
                    <div className="w-full max-w-xl rounded-xl border border-dashed border-border bg-card/40 p-10 text-center shadow-sm backdrop-blur">
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                            <FileJson2 className="h-7 w-7" />
                        </div>

                        <h2 className="text-lg font-semibold text-foreground">
                            Em construção
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Estamos trabalhando na estrutura de contratos que irá definir
                            a identidade e o comportamento de cada empresa no sistema.
                        </p>

                        <p className="mt-4 text-xs text-muted-foreground/80">
                            Em breve você poderá criar, versionar e validar contratos em formato JSON.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

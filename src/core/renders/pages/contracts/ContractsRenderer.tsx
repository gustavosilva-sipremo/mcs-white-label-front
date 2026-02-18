import { BackgroundPattern } from "@/components/others/BackgroundPattern";

/* -------------------------------------------------------------------------- */
/*                              MAIN RENDERER                                 */
/* -------------------------------------------------------------------------- */

export function ContractsRenderer() {
    return (
        <div className="relative w-full px-4 pb-24 pt-6 sm:px-6 lg:px-8">
            <BackgroundPattern opacity={0.06} size={64} />

            <div className="mx-auto max-w-5xl space-y-10">
                {/* Header */}
                <header className="text-center space-y-3">
                    <h1 className="text-2xl font-bold sm:text-3xl text-foreground">Configurações de Contratos</h1>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        Gerencie os contratos das empresas no sistema.
                    </p>
                </header>
            </div>
        </div>
    );
}

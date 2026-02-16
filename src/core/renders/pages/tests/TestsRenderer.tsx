import { BackgroundPattern } from "@/components/others/BackgroundPattern";

/* -------------------------------------------------------------------------- */
/*                              MAIN RENDERER                                 */
/* -------------------------------------------------------------------------- */

export function TestsRenderer() {
    return (
        <>
            <BackgroundPattern opacity={0.06} size={64} />

            <h1 className="text-2xl font-bold">Página de Testes</h1>
        </>
    );
}

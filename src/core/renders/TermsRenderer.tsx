import { TermsAcceptance } from "@/components/sections/Terms";
import { useContract } from "../contracts/contract-provider";
import { TERMS_MOCK } from "@/mocks/mock-terms";

export function TermsRenderer() {
  const contract = useContract();

  // Guard de render
  if (!contract.renders.terms?.enabled) return null;

  // Função chamada ao aceitar os termos
  const handleAccept = (acceptedTerms: typeof TERMS_MOCK) => {
    console.log("Termos aceitos:", acceptedTerms);
    // Aqui você poderá redirecionar ou atualizar o estado de aceite do usuário
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 md:px-10 relative overflow-hidden bg-background"
      aria-hidden="true"
    >
      {/* Pattern elegante no background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)/0.1) 2px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)/0.1) 2px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl">
        <TermsAcceptance terms={TERMS_MOCK} onAccept={handleAccept} />
      </div>
    </div>
  );
}

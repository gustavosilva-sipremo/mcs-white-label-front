import { TermsAcceptance } from "@/components/sections/terms/Terms";
import { useContract } from "@/core/contracts/contract-provider";
import { TERMS_MOCK } from "@/mocks/mock-terms";

import { PageLoader } from "@/components/others/PageLoader";
import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { Watermark } from "@/components/others/Watermark";

export function TermsRenderer() {
  const contract = useContract();

  // Guard de render
  if (!contract.renders.terms?.enabled) return null;

  const handleAccept = (acceptedTerms: typeof TERMS_MOCK) => {
    console.log("Termos aceitos:", acceptedTerms);
    // aqui você pode redirecionar ou persistir aceite
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 md:px-10 bg-background overflow-hidden">
      {/* Loader */}
      <PageLoader />

      {/* Background pattern */}
      <BackgroundPattern opacity={0.1} size={64} />

      {/* Watermark */}
      <Watermark />

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-2xl">
        <TermsAcceptance terms={TERMS_MOCK} onAccept={handleAccept} />
      </div>
    </div>
  );
}

import { Outlet, useLocation } from "react-router-dom";

import { PageLoader } from "@/components/others/PageLoader";
import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { Watermark } from "@/components/others/Watermark";
import { BrandingLogo } from "@/components/others/BrandingLogo";

import { useContract } from "@/core/contracts/contract-provider";
import { getBrandingLogoClass } from "@/lib/utils";

export function NormalLayout() {
  const location = useLocation();
  const contract = useContract();

  const logoClass = getBrandingLogoClass(contract, "lg");

  return (
    <div className="flex min-h-screen bg-background relative">
      {/* Loader global */}
      <PageLoader key={location.pathname} />

      {/* Background pattern */}
      <BackgroundPattern opacity={0.1} size={64} />

      {/* Watermark */}
      <Watermark />

      {/* Card centralizado */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 sm:px-12 md:px-24 z-10">
        <div className="w-full max-w-md bg-card/90 text-card-foreground rounded-2xl shadow-lg p-8 sm:p-10 border">
          {/* Logo */}
          <div className="flex justify-center mb-8 select-none">
            <BrandingLogo className={`h-26 ${logoClass}`} />
          </div>

          {/* Conteúdo */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
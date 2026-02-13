import { Outlet, useLocation } from "react-router-dom";
import empresaLogo from "/images/sipremo_logo_white.svg";

import { PageLoader } from "@/components/others/PageLoader";
import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { Watermark } from "@/components/others/Watermark";

export function NormalLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Loader global (remonta a cada troca de rota) */}
      <PageLoader key={location.pathname} />

      {/* Background pattern */}
      <BackgroundPattern opacity={0.1} size={64} />

      {/* Watermark */}
      <Watermark />

      {/* Card centralizado */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 sm:px-12 md:px-24 z-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src={empresaLogo}
              alt="Empresa Logo"
              className="w-36 sm:w-full h-auto select-none"
            />
          </div>

          {/* Conteúdo da rota */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

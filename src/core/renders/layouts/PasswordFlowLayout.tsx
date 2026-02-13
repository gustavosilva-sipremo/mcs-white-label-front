// src/core/renders/layouts/PasswordFlowLayout.tsx
import { ReactNode } from "react";
import sipremoLogo from "/favicons/sipremo.svg";
import empresaLogo from "/images/sipremo_logo_white.svg";

interface PasswordFlowLayoutProps {
  title: string;
  children: ReactNode;
}

export function PasswordFlowLayout({
  title,
  children,
}: PasswordFlowLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Background pattern */}
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

      {/* Watermark */}
      <div className="hidden md:flex absolute left-0 top-0 h-full w-full items-center justify-center invert overflow-hidden pointer-events-none select-none">
        <img
          src={sipremoLogo}
          alt="Sipremo Logo"
          className="absolute -left-[50%] w-[200%] top-1/2 transform -translate-y-1/2 opacity-20"
        />
      </div>

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

          {/* Título */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6">
            {title}
          </h1>

          {/* Conteúdo do formulário */}
          <div className="flex flex-col gap-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

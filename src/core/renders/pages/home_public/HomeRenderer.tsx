"use client";

import { CircleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PublicHomeRenderer() {
  return (
    <>
      {/* HERO */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center gap-6">
        <div className="space-y-2 mb-4">
          <h1 className="text-2xl font-bold leading-tight">
            Registrar uma ocorrência
          </h1>

          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Use este canal para acionar rapidamente uma ocorrência operacional.
            O registro é simples e guiado.
          </p>
        </div>

        {/* CTA CENTRAL (opcional, reforço visual) */}
        <Button
          size="lg"
          className="h-14 w-full max-w-sm text-base shadow-lg font-semibold tracking-wide uppercase"
        >
          <CircleAlert className="h-5 w-5" />
          Acionar ocorrência
        </Button>
      </div>
    </>
  );
}

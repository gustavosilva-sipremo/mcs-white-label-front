import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";

export interface Term {
  id: number;
  title: string;
  description: string;
  required: boolean;
}

interface TermsAcceptanceProps {
  terms: Term[];
  onAccept: (acceptedTerms: Term[]) => void;
}

export function TermsAcceptance({ terms, onAccept }: TermsAcceptanceProps) {
  const [acceptedIds, setAcceptedIds] = useState<number[]>([]);

  const toggleTerm = (id: number) => {
    setAcceptedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const allRequiredAccepted = terms
    .filter((t) => t.required)
    .every((t) => acceptedIds.includes(t.id));

  const handleAccept = () => {
    if (!allRequiredAccepted) {
      alert("Você deve aceitar todos os termos obrigatórios para continuar.");
      return;
    }
    const acceptedTerms = terms.filter((t) => acceptedIds.includes(t.id));
    onAccept(acceptedTerms);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-6 sm:px-6 md:px-10 w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6 text-center">
        Aceite de Termos
      </h1>

      <ScrollArea className="w-full max-w-2xl h-[60vh] rounded-xl border border-border p-4 bg-card/90 shadow-sm">
        <div className="flex flex-col gap-4">
          {terms.map((term) => (
            <Card
              key={term.id}
              className={`p-4 flex flex-col gap-2 border ${
                term.required ? "border-red-300" : "border-muted"
              } shadow-sm hover:shadow-md transition`}
            >
              <div className="flex items-center justify-between">
                <Label className="font-semibold text-base flex items-center gap-2">
                  {term.title}
                </Label>
                {term.required ? (
                  <span className="text-xs text-red-500 font-medium px-2 py-1 border border-red-200 rounded-full">
                    Obrigatório
                  </span>
                ) : (
                  <span className="text-xs text-blue-500 font-medium px-2 py-1 border border-blue-200 rounded-full">
                    Opcional
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground mt-1">{term.description}</p>
              <div className="flex items-center mt-2">
                <Checkbox
                  checked={acceptedIds.includes(term.id)}
                  onCheckedChange={() => toggleTerm(term.id)}
                  id={`term-${term.id}`}
                />
                <Label
                  htmlFor={`term-${term.id}`}
                  className="ml-2 cursor-pointer select-none"
                >
                  Aceito
                </Label>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Button
        onClick={handleAccept}
        className="mt-6 w-full sm:w-auto"
        disabled={!allRequiredAccepted}
      >
        Aceitar Termos
      </Button>
    </div>
  );
}

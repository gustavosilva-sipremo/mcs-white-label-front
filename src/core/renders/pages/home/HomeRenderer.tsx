import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContract } from "@/core/contracts/contract-provider";
import { Trash2, PlusCircle, Clock, CheckCircle } from "lucide-react";
import { BackgroundPattern } from "@/components/others/BackgroundPattern";

interface Occurrence {
  id: number;
  name: string;
  description: string;
  status: "Ativa" | "Finalizada";
  date: string;
}

interface Preset {
  id: number;
  name: string;
  description: string;
}

export function HomeRenderer() {
  const contract = useContract();
  const [search, setSearch] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "alphabet">("date");
  const [showPresets, setShowPresets] = useState(true);

  // Mock de ocorrências
  const occurrences: Occurrence[] = [
    {
      id: 1,
      name: "Incêndio no Armazém",
      description: "Fogo detectado no armazém 5, equipe de emergência acionada",
      status: "Ativa",
      date: "2026-02-09",
    },
    {
      id: 2,
      name: "Derramamento de Petróleo",
      description: "Vazamento no cais 3, área isolada e contenção em andamento",
      status: "Ativa",
      date: "2026-02-08",
    },
    {
      id: 3,
      name: "Invasão de Área Restrita",
      description:
        "Indivíduos não autorizados tentando acessar terminal de cargas",
      status: "Finalizada",
      date: "2026-01-30",
    },
    {
      id: 4,
      name: "Explosão em Contêiner",
      description:
        "Explosão controlada, sem feridos, investigação em andamento",
      status: "Finalizada",
      date: "2026-01-28",
    },
    {
      id: 5,
      name: "Falha no Guindaste",
      description:
        "Guindaste de carga apresenta falha mecânica, operação suspensa",
      status: "Ativa",
      date: "2026-02-07",
    },
    {
      id: 6,
      name: "Acidente com Empilhadeira",
      description:
        "Empilhadeira tombou no cais 2, ferido leve, atendimento médico acionado",
      status: "Finalizada",
      date: "2026-01-25",
    },
    {
      id: 7,
      name: "Incêndio no Navio",
      description: "Navio atracado com fogo na popa, bombeiros em ação",
      status: "Ativa",
      date: "2026-02-05",
    },
  ];

  // Mock de presets
  const presets: Preset[] = [
    {
      id: 1,
      name: "Incêndio",
      description: "Cenário padrão para incêndio em armazéns ou navios",
    },
    {
      id: 2,
      name: "Derramamento de Petróleo",
      description: "Cenário para vazamento de óleo ou produtos químicos",
    },
  ];

  const filteredOccurrences = useMemo(() => {
    const filtered = occurrences.filter((o) => {
      const matchesSearch = o.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = showOld ? true : o.status === "Ativa";
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "date")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      return a.name.localeCompare(b.name);
    });
  }, [search, showOld, sortBy]);

  if (!contract.renders.home?.enabled) return null;

  return (
    <section className="relative flex flex-1 flex-col px-4 py-6 sm:px-6 md:px-10 overflow-hidden">
      {/* Background pattern */}
      <BackgroundPattern opacity={0.1} size={64} />

      {/* Cabeçalho */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          Ocorrências
        </h1>
        <Button className="w-full sm:w-auto flex items-center gap-2">
          <PlusCircle className="w-5 h-5" /> Nova Ocorrência
        </Button>
      </div>

      {/* Filtros e ordenação */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center flex-wrap">
        <Input
          placeholder="Filtrar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px]"
        />
        <Button
          variant="outline"
          onClick={() => setShowOld((prev) => !prev)}
          className="whitespace-nowrap flex items-center gap-2"
        >
          {showOld ? "Ocultar antigas" : "Mostrar antigas"}
          <Clock className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            setSortBy((prev) => (prev === "date" ? "alphabet" : "date"))
          }
          className="whitespace-nowrap flex items-center gap-2"
        >
          {sortBy === "date" ? "Ordem por: Data" : "Ordem por: A-Z"}
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowPresets((prev) => !prev)}
          className="whitespace-nowrap flex items-center gap-2"
        >
          {showPresets ? "Ocultar Pre-sets" : "Mostrar Pre-sets"}
        </Button>
      </div>

      {/* Pre-sets (opcional) */}
      {showPresets && (
        <div className="mb-6 relative z-10">
          <h2 className="text-lg font-semibold mb-2">
            Pre-sets de Ocorrências
          </h2>
          <div className="flex flex-wrap gap-3">
            {presets.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-2 p-3 rounded-xl border border-border bg-card shadow hover:shadow-md transition cursor-pointer"
              >
                <div className="flex-1">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.description}
                  </p>
                </div>
                <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
              </div>
            ))}
            <Button variant="outline" className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" /> Adicionar Pre-set
            </Button>
          </div>
        </div>
      )}

      {/* Lista de ocorrências */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[60vh] relative z-10">
        {filteredOccurrences.length === 0 ? (
          <p className="col-span-full text-sm text-muted-foreground">
            Nenhuma ocorrência encontrada.
          </p>
        ) : (
          filteredOccurrences.map((occ) => (
            <div
              key={occ.id}
              className="p-4 rounded-xl border border-border bg-card shadow hover:shadow-md transition cursor-pointer flex flex-col"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{occ.name}</h2>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${occ.status === "Ativa"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {occ.status === "Ativa" ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  {occ.status}
                </span>
              </div>
              <p className="text-sm text-foreground mb-2">{occ.description}</p>
              <p className="text-xs text-muted-foreground">Data: {occ.date}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

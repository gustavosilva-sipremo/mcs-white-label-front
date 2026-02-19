"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Clock,
  CheckCircle,
  ChevronRight,
  Flame,
  Droplets,
  ShieldAlert,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { useContract } from "@/core/contracts/contract-provider";
import { cn } from "@/lib/utils";

import {
  PRESETS,
  OCCURRENCES,
  Occurrence,
} from "./home.mock";

/* -------------------------------------------------------------------------- */
/*                                 HELPERS                                    */
/* -------------------------------------------------------------------------- */

const PRESET_META: Record<
  number,
  { icon: any; color: string; bg: string }
> = {
  1: { icon: Flame, color: "text-red-500", bg: "bg-red-500/10" },
  2: { icon: Droplets, color: "text-blue-500", bg: "bg-blue-500/10" },
  3: { icon: ShieldAlert, color: "text-amber-500", bg: "bg-amber-500/10" },
};

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export function HomeRenderer() {
  const contract = useContract();

  const [search, setSearch] = useState("");
  const [showOld, setShowOld] = useState(false);

  // filtro de data (visual)
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [dateEnabled, setDateEnabled] = useState(false);

  /* ------------------------------------------------------------------------ */
  /*                               DERIVAÇÕES                                 */
  /* ------------------------------------------------------------------------ */

  const filtered = useMemo(() => {
    return OCCURRENCES.filter((o) => {
      if (!showOld && o.status === "Finalizada") return false;
      if (search && !o.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      // filtro de data é apenas visual (não aplicado)
      return true;
    });
  }, [search, showOld]);

  function splitByStatus(items: Occurrence[]) {
    return {
      active: items.filter((i) => i.status === "Ativa"),
      finished: items.filter((i) => i.status === "Finalizada"),
    };
  }

  const presetsWithScenarios = useMemo(() => {
    return PRESETS.map((preset) => {
      const items = filtered.filter((o) => o.presetId === preset.id);
      return {
        preset,
        ...splitByStatus(items),
      };
    });
  }, [filtered]);

  const standalone = useMemo(() => {
    return splitByStatus(filtered.filter((o) => !o.presetId));
  }, [filtered]);

  if (!contract.renders.home?.enabled) return null;

  /* ------------------------------------------------------------------------ */
  /*                                  RENDER                                  */
  /* ------------------------------------------------------------------------ */

  return (
    <section className="relative flex flex-1 flex-col px-4 py-6 pb-32 overflow-hidden">
      <BackgroundPattern opacity={0.06} size={80} />

      {/* HEADER */}
      <header className="relative z-10 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Cenários
          </h1>
          <p className="text-sm text-muted-foreground">
            Acione, acompanhe e gerencie cenários operacionais
          </p>
        </div>

        <Button
          size="lg"
          className="hidden sm:flex h-12 gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Criar novo cenário
        </Button>
      </header>

      {/* FILTROS */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          placeholder="Buscar cenário..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filtro de data (visual + toggle) */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={date}
              disabled={!dateEnabled}
              onChange={(e) => setDate(e.target.value)}
              className={cn(
                "pl-9",
                !dateEnabled && "opacity-50 cursor-not-allowed"
              )}
            />
          </div>

          <Button
            variant={dateEnabled ? "default" : "outline"}
            onClick={() => setDateEnabled((v) => !v)}
          >
            {dateEnabled ? "Filtro ativo" : "Ativar filtro"}
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={() => setShowOld((v) => !v)}
        >
          {showOld ? "Ocultar finalizados" : "Mostrar finalizados"}
        </Button>
      </div>

      {/* ATIVAÇÃO RÁPIDA */}
      <div className="relative z-10 mb-6">
        <p className="text-sm font-semibold mb-2">
          Ativar cenário a partir de um preset
        </p>

        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => {
            const meta = PRESET_META[preset.id];
            const Icon = meta.icon;

            return (
              <Button
                key={preset.id}
                variant="outline"
                className={cn("gap-2", meta.color)}
              >
                <Icon className="w-4 h-4" />
                {preset.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* PRESETS */}
      <div className="relative z-10 flex flex-col gap-6">
        {presetsWithScenarios.map(({ preset, active, finished }) => {
          if (!active.length && !finished.length) return null;

          const meta = PRESET_META[preset.id];
          const Icon = meta.icon;

          return (
            <section
              key={preset.id}
              className="rounded-2xl border bg-card p-5 shadow-sm"
            >
              <header className="flex gap-3 mb-4">
                <div className={cn("rounded-lg p-4", meta.bg)}>
                  <Icon className={cn("w-4 h-4", meta.color)} />
                </div>

                <div>
                  <p className="font-semibold">{preset.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {preset.description}
                  </p>
                </div>
              </header>

              <ScenarioGroup title="Ativos" items={active} />
              {showOld && (
                <ScenarioGroup title="Finalizados" items={finished} />
              )}
            </section>
          );
        })}

        {(standalone.active.length || standalone.finished.length) > 0 && (
          <section>
            <p className="text-sm font-semibold text-muted-foreground mb-3">
              Outros cenários
            </p>

            <ScenarioGroup title="Ativos" items={standalone.active} />
            {showOld && (
              <ScenarioGroup
                title="Finalizados"
                items={standalone.finished}
              />
            )}
          </section>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SUBCOMPONENTS                                 */
/* -------------------------------------------------------------------------- */

function ScenarioGroup({
  title,
  items,
}: {
  title: string;
  items: Occurrence[];
}) {
  if (!items.length) return null;

  return (
    <div className="mb-4">
      <p className="mb-2 text-xs font-semibold text-muted-foreground">
        {title}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((occ) => (
          <ScenarioCard key={occ.id} occurrence={occ} />
        ))}
      </div>
    </div>
  );
}

function ScenarioCard({ occurrence }: { occurrence: Occurrence }) {
  const isActive = occurrence.status === "Ativa";

  return (
    <button
      disabled={!isActive}
      className={cn(
        "group w-full rounded-xl border p-4 text-left transition",
        "flex items-center justify-between gap-3",
        isActive
          ? "bg-background hover:bg-muted cursor-pointer"
          : "bg-muted/50 opacity-60 cursor-not-allowed pointer-events-none"
      )}
    >
      <div className="min-w-0">
        <p className="font-medium truncate">{occurrence.name}</p>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {occurrence.description}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          {occurrence.date}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {isActive ? (
          <>
            <Clock className="w-4 h-4 text-orange-500" />
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition" />
          </>
        ) : (
          <CheckCircle className="w-4 h-4 text-green-500" />
        )}
      </div>
    </button>
  );
}

"use client";

import { Plus, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { useContract } from "@/core/contracts/contract-provider";
import { cn } from "@/lib/utils";

import { PRESET_META } from "./home.meta";
import { useHomeLogic } from "./home.logic";
import { ScenarioGroup } from "./ScenarioGroup";

export function HomeRenderer() {
  const contract = useContract();
  const logic = useHomeLogic();

  if (!contract.renders.home?.enabled) return null;

  return (
    <section className="relative flex flex-1 flex-col px-4 py-6 pb-32 overflow-hidden">
      <BackgroundPattern opacity={0.06} size={80} />

      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col w-full max-w-4xl">
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

            <Button size="lg" className="sm:flex h-12 gap-2 shadow-lg">
              <Plus className="w-5 h-5" />
              Criar novo cenário
            </Button>
          </header>

          {/* FILTROS */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 mb-6">
            <Input
              placeholder="Buscar cenário..."
              value={logic.search}
              onChange={(e) => logic.setSearch(e.target.value)}
            />

            <div className="flex items-center gap-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={logic.date}
                  disabled={!logic.dateEnabled}
                  onChange={(e) => logic.setDate(e.target.value)}
                  className={cn(
                    "pl-9",
                    !logic.dateEnabled &&
                    "opacity-50 cursor-not-allowed"
                  )}
                />
              </div>

              <Button
                variant={logic.dateEnabled ? "default" : "outline"}
                onClick={() => logic.setDateEnabled((v) => !v)}
              >
                {logic.dateEnabled ? "Filtro ativo" : "Ativar filtro"}
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={() => logic.setShowOld((v) => !v)}
            >
              {logic.showOld
                ? "Ocultar finalizados"
                : "Mostrar finalizados"}
            </Button>
          </div>

          {/* PRESETS */}
          <div className="relative z-10 flex flex-col gap-6">
            {logic.presetsWithScenarios.map(
              ({ preset, active, finished }) => {
                const isEmpty = !active.length && !finished.length;

                const meta = PRESET_META[preset.id];
                const Icon = meta.icon;

                return (
                  <section
                    key={preset.id}
                    className="rounded-2xl border bg-card p-5 shadow-sm max-w-4xl"
                  >
                    <header className="flex justify-between mb-4 flex-col">
                      <div className="flex gap-3 justify-between">
                        <div
                          className={cn("rounded-lg p-4 h-fit", meta.bg)}
                        >
                          <Icon
                            className={cn("w-4 h-4", meta.color)}
                          />
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Criar cenário
                        </Button>
                      </div>

                      <div className="mt-4">
                        <p className="font-semibold">
                          {preset.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {preset.description}
                        </p>
                      </div>
                    </header>

                    {isEmpty ? (
                      <p className="text-sm text-muted-foreground">
                        Nenhum cenário criado ainda.
                      </p>
                    ) : (
                      <>
                        <ScenarioGroup
                          title="Ativos"
                          items={active}
                        />

                        {logic.showOld && (
                          <ScenarioGroup
                            title="Finalizados"
                            items={finished}
                          />
                        )}
                      </>
                    )}
                  </section>
                );
              }
            )}

            {/* OUTROS CENÁRIOS (sem preset) */}
            {(logic.standalone.active.length ||
              logic.standalone.finished.length) > 0 && (
                <section className="relative z-10">
                  <p className="text-sm font-semibold text-muted-foreground mb-3">
                    Outros cenários
                  </p>

                  <ScenarioGroup
                    title="Ativos"
                    items={logic.standalone.active}
                  />

                  {logic.showOld && (
                    <ScenarioGroup
                      title="Finalizados"
                      items={logic.standalone.finished}
                    />
                  )}
                </section>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}

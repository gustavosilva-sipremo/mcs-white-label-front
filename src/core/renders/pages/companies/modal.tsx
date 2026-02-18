import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { Company } from "./types";
import { TriggersChart } from "./Chart";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface CompanyDetailsModalProps {
    company: Company | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR");
}

function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

/* -------------------------------------------------------------------------- */
/*                                   COMPONENT                                */
/* -------------------------------------------------------------------------- */

export function CompanyDetailsModal({
    company,
    open,
    onOpenChange,
}: CompanyDetailsModalProps) {
    if (!company) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="
                    max-w-4xl
                    max-h-[90vh]
                    overflow-y-auto
                "
            >
                <DialogHeader>
                    <Header company={company} />
                </DialogHeader>

                <Separator />

                <MetricsSection metrics={company.metrics} />

                <Separator />

                <UsageAndCostsSection usage={company.usage} />

                <Separator />

                <ChartSection chart={company.triggersChart} />
            </DialogContent>
        </Dialog>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   SECTIONS                                 */
/* -------------------------------------------------------------------------- */

function Header({ company }: { company: Company }) {
    return (
        <>
            <DialogTitle className="flex flex-wrap items-center gap-2">
                <span className="text-lg sm:text-xl font-semibold">
                    {company.name}
                </span>

                <Badge
                    variant={company.status === "active" ? "default" : "secondary"}
                >
                    {company.status === "active" ? "Ativa" : "Inativa"}
                </Badge>
            </DialogTitle>

            <DialogDescription className="text-xs sm:text-sm">
                CNPJ {company.document} · Criada em {formatDate(company.createdAt)}
            </DialogDescription>
        </>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   METRICS                                  */
/* -------------------------------------------------------------------------- */

function MetricsSection({ metrics }: { metrics: Company["metrics"] }) {
    return (
        <section className="space-y-3">
            <h4 className="text-sm font-medium">Estrutura</h4>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Object.entries(metrics).map(([label, value]) => (
                    <MetricCard
                        key={label}
                        label={label}
                        value={value}
                    />
                ))}
            </div>
        </section>
    );
}

function MetricCard({ label, value }: { label: string; value: number }) {
    return (
        <Card className="p-4 text-center">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {label}
            </p>

            <p className="mt-1 text-lg font-semibold">
                {value}
            </p>
        </Card>
    );
}

/* -------------------------------------------------------------------------- */
/*                               USAGE + COSTS                                */
/* -------------------------------------------------------------------------- */

function UsageAndCostsSection({
    usage,
}: {
    usage: Company["usage"];
}) {
    return (
        <section className="grid gap-4 sm:grid-cols-2">
            <Card className="p-4 space-y-2">
                <h4 className="text-sm font-medium">Uso</h4>

                <UsageItem
                    label="Acionamentos semanais"
                    value={usage.weeklyTriggers}
                />

                <UsageItem
                    label="Acionamentos mensais"
                    value={usage.monthlyTriggers}
                />
            </Card>

            <Card className="p-4 space-y-2">
                <h4 className="text-sm font-medium">Custos estimados</h4>

                <UsageItem
                    label="SMS"
                    value={formatCurrency(usage.smsCostEstimate)}
                />

                <UsageItem
                    label="Infraestrutura"
                    value={formatCurrency(usage.infraCostEstimate)}
                />
            </Card>
        </section>
    );
}

function UsageItem({
    label,
    value,
}: {
    label: string;
    value: number | string;
}) {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <strong>{value}</strong>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   CHART                                    */
/* -------------------------------------------------------------------------- */

function ChartSection({
    chart,
}: {
    chart: Company["triggersChart"];
}) {
    return (
        <section className="space-y-3">
            <h4 className="text-sm font-medium">
                Acionamentos por período
            </h4>

            <Card className="p-3 sm:p-4">
                <TriggersChart data={chart} />
            </Card>
        </section>
    );
}

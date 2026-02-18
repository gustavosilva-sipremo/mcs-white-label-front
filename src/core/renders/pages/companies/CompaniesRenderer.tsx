import { useState } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackgroundPattern } from "@/components/others/BackgroundPattern";

import { CompanyDetailsModal } from "./modal";
import { MOCK_COMPANIES } from "./mock";
import { Company } from "./types";

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export function CompaniesRenderer() {
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

    return (
        <div className="relative w-full px-4 pb-24 pt-6 sm:px-6 lg:px-8">
            <BackgroundPattern opacity={0.05} size={72} />

            <div className="mx-auto max-w-7xl space-y-8 sm:space-y-10">
                <PageHeader />

                <CompaniesGrid
                    companies={MOCK_COMPANIES}
                    onSelect={setSelectedCompany}
                />
            </div>

            <CompanyDetailsModal
                company={selectedCompany}
                open={!!selectedCompany}
                onOpenChange={(open) => !open && setSelectedCompany(null)}
            />
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                               PAGE HEADER                                  */
/* -------------------------------------------------------------------------- */

function PageHeader() {
    return (
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left space-y-1.5">
                <h1 className="text-2xl font-bold sm:text-3xl">
                    Empresas
                </h1>

                <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
                    Visão geral de uso, custos e estrutura das empresas cadastradas
                </p>
            </div>

            <Button type="button" className="gap-2">
                <Plus className="h-4 w-4" />
                Nova empresa
            </Button>
        </header>
    );
}

/* -------------------------------------------------------------------------- */
/*                               COMPANIES GRID                               */
/* -------------------------------------------------------------------------- */

interface CompaniesGridProps {
    companies: Company[];
    onSelect: (company: Company) => void;
}

function CompaniesGrid({ companies, onSelect }: CompaniesGridProps) {
    return (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
                <CompanyCard
                    key={company.id}
                    company={company}
                    onView={() => onSelect(company)}
                />
            ))}
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/*                                COMPANY CARD                                */
/* -------------------------------------------------------------------------- */

interface CompanyCardProps {
    company: Company;
    onView: () => void;
}

function CompanyCard({ company, onView }: CompanyCardProps) {
    return (
        <Card
            className="
                group relative
                rounded-xl
                border
                p-4
                transition-all
                hover:shadow-lg
                hover:border-primary/50
                sm:p-5
            "
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                    <h3 className="text-sm font-semibold sm:text-base">
                        {company.name}
                    </h3>

                    <p className="text-xs text-muted-foreground">
                        {company.document}
                    </p>
                </div>

                <StatusBadge status={company.status} />
            </div>

            {/* Metrics */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-center sm:mt-5">
                <Metric label="Formulários" value={company.metrics.forms} />
                <Metric label="Mensagens" value={company.metrics.messages} />
                <Metric
                    label="Usuários"
                    value={company.metrics.users + company.metrics.externalUsers}
                />
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center justify-between gap-2 sm:mt-5">
                <Button
                    size="sm"
                    className="gap-1"
                    onClick={onView}
                >
                    <Eye className="h-4 w-4" />
                    Ver detalhes
                </Button>

                <div className="flex gap-1">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Editar empresa"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Excluir empresa"
                    >
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}

/* -------------------------------------------------------------------------- */
/*                                SUBCOMPONENTS                               */
/* -------------------------------------------------------------------------- */

function StatusBadge({ status }: { status: Company["status"] }) {
    return (
        <Badge
            variant={status === "active" ? "default" : "secondary"}
            className="shrink-0"
        >
            {status === "active" ? "Ativa" : "Inativa"}
        </Badge>
    );
}

function Metric({ label, value }: { label: string; value: number }) {
    return (
        <div className="space-y-0.5">
            <p className="text-base font-semibold sm:text-lg">
                {value}
            </p>

            <p className="text-[11px] text-muted-foreground sm:text-xs">
                {label}
            </p>
        </div>
    );
}

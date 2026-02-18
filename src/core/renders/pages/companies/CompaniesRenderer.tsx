import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
        <header className="text-center space-y-2">
            <h1 className="text-2xl font-bold sm:text-3xl">
                Empresas
            </h1>

            <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base">
                Visão geral de uso, custos e estrutura das empresas cadastradas
            </p>
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
        <section
            className="
                grid gap-4
                sm:grid-cols-2
                lg:grid-cols-3
            "
        >
            {companies.map((company) => (
                <CompanyCard
                    key={company.id}
                    company={company}
                    onClick={() => onSelect(company)}
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
    onClick: () => void;
}

function CompanyCard({ company, onClick }: CompanyCardProps) {
    return (
        <Card
            onClick={onClick}
            role="button"
            tabIndex={0}
            className="
                group relative
                cursor-pointer
                rounded-xl
                border
                p-4
                transition-all
                hover:shadow-lg
                hover:border-primary/50
                active:scale-[0.98]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
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
            <div
                className="
                    mt-4 grid grid-cols-3 gap-3
                    text-center
                    sm:mt-5
                "
            >
                <Metric
                    label="Formulários"
                    value={company.metrics.forms}
                />

                <Metric
                    label="Mensagens"
                    value={company.metrics.messages}
                />

                <Metric
                    label="Usuários"
                    value={company.metrics.users + company.metrics.externalUsers}
                />
            </div>

            {/* Footer hint */}
            <div className="mt-4 text-center text-xs text-muted-foreground opacity-70 sm:mt-5">
                Toque para ver detalhes
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

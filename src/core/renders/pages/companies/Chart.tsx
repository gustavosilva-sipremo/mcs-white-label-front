import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useMemo } from "react";

import { CompanyChartData } from "./types";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface TriggersChartProps {
    data: CompanyChartData;
}

/* -------------------------------------------------------------------------- */
/*                                 CONSTANTS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Cores estáticas e SEGURAS para Canvas
 * Azul neutro que funciona bem em light/dark
 */
const LINE_COLOR = "rgba(59, 130, 246, 1)";      // blue-500
const AREA_TOP = "rgba(59, 130, 246, 0.35)";
const AREA_BOTTOM = "rgba(59, 130, 246, 0.05)";

const GRID_COLOR = "rgba(0, 0, 0, 0.08)";
const TICK_COLOR = "rgba(100, 116, 139, 1)";    // slate-500

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export function TriggersChart({ data }: TriggersChartProps) {
    const chartData = useMemo(() => {
        return {
            labels: data.labels,
            datasets: [
                {
                    label: "Acionamentos",
                    data: data.values,

                    /* Linha */
                    tension: 0.45,
                    borderWidth: 2.5,
                    borderColor: LINE_COLOR,

                    /* Área */
                    fill: true,
                    backgroundColor: (ctx: any) => {
                        const { chart } = ctx;
                        const { ctx: canvasCtx, chartArea } = chart;

                        if (!chartArea) return AREA_TOP;

                        const gradient = canvasCtx.createLinearGradient(
                            0,
                            chartArea.top,
                            0,
                            chartArea.bottom
                        );

                        gradient.addColorStop(0, AREA_TOP);
                        gradient.addColorStop(1, AREA_BOTTOM);

                        return gradient;
                    },

                    /* Pontos */
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHitRadius: 12,
                    pointBackgroundColor: LINE_COLOR,
                    pointBorderColor: LINE_COLOR,
                },
            ],
        };
    }, [data]);

    const options = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                mode: "index" as const,
                intersect: false,
            },

            plugins: {
                legend: {
                    display: false,
                },

                tooltip: {
                    backgroundColor: "#ffffff",
                    titleColor: "#020617",
                    bodyColor: "#020617",
                    borderColor: "rgba(0,0,0,0.1)",
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: (ctx: any) =>
                            `${ctx.parsed.y?.toLocaleString("pt-BR") ?? 0} acionamentos`,
                    },
                },
            },

            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: TICK_COLOR,
                    },
                },

                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0,
                        color: TICK_COLOR,
                    },
                    grid: {
                        color: GRID_COLOR,
                    },
                },
            },
        }),
        []
    );

    return (
        <div className="relative h-56 w-full sm:h-64">
            <Line
                key={data.labels.join("-")} // evita reaproveitamento do canvas
                data={chartData}
                options={options}
                redraw
            />
        </div>
    );
}

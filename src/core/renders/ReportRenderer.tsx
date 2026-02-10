import { useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { occurrencesMock, OccurrenceMock } from "@/mocks/mock-mcs-activation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

export default function ReportRenderer() {
  const [selectedOccurrence, setSelectedOccurrence] =
    useState<OccurrenceMock | null>(occurrencesMock[0]);
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showDetails, setShowDetails] = useState<boolean>(false);

  // --- Filtrar ocorrências ---
  const filteredOccurrences = occurrencesMock.filter((occ) => {
    const matchesName = selectedName
      ? occ.name.toLowerCase().includes(selectedName.toLowerCase())
      : true;
    const matchesDate = selectedDate ? occ.date.startsWith(selectedDate) : true;
    return matchesName && matchesDate;
  });

  const handleSelectOccurrence = (occ: OccurrenceMock) =>
    setSelectedOccurrence(occ);

  // --- Paleta de cores do tema ---
  const themeColors = {
    primary: "#3B82F6", // blue-500
    secondary: "#10B981", // green-500
    danger: "#EF4444", // red-500
    warning: "#F59E0B", // amber-500
    info: "#8B5CF6", // purple-500
    accent1: "#F472B6", // pink-400
    accent2: "#FBBF24", // yellow-400
    accent3: "#22D3EE", // cyan-400
    neutral: "#6B7280", // gray-500
  };

  // --- Dados para gráficos ---
  const lineData = selectedOccurrence
    ? {
        labels: Object.keys(selectedOccurrence.confirmationsByUser),
        datasets: [
          {
            label: "Confirmações",
            data: Object.values(selectedOccurrence.confirmationsByUser),
            borderColor: themeColors.primary,
            backgroundColor: "transparent",
            tension: 0.3,
          },
        ],
      }
    : { labels: [], datasets: [] };

  const makeDoughnutData = (
    data: Record<string, number>,
    colors: string[],
  ) => ({
    labels: Object.keys(data),
    datasets: [
      {
        label: "Proporção",
        data: Object.values(data),
        backgroundColor: colors,
        hoverOffset: 10,
      },
    ],
  });

  // Paletas consistentes usando cores do tema
  const sectorColors = [
    themeColors.primary,
    themeColors.danger,
    themeColors.secondary,
    themeColors.warning,
  ];
  const functionColors = [
    themeColors.info,
    themeColors.accent1,
    themeColors.accent2,
    themeColors.accent3,
  ];
  const teamColors = [
    themeColors.primary,
    themeColors.danger,
    themeColors.secondary,
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
        Reports MCS
      </h1>

      {/* --- Filtros --- */}
      <div className="flex flex-col md:flex-row flex-wrap gap-4 md:items-end">
        {[
          {
            label: "Filtrar por Ocorrência",
            value: selectedName,
            onChange: setSelectedName,
            placeholder: "Nome da ocorrência",
            type: "text",
          },
          {
            label: "Filtrar por Data",
            value: selectedDate,
            onChange: setSelectedDate,
            placeholder: "",
            type: "date",
          },
        ].map((filter) => (
          <div key={filter.label} className="flex-1 min-w-[200px]">
            <label className="block mb-1 font-medium text-primary">
              {filter.label}
            </label>
            <input
              type={filter.type}
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              placeholder={filter.placeholder}
              className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        ))}

        <div className="flex-1 min-w-[200px]">
          <label className="block mb-1 font-medium text-primary">
            Selecionar Ocorrência
          </label>
          <select
            value={selectedOccurrence?.id}
            onChange={(e) => {
              const occ = occurrencesMock.find((o) => o.id === e.target.value);
              if (occ) handleSelectOccurrence(occ);
            }}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {filteredOccurrences.map((occ) => (
              <option key={occ.id} value={occ.id}>
                {occ.name} ({occ.date.split(" ")[0]})
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 md:mt-6">
          <button
            disabled
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-not-allowed w-full md:w-auto"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* --- Cards Resumo --- */}
      {selectedOccurrence && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          {[
            {
              label: "Mensagens Enviadas",
              value: selectedOccurrence.cards.messagesSent,
            },
            {
              label: "Mensagens Confirmadas",
              value: selectedOccurrence.cards.messagesConfirmed,
            },
            {
              label: "Tempo Médio de Resposta (min)",
              value: selectedOccurrence.cards.avgResponseTime,
            },
            {
              label: "Tempo Total da Ocorrência (min)",
              value: selectedOccurrence.cards.totalTime,
            },
            {
              label: "Data de Início",
              value: selectedOccurrence.cards.startDate,
            },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-primary! p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-foreground mb-2">
                {card.label}
              </h3>
              <p className="text-xl font-bold text-foreground/80">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* --- Gráfico de Confirmações --- */}
      {selectedOccurrence && (
        <div className="bg-primary! p-4 rounded-lg shadow hover:shadow-md transition mt-6 w-full">
          <h2 className="text-lg font-semibold mb-2 text-foreground">
            Confirmações dos Usuários
          </h2>
          <Line
            data={lineData}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
            }}
          />
        </div>
      )}

      {/* --- Gráficos de Pizza em Grid --- */}
      {selectedOccurrence && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {[
            {
              title: "Proporção por Setor",
              data: selectedOccurrence.usersBySector,
              colors: sectorColors,
            },
            {
              title: "Proporção por Função",
              data: selectedOccurrence.usersByFunction,
              colors: functionColors,
            },
            {
              title: "Proporção por Time",
              data: selectedOccurrence.usersByTeam,
              colors: teamColors,
            },
          ].map((chart) => (
            <div
              key={chart.title}
              className="bg-primary! p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold mb-2 text-foreground">
                {chart.title}
              </h2>
              <Doughnut data={makeDoughnutData(chart.data, chart.colors)} />
            </div>
          ))}
        </div>
      )}

      {/* --- Usuários Informados --- */}
      {selectedOccurrence && (
        <div className="mt-6 bg-primary! p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Usuários Informados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {selectedOccurrence.users.map((user) => (
              <div
                key={user.name}
                className="flex items-center justify-between border p-2 rounded hover:bg-gray-50 transition text-foreground/80"
              >
                <span className="truncate">{user.name}</span>
                <span
                  className={`w-3 h-3 rounded-full ${
                    user.status === "informado" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Informações Detalhadas Toggle --- */}
      <div className="mt-6 space-y-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/80 transition w-full md:w-auto"
        >
          {showDetails
            ? "Ocultar Informações Detalhadas"
            : "Mostrar Informações Detalhadas"}
        </button>

        {showDetails && (
          <div className="space-y-4 mt-2">
            <div className="bg-primary! p-4 rounded-lg shadow h-24 flex items-center justify-center text-foreground/50">
              Seção de informações de campos (detalhado)
            </div>
            <div className="bg-primary! p-4 rounded-lg shadow h-24 flex items-center justify-center text-foreground/50">
              Seção de tabela de usuários (detalhado)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

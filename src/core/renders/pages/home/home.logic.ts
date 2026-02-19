import { useMemo, useState } from "react";
import { PRESETS, OCCURRENCES, Occurrence } from "./home.mock";

export function useHomeLogic() {
  const [search, setSearch] = useState("");
  const [showOld, setShowOld] = useState(false);

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [dateEnabled, setDateEnabled] = useState(false);

  const filtered = useMemo(() => {
    return OCCURRENCES.filter((o) => {
      if (!showOld && o.status === "Finalizada") return false;
      if (search && !o.name.toLowerCase().includes(search.toLowerCase()))
        return false;
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

  return {
    // estado
    search,
    setSearch,
    showOld,
    setShowOld,
    date,
    setDate,
    dateEnabled,
    setDateEnabled,

    // dados derivados
    presetsWithScenarios,
    standalone,
  };
}

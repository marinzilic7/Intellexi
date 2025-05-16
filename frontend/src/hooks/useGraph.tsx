// hooks/useGraph.ts
import { useState, useEffect } from "react";
import axios from "axios";
import type { GraphData } from "../types/GraphData";

type RangeType = "week" | "month";

export function useGraph() {
  const [currency1, setCurrency1] = useState<string>("BAM");
  const [currency2, setCurrency2] = useState<string>("USD");
  const [range, setRange] = useState<RangeType>("week");
  const [dataForChart, setDataForChart] = useState<GraphData[]>([]);

  useEffect(() => {
    if (!currency1 || !currency2) return;

    axios
      .get<GraphData[]>("http://localhost:8080/graph", {
        params: {
          currency1,
          currency2,
          choosenDate: range,
        },
      })
      .then((response) => setDataForChart(response.data))
      .catch((error) => {
        console.error("Greška pri dohvaćanju podataka:", error);
      });
  }, [currency1, currency2, range]);

  return {
    currency1,
    setCurrency1,
    currency2,
    setCurrency2,
    range,
    setRange,
    dataForChart,
  };
}

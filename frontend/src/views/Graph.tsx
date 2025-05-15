import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencyFilter from "../components/CurrencyFilter";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface GraphData {
  datum: string;
  vrijednost: number;
  vrijednost2: number;
}

const Graph: React.FC = () => {
  const [currency1, setCurrency1] = useState<string>("BAM");
  const [currency2, setCurrency2] = useState<string>("USD");
  const [range, setRange] = useState<"week" | "month">("week");
  const [dataForChart, setDataForChart] = useState<GraphData[]>([]);

  useEffect(() => {
    if (!currency1 || !currency2) return;

    axios
      .get<GraphData[]>("http://localhost:8080/graph", {
        params: {
          currency1: currency1,
          currency2: currency2,
          choosenDate: range,
        },
      })
      .then((response) => {
        setDataForChart(response.data);
      })
      .catch((error) => {
        console.error("Greška pri dohvaćanju podataka:", error);
      });
  }, [currency1, currency2, range]);

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center flex-column mt-5">
        <LineChart width={1000} height={400} data={dataForChart}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="datum" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="vrijednost"
            stroke="#0000FF"
            name={currency1}
            dot={true}
          />
          <Line
            type="monotone"
            dataKey="vrijednost2"
            stroke="#FF0000"
            name={currency2}
            dot={true}
          />
        </LineChart>
      </div>

      <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
        <CurrencyFilter
          currency={currency1}
          onCurrencyChange={(e) => setCurrency1(e.target.value)}
        />

        <CurrencyFilter
          currency={currency2}
          onCurrencyChange={(e) => setCurrency2(e.target.value)}
        />

        <select
          className="form-select w-auto"
          value={range}
          onChange={(e) => setRange(e.target.value as "week" | "month")}
        >
          <option value="week">Zadnjih 7 dana</option>
          <option value="month">Zadnjih 30 dana</option>
        </select>
      </div>
    </div>
  );
};

export default Graph;

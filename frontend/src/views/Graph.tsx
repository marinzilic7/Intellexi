import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import CurrencyFilter from "../components/CurrencyFilter";
import { useGraph } from "../hooks/useGraph";

const Graph: React.FC = () => {
  const {
    currency1,
    setCurrency1,
    currency2,
    setCurrency2,
    range,
    setRange,
    dataForChart,
  } = useGraph();

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
          className="form-select mt-4 w-auto"
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

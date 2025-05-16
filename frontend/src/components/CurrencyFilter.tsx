import React, { useEffect, useState } from "react";
import axios from "axios";

interface CurrencyFilter {
  currency: string;
  onCurrencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CurrencyFilter: React.FC<CurrencyFilter> = ({
  currency,
  onCurrencyChange,
}) => {
  const [currencyList, setCurrencyList] = useState<string[]>([]);

  const fetchFromDatabase = () => {
    axios
      .get(`http://localhost:8080/getCurrency`)
      .then((response) => {
        setCurrencyList(response.data);
        console.log(response.data);
      })
      .catch(() => console.error("Error fetching currency"));
  };

  useEffect(() => {
    fetchFromDatabase();
  }, []);

  

  return (
    <div>
      <div>
        <label>Valuta: </label>
        <select
          className="form-control"
          value={currency}
          onChange={onCurrencyChange} 
        >
          <option value="">-- Odaberite valutu --</option>
          {currencyList.map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default CurrencyFilter;

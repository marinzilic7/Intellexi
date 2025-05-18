import React, { useEffect, useState } from "react";
import axios from "axios";

interface CurrencyCodeFilterProps {
  currencyCode: string;
  onCurrencyCodeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CurrencyCodeFilter: React.FC<CurrencyCodeFilterProps> = ({
  currencyCode,
  onCurrencyCodeChange,
}) => {
  const [currencyCodeList, setCurrencyCodeList] = useState<string[]>([]);

  const fetchFromDatabase = () => {
    axios
      .get(`http://localhost:8080/getCurrencyCode`)
      .then((response) => {
        setCurrencyCodeList(response.data);
        // console.log(response.data);
      })
      .catch(() => console.error("Error fetching currency codes"));
  };

  useEffect(() => {
    fetchFromDatabase();
  }, []);

  

  return (
    <div >
      <div>
        <label>Sifra valute: </label>
        <select
          className="form-control"
          value={currencyCode}
          onChange={onCurrencyCodeChange} 
        >
          <option value="">-- Odaberite sifru valute --</option>
          {currencyCodeList.map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default CurrencyCodeFilter;

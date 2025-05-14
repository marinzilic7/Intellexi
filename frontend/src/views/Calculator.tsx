import React, { useState } from "react";
import axios from "axios";
import CurrencyFilter from "../components/CurrencyFilter";

function Calculator() {
  const [currency, setCurrency] = useState("");
  const [currency2, setCurrency2] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [exchangeType, setExchangeType] = useState("");
  const [result, setResult] = useState<number | string | null>(null); // Dodano za pohranu rezultata
  const [error, setError] = useState<string | null>(null); // Dodano za pohranu greške

  const onCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);
  };

  const onCurrencyChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency2 = e.target.value;
    setCurrency2(selectedCurrency2);
  };

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const onExchangeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExchangeType(e.target.value);
  };

  const handleConversion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currency || !currency2 ||  !amount  ) {
      setError("Molimo unesite sve podatke.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/convert", 
        {
          amount,
          fromCurrency: currency,
          toCurrency: currency2,
          exchangeType,
          date: selectedDate,
        }
      );
      console.log("API odgovor:", response);
      setResult(response.data); 
      setError(null);
    } catch (error) {
      setError("Greška prilikom konverzije. Pokušajte ponovo.");
      setResult(null); 
    }
  };

  return (
    <div>
      <h1 className="text-center mt-5">Kalkulator</h1>
      <div>
        <form onSubmit={handleConversion} className="w-50 mx-auto mt-5">
          <div className="d-flex">
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Pretvori
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                placeholder="Unesite iznos (iz)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="ms-3 mt-2">
              <CurrencyFilter
                currency={currency}
                onCurrencyChange={onCurrencyChange}
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                U
              </label>
              <div>
                <CurrencyFilter
                  currency={currency2}
                  onCurrencyChange={onCurrencyChange2}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="currency" className="form-label">
              Vrsta tečaja
            </label>
            <select
              className="form-select"
              id="currency"
              value={exchangeType}
              onChange={onExchangeTypeChange}
            >
              <option value="">Odaberite vrstu tečaja</option>
              <option value="kupovni_tecaj">Kupovni tečaj</option>
              <option value="prodajni_tecaj">Prodajni tečaj</option>
              <option value="srednji_tecaj">Srednji tečaj</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Datum
            </label>
            <input
              type="date"
              id="date"
              className="form-control"
              value={selectedDate}
              onChange={onDateChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Izračunaj
          </button>
        </form>

        {/* Greška i rezultat */}
        {error && (
          <div className="alert alert-danger text-center mt-3">{error}</div>
        )}
        {result && (
          <div className="d-flex justify-content-center mt-5">
            <div className="alert alert-info text-center w-25">
              Rezultat: {result} {currency2}
           
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculator;

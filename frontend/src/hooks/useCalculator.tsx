import { useState } from "react";
import axios from "axios";
import type { ConvertRequest } from "../types/CovnertRequest";

export function useCalculator() {
  const [currency, setCurrency] = useState("");
  const [currency2, setCurrency2] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [exchangeType, setExchangeType] = useState("");
  const [result, setResult] = useState<number | string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const onCurrencyChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency2(e.target.value);
  };

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const onExchangeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExchangeType(e.target.value);
  };

  const handleConversion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currency || !currency2 || !amount) {
      setError("Molimo unesite sve podatke.");
      setResult(null);
      return;
    }

    const data: ConvertRequest = {
      amount,
      fromCurrency: currency,
      toCurrency: currency2,
      exchangeType,
      date: selectedDate,
    };

    try {
      const response = await axios.post("http://localhost:8080/convert", data);
      setResult(response.data);
      setError(null);
    } catch (error: any) {
      setError(error.response?.data || "Greška prilikom konverzije.");
      setResult(null);
    }
  };

  return {
    currency,
    currency2,
    selectedDate,
    amount,
    exchangeType,
    result,
    error,
    onCurrencyChange,
    onCurrencyChange2,
    onDateChange,
    onExchangeTypeChange,
    setAmount,
    handleConversion,
  };
}

import { useState, useEffect } from "react";
import type { ExchangeRate } from "../../types/ExchangeRate";
import axios from "axios";

export function getExchangeRates() {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const fetchFromDatabase = () => {
    axios
      .get(`http://localhost:8080/rates?page=${currentPage}`)
      .then((response) => {
        setExchangeRates(response.data); // samo postavi, totalPages računamo u useEffect
        console.log("Duzina", response.data.length);
        console.log("Podaci:", response.data);

        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(() => setError(true));
  };

  useEffect(() => {
    const itemsPerPage = 10;
    const total = Math.ceil(exchangeRates.length / itemsPerPage);
    setTotalPages(total);
    console.log("Total pages:", total);
    console.log("ExchangeRates updated, duzina:", exchangeRates.length);
  }, [exchangeRates]);

  return {
    exchangeRates,
    currentPage,
    totalPages,
    success,
    error,
    setSuccess,
    setExchangeRates,
    setCurrentPage,
    fetchFromDatabase,
    setError,
  };
}

export default getExchangeRates;

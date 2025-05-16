import { useState } from "react";
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
      .get(`http://localhost:8080/rates?page=${currentPage}&size=5`)
      .then((response) => {
        setExchangeRates(response.data.content);
        setTotalPages(response.data.totalPages);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(() => setError(true));
  };

  return {
    exchangeRates,
    currentPage,
    totalPages,
    success,
    error,
    setExchangeRates,
    setCurrentPage,
    fetchFromDatabase,
    setError,
  };

}

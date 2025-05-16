import axios from "axios";
import type { ExchangeRate } from "../types/ExchangeRate";

const API_BASE = "http://localhost:8080";

export const fetchExchangeRates = async (page: number, size: number): Promise<{ content: ExchangeRate[], totalPages: number }> => {
  const response = await axios.get(`${API_BASE}/rates`, {
    params: { page, size },
  });
  return response.data;
};

export const fetchExchangeRatesByDate = async (
  startDate: string,
  endDate: string,
  currencyCode?: string,
  currency?: string
): Promise<ExchangeRate[]> => {
  const response = await axios.get(`${API_BASE}/rates-by-date`, {
    params: { startDate, endDate },
  });

  let data: ExchangeRate[] = response.data;

  if (currencyCode) {
    data = data.filter(rate => rate.sifraValute === currencyCode);
  } else if (currency) {
    data = data.filter(rate => rate.valuta === currency);
  }

  return data;
};

export const deleteExchangeRate = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/rates/${id}`);
};

export interface ConvertRequest {
  amount: number | string;
  fromCurrency: string;
  toCurrency: string;
  exchangeType: string;
  date: string;
}
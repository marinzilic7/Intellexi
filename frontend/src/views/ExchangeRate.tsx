import { useEffect, useState } from "react";
import axios from "axios";

function ExchangeRate() {
  interface ExchangeRate {
    id: number;
    broj_tecajnice: number;
    datumPrimjene: string;
    drzava: string;
    drzava_iso: string;
    kupovni_tecaj: number;
    prodajni_tecaj: number;
    sifraValute: number;
    srednji_tecaj: number;
    valuta: string;
  }

  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/exchangeRates")
      .then((response) => {
        console.log("Dohvaćeni podaci:", response.data);
        setExchangeRates(response.data);
      })
      .catch((error) => {
        console.error("Greška pri dohvaćanju tečajnica:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Tečajnice</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Broj tečajnice</th>
            <th>Datum</th>
            <th>Država</th>
            <th>Drzava iso</th>
            <th>Valuta</th>
            <th>Kupovni tečaj</th>
            <th>Srednji tečaj</th>
            <th>Prodajni tečaj</th>
            <th>Sifra valute</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.map((rate: ExchangeRate) => (
            <tr key={rate.id}>
              <td>{rate.id}</td>
              <td>{rate.broj_tecajnice}</td>
              <td>{rate.datumPrimjene}</td>
              <td>{rate.drzava}</td>
              <td>{rate.drzava_iso}</td>
              <td>{rate.valuta}</td>
              <td>{rate.kupovni_tecaj}</td>
              <td>{rate.srednji_tecaj}</td>
              <td>{rate.prodajni_tecaj}</td>
              <td>{rate.sifraValute}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ExchangeRate;

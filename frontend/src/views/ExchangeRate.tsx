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
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/rates")
      .then((response) => {
        console.log("Dohvaćeni podaci:", response.data);
        console.log("No error");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        setExchangeRates(response.data);
      })
      .catch((error) => {
        console.error("Greška pri dohvaćanju tečajnica:", error);
        setError(true);
      });
  }, []);

  const formatDate = (isoDate: string) => {
    const [year, month, day] = isoDate.split("-");
    return `${day}.${month}.${year.slice(0)}`;
  };

  return (
    <div className="container mt-4">
      <div>
        {success && (
          <div className="alert alert-success">
            <strong>Uspješno!</strong> Tečajnice su uspješno učitane.
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            <strong>Greška!</strong> Tečajnice nisu učitane.
          </div>
        )}
      </div>
      <h2>Tečajnice</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="text-center">Datum primjene</th>
            <th className="text-center">Valuta</th>
            <th className="text-center">Sifra valute</th>
            <th className="text-center">Kupovni tečaj</th>
            <th className="text-center">Srednji tečaj</th>
            <th className="text-center">Prodajni tečaj</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.map((rate: ExchangeRate) => (
            <tr key={rate.id}>
              <td className="text-center">{formatDate(rate.datumPrimjene)}</td>
              <td className="text-center">{rate.sifraValute}</td>
              <td className="text-center">{rate.valuta}</td>
              <td className="text-center">{rate.kupovni_tecaj}</td>
              <td className="text-center">{rate.srednji_tecaj}</td>
              <td className="text-center">{rate.prodajni_tecaj}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ExchangeRate;

import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
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

  //Dohvaćanje tečajnica
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);

  // Prikazivanje poruka
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Paginacija
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  //Filtriranje po datumu
 

  useEffect(() => {
    axios
      .get(`http://localhost:8080/rates?page=${currentPage}&size=5`)
      .then((response) => {
        const data = response.data;

        setExchangeRates(data.content); // Sadržaj trenutne stranice
        setTotalPages(data.totalPages); // Ukupan broj stranica

        console.log("Dohvaćeni podaci:", data);
        console.log("No error");

        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Greška pri dohvaćanju tečajnica:", error);
        setError(true);
      });
  }, [currentPage]);

  const formatDate = (isoDate: string) => {
    const [year, month, day] = isoDate.split("-");
    return `${day}.${month}.${year.slice(0)}`;
  };

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mt-4">
      <div>
        {success && (
          <div className="alert alert-success position-fixed top-0 end-0 m-3">
            <strong>Uspješno!</strong> Tečajnice su uspješno učitane.
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            <strong>Greška!</strong> Tečajnice nisu učitane.
          </div>
        )}
      </div>
      <h2 className="text-center mb-5 mt-3">Tečajnice</h2>
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

      {/* Navigacija između stranica */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ExchangeRate;

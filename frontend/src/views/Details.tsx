import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Details = () => {
  const { id } = useParams();
  interface Rate {
    id: number;
    datumPrimjene: string;
    valuta: string;
    sifraValute: string;
    kupovni_tecaj: string;
    srednji_tecaj: string;
    prodajni_tecaj: string;
  }

  const [rate, setRate] = useState<Rate | null>(null);
  const [loading, setLoading] = useState(true);

  const [success, setSuccess] = useState(false); 
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/rates/${id}`);
        setRate(res.data);
        console.log(res.data);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        console.error("Greška:", err);
        setError(true);
        setTimeout(() => setError(false), 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, [id]);

  const formatDate = (isoDate: string) => {
    const [year, month, day] = isoDate.split("-");
    return `${day}.${month}.${year}`;
  };

  if (loading) return <p>Učitavanje...</p>;
  if (!rate) return <p>Tečajnica nije pronađena.</p>;

  return (
    <div>
        <h2 className="text-center">Detalji tečajnice</h2>
        {success && (
            <div className="alert alert-success w-25 position-absolute end-0 top-0 mt-5 me-5 text-center" role="alert">
                No error
            </div>
            )}
        {error && (
            <div className="alert alert-danger" role="alert">
                Došlo je do greške prilikom učitavanja tečajnice.
            </div>
        )}

      <table className="table  table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Datum primjene</th>
            <th scope="col">Sifra Valute</th>
            <th scope="col">Valuta</th>
            <th scope="col">Kupovni tecaj</th>
            <th scope="col">Srednji tecaj</th>
            <th scope="col">Prodajni tecaj</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatDate(rate.datumPrimjene)}</td>
            <td>{rate.sifraValute}</td>
            <td>{rate.valuta}</td>
            <td>{rate.kupovni_tecaj}</td>
            <td>{rate.srednji_tecaj}</td>
            <td>{rate.prodajni_tecaj}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Details;

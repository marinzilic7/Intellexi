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

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/rates/${id}`);
        setRate(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Greška:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, [id]);

  if (loading) return <p>Učitavanje...</p>;
  if (!rate) return <p>Tečajnica nije pronađena.</p>;

  return (
    <div>
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
            <td>{rate.datumPrimjene}</td>
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface RateData {
  datumPrimjene: string;
  sifraValute: string;
  valuta: string;
  kupovni_tecaj: string;
  srednji_tecaj: string;
  prodajni_tecaj: string;
}

interface ErrorData {
  [key: string]: string;
}

function UpdateRate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RateData>({
    datumPrimjene: "",
    sifraValute: "",
    valuta: "",
    kupovni_tecaj: "",
    srednji_tecaj: "",
    prodajni_tecaj: "",
  });

  const [errors, setErrors] = useState<ErrorData>({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/rates/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.error("Greška prilikom dohvaćanja tečajnice:", err);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    axios
      .put(`http://localhost:8080/exchange-rates/${id}`, formData)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setErrors(err.response.data);
        } else {
          console.error("Greška:", err);
        }
      });
  };

  return (
    <div className="container">
      <h3 className="text-center mt-5 mb-5">Uredi tečajnicu</h3>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        {[
          { name: "datumPrimjene", label: "Datum primjene", type: "date" },
          { name: "sifraValute", label: "Šifra valute" },
          { name: "valuta", label: "Valuta" },
          { name: "kupovni_tecaj", label: "Kupovni tečaj" },
          { name: "srednji_tecaj", label: "Srednji tečaj" },
          { name: "prodajni_tecaj", label: "Prodajni tečaj" },
        ].map(({ name, label, type = "text" }) => (
          <div className="input-group mb-3" key={name}>
            <span className="input-group-text">{label}</span>
            <input
              type={type}
              name={name}
              className={`form-control ${errors[name] ? "is-invalid" : ""}`}
              value={(formData as any)[name]}
              onChange={handleChange}
            />
            {errors[name] && (
              <div className="invalid-feedback">{errors[name]}</div>
            )}
          </div>
        ))}
        <button className="btn btn-primary w-100">Spremi</button>
      </form>
    </div>
  );
}

export default UpdateRate;

import React, { useState } from "react";
import axios from "axios";

interface ExchangeRateDTO {
  datumPrimjene: string;
  sifraValute: string;
  valuta: string;
  kupovni_tecaj: number;
  srednji_tecaj: number;
  prodajni_tecaj: number;
}

const AddRate: React.FC = () => {
  const [form, setForm] = useState<Partial<ExchangeRateDTO>>({
    datumPrimjene: "",
    sifraValute: "",
    valuta: "",
    kupovni_tecaj: undefined,
    srednji_tecaj: undefined,
    prodajni_tecaj: undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>( {} );
  const [apiError, setApiError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
    setApiError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError("");
    setSuccessMessage("");
    try {
      await axios.post("http://localhost:8080/rates", form);
      setSuccessMessage("Tečajnica je uspješno dodana!");
      setForm({
        datumPrimjene: "",
        sifraValute: "",
        valuta: "",
        kupovni_tecaj: undefined,
        srednji_tecaj: undefined,
        prodajni_tecaj: undefined,
      });
    } catch (err: any) {
      if (err.response?.status === 400) {
       
        const data = err.response.data as Record<string, string>;
        setErrors(data);
      } else if (err.response?.status === 409) {
        setApiError(err.response.data.error || "Tečajnica za ovaj datum i valutu već postoji.");
      } else {
        setApiError("Dogodila se greška. Pokušaj ponovno.");
      }
    }
  };

  return (
    <div>
      <h3 className="text-center mt-5 mb-5">Kreiraj tečajnicu</h3>
      <form onSubmit={handleSubmit} className="w-50 mx-auto mt-5">
        <div className="mb-3">
          <label className="form-label">Datum primjene</label>
          <input
            type="date"
            className={`form-control ${errors.datumPrimjene ? 'is-invalid' : ''}`}
            name="datumPrimjene"
            value={form.datumPrimjene || ''}
            onChange={handleChange}
          />
          {errors.datumPrimjene && <div className="invalid-feedback">{errors.datumPrimjene}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Šifra valute</label>
          <input
            type="text"
            className={`form-control ${errors.sifraValute ? 'is-invalid' : ''}`}
            name="sifraValute"
            value={form.sifraValute || ''}
            onChange={handleChange}
          />
          {errors.sifraValute && <div className="invalid-feedback">{errors.sifraValute}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Valuta</label>
          <input
            type="text"
            className={`form-control ${errors.valuta ? 'is-invalid' : ''}`}
            name="valuta"
            value={form.valuta || ''}
            onChange={handleChange}
          />
          {errors.valuta && <div className="invalid-feedback">{errors.valuta}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Kupovni tečaj</label>
          <input
            type="number"
            step="0.000001"
            className={`form-control ${errors.kupovni_tecaj ? 'is-invalid' : ''}`}
            name="kupovni_tecaj"
            value={form.kupovni_tecaj ?? ''}
            onChange={handleChange}
          />
          {errors.kupovni_tecaj && <div className="invalid-feedback">{errors.kupovni_tecaj}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Srednji tečaj</label>
          <input
            type="number"
            step="0.000001"
            className={`form-control ${errors.srednji_tecaj ? 'is-invalid' : ''}`}
            name="srednji_tecaj"
            value={form.srednji_tecaj ?? ''}
            onChange={handleChange}
          />
          {errors.srednji_tecaj && <div className="invalid-feedback">{errors.srednji_tecaj}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Prodajni tečaj</label>
          <input
            type="number"
            step="0.000001"
            className={`form-control ${errors.prodajni_tecaj ? 'is-invalid' : ''}`}
            name="prodajni_tecaj"
            value={form.prodajni_tecaj ?? ''}
            onChange={handleChange}
          />
          {errors.prodajni_tecaj && <div className="invalid-feedback">{errors.prodajni_tecaj}</div>}
        </div>

        {apiError && <div className="alert alert-danger">{apiError}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <button type="submit" className="btn btn-primary w-100">Spremi</button>
      </form>
    </div>
  );
};

export default AddRate;

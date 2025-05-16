

import { useAddExchangeRate } from "../hooks/useAddExchangeRate";

const AddRate: React.FC = () => {
  const { form, errors, apiError, successMessage, handleChange, handleSubmit } =
    useAddExchangeRate();
  return (
    <div>
      <h3 className="text-center mt-5 mb-5">Kreiraj tečajnicu</h3>
      <form onSubmit={handleSubmit} className="w-50 mx-auto mt-5">
        <div className="mb-3">
          <label className="form-label">Datum primjene</label>
          <input
            type="date"
            className={`form-control ${
              errors.datumPrimjene ? "is-invalid" : ""
            }`}
            name="datumPrimjene"
            value={form.datumPrimjene || ""}
            onChange={handleChange}
          />
          {errors.datumPrimjene && (
            <div className="invalid-feedback">{errors.datumPrimjene}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Šifra valute</label>
          <input
            type="text"
            className={`form-control ${errors.sifraValute ? "is-invalid" : ""}`}
            name="sifraValute"
            value={form.sifraValute || ""}
            onChange={handleChange}
          />
          {errors.sifraValute && (
            <div className="invalid-feedback">{errors.sifraValute}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Valuta</label>
          <input
            type="text"
            className={`form-control ${errors.valuta ? "is-invalid" : ""}`}
            name="valuta"
            value={form.valuta || ""}
            onChange={handleChange}
          />
          {errors.valuta && (
            <div className="invalid-feedback">{errors.valuta}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Kupovni tečaj</label>
          <input
            type="number"
            step="0.000001"
            className={`form-control ${
              errors.kupovni_tecaj ? "is-invalid" : ""
            }`}
            name="kupovni_tecaj"
            value={form.kupovni_tecaj ?? ""}
            onChange={handleChange}
          />
          {errors.kupovni_tecaj && (
            <div className="invalid-feedback">{errors.kupovni_tecaj}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Srednji tečaj</label>
          <input
            type="number"
            step="0.000001"
            className={`form-control ${
              errors.srednji_tecaj ? "is-invalid" : ""
            }`}
            name="srednji_tecaj"
            value={form.srednji_tecaj ?? ""}
            onChange={handleChange}
          />
          {errors.srednji_tecaj && (
            <div className="invalid-feedback">{errors.srednji_tecaj}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Prodajni tečaj</label>
          <input
            type="number"
            step="0.000001"
            className={`form-control ${
              errors.prodajni_tecaj ? "is-invalid" : ""
            }`}
            name="prodajni_tecaj"
            value={form.prodajni_tecaj ?? ""}
            onChange={handleChange}
          />
          {errors.prodajni_tecaj && (
            <div className="invalid-feedback">{errors.prodajni_tecaj}</div>
          )}
        </div>

        {apiError && <div className="alert alert-danger">{apiError}</div>}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Spremi
        </button>
      </form>
    </div>
  );
};

export default AddRate;

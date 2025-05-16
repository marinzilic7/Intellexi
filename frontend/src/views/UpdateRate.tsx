import { useUpdateHook } from "../hooks/crud/useUpdateHook";

function UpdateRate() {
  const {
    formData,
    errors,
    success,
    handleChange,
    handleSubmit,
  } = useUpdateHook();

  return (
    <div className="container">
      {success && (
        <div
          className="alert alert-success w-25 position-absolute end-0 top-0 mt-5 me-5 text-center"
          role="alert"
        >
          Tečajnica je uspješno uređena
        </div>
      )}

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

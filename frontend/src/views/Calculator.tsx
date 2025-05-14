function Calculator() {
  return (
    <div>
      <h1 className="text-center mt-5">Kalkulator</h1>
      <div>
        <form action="" className="w-50 mx-auto mt-5">
          <div className="d-flex">
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Iznos
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                placeholder="Unesite iznos (iz)"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="currency" className="form-label">
                Valuta
              </label>
              <select className="form-select" id="currency">
                <option value="">Odaberite valutu</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
          <div className="d-flex">
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Iznos
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                placeholder="Unesite iznos (u)"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="currency" className="form-label">
                Valuta
              </label>
              <select className="form-select" id="currency">
                <option value="">Odaberite valutu</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="currency" className="form-label">
              Vrsta tečaja
            </label>
            <select className="form-select" id="currency">
              <option value="">Odaberite vrstu tečaja</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="currency" className="form-label">
              Datum
            </label>
            <select className="form-select" id="currency">
              <option value="">Odaberite datum</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Izračunaj
          </button>
        </form>
        <div className="d-flex justify-content-center mt-5">
          <div className="alert alert-info text-center w-25">
            Rezultat: 100€
          </div>
        </div>
      </div>
    </div>
  );
}
export default Calculator;


import CurrencyFilter from "../components/CurrencyFilter";
import { useCalculator } from "../hooks/useCalculator";

function Calculator() {
  const {
    currency,
    currency2,
    selectedDate,
    amount,
    exchangeType,
    result,
    error,
    onCurrencyChange,
    onCurrencyChange2,
    onDateChange,
    onExchangeTypeChange,
    setAmount,
    handleConversion,
  } = useCalculator();

  return (
    <div>
      <h1 className="text-center mt-5">Kalkulator</h1>
      <div>
        <form onSubmit={handleConversion} className="w-50 mx-auto mt-5">
          <div className="d-flex">
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Pretvori
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                placeholder="Unesite iznos (iz)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="ms-3 mt-2">
              <CurrencyFilter
                currency={currency}
                onCurrencyChange={onCurrencyChange}
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                U
              </label>
              <div>
                <CurrencyFilter
                  currency={currency2}
                  onCurrencyChange={onCurrencyChange2}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="currency" className="form-label">
              Vrsta tečaja
            </label>
            <select
              className="form-select"
              id="currency"
              value={exchangeType}
              onChange={onExchangeTypeChange}
            >
              <option value="">Odaberite vrstu tečaja</option>
              <option value="kupovni_tecaj">Kupovni tečaj</option>
              <option value="prodajni_tecaj">Prodajni tečaj</option>
              <option value="srednji_tecaj">Srednji tečaj</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Datum
            </label>
            <input
              type="date"
              id="date"
              className="form-control"
              value={selectedDate}
              onChange={onDateChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Izračunaj
          </button>
        </form>

        {error && (
          <div className="d-flex justify-content-center mt-3">
            <div className="alert alert-danger w-25  text-center mt-3">
              {error}
            </div>
          </div>
        )}
        {result && (
          <div className="d-flex justify-content-center mt-5">
            <div className="alert alert-info text-center w-25">
              Rezultat: {result} {currency2}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculator;

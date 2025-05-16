import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import FilterForm from "../components/FilterForm";
import CurrencyCodeFilter from "../components/CurrencyCodeFilter";
import CurrencyFilter from "../components/CurrencyFilter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import type { ExchangeRate } from "../types/ExchangeRate";
import { useDeleteRate } from "../hooks/crud/useDeleteRate";
import { getExchangeRates } from "../hooks/crud/useGetExchangeRates";

function Home() {
  //Pozivanje hooka za dohvaćanje tečajnica
  const {
    exchangeRates,
    currentPage,
    totalPages,
    success,
    error,
    setExchangeRates,
    setCurrentPage,
    setError,
    fetchFromDatabase,
  } = getExchangeRates();

  //Pozivanje hooka za brisanje
  const { deleteRate } = useDeleteRate(() => {
    (id: number) =>
      setExchangeRates((prev) => prev.filter((rate) => rate.id !== id));
    fetchFromDatabase();
  });

  //filtriranje
  const [filteredRates, setFilteredRates] = useState<ExchangeRate[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [currencyCode, setCurrencyCode] = useState("");
  const [currency, setCurrency] = useState("");
  const [isApi, setApi] = useState(true);

  const fetchFromApi = () => {
    let apiStartDate = startDate;
    let apiEndDate = endDate;

    if (!apiStartDate && apiEndDate) {
      apiStartDate = "2023-01-01";
    }

    if (apiStartDate && !apiEndDate) {
      const today = new Date();
      const formattedToday = today.toISOString().split("T")[0]; // format: YYYY-MM-DD
      apiEndDate = formattedToday;
    }

    console.log("API Start Date:", apiStartDate);
    console.log("API End Date:", apiEndDate);

    axios
      .get(`http://localhost:8080/rates-by-date`, {
        params: { startDate: apiStartDate, endDate: apiEndDate },
      })
      .then((response) => {
        let data = response.data;

        if (currencyCode) {
          data = data.filter(
            (rate: ExchangeRate) => rate.sifraValute === currencyCode
          );
        } else if (currency) {
          data = data.filter((rate: ExchangeRate) => rate.valuta === currency);
        }

        setFilteredRates(data);
        setIsFiltering(true);
        setCurrentPage(0);
        setApi(false);
        setError(false);
      })
      .catch((err) => {
        console.error("Greška pri dohvaćanju podataka:", err);
        setError(true);
      });
  };

  useEffect(() => {
    if (!isFiltering) {
      fetchFromDatabase();
      setApi(true);
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (
      page >= 0 &&
      page < (isFiltering ? Math.ceil(filteredRates.length / 10) : totalPages)
    ) {
      setCurrentPage(page);
    }
  };

  const handleFilter = () => {
    fetchFromApi();
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setIsFiltering(false);
    setFilteredRates([]);
    fetchFromDatabase();
    setCurrencyCode("");
    setCurrency("");
    setApi(true);
  };

  // Paginacija
  const itemsPerPage = 10;
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFilteredRates = filteredRates.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const filteredTotalPages = Math.ceil(filteredRates.length / itemsPerPage);

  const onCurrencyCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrencyCode = e.target.value;
    setCurrencyCode(selectedCurrencyCode);
    setCurrentPage(0);
  };

  const onCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);
    setCurrentPage(0);
  };

  useEffect(() => {
    if (currency) {
      fetchFromApi();
    } else if (isFiltering) {
      handleReset();
    }
  }, [currency]);

  useEffect(() => {
    if (currencyCode) {
      fetchFromApi();
    } else if (isFiltering) {
      handleReset();
    }
  }, [currencyCode]);

  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="container mt-4">
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

      <h2 className="text-center mb-5 mt-3">Tečajnice</h2>

      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-primary">
          <Link to="/rates" className="text-light text-decoration-none">
            Kreiranje tečajnice
          </Link>
        </button>
      </div>

      <div className="mb-4 d-flex align-items-center justify-content-evenly gap-3">
        <FilterForm
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(e) => setStartDate(e.target.value)}
          onEndDateChange={(e) => setEndDate(e.target.value)}
          onFilter={handleFilter}
          onReset={handleReset}
        />
        <div className="d-flex gap-3  flex-wrap">
          <CurrencyCodeFilter
            currencyCode={currencyCode}
            onCurrencyCodeChange={onCurrencyCodeChange}
          />

          <CurrencyFilter
            currency={currency}
            onCurrencyChange={onCurrencyChange}
          />
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">Datum primjene</th>
              <th className="text-center">Šifra valute</th>
              <th className="text-center">Valuta</th>
              <th className="text-center">Kupovni tečaj</th>
              <th className="text-center">Srednji tečaj</th>
              <th className="text-center">Prodajni tečaj</th>
              {isApi && (
                <>
                  <th className="text-center">Detalji</th>
                  <th className="text-center">Uredi</th>
                  <th className="text-center">Izbrisi</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {(isFiltering ? currentFilteredRates : exchangeRates).map(
              (rate, index) => (
                <tr key={index}>
                  <td
                    className="td-text text-center"
                    onClick={() => handleClick(rate.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {formatDate(rate.datumPrimjene)}
                  </td>
                  <td className="text-center">{rate.sifraValute}</td>
                  <td className="text-center">{rate.valuta}</td>
                  <td className="text-center">{rate.kupovni_tecaj}</td>
                  <td className="text-center">{rate.srednji_tecaj}</td>
                  <td className="text-center">{rate.prodajni_tecaj}</td>

                  {isApi && (
                    <>
                      <td
                        className="text-center"
                        onClick={() => handleClick(rate.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <button className="details-btn text-primary text-decoration-underline fw-bold btn btn-sm btn-transparent">
                          Detalji

                        </button>
                      </td>
                      <td>
                        <button className="update-btn btn btn-sm btn-transparent ms-lg-5">
                          <Link
                            to={`/edit/${rate.id}`}
                            className=" text-success fw-bold"
                          >
                            Uredi
                          </Link>
                        </button>
                      </td>

                      <td className="d-flex justify-content-center">
                        <button
                          className="delete-btn btn btn-sm btn-transparent text-danger fw-bold text-decoration-underline ms-2"
                          onClick={() => deleteRate(rate.id)}
                        >
                          Izbrisi
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {!isFiltering && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {isFiltering && (
        <Pagination
          currentPage={currentPage}
          totalPages={filteredTotalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Home;

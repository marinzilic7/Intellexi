import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import FilterForm from "../components/FilterForm";
import CurrencyCodeFilter from "../components/CurrencyCodeFilter";
import CurrencyFilter from "../components/CurrencyFilter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function ExchangeRate() {
  interface ExchangeRate {
    id: number;
    brojTecajnice: string;
    datumPrimjene: string;
    drzava: string;
    drzava_iso: string;
    sifraValute: string;
    valuta: string;
    kupovni_tecaj: string;
    prodajni_tecaj: string;
    srednji_tecaj: string;
  }

  // Tečajnice
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [filteredRates, setFilteredRates] = useState<ExchangeRate[]>([]);

  //Poruke
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Paginacija 
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Filteri po datumu

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  // Filteri po sifri valute
  const [currencyCode, setCurrencyCode] = useState("");

  // Filteri po valuti
  const [currency, setCurrency] = useState("");

  const formatDate = (isoDate: string) => {
    const [year, month, day] = isoDate.split("-");
    return `${day}.${month}.${year}`;
  };

  const fetchFromDatabase = () => {
    axios
      .get(`http://localhost:8080/rates?page=${currentPage}&size=5`)
      .then((response) => {
        setExchangeRates(response.data.content);
        setTotalPages(response.data.totalPages);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(() => setError(true));
  };

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
        }else if (currency) {
          data = data.filter(
            (rate: ExchangeRate) => rate.valuta === currency
          ); 
        }

        setFilteredRates(data);
        setIsFiltering(true);
        setCurrentPage(0);
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
  };

  // Pagination variables
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
  }

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
        <button className="btn btn-primary" ><Link
                  to="/rates"
                  className="text-light text-decoration-none"
                >
                  Kreiranje tečajnice
                </Link></button>
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

        <CurrencyCodeFilter
          currencyCode={currencyCode}
          onCurrencyCodeChange={onCurrencyCodeChange}
        />

        <CurrencyFilter
          currency={currency}
          onCurrencyChange={onCurrencyChange}
        />
      </div>

      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">Datum primjene</th>
            <th className="text-center">Šifra valute</th>
            <th className="text-center">Valuta</th>
            <th className="text-center">Kupovni tečaj</th>
            <th className="text-center">Srednji tečaj</th>
            <th className="text-center">Prodajni tečaj</th>
            <th className="text-center">Detalji</th>
            <th className="text-center">Uredi</th>
            <th className="text-center">Izbrisi</th>
          </tr>
        </thead>
        <tbody>
          {(isFiltering ? currentFilteredRates : exchangeRates).map(
            (rate, index) => (
              <tr key={index} >
                <td className="text-center" onClick={() => handleClick(rate.id)} style={{ cursor: "pointer" }}>
                  {formatDate(rate.datumPrimjene)}
                </td>
                <td className="text-center">{rate.sifraValute}</td>
                <td className="text-center">{rate.valuta}</td>
                <td className="text-center">{rate.kupovni_tecaj}</td>
                <td className="text-center">{rate.srednji_tecaj}</td>
                <td className="text-center">{rate.prodajni_tecaj}</td>
                
                <td className="text-center" onClick={() => handleClick(rate.id)} style={{ cursor: "pointer" }}>
                  <button  className="btn btn-sm btn-primary">
                    Detalji
                  </button>
                </td>
                <td>
                  <button className="btn btn-sm btn-dark ms-5">
                    <Link
                      to={`/edit/${rate.id}`}
                      className="text-light text-decoration-none"
                    >
                      Uredi
                    </Link>
                  </button>
                </td>
                <td className="d-flex justify-content-center">
                   <button className="btn btn-sm btn-danger ms-2">
                    <Link
                      to={`/delete/${rate.id}`}
                      className="text-light text-decoration-none"
                    >
                      Obriši
                    </Link>
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

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

export default ExchangeRate;

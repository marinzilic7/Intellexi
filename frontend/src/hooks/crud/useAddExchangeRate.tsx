
import { useState } from "react";
import axios from "axios";
export function useAddExchangeRate() {

interface ExchangeRateDTO {
  datumPrimjene: string;
  sifraValute: string;
  valuta: string;
  kupovni_tecaj: number;
  srednji_tecaj: number;
  prodajni_tecaj: number;
}

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
    return {
        form,
        errors,
        apiError,
        successMessage,
        handleChange,
        handleSubmit,
    };


}
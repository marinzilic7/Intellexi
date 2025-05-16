import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";




export function useUpdateHook() {
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
  const [success, setSuccess] = useState(false);

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
      .put(`http://localhost:8080/rates/${id}`, formData)
      .then(() => {
         setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 3000);
       
        
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setErrors(err.response.data);
        } else {
          console.error("Greška:", err);
        }
      });
  };

    return {
        formData,
        errors,
        success,
        handleChange,
        handleSubmit,
    };
}

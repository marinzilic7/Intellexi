package com.example.backend.dto;


import com.example.backend.deserializer.CustomDoubleDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class ExchangeRateDTO {
    @NotBlank(message = "Šifra valute je obavezna")
    private String sifraValute;

    @NotBlank(message = "Valuta je obavezna")
    private String valuta;

    @NotNull(message = "Datum primjene je obavezan")
    private LocalDate datumPrimjene;

    @JsonDeserialize(using = CustomDoubleDeserializer.class)
    @NotNull(message = "Kupovni tečaj je obavezan")
    @DecimalMin(value = "0.0", inclusive = false, message = "Kupovni tečaj mora biti veći od 0")
    private Double kupovni_tecaj;

    @JsonDeserialize(using = CustomDoubleDeserializer.class)
    @NotNull(message = "Srednji tečaj je obavezan")
    @DecimalMin(value = "0.0", inclusive = false, message = "Srednji tečaj mora biti veći od 0")
    private Double srednji_tecaj;

    @JsonDeserialize(using = CustomDoubleDeserializer.class)
    @NotNull(message = "Prodajni tečaj je obavezan")
    @DecimalMin(value = "0.0", inclusive = false, message = "Prodajni tečaj mora biti veći od 0")
    private Double prodajni_tecaj;

    public String getSifraValute() {
        return sifraValute;
    }

    public void setSifraValute(String sifraValute) {
        this.sifraValute = sifraValute;
    }

    public String getValuta() {
        return valuta;
    }

    public void setValuta(String valuta) {
        this.valuta = valuta;
    }

    public LocalDate getDatumPrimjene() {
        return datumPrimjene;
    }

    public void setDatumPrimjene(LocalDate datumPrimjene) {
        this.datumPrimjene = datumPrimjene;
    }

    public Double getKupovni_tecaj() {
        return kupovni_tecaj;
    }

    public void setKupovni_tecaj(Double kupovni_tecaj) {
        this.kupovni_tecaj = kupovni_tecaj;
    }

    public Double getSrednji_tecaj() {
        return srednji_tecaj;
    }

    public void setSrednji_tecaj(Double srednji_tecaj) {
        this.srednji_tecaj = srednji_tecaj;
    }

    public Double getProdajni_tecaj() {
        return prodajni_tecaj;
    }

    public void setProdajni_tecaj(Double prodajni_tecaj) {
        this.prodajni_tecaj = prodajni_tecaj;
    }
}



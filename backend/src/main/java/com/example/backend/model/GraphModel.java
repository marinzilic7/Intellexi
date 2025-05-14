package com.example.backend.model;


import com.example.backend.deserializer.CustomDoubleDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "graph_rate")
public class GraphModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name="broj_tecajnice")
    private String brojTecajnice;

    @Column(name = "datum_primjene")
    private LocalDate datumPrimjene;

    @Column(name="drzava")
    private String drzava;

    @Column(name = "drzava_iso")
    private String drzava_iso;

    @Column(name = "sifra_valute")
    private String sifraValute;

    @Column(name="valuta ")
    private String valuta;

    @JsonDeserialize(using = CustomDoubleDeserializer.class)
    @Column(name = "kupovni_tecaj")
    private Double kupovni_tecaj;

    @JsonDeserialize(using = CustomDoubleDeserializer.class)
    @Column(name = "prodajni_tecaj")
    private Double prodajni_tecaj;

    @JsonDeserialize(using = CustomDoubleDeserializer.class)
    @Column(name = "srednji_tecaj")
    private Double  srednji_tecaj;


    public GraphModel(){

    }

    public GraphModel(Long id, String brojTecajnice, LocalDate datumPrimjene, String drzava, String drzava_iso, String sifraValute, String valuta, Double kupovni_tecaj, Double prodajni_tecaj, Double srednji_tecaj) {
        this.id = id;
        this.brojTecajnice = brojTecajnice;
        this.datumPrimjene = datumPrimjene;
        this.drzava = drzava;
        this.drzava_iso = drzava_iso;
        this.sifraValute = sifraValute;
        this.valuta = valuta;
        this.kupovni_tecaj = kupovni_tecaj;
        this.prodajni_tecaj = prodajni_tecaj;
        this.srednji_tecaj = srednji_tecaj;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrojTecajnice() {
        return brojTecajnice;
    }

    public void setBrojTecajnice(String brojTecajnice) {
        this.brojTecajnice = brojTecajnice;
    }

    public LocalDate getDatumPrimjene() {
        return datumPrimjene;
    }

    public void setDatumPrimjene(LocalDate datumPrimjene) {
        this.datumPrimjene = datumPrimjene;
    }

    public String getDrzava() {
        return drzava;
    }

    public void setDrzava(String drzava) {
        this.drzava = drzava;
    }

    public String getDrzava_iso() {
        return drzava_iso;
    }

    public void setDrzava_iso(String drzava_iso) {
        this.drzava_iso = drzava_iso;
    }

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

    public Double getKupovni_tecaj() {
        return kupovni_tecaj;
    }

    public void setKupovni_tecaj(Double kupovni_tecaj) {
        this.kupovni_tecaj = kupovni_tecaj;
    }

    public Double getProdajni_tecaj() {
        return prodajni_tecaj;
    }

    public void setProdajni_tecaj(Double prodajni_tecaj) {
        this.prodajni_tecaj = prodajni_tecaj;
    }

    public Double getSrednji_tecaj() {
        return srednji_tecaj;
    }

    public void setSrednji_tecaj(Double srednji_tecaj) {
        this.srednji_tecaj = srednji_tecaj;
    }


}

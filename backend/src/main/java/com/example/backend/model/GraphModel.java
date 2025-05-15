package com.example.backend.model;


import com.example.backend.deserializer.CustomDoubleDeserializer;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("datum_primjene")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate datumPrimjene;

    @Column(name = "sifra_valute")
    @JsonProperty("sifra_valute")
    private String sifraValute;

    @Column(name = "drzava")
    @JsonProperty("drzava")
    private String drzava;

    @Column(name = "drzava_iso")
    @JsonProperty("drzava_iso")
    private String drzava_iso;

    @Column(name = "valuta ")
    @JsonProperty("valuta")
    private String valuta;

    @JsonDeserialize(using = CustomDoubleDeserializer.class)
    @Column(name = "kupovni_tecaj")
    @JsonProperty("kupovni_tecaj")
    private Double kupovni_tecaj;

    @JsonDeserialize(using = CustomDoubleDeserializer.class)
    @Column(name = "prodajni_tecaj")
    @JsonProperty("prodajni_tecaj")
    private Double prodajni_tecaj;

    @JsonDeserialize(using = CustomDoubleDeserializer.class)
    @Column(name = "srednji_tecaj")
    @JsonProperty("srednji_tecaj")
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


    public LocalDate getDatumPrimjene() {
        return datumPrimjene;
    }

    public String getSifraValute() {
        return sifraValute;
    }

    public Double getSrednji_tecaj() {
        return srednji_tecaj;
    }





}

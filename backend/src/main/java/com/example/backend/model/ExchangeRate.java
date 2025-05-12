package com.example.backend.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name="exchange_rates")
public class ExchangeRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="broj_tecajnice")
    private String brojTecajnice;

    @Column(name = "datum_primjene")
    private LocalDate datumPrimjene;

    private String drzava;

    @Column(name = "drzava_iso")
    private String drzavaIso;

    @Column(name = "sifra_valute")
    private String sifraValute;

    private String valuta;

    @Column(name = "kupovni_tecaj")
    private BigDecimal kupovniTecaj;

    @Column(name = "prodajni_tecaj")
    private BigDecimal prodajniTecaj;

    @Column(name = "srednji_tecaj")
    private BigDecimal srednjiTecaj;

    public ExchangeRate(Long id, String brojTecajnice, LocalDate datumPrimjene, String drzava, String drzavaIso, String sifraValute, String valuta, BigDecimal kupovniTecaj, BigDecimal prodajniTecaj, BigDecimal srednjiTecaj) {
        this.id = id;
        this.brojTecajnice = brojTecajnice;
        this.datumPrimjene = datumPrimjene;
        this.drzava = drzava;
        this.drzavaIso = drzavaIso;
        this.sifraValute = sifraValute;
        this.valuta = valuta;
        this.kupovniTecaj = kupovniTecaj;
        this.prodajniTecaj = prodajniTecaj;
        this.srednjiTecaj = srednjiTecaj;
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

    public String getDrzavaIso() {
        return drzavaIso;
    }

    public void setDrzavaIso(String drzavaIso) {
        this.drzavaIso = drzavaIso;
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

    public BigDecimal getKupovniTecaj() {
        return kupovniTecaj;
    }

    public void setKupovniTecaj(BigDecimal kupovniTecaj) {
        this.kupovniTecaj = kupovniTecaj;
    }

    public BigDecimal getProdajniTecaj() {
        return prodajniTecaj;
    }

    public void setProdajniTecaj(BigDecimal prodajniTecaj) {
        this.prodajniTecaj = prodajniTecaj;
    }

    public BigDecimal getSrednjiTecaj() {
        return srednjiTecaj;
    }

    public void setSrednjiTecaj(BigDecimal srednjiTecaj) {
        this.srednjiTecaj = srednjiTecaj;
    }
}

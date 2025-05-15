package com.example.backend.dto;

import java.time.LocalDate;

public class GraphDTO {

    private LocalDate datum;
    private double vrijednost;

    private double vrijednost2;

    public GraphDTO(LocalDate datum, double vrijednost, double vrijednost2) {
        this.datum = datum;
        this.vrijednost = vrijednost;
        this.vrijednost2 = vrijednost2;
    }

    public LocalDate getDatum() {
        return datum;
    }

    public double getVrijednost() {
        return vrijednost;
    }

    public double getVrijednost2() {
        return vrijednost2;
    }


}

package com.example.backend.repositories;

import com.example.backend.model.ExchangeRate;
import com.example.backend.model.GraphModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface GraphRepository extends JpaRepository <GraphModel, Long> {

    boolean existsBySifraValuteAndDatumPrimjene(String sifraValute, LocalDate datumPrimjene);
    List<GraphModel> findAll();
}

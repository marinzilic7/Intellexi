package com.example.backend.repositories;

import com.example.backend.model.ExchangeRate;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface ExchangeRateRepository  extends JpaRepository<ExchangeRate, Long> {

    boolean existsBySifraValuteAndDatumPrimjene(String sifraValute, LocalDate datumPrimjene);

    List<ExchangeRate> findAll();


}

package com.example.backend.repositories;

import com.example.backend.model.ExchangeRate;
import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExchangeRateRepository  extends JpaRepository<ExchangeRate, Long> {

    boolean existsBysifraValute(String sifraValute);
    List<ExchangeRate> findAll();
}

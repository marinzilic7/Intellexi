package com.example.backend.repositories;

import com.example.backend.model.ExchangeRate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExchangeRateRepository  extends JpaRepository<ExchangeRate, Long> {

}

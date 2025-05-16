package com.example.backend.controllers;


import com.example.backend.dto.ExchangeRateDTO;
import com.example.backend.dto.GraphDTO;
import com.example.backend.model.ExchangeRate;
import com.example.backend.services.ExchangeRateService;
import jakarta.validation.Valid;
import org.hibernate.jdbc.Expectation;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class ExchangeRateController {



    private ExchangeRateService exchangeRateService;

    @Autowired
    public void setExchangeRateService(ExchangeRateService exchangeRateService){
        this.exchangeRateService = exchangeRateService;
    }



    @GetMapping("/fetch-exchange-rates")
    public String fetchExchangeRates() {
        exchangeRateService.fetchApi();
        return "Podaci su uspješno dohvaćeni i spremljeni u bazu!";
    }

    /*
    @GetMapping("/rates")
    public Page<ExchangeRate> getAllExchangeRates(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        return exchangeRateService.getAllExchangeRate(page, size);
    }
     */
    @GetMapping("/rates")
    public List<ExchangeRate> getAllExchangeRates() {
        return exchangeRateService.getAllExchangeRate();
    }

    @GetMapping("/rates-by-date")
    public ResponseEntity<List<ExchangeRate>> getRatesByDateRange(
            @RequestParam @DateTimeFormat(pattern = "dd.MM.yyyy") String startDate,
            @RequestParam @DateTimeFormat(pattern = "dd.MM.yyyy") String endDate) {

        // Dohvaćanje tečajnica s HNB API-ja za zadani raspon datuma
        List<ExchangeRate> rates = exchangeRateService.fetchRatesFromApi(startDate, endDate);

        return ResponseEntity.ok(rates);
    }

    @GetMapping("/getCurrencyCode")
    public ResponseEntity<List<String>> getCurrenciesCode() {
        List<String> currencies = exchangeRateService.fetchCurrencyCode();


        System.out.println("Dostupne valute iz HNB API-ja:");
        currencies.forEach(System.out::println);

        return ResponseEntity.ok(currencies);
    }

    @GetMapping("/getCurrency")
    public ResponseEntity<List<String>> getAllCurrencies() {
        List<String> currencies = exchangeRateService.fetchCurrency();


        System.out.println("Dostupne valute iz HNB API-ja:");
        currencies.forEach(System.out::println);

        return ResponseEntity.ok(currencies);
    }

    @GetMapping("/rates/{id}")
    public ResponseEntity<ExchangeRate> getExchangeRateById(@PathVariable Long id) {
        ExchangeRate rate = exchangeRateService.getExchangeRateById(id);
        return ResponseEntity.ok(rate);
    }

    @PostMapping("/rates")
    public ResponseEntity<?> createRate(@Valid @RequestBody ExchangeRateDTO dto, BindingResult result) {
        if (result.hasErrors()) {

            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }

        try {
            ExchangeRate newRate = exchangeRateService.createRate(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(newRate);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/rates/{id}")
    public ResponseEntity<?> updateExchangeRate(
            @PathVariable Long id,
            @Valid @RequestBody ExchangeRateDTO dto,
            BindingResult result
    ) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }

        boolean datumPostoji = exchangeRateService.existsByDatumPrimjeneAndNotId(dto.getSifraValute(), dto.getDatumPrimjene());
        if (datumPostoji) {
            result.rejectValue("datumPrimjene", "duplicate", "Tečajnica za taj datum već postoji.");
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }else{
            Optional<ExchangeRate> updated = exchangeRateService.updateExchangeRate(id, dto  );
            return updated.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        }


    }

    @DeleteMapping("/rates/{id}")
    public ResponseEntity<?> deleteExchangeRate(@PathVariable Long id) {
        boolean deleted = exchangeRateService.deleteExchangeRate(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @PostMapping("/convert")
    public ResponseEntity<?> convert(@RequestBody ExchangeRateDTO request) {
        try {
            BigDecimal result = exchangeRateService.convertCurrency(
                    request.getAmount(),
                    request.getFromCurrency(),
                    request.getToCurrency(),
                    request.getExchangeType(),
                    request.getDate()
            );
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Došlo je do greške.");
        }


    }




}

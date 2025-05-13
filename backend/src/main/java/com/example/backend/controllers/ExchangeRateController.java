package com.example.backend.controllers;


import com.example.backend.model.ExchangeRate;
import com.example.backend.services.ExchangeRateService;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ExchangeRateController {


    @Autowired
    private ExchangeRateService exchangeRateService;

    @GetMapping("/fetch-exchange-rates")
    public String fetchExchangeRates() {
        exchangeRateService.fetchApi();
        return "Podaci su uspješno dohvaćeni i spremljeni u bazu!";
    }

    @GetMapping("/rates")
    public Page<ExchangeRate> getAllExchangeRates(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size){
        return exchangeRateService.getAllExchangeRate(page, size);
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
    public ResponseEntity<List<String>> getAllCurrencies() {
        List<String> currencies = exchangeRateService.fetchCurrencyCode();

        // Ispis u IntelliJ konzoli
        System.out.println("Dostupne valute iz HNB API-ja:");
        currencies.forEach(System.out::println);

        return ResponseEntity.ok(currencies);
    }


}

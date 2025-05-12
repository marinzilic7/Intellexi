package com.example.backend.controllers;


import com.example.backend.services.ExchangeRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExchangeRateController {


    @Autowired
    private ExchangeRateService exchangeRateService;

    @GetMapping("/fetch-exchange-rates")
    public String fetchExchangeRates() {
        exchangeRateService.fetchApi();
        return "Podaci su uspješno dohvaćeni i spremljeni u bazu!";
    }
}

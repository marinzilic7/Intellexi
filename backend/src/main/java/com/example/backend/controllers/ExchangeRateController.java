package com.example.backend.controllers;


import com.example.backend.model.ExchangeRate;
import com.example.backend.services.ExchangeRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/exchangeRates")
    public List<ExchangeRate> getAllExchangeRates(){
        return exchangeRateService.getAllExchangeRate();
    }
}

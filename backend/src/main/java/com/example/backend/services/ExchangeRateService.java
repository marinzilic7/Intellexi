package com.example.backend.services;

import com.example.backend.model.ExchangeRate;
import com.example.backend.repositories.ExchangeRateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ExchangeRateService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ExchangeRateRepository exchangeRateRepository;

    private static final String HNB_API = "https://api.hnb.hr/tecajn-eur/v3";

    public void fetchApi(){
        List<ExchangeRate> exchangeRates = fetchExchangeRates();

        for (ExchangeRate exchangeRate : exchangeRates) {
            if (!exchangeRateRepository.existsBysifraValute(exchangeRate.getsifraValute())) {
                exchangeRateRepository.save(exchangeRate);
            }
        }
    }

    private List<ExchangeRate> fetchExchangeRates() {
        ExchangeRate[] exchangeRatesArray = restTemplate.getForObject(HNB_API, ExchangeRate[].class);
        return List.of(exchangeRatesArray);
    }

    public List<ExchangeRate> getAllExchangeRate(){
        return exchangeRateRepository.findAll();
    }

}

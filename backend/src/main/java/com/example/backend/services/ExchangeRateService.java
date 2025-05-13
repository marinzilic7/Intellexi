package com.example.backend.services;

import com.example.backend.model.ExchangeRate;
import com.example.backend.repositories.ExchangeRateRepository;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.List;
import java.util.stream.Collectors;

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

    public Page<ExchangeRate> getAllExchangeRate(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return exchangeRateRepository.findAll(pageable);
    }


    public List<ExchangeRate> fetchRatesFromApi(String startDate, String endDate) {

        String url = HNB_API + "?datum-primjene-od=" + startDate + "&datum-primjene-do=" + endDate;

        try {
            ResponseEntity<ExchangeRate[]> response = restTemplate.getForEntity(url, ExchangeRate[].class);
            ExchangeRate[] rates = response.getBody();
            return List.of(rates);
        } catch (Exception e) {
            throw new RuntimeException("Greška prilikom dohvaćanja podataka s API-ja", e);
        }
    }



    public List<String> fetchCurrencyCode(){
        RestTemplate restTemplate = new RestTemplate();

        ExchangeRate[] response = restTemplate.getForObject(HNB_API, ExchangeRate[].class);

        if(response == null){
            return List.of();


        }

        return List.of(response).stream()
                .map(ExchangeRate::getsifraValute)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }



}

package com.example.backend.config;

import com.example.backend.services.ExchangeRateService;
import com.example.backend.services.GraphService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class Data implements CommandLineRunner {
    private final ExchangeRateService exchangeRateService;
    private final GraphService graphService;

    public Data(ExchangeRateService exchangeRateService, GraphService graphService) {
        this.exchangeRateService = exchangeRateService;
        this.graphService = graphService;
    }

    // ubacivanje tecajnica u bazu
    @Override
    public void run(String... args) throws Exception {
        exchangeRateService.fetchApi();
        graphService.fetchApiLastMonth();
        System.out.println("Podaci uspješno dohvaćeni i spremljeni prilikom starta aplikacije.");
    }

    //ubacivanje tecajnica u bazu od zadnjih mjesec dana


}

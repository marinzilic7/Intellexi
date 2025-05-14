package com.example.backend.services;

import com.example.backend.dto.ExchangeRateDTO;
import com.example.backend.model.ExchangeRate;
import com.example.backend.repositories.ExchangeRateRepository;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import javax.sound.midi.InvalidMidiDataException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
            if (!exchangeRateRepository.existsBySifraValuteAndDatumPrimjene(
                    exchangeRate.getsifraValute(), exchangeRate.getDatumPrimjene())) {
                exchangeRateRepository.save(exchangeRate);
            }
        }
    }

    @Scheduled(cron = "0 30  16 * * *") // svaki dan u 16:30
    public void scheduleFetchExchangeRates() {
        fetchApi();
        System.out.println("Uspjesno dodani podaci za danasnji dan!");
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

        return Stream.of(response)
                .map(ExchangeRate::getsifraValute)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    public List<String> fetchCurrency(){
        RestTemplate restTemplate = new RestTemplate();
        ExchangeRate[] response = restTemplate.getForObject(HNB_API, ExchangeRate[].class);

        return Stream.of(response)
                .map(ExchangeRate::getValuta)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    public ExchangeRate getExchangeRateById(Long id) {
        return exchangeRateRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Tečajnica s ID-em " + id + " nije pronađena."));
    }


    public ExchangeRate createRate(ExchangeRateDTO dto) {
        // Provjeri postoji li već tečaj za tu valutu i datum
        boolean exists = exchangeRateRepository.existsBySifraValuteAndDatumPrimjene(
                dto.getSifraValute(), dto.getDatumPrimjene()
        );

        if (exists) {
            throw new IllegalArgumentException("Već postoji tečaj za ovu valutu i datum.");
        }

        ExchangeRate rate = new ExchangeRate();
        rate.setDatum_primjene(dto.getDatumPrimjene());
        rate.setSifra_valute(dto.getSifraValute());
        rate.setValuta(dto.getValuta());
        rate.setKupovni_tecaj(dto.getKupovni_tecaj());
        rate.setSrednji_tecaj(dto.getSrednji_tecaj());
        rate.setProdajni_tecaj(dto.getProdajni_tecaj());

        return exchangeRateRepository.save(rate);
    }

    public Optional<ExchangeRate> updateExchangeRate(Long id, ExchangeRateDTO updatedRateDTO) {


           return exchangeRateRepository.findById(id).map(existingRate -> {

               existingRate.setDatum_primjene(updatedRateDTO.getDatumPrimjene());
               existingRate.setSifra_valute(updatedRateDTO.getSifraValute());
               existingRate.setValuta(updatedRateDTO.getValuta());
               existingRate.setKupovni_tecaj(updatedRateDTO.getKupovni_tecaj());
               existingRate.setSrednji_tecaj(updatedRateDTO.getSrednji_tecaj());
               existingRate.setProdajni_tecaj(updatedRateDTO.getProdajni_tecaj());

               return exchangeRateRepository.save(existingRate);
           });



    }

    public boolean existsByDatumPrimjeneAndNotId(String sifraValute, LocalDate datum) {
        return exchangeRateRepository.existsBySifraValuteAndDatumPrimjene(sifraValute, datum);
    }

    public boolean deleteExchangeRate(Long id) {
        if (exchangeRateRepository.existsById(id)) {
            exchangeRateRepository.deleteById(id);
            return true;
        }
        return false;
    }





}

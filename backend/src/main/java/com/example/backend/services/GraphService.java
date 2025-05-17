package com.example.backend.services;

import com.example.backend.dto.GraphDTO;
import com.example.backend.model.GraphModel;
import com.example.backend.repositories.GraphRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GraphService {


    private GraphRepository graphRepository;
    private RestTemplate restTemplate;

    @Autowired
    public void setRestTemplate(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }
    @Autowired
    public void setGraphRepositry (GraphRepository graphRepository){
        this.graphRepository = graphRepository;
    }



    LocalDate dateNow = LocalDate.now();
    String HNB_API_LAST_MONTH = "https://api.hnb.hr/tecajn-eur/v3?datum-primjene-od="+dateNow.minusDays(30)+ "&datum-primjene-do=" + dateNow;




    public void fetchApiLastMonth(){
        List<GraphModel> graphModels = fetchExchangeRatesGraph();

        for (GraphModel graphModel : graphModels) {
            if (!graphRepository.existsBySifraValuteAndDatumPrimjene(
                    graphModel.getSifraValute(), graphModel.getDatumPrimjene())) {
                graphRepository.save(graphModel);
            }
        }


    }

    private List<GraphModel> fetchExchangeRatesGraph() {
        GraphModel[] graphRates= restTemplate.getForObject(HNB_API_LAST_MONTH, GraphModel[].class);


        return List.of(graphRates);
    }

    public List<GraphDTO> getComparisonData(String currency1, String currency2, String choosenDate) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = choosenDate.equals("month") ? endDate.minusDays(30) : endDate.minusDays(7);

        List<GraphModel> currencyOne = graphRepository.findByValutaAndDatumPrimjeneBetween(currency1, startDate, endDate);
        List<GraphModel> currencyTwo = graphRepository.findByValutaAndDatumPrimjeneBetween(currency2, startDate, endDate);

        Map<LocalDate, Double> fromMap = new HashMap<>();
        Map<LocalDate, Double> toMap = new HashMap<>();

        currencyOne.forEach(r -> fromMap.put(r.getDatumPrimjene(), r.getSrednji_tecaj()));
        currencyTwo.forEach(r -> toMap.put(r.getDatumPrimjene(), r.getSrednji_tecaj()));

        List<GraphDTO> result = new ArrayList<>();

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            double val1 = fromMap.getOrDefault(date, 0.0);
            double val2 = toMap.getOrDefault(date, 0.0);

            result.add(new GraphDTO(date, val1, val2));
        }

        return result;
    }
}

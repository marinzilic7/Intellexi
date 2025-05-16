package com.example.backend.controllers;

import com.example.backend.dto.GraphDTO;
import com.example.backend.services.ExchangeRateService;
import com.example.backend.services.GraphService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class GraphController {

    private GraphService graphService;

    @Autowired
    public void setGraphService(GraphService graphService) {
        this.graphService = graphService;
    }

    @GetMapping("/last-month")
    public String fetchApiLastMonth() {
        graphService.fetchApiLastMonth();
        return "Podaci su uspješno dohvaćeni i spremljeni u bazu!";
    }

    @GetMapping("/graph")
    public List<GraphDTO> getGraphData(
            @RequestParam String currency1,
            @RequestParam String currency2,
            @RequestParam String choosenDate
    ) {
        return graphService.getComparisonData(currency1, currency2, choosenDate);
    }
}

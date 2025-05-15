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
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam String range
    ) {
        return graphService.getComparisonData(from, to, range);
    }
}

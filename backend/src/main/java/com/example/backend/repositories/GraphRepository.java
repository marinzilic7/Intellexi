package com.example.backend.repositories;

import com.example.backend.model.GraphModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GraphRepository extends JpaRepository <GraphModel, Long> {
}

package com.econext.econext_backend.repository;

import com.econext.econext_backend.model.FootprintLog;
//import org.apache.el.stream.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface FootprintLogRepository extends JpaRepository<FootprintLog, Long> {
    // JpaRepository already provides the .save() method we need
    // Add this inside the FootprintLogRepository interface
    Optional<FootprintLog> findTopByUser_EmailOrderByLogDateDesc(String email);
}
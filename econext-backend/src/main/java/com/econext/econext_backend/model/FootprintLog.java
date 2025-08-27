package com.econext.econext_backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "footprint_logs")
public class FootprintLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;

    @Column(name = "footprint_value_kg", nullable = false)
    private Double footprintValueKg;

    @Column(name = "log_date", nullable = false)
    private LocalDate logDate;

    // --- NEW COLUMNS TO STORE USER INPUTS ---
    private Double drivingKmPerWeek;
    private Double annualFlights;
    private String energyType;
    private Double meatMealsPerWeek;
    // --- END OF NEW COLUMNS ---

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_email", referencedColumnName = "email", nullable = false)
    private User user;

    // --- Add Getters and Setters for the new fields ---
    public Double getDrivingKmPerWeek() { return drivingKmPerWeek; }
    public void setDrivingKmPerWeek(Double drivingKmPerWeek) { this.drivingKmPerWeek = drivingKmPerWeek; }
    public Double getAnnualFlights() { return annualFlights; }
    public void setAnnualFlights(Double annualFlights) { this.annualFlights = annualFlights; }
    public String getEnergyType() { return energyType; }
    public void setEnergyType(String energyType) { this.energyType = energyType; }
    public Double getMeatMealsPerWeek() { return meatMealsPerWeek; }
    public void setMeatMealsPerWeek(Double meatMealsPerWeek) { this.meatMealsPerWeek = meatMealsPerWeek; }

    // Existing getters and setters...
    public Long getLogId() { return logId; }
    public void setLogId(Long logId) { this.logId = logId; }
    public Double getFootprintValueKg() { return footprintValueKg; }
    public void setFootprintValueKg(Double footprintValueKg) { this.footprintValueKg = footprintValueKg; }
    public LocalDate getLogDate() { return logDate; }
    public void setLogDate(LocalDate logDate) { this.logDate = logDate; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}

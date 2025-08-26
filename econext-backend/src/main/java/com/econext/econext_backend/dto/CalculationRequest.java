package com.econext.econext_backend.dto;

// This class matches the fields in your React form's state
public class CalculationRequest {

    private double drivingKmPerWeek;
    private double annualFlights;
    private String energyType;
    private double meatMealsPerWeek;

    // --- Getters and Setters for all fields ---
    // (You can generate these automatically in your IDE)

    public double getDrivingKmPerWeek() { return drivingKmPerWeek; }
    public void setDrivingKmPerWeek(double drivingKmPerWeek) { this.drivingKmPerWeek = drivingKmPerWeek; }

    public double getAnnualFlights() { return annualFlights; }
    public void setAnnualFlights(double annualFlights) { this.annualFlights = annualFlights; }

    public String getEnergyType() { return energyType; }
    public void setEnergyType(String energyType) { this.energyType = energyType; }

    public double getMeatMealsPerWeek() { return meatMealsPerWeek; }
    public void setMeatMealsPerWeek(double meatMealsPerWeek) { this.meatMealsPerWeek = meatMealsPerWeek; }
}
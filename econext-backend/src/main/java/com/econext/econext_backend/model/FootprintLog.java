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

    @ManyToOne(fetch = FetchType.LAZY) // Using LAZY fetch is more efficient
    // This is the corrected part. It ensures the foreign key column is named correctly.
    @JoinColumn(name = "user_email", referencedColumnName = "email", nullable = false)
    private User user;

    // --- Getters and Setters ---

    public Long getLogId() {
        return logId;
    }

    public void setLogId(Long logId) {
        this.logId = logId;
    }

    public Double getFootprintValueKg() {
        return footprintValueKg;
    }

    public void setFootprintValueKg(Double footprintValueKg) {
        this.footprintValueKg = footprintValueKg;
    }

    public LocalDate getLogDate() {
        return logDate;
    }

    public void setLogDate(LocalDate logDate) {
        this.logDate = logDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
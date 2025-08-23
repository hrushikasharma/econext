package com.econext.econext_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "app_users") // Explicitly mapping to your 'users' table
public class User {

    @Id // The email will now be the primary key
    @Column(nullable = false, unique = true) // Marking it as required and unique
    private String email;

    @Column(nullable = false)
    private String name; // Changed from 'username' to 'name'

    @Column(nullable = true) // Password can be null for Google users
    private String password;

    private String provider; // To store where the user came from, e.g., "google"

    // --- Getters & Setters ---
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }
}
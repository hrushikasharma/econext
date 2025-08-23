package com.econext.econext_backend.repository;

import com.econext.econext_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    // Check if email already exists
    boolean existsByEmail(String email);
}

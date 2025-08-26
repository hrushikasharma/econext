package com.econext.econext_backend.controller;

import com.econext.econext_backend.dto.CalculationRequest;
import com.econext.econext_backend.Service.FootprintService;
import com.econext.econext_backend.model.FootprintLog; // Import FootprintLog
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/footprint")
public class FootprintController {

    @Autowired
    private FootprintService footprintService;

    @PostMapping("/calculate")
    public ResponseEntity<?> calculateFootprint(@RequestBody CalculationRequest request, @AuthenticationPrincipal OidcUser principal) {
        if (principal == null || principal.getEmail() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
        String email = principal.getEmail();
        try {
            double result = footprintService.calculateAndSaveFootprint(request, email);
            return ResponseEntity.ok(Map.of("carbonFootprint", result));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/latest")
    public ResponseEntity<Map<String, Object>> getLatestFootprint(@AuthenticationPrincipal OidcUser principal) {
        if (principal == null || principal.getEmail() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not authenticated"));
        }

        String email = principal.getEmail();
        Optional<FootprintLog> latestLogOptional = footprintService.getLatestFootprintLog(email);

        // This revised logic explicitly handles both return types to avoid the compiler error.
        if (latestLogOptional.isPresent()) {
            FootprintLog log = latestLogOptional.get();
            return ResponseEntity.ok(Map.of(
                    "latestScore", log.getFootprintValueKg(),
                    "logDate", log.getLogDate().toString()
            ));
        } else {
            return ResponseEntity.ok(Map.of("message", "No score calculated yet."));
        }
    }
}

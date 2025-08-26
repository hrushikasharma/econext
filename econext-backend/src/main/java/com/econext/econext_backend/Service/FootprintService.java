package com.econext.econext_backend.Service;

import com.econext.econext_backend.dto.CalculationRequest;
import com.econext.econext_backend.model.FootprintLog;
import com.econext.econext_backend.model.User;
import com.econext.econext_backend.repository.FootprintLogRepository;
import com.econext.econext_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Optional;

@Service
public class FootprintService {

    @Autowired
    private FootprintLogRepository footprintLogRepository;

    @Autowired
    private UserRepository userRepository;

    // This method now returns the entire log object
    public Optional<FootprintLog> getLatestFootprintLog(String userEmail) {
        return footprintLogRepository.findTopByUser_EmailOrderByLogDateDesc(userEmail);
    }

    public double calculateAndSaveFootprint(CalculationRequest request, String userEmail) {

        Optional<FootprintLog> latestLogOptional = footprintLogRepository.findTopByUser_EmailOrderByLogDateDesc(userEmail);

        if (latestLogOptional.isPresent()) {
            FootprintLog latestLog = latestLogOptional.get();
            LocalDate lastLogDate = latestLog.getLogDate();
            LocalDate oneWeekAgo = LocalDate.now().minusDays(7);

            if (lastLogDate.isAfter(oneWeekAgo)) {
                throw new IllegalStateException("You can only calculate your footprint once a week.");
            }
        }

        double footprint = (request.getDrivingKmPerWeek() * 52 * 0.21) +
                (request.getAnnualFlights() * 250) +
                (request.getEnergyType().equals("renewable") ? 0 : 1500) +
                (request.getMeatMealsPerWeek() * 52 * 2.5);

        double footprintInTons = footprint / 1000;

        User currentUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found: " + userEmail));

        FootprintLog newLog = new FootprintLog();
        newLog.setUser(currentUser);
        newLog.setFootprintValueKg(footprintInTons);
        newLog.setLogDate(LocalDate.now());

        footprintLogRepository.save(newLog);

        return footprintInTons;
    }
}

package com.econext.econext_backend.Service;

import com.econext.econext_backend.dto.CalculationRequest;
import com.econext.econext_backend.model.FootprintLog;
import com.econext.econext_backend.model.User;
import com.econext.econext_backend.repository.FootprintLogRepository;
import com.econext.econext_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value; // Import @Value
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Optional;

@Service
public class FootprintService {

    @Autowired
    private FootprintLogRepository footprintLogRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${GEMINI_API_KEY}")
    private String apiKey;

    public Optional<FootprintLog> getLatestFootprintLog(String userEmail) {
        return footprintLogRepository.findTopByUser_EmailOrderByLogDateDesc(userEmail);
    }

    public double calculateAndSaveFootprint(CalculationRequest request, String userEmail) {
        // ... (calculation and saving logic remains the same) ...
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
        newLog.setDrivingKmPerWeek(request.getDrivingKmPerWeek());
        newLog.setAnnualFlights(request.getAnnualFlights());
        newLog.setEnergyType(request.getEnergyType());
        newLog.setMeatMealsPerWeek(request.getMeatMealsPerWeek());

        footprintLogRepository.save(newLog);

        return footprintInTons;
    }

    public String getPersonalizedTips(String userEmail) {
        FootprintLog latestLog = getLatestFootprintLog(userEmail)
                .orElseThrow(() -> new IllegalStateException("No calculation data found for this user."));

        String prompt = String.format(
                "You are a helpful sustainability coach for a user in Indore, India. " +
                        "Based on their latest weekly data, provide 3 actionable, concise, and hyper-local tips to reduce their carbon footprint. " +
                        "Focus on their highest impact areas. Be encouraging and use bullet points.\\n\\n" +
                        "User's Data:\\n" +
                        "- Kilometers driven per week: %.1f km\\n" +
                        "- Flights per year: %.1f\\n" +
                        "- Meat-based meals per week: %.1f\\n" +
                        "- Home energy type: %s\\n\\n" +
                        "Prioritize tips for the highest values. For example, if meat meals are high, suggest specific local vegetarian options in Indore.",
                latestLog.getDrivingKmPerWeek(),
                latestLog.getAnnualFlights(),
                latestLog.getMeatMealsPerWeek(),
                latestLog.getEnergyType()
        );

        try {
            String model = "gemini-2.5-flash-preview-05-20";
            String url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + this.apiKey; // Use the injected key

            String jsonPayload = "{\"contents\":[{\"parts\":[{\"text\": \"" + prompt.replace("\"", "\\\"") + "\"}]}]}";

            java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();
            java.net.http.HttpRequest request = java.net.http.HttpRequest.newBuilder()
                    .uri(java.net.URI.create(url))
                    .header("Content-Type", "application/json")
                    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(jsonPayload))
                    .build();

            java.net.http.HttpResponse<String> response = client.send(request, java.net.http.HttpResponse.BodyHandlers.ofString());

            String responseBody = response.body();
            int textStartIndex = responseBody.indexOf("\"text\": \"") + 9;
            int textEndIndex = responseBody.indexOf("\"", textStartIndex);
            String aiResponse = responseBody.substring(textStartIndex, textEndIndex);

            return aiResponse.replace("\\n", "\n");

        } catch (Exception e) {
            e.printStackTrace();
            return "Sorry, I couldn't generate tips at this moment. Please try again later.";
        }
    }
}

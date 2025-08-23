package com.econext.econext_backend.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        // Extract the user's name from the Google profile attributes
        String name = oauthUser.getAttribute("name");

        // This is the URL of your React frontend application
        String targetUrl = "http://localhost:5173/";

        // Build the final URL with the name as a query parameter
        String redirectUrl = UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("name", name)
                .build().toUriString();

        // Redirect the user
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
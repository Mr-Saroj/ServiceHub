package in.sp.main.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    @PostConstruct
    public void init() {
        System.out.println("🔥 FRONTEND_URL = " + frontendUrl);
    }

    @Bean
    public CorsConfiguration corsConfiguration() {
        CorsConfiguration config = new CorsConfiguration();

        // ✅ IMPORTANT
        config.setAllowCredentials(true);

        // ✅ Handle null ENV safely
        if (frontendUrl != null && !frontendUrl.isEmpty()) {
            config.setAllowedOrigins(List.of(frontendUrl));
        } else {
            // ⚠️ fallback (for debugging only)
            config.setAllowedOrigins(List.of("http://localhost:3000"));
        }

        config.setAllowedHeaders(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        return config;
    }
}
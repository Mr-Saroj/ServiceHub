package in.sp.main.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import in.sp.main.security.JwtFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // Disable CSRF for API usage (Postman, frontend)
            .csrf(csrf -> csrf.disable())

            // Enable CORS with configuration
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // Stateless session; we rely on JWT
            .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // Authorization rules
            .authorizeHttpRequests(auth -> auth

                    // Public endpoints (login, register, categories, uploads)
                    .requestMatchers(
                            "/api/auth/**",
                            "/api/categories",
                            "/uploads/**"
                    ).permitAll()

                    // Customer APIs (requires CUSTOMER role)
                    .requestMatchers("/api/customer/**")
                    .hasRole("CUSTOMER")

                    // Technician APIs (requires TECHNICIAN role)
                    .requestMatchers("/api/technician/**")
                    .hasRole("TECHNICIAN")
                 // ✅ ADD THIS (IMPORTANT)
                    .requestMatchers("/api/invoice/**")
                    .hasRole("TECHNICIAN")

                    // Any other endpoint requires authentication
                    .anyRequest().authenticated()
            )

            // Add JWT filter before the default authentication filter
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // AuthenticationManager bean (needed if you have JWT login)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // CORS configuration
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // React frontend
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
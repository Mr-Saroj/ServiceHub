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

import in.sp.main.security.JwtFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // ❌ Disable CSRF
            .csrf(csrf -> csrf.disable())

            // ✅ Enable CORS (will automatically use CorsConfig.java)
            .cors(cors -> {})

            // ✅ Stateless session (JWT)
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // ✅ Authorization rules
            .authorizeHttpRequests(auth -> auth

                // Public endpoints
                .requestMatchers(
                        "/api/auth/**",
                        "/api/categories/**",
                        "/uploads/**"
                ).permitAll()

                // Customer APIs
                .requestMatchers("/api/customer/**")
                .hasRole("CUSTOMER")

                // User APIs
                .requestMatchers("/api/user/**")
                .authenticated()

                // Technician APIs
                .requestMatchers("/api/technician/**")
                .hasRole("TECHNICIAN")

                .requestMatchers("/api/invoice/**")
                .hasRole("TECHNICIAN")

                // Others
                .anyRequest().authenticated()
            )

            // ✅ JWT Filter
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // ✅ Authentication Manager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
package in.sp.main.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import in.sp.main.security.JwtFilter;

@EnableMethodSecurity(prePostEnabled = true)
@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    // ✅ Inject environment variable
    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // ✅ Disable CSRF
            .csrf(csrf -> csrf.disable())

            // ✅ Enable CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // ✅ Stateless session (JWT)
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // ✅ Authorization rules
            .authorizeHttpRequests(auth -> auth

                    // ✅ VERY IMPORTANT: allow preflight request
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                    // Public endpoints
                    .requestMatchers(
                            "/api/auth/**",
                            "/api/categories",
                            "/uploads/**"
                    ).permitAll()

                    // Customer APIs
                    .requestMatchers("/api/customer/**").hasRole("CUSTOMER")

                    // Payment API
                    .requestMatchers("/api/invoice/pay/**").hasRole("CUSTOMER")

                    // Technician APIs
                    .requestMatchers("/api/technician/**").hasRole("TECHNICIAN")

                    // Invoice APIs
                    .requestMatchers("/api/invoice/**").hasRole("TECHNICIAN")

                    // User profile
                    .requestMatchers("/api/user/**").authenticated()

                    // Others
                    .anyRequest().authenticated()
            )

            // ✅ JWT filter
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // ✅ AuthenticationManager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // ✅ CORS Configuration using ENV
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowCredentials(true);

        // ✅ Use Render ENV variable
        configuration.setAllowedOrigins(List.of(frontendUrl));

        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of("*"));

        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
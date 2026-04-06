package in.sp.main.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        // Debug: check if header is received
        System.out.println("Authorization header: " + header);

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);

            try {
                // Extract email and role from JWT
                String email = jwtUtil.extractEmail(token);
                String role = jwtUtil.extractRole(token);

                // Normalize role (remove ROLE_ prefix if present, uppercase)
                role = role.trim().toUpperCase().replace("ROLE_", "");

                System.out.println("JWT email: " + email + ", role: " + role);

                // Set authentication only if not already set
                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                    // ✅ Add ROLE_ prefix for Spring Security
                    SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(email, null, List.of(authority));

                    SecurityContextHolder.getContext().setAuthentication(auth);

                    // Debug: verify authorities
                    System.out.println("Authorities set: " +
                            SecurityContextHolder.getContext().getAuthentication().getAuthorities());
                }

            } catch (Exception e) {
                // Invalid token
                System.out.println("Invalid JWT Token: " + e.getMessage());
            }
        } else {
            System.out.println("No Bearer token found in header.");
        }

        // Continue filter chain
        filterChain.doFilter(request, response);
    }
}
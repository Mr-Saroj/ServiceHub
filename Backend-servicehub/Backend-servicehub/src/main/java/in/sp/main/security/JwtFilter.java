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
        System.out.println("Authorization header: " + header); // Debug: see if header is received

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);

            try {
                String email = jwtUtil.extractEmail(token);
                String role = jwtUtil.extractRole(token);

                // Normalize role: trim, uppercase, remove ROLE_ if present
                role = role.trim().toUpperCase().replace("ROLE_", "");

                System.out.println("JWT email: " + email + ", role: " + role);

                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(email, null, List.of(authority));

                    SecurityContextHolder.getContext().setAuthentication(auth);

                    System.out.println("Authorities set: " + SecurityContextHolder.getContext().getAuthentication().getAuthorities());
                }

            } catch (Exception e) {
                System.out.println("Invalid JWT Token: " + e.getMessage());
            }
        } else {
            System.out.println("No Bearer token found in header.");
        }

        filterChain.doFilter(request, response);
    }
}
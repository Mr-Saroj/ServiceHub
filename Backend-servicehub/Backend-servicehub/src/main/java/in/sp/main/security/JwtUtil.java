package in.sp.main.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Read secret from environment variable, fallback to a default (DO NOT use default in production!)
    private final String SECRET = System.getenv().getOrDefault("JWT_SECRET", "default-secret-key-should-be-changed");
    
    // Read expiration from environment variable in milliseconds, fallback to 1 day
    private final long EXPIRATION;
    
    private final Key key;

    public JwtUtil() {
        long exp;
        try {
            exp = Long.parseLong(System.getenv().getOrDefault("JWT_EXPIRATION", "86400000")); // 1 day default
        } catch (NumberFormatException e) {
            exp = 86400000; // fallback to 1 day
        }
        this.EXPIRATION = exp;
        this.key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }

    // Generate JWT Token
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key)
                .compact();
    }

    // Extract Email
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Extract Role
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    // Extract All Claims
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Validate Token
    public boolean validateToken(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.out.println("Invalid JWT Token: " + e.getMessage());
            return false;
        }
    }
}
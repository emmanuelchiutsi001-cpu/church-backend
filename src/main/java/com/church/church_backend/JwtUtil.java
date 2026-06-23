package com.church.church_backend;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JwtUtil {

    // 0.12.5 securely generates keys directly via the Jwts.SIG helper
    private final SecretKey secretKey = Jwts.SIG.HS256.key().build();

    // Token expiration time: 24 Hours (in milliseconds)
    private final long JWT_EXPIRATION = 1000 * 60 * 60 * 24;

    // 1. Extract username from the token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // 2. Extract the specific user role from the token
    public String extractRole(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("role", String.class);
    }

    // 3. Extract expiration date
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Modern 0.12.x way to parse claims using verifyWith() and getPayload()
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey) // Replaces setSigningKey()
                .build()
                .parseSignedClaims(token) // Replaces parseClaimsJws()
                .getPayload(); // Replaces getBody()
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // 4. Generate a brand new token when an approved Admin logs in
    public String generateToken(String username, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        
        // Modern 0.12.x fluent builder API
        return Jwts.builder()
                .claims(claims) // Replaces setClaims()
                .subject(username) // Replaces setSubject()
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION))
                .signWith(secretKey) // Replaces signWith(key, Algorithm)
                .compact();
    }

    // 5. Validate if the token matches the user and isn't expired
    public Boolean validateToken(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }
}
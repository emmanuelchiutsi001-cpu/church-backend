package com.church.church_backend;

import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtRequestFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Intercept the incoming Authorization header
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;
        String role = null;

        // 2. Safely extract the token string if the header standard is met
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(jwt);
                role = jwtUtil.extractRole(jwt);
            } catch (Exception e) {
                logger.error("JWT validation or parsing failed: " + e.getMessage());
            }
        }

        // 3. Authenticate the request thread if token is valid and session isn't established yet
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            if (jwtUtil.validateToken(jwt, username)) {
                
                // Convert the role string (e.g., "ROLE_ADMIN") into a Spring Authority object
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);
                
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        username, null, Collections.singletonList(authority));
                
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // 4. Pass the authenticated user credentials into Spring's Security context
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }

        // 5. Hand the request down the chain to the controller
        filterChain.doFilter(request, response);
    }
}

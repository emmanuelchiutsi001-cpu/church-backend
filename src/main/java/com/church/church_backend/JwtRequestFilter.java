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
    private final UserRepository userRepository;
    private final ParishRepository parishRepository;

    public JwtRequestFilter(JwtUtil jwtUtil, UserRepository userRepository,
                            ParishRepository parishRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.parishRepository = parishRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;
        String tokenRole = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(jwt);
                tokenRole = jwtUtil.extractRole(jwt);
            } catch (Exception e) {
                logger.error("JWT validation or parsing failed: " + e.getMessage());
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (jwtUtil.validateToken(jwt, username)) {
                // Always check current database state: suspended/unapproved accounts cannot
                // continue using an already-issued JWT.
                AppUser currentUser = userRepository.findByUsername(username).orElse(null);

                boolean isSystemAdmin = currentUser != null
                        && "ROLE_SYSTEM_ADMIN".equals(currentUser.getRole());
                boolean hasValidParish = currentUser != null
                        && "ROLE_ADMIN".equals(currentUser.getRole())
                        && currentUser.getParishId() != null
                        && parishRepository.existsById(currentUser.getParishId());

                // Regular admins must have a real parish assignment on every request.
                // This invalidates already-issued JWTs for previously approved but
                // unassigned admins, and for admins whose parish has been deleted.
                if (currentUser != null
                        && currentUser.isApproved()
                        && !currentUser.isSuspended()
                        && tokenRole != null
                        && tokenRole.equals(currentUser.getRole())
                        && (isSystemAdmin || hasValidParish)) {

                    SimpleGrantedAuthority authority =
                            new SimpleGrantedAuthority(currentUser.getRole());

                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(
                                    currentUser.getUsername(), null,
                                    Collections.singletonList(authority));

                    authenticationToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    logger.info("Authenticated user '" + username + "' with current database authority.");
                } else {
                    logger.warn("Rejected JWT for missing, unapproved, suspended, role-mismatched, or parish-unassigned account: "
                            + username);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}

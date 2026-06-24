package com.church.church_backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;

    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF since JWTs are stateless tokens
            .authorizeHttpRequests(auth -> auth
                // 1. Completely public read-only paths for anyone browsing via JavaScript
                .requestMatchers(HttpMethod.GET, "/api/members", "/api/events").permitAll()
                
                // 2. Open login & registration options
                .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
                
                // 3. Only System Admins can pull pending lists or hit approval switches
                .requestMatchers("/api/auth/pending", "/api/auth/approve/**").hasRole("SYSTEM_ADMIN")
                
                // 4. Modifying church records, writing announcements, or submitting attendance requires valid admin signatures
                .requestMatchers(HttpMethod.POST, "/api/members/**", "/api/events/**").hasAnyRole("ADMIN", "SYSTEM_ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/events/**").hasAnyRole("ADMIN", "SYSTEM_ADMIN")
                .requestMatchers("/api/attendance/**").hasAnyRole("ADMIN", "SYSTEM_ADMIN")
                
                // Every other request inside the app requires general authentication
                .anyRequest().authenticated()
            );

        // Intercept all incoming traffic with our JWT guard before Spring's basic login filters run
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
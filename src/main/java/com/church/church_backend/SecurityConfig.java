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

    // Injecting the clean filter we just rewrote
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
                // 1. Anyone can browse member directories (Read-only public access)
                .requestMatchers(HttpMethod.GET, "/api/members").permitAll()
                
                // 2. Open route for new admins to request a profile
                .requestMatchers("/api/auth/register").permitAll()
                
                // 3. Only System Admins can pull pending lists or hit the approve switches
                .requestMatchers("/api/auth/pending", "/api/auth/approve/**").hasRole("SYSTEM_ADMIN")
                
                // 4. Any modification/upload of data requires a valid ADMIN or SYSTEM_ADMIN role
                .requestMatchers(HttpMethod.POST, "/api/members/**").hasAnyRole("ADMIN", "SYSTEM_ADMIN")
                
                // Every other request inside the app requires general authentication
                .anyRequest().authenticated()
            );

        // Crucial: Intercept all incoming traffic with our JWT guard before Spring's basic login filters run
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
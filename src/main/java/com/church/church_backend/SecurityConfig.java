package com.church.church_backend;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 🌟 1. Enable CORS using our custom configuration bean below
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // 2. Disable CSRF since JWTs are stateless tokens
            .csrf(csrf -> csrf.disable()) 

            .authorizeHttpRequests(auth -> auth
                // Explicitly allow preflight OPTIONS requests for all endpoints
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Completely public read-only paths
                .requestMatchers(HttpMethod.GET, "/api/members", "/api/events").permitAll()

                // 📸 GALLERY ACCESS: Public/Members can fetch image list and render files
                .requestMatchers(HttpMethod.GET, "/api/gallery", "/api/gallery/files/**").permitAll()

                // Open login & registration options
                .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()

                // Custom Header/Role checking logic for files
                .requestMatchers("/api/files/**").permitAll() 

                // Only System Admins can pull pending lists or hit approval switches
                .requestMatchers("/api/auth/pending", "/api/auth/approve/**").hasAuthority("ROLE_SYSTEM_ADMIN")

                // Modifying church records or submitting attendance requires valid admin signatures
                .requestMatchers(HttpMethod.POST, "/api/members/**", "/api/events/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_SYSTEM_ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/events/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_SYSTEM_ADMIN")
                .requestMatchers("/api/attendance/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_SYSTEM_ADMIN")

                // 📸 GALLERY MANAGEMENT: Explicitly check full string authorities to prevent double-prefix issues
                .requestMatchers(HttpMethod.POST, "/api/gallery/upload").hasAnyAuthority("ROLE_ADMIN", "ROLE_SYSTEM_ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/gallery/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_SYSTEM_ADMIN")

                // Every other request inside the app requires general authentication
                .anyRequest().authenticated()
            );

        // Intercept all incoming traffic with our JWT guard before Spring's basic login filters run
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Configures global CORS rules for Spring Security
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Allow requests from your React frontend origin (Vite default port 5173)
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));

        // Allow standard HTTP methods
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));

        // Allow headers sent by Axios (including Authorization header)
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With", "Accept", "Origin"));

        // Allow credentials (e.g., cookies or auth headers)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
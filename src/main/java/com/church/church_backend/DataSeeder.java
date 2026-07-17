package com.church.church_backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // Inject values safely from application.properties
    @Value("${app.sysadmin.username}")
    private String adminUsername;

    @Value("${app.sysadmin.password}")
    private String adminPassword;

    public DataSeeder(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if our master system admin account already exists using injected property
        if (userRepository.findByUsername(adminUsername).isEmpty()) {
            
            AppUser systemAdmin = new AppUser();
            systemAdmin.setUsername(adminUsername); 
            
            // Securely hash the injected password
            systemAdmin.setPassword(passwordEncoder.encode(adminPassword)); 
            
            systemAdmin.setRole("ROLE_SYSTEM_ADMIN"); // Master clearance
            systemAdmin.setApproved(true);           // Pre-approved
            
            userRepository.save(systemAdmin);
            
            System.out.println(">> Database Initialization: Secure Master System Admin account successfully seeded.");
        }
    }
}
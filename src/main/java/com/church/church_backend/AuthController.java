package com.church.church_backend;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody AppUser registrationRequest) {
        authService.registerAdminRequest(registrationRequest.getUsername(), registrationRequest.getPassword());
        return "Admin registration request submitted successfully! Waiting for System Admin approval.";
    }

    // New Endpoint: Process login and return JWT Response object
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            String token = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
            return ResponseEntity.ok(new LoginResponse(token));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/pending")
    public List<AppUser> viewPending() {
        return authService.getPendingApprovals();
    }

    @PutMapping("/approve/{id}")
    public String approveUser(@PathVariable Long id) {
        authService.approveAdmin(id);
        return "User account has been approved and activated!";
    }
}
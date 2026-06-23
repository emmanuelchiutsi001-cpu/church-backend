package com.church.church_backend;

import java.util.List;

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

    // Admins use this to request an account
    @PostMapping("/register")
    public String register(@RequestBody AppUser registrationRequest) {
        authService.registerAdminRequest(registrationRequest.getUsername(), registrationRequest.getPassword());
        return "Admin registration request submitted successfully! Waiting for System Admin approval.";
    }

    // System Admins use this to see pending requests
    @GetMapping("/pending")
    public List<AppUser> viewPending() {
        return authService.getPendingApprovals();
    }

    // System Admins use this to approve an account by its ID
    @PutMapping("/approve/{id}")
    public String approveUser(@PathVariable Long id) {
        authService.approveAdmin(id);
        return "User account has been approved and activated!";
    }
}
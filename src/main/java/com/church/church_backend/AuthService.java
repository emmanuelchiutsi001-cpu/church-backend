package com.church.church_backend;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Step 1: Request an Admin Account (Saves as UNAPPROVED)
    public AppUser registerAdminRequest(String username, String password) {
        Optional<AppUser> existing = userRepository.findByUsername(username);
        if (existing.isPresent()) {
            throw new RuntimeException("Username already taken!");
        }
        
        // Hash the password for safety, assign regular admin role, set approved to false
        String hashedPassword = passwordEncoder.encode(password);
        AppUser newAdmin = new AppUser(username, hashedPassword, "ROLE_ADMIN", false);
        return userRepository.save(newAdmin);
    }

    // Step 2: System Admin views who is waiting for approval
    public List<AppUser> getPendingApprovals() {
        return userRepository.findByApprovedFalse();
    }

    // Step 3: System Admin approves the request
    public AppUser approveAdmin(Long userId) {
        AppUser user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));
        user.setApproved(true);
        return userRepository.save(user);
    }
}
package com.church.church_backend;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil; // Inject our modern JwtUtil
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public AppUser registerAdminRequest(String username, String password) {
        Optional<AppUser> existing = userRepository.findByUsername(username);
        if (existing.isPresent()) {
            throw new RuntimeException("Username already taken!");
        }
        String hashedPassword = passwordEncoder.encode(password);
        AppUser newAdmin = new AppUser(username, hashedPassword, "ROLE_ADMIN", false);
        return userRepository.save(newAdmin);
    }

    // New Method: Verify credentials and issue token
    public String login(String username, String password) {
        AppUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid username or password!"));

        // 1. Check if the password matches the BCrypt hash
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid username or password!");
        }

        // 2. Enforcement: Block unapproved admin login attempts
        if (!user.isApproved()) {
            throw new RuntimeException("Your account is pending approval from the System Admin.");
        }

        // 3. Generate and return the secure token embedded with their role
        return jwtUtil.generateToken(user.getUsername(), user.getRole());
    }

    public List<AppUser> getPendingApprovals() {
        return userRepository.findByApprovedFalse();
    }

    public AppUser approveAdmin(Long userId) {
        AppUser user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));
        user.setApproved(true);
        return userRepository.save(user);
    }
}
package com.church.church_backend;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Account-management endpoints reserved for the system administrator.
 * SecurityConfig restricts every route under /api/system-admin/**.
 */
@RestController
@RequestMapping("/api/system-admin/admins")
public class AdminManagementController {

    private final UserRepository userRepository;
    private final SubDivisionRepository subDivisionRepository;

    public AdminManagementController(
            UserRepository userRepository,
            SubDivisionRepository subDivisionRepository) {
        this.userRepository = userRepository;
        this.subDivisionRepository = subDivisionRepository;
    }

    /** Returns regular-admin accounts without exposing password hashes. */
    @GetMapping
    public List<AdminSummary> listRegularAdmins() {
        return userRepository.findAll().stream()
                .filter(user -> "ROLE_ADMIN".equals(user.getRole()))
                .map(user -> new AdminSummary(
                        user.getId(),
                        user.getUsername(),
                        user.isApproved(),
                        user.isSuspended()))
                .collect(Collectors.toList());
    }

    /** Suspends a regular admin and immediately blocks their existing JWT. */
    @PutMapping("/{id}/suspend")
    public ResponseEntity<?> suspendAdmin(@PathVariable Long id) {
        AppUser user = findRegularAdmin(id);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Regular admin account not found."));
        }

        user.setSuspended(true);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of(
                "message", "Admin account suspended successfully.",
                "id", user.getId(),
                "username", user.getUsername(),
                "suspended", true));
    }

    /** Re-enables a previously suspended regular admin. Approval is still required to log in. */
    @PutMapping("/{id}/reactivate")
    public ResponseEntity<?> reactivateAdmin(@PathVariable Long id) {
        AppUser user = findRegularAdmin(id);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Regular admin account not found."));
        }

        user.setSuspended(false);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of(
                "message", "Admin account reactivated successfully.",
                "id", user.getId(),
                "username", user.getUsername(),
                "suspended", false));
    }

    /** Deletes only regular admins; does not silently delete subdivision data. */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
        AppUser user = findRegularAdmin(id);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Regular admin account not found."));
        }

        if (subDivisionRepository.existsByAdmin(user)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                    "message", "This admin manages a subdivision. Reassign or remove that subdivision before deleting the account."));
        }

        userRepository.delete(user);
        return ResponseEntity.ok(Map.of("message", "Admin account deleted successfully."));
    }

    private AppUser findRegularAdmin(Long id) {
        AppUser user = userRepository.findById(id).orElse(null);
        if (user == null || !"ROLE_ADMIN".equals(user.getRole())) {
            // Explicitly refuses system-admin accounts and any unexpected role.
            return null;
        }
        return user;
    }

    public static class AdminSummary {
        private final Long id;
        private final String username;
        private final boolean approved;
        private final boolean suspended;

        public AdminSummary(Long id, String username, boolean approved, boolean suspended) {
            this.id = id;
            this.username = username;
            this.approved = approved;
            this.suspended = suspended;
        }

        public Long getId() { return id; }
        public String getUsername() { return username; }
        public boolean isApproved() { return approved; }
        public boolean isSuspended() { return suspended; }
    }
}

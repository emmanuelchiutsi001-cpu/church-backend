package com.church.church_backend;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // ROLE_SYSTEM_ADMIN or ROLE_ADMIN

    @Column(nullable = false)
    private boolean approved = false;

    // Existing system-admin accounts may remain unassigned. Every regular admin must have a parish.
    // Unique ensures a parish can be assigned to at most one regular-admin account.
    @Column(name = "parish_id", unique = true)
    private Long parishId;

    @Column
    private Boolean suspended = false;

    public AppUser() {}

    public AppUser(String username, String password, String role, boolean approved) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.approved = approved;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public boolean isApproved() { return approved; }
    public void setApproved(boolean approved) { this.approved = approved; }

    public Long getParishId() { return parishId; }
    public void setParishId(Long parishId) { this.parishId = parishId; }

    public boolean isSuspended() { return Boolean.TRUE.equals(suspended); }
    public void setSuspended(boolean suspended) { this.suspended = suspended; }
}

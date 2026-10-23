package com.church.church_backend;

public class LoginResponse {
    private String token;
    private String username;
    private String role;
    private Long parishId;
    private String parishName;

    public LoginResponse(String token, String username, String role, Long parishId, String parishName) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.parishId = parishId;
        this.parishName = parishName;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Long getParishId() { return parishId; }
    public void setParishId(Long parishId) { this.parishId = parishId; }

    public String getParishName() { return parishName; }
    public void setParishName(String parishName) { this.parishName = parishName; }
}

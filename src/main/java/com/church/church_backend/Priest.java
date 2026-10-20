package com.church.church_backend;

import jakarta.persistence.*;

@Entity
@Table(name = "priests")
public class Priest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "title")
    private String title;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(name = "role")
    private String role;

    @Column(name = "deanery_id")
    private Long deaneryId;

    @Column(name = "parish_id")
    private Long parishId;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "bio")
    private String bio;

    public Priest() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public Long getDeaneryId() { return deaneryId; }
    public void setDeaneryId(Long deaneryId) { this.deaneryId = deaneryId; }
    public Long getParishId() { return parishId; }
    public void setParishId(Long parishId) { this.parishId = parishId; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
}

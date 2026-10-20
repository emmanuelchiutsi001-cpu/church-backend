package com.church.church_backend;

import jakarta.persistence.*;

@Entity
@Table(name = "deanery_events")
public class DeaneryEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "deanery_id")
    private Long deaneryId;

    @Column(name = "title")
    private String title;

    @Column(name = "date")
    private String date;

    @Column(name = "location")
    private String location;

    @Column(name = "description")
    private String description;

    public DeaneryEvent() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getDeaneryId() { return deaneryId; }
    public void setDeaneryId(Long deaneryId) { this.deaneryId = deaneryId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}

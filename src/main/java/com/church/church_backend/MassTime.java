package com.church.church_backend;

import jakarta.persistence.*;

@Entity
@Table(name = "mass_times")
public class MassTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "parish_id")
    private Long parishId;

    @Column(name = "day")
    private String day;

    @Column(name = "time")
    private String time;

    @Column(name = "language")
    private String language;

    @Column(name = "type")
    private String type;

    public MassTime() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getParishId() { return parishId; }
    public void setParishId(Long parishId) { this.parishId = parishId; }
    public String getDay() { return day; }
    public void setDay(String day) { this.day = day; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}

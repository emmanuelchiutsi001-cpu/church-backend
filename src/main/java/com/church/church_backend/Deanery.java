package com.church.church_backend;

import jakarta.persistence.*;

@Entity
@Table(name = "deaneries")
public class Deanery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "slug", nullable = false, length = 255)
    private String slug;

    @Column(name = "description")
    private String description;

    @Column(name = "territory")
    private String territory;

    @Column(name = "dean_id")
    private Long deanId;

    @Column(name = "vice_dean_id")
    private Long viceDeanId;

    @Column(name = "archdiocese_id")
    private Long archdioceseId = 1L;

    @Column(name = "status", nullable = false)
    private String status = "ACTIVE";

    public Deanery() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getTerritory() { return territory; }
    public void setTerritory(String territory) { this.territory = territory; }
    public Long getDeanId() { return deanId; }
    public void setDeanId(Long deanId) { this.deanId = deanId; }
    public Long getViceDeanId() { return viceDeanId; }
    public void setViceDeanId(Long viceDeanId) { this.viceDeanId = viceDeanId; }
    public Long getArchdioceseId() { return archdioceseId; }
    public void setArchdioceseId(Long archdioceseId) { this.archdioceseId = archdioceseId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

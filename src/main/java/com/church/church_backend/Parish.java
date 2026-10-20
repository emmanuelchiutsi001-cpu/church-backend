package com.church.church_backend;

import jakarta.persistence.*;

@Entity
@Table(name = "parishes")
public class Parish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "deanery_id")
    private Long deaneryId;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "slug", nullable = false, length = 255)
    private String slug;

    @Column(name = "parish_priest_id")
    private Long parishPriestId;

    @Column(name = "assistant_priest_id")
    private Long assistantPriestId;

    @Column(name = "address")
    private String address;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "year_established")
    private Integer yearEstablished;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "facebook_page_url")
    private String facebookPageUrl;

    @Column(name = "catholic_count")
    private Long catholicCount = 0L;

    public Parish() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getDeaneryId() { return deaneryId; }
    public void setDeaneryId(Long deaneryId) { this.deaneryId = deaneryId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public Long getParishPriestId() { return parishPriestId; }
    public void setParishPriestId(Long parishPriestId) { this.parishPriestId = parishPriestId; }
    public Long getAssistantPriestId() { return assistantPriestId; }
    public void setAssistantPriestId(Long assistantPriestId) { this.assistantPriestId = assistantPriestId; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Integer getYearEstablished() { return yearEstablished; }
    public void setYearEstablished(Integer yearEstablished) { this.yearEstablished = yearEstablished; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getFacebookPageUrl() { return facebookPageUrl; }
    public void setFacebookPageUrl(String facebookPageUrl) { this.facebookPageUrl = facebookPageUrl; }
    public Long getCatholicCount() { return catholicCount; }
    public void setCatholicCount(Long catholicCount) { this.catholicCount = catholicCount; }
}

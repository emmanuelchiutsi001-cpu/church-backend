package com.church.church_backend;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "news_articles")
public class NewsArticle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 5000)
    private String content;

    private String author;

    // ── Existing: PDF/DOC attachment ────────────────
    private String documentName;
    private String documentUrl;
    private String fileType;

    // 🆕 Hero image for the news card
    private String imageName;
    private String imageUrl;

    private LocalDateTime publishedAt;

    public NewsArticle() {}

    // Existing constructor (used for document uploads)
    public NewsArticle(String title, String content, String author,
                       String documentName, String documentUrl, String fileType) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.documentName = documentName;
        this.documentUrl = documentUrl;
        this.fileType = fileType;
    }

    @PrePersist
    protected void onCreate() {
        this.publishedAt = LocalDateTime.now();
    }

    // ── Getters & setters ───────────────────────────
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getDocumentName() { return documentName; }
    public void setDocumentName(String documentName) { this.documentName = documentName; }

    public String getDocumentUrl() { return documentUrl; }
    public void setDocumentUrl(String documentUrl) { this.documentUrl = documentUrl; }

    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }

    public String getImageName() { return imageName; }
    public void setImageName(String imageName) { this.imageName = imageName; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public LocalDateTime getPublishedAt() { return publishedAt; }
    public void setPublishedAt(LocalDateTime publishedAt) { this.publishedAt = publishedAt; }
}
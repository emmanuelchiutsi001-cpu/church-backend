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

    private String documentName;

    private String documentUrl;

    private String fileType; // PDF, DOC, DOCX, etc.

    private LocalDateTime publishedAt;

    public NewsArticle() {}

    public NewsArticle(String title, String content, String author, String documentName, String documentUrl, String fileType) {
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

    // Getters and Setters
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

    public LocalDateTime getPublishedAt() { return publishedAt; }
    public void setPublishedAt(LocalDateTime publishedAt) { this.publishedAt = publishedAt; }
}
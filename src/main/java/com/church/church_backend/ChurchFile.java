package com.church.church_backend;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "church_files")
public class ChurchFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String fileType; 
    private String filePath; 
    private LocalDateTime uploadedAt;

    public ChurchFile() {}

    public ChurchFile(String fileName, String fileType, String filePath, LocalDateTime uploadedAt) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.filePath = filePath;
        this.uploadedAt = uploadedAt;
    }
    private String category; // e.g., "Announcement", "Bulletin", "Sermon", "SecurityLog"

// Update your main constructor to include it:
    public ChurchFile(String fileName, String fileType, String filePath, String category, LocalDateTime uploadedAt) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.filePath = filePath;
        this.category = category;
        this.uploadedAt = uploadedAt;
}

    // Add Getter and Setter
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Long getId() { return id; }
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }
    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }
    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
}
package com.church.church_backend;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class NewsService {

    private final NewsRepository newsRepository;
    private final Path fileStorageLocation = Paths.get("uploads/documents").toAbsolutePath().normalize();

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not create storage directory for news documents.", e);
        }
    }

    public List<NewsArticle> getAllNews() {
        return newsRepository.findAllByOrderByPublishedAtDesc();
    }

    public NewsArticle getNewsById(Long id) {
        return newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News article not found with id: " + id));
    }

    // Save JSON text-only article
    public NewsArticle createTextArticle(NewsArticle article) {
        return newsRepository.save(article);
    }

    // Save article with uploaded PDF or Word document
    public NewsArticle createDocumentArticle(String title, String content, String author, MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        
        if (originalFileName == null || !isValidDocumentExtension(originalFileName)) {
            throw new IllegalArgumentException("Invalid file type! Only PDF, DOC, and DOCX files are allowed.");
        }

        try {
            String cleanFileName = originalFileName.replaceAll("[^a-zA-Z0-9\\.\\-_]", "_");
            String uniqueFileName = UUID.randomUUID().toString() + "_" + cleanFileName;

            Path targetLocation = this.fileStorageLocation.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String documentUrl = "/api/news/files/" + uniqueFileName;
            String fileType = getFileExtension(originalFileName).toUpperCase();

            NewsArticle article = new NewsArticle(title, content, author, uniqueFileName, documentUrl, fileType);
            return newsRepository.save(article);
        } catch (IOException e) {
            throw new RuntimeException("Could not store document file. Please try again!", e);
        }
    }

    public void deleteNews(Long id) {
        NewsArticle article = getNewsById(id);
        if (article.getDocumentName() != null && !article.getDocumentName().isEmpty()) {
            try {
                Path filePath = this.fileStorageLocation.resolve(article.getDocumentName()).normalize();
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                System.err.println("Warning: Could not delete news document from disk: " + e.getMessage());
            }
        }
        newsRepository.deleteById(id);
    }

    public Path getFilePath(String fileName) {
        return this.fileStorageLocation.resolve(fileName).normalize();
    }

    private boolean isValidDocumentExtension(String fileName) {
        String ext = getFileExtension(fileName).toLowerCase();
        return ext.equals("pdf") || ext.equals("doc") || ext.equals("docx");
    }

    private String getFileExtension(String fileName) {
        int lastIndex = fileName.lastIndexOf('.');
        return (lastIndex == -1) ? "" : fileName.substring(lastIndex + 1);
    }
}
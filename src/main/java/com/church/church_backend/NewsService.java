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

    // Documents and images share the same base folder.
    private final Path docStorageLocation =
            Paths.get("uploads/documents").toAbsolutePath().normalize();
    private final Path imageStorageLocation =
            Paths.get("uploads/news-images").toAbsolutePath().normalize();

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
        try {
            Files.createDirectories(this.docStorageLocation);
            Files.createDirectories(this.imageStorageLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not create storage directories for news.", e);
        }
    }

    public List<NewsArticle> getAllNews() {
        return newsRepository.findAllByOrderByPublishedAtDesc();
    }

    public NewsArticle getNewsById(Long id) {
        return newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News article not found with id: " + id));
    }

    // ── Text-only ──────────────────────────────────
    public NewsArticle createTextArticle(NewsArticle article) {
        return newsRepository.save(article);
    }

    // ── Document only (existing behavior) ──────────
    public NewsArticle createDocumentArticle(String title, String content, String author, MultipartFile file) {
        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null || !isValidDocumentExtension(originalFileName)) {
            throw new IllegalArgumentException("Invalid file type! Only PDF, DOC, and DOCX files are allowed.");
        }

        try {
            String uniqueFileName = storeDocument(file);
            String documentUrl = "/api/news/files/" + uniqueFileName;
            String fileType = getFileExtension(originalFileName).toUpperCase();

            NewsArticle article = new NewsArticle(title, content, author, uniqueFileName, documentUrl, fileType);
            return newsRepository.save(article);
        } catch (IOException e) {
            throw new RuntimeException("Could not store document file. Please try again!", e);
        }
    }

    // 🆕 ── Full: image + optional document ──────────
    public NewsArticle createWithImages(
            String title,
            String content,
            String author,
            MultipartFile image,       // may be null
            MultipartFile file         // may be null
    ) {
        NewsArticle article = new NewsArticle();
        article.setTitle(title);
        article.setContent(content);
        article.setAuthor(author);

        try {
            // Hero image
            if (image != null && !image.isEmpty()) {
                if (!isValidImageExtension(image.getOriginalFilename())) {
                    throw new IllegalArgumentException("Invalid image type! Only JPG, JPEG, PNG, and WEBP are allowed.");
                }
                if (image.getSize() > 5L * 1024 * 1024) {
                    throw new IllegalArgumentException("Image must be smaller than 5MB.");
                }
                String storedImage = storeImage(image);
                article.setImageName(image.getOriginalFilename());
                article.setImageUrl("/api/news/images/" + storedImage);
            }

            // Document (optional)
            if (file != null && !file.isEmpty()) {
                if (!isValidDocumentExtension(file.getOriginalFilename())) {
                    throw new IllegalArgumentException("Invalid file type! Only PDF, DOC, and DOCX files are allowed.");
                }
                String storedDoc = storeDocument(file);
                article.setDocumentName(file.getOriginalFilename());
                article.setDocumentUrl("/api/news/files/" + storedDoc);
                article.setFileType(getFileExtension(file.getOriginalFilename()).toUpperCase());
            }

            return newsRepository.save(article);
        } catch (IOException e) {
            throw new RuntimeException("Could not store uploaded file. Please try again!", e);
        }
    }

    // ── Delete ─────────────────────────────────────
    public void deleteNews(Long id) {
        NewsArticle article = getNewsById(id);

        deleteIfExists(docStorageLocation, fileNameFromUrl(article.getDocumentUrl()));
        deleteIfExists(imageStorageLocation, fileNameFromUrl(article.getImageUrl()));

        newsRepository.deleteById(id);
    }

    // ── File resolution ────────────────────────────
    public Path getDocumentPath(String fileName) {
        return docStorageLocation.resolve(fileName).normalize();
    }

    public Path getImagePath(String fileName) {
        return imageStorageLocation.resolve(fileName).normalize();
    }

    // ── Storage helpers ────────────────────────────
    private String storeDocument(MultipartFile file) throws IOException {
        String original = file.getOriginalFilename();
        String clean = original.replaceAll("[^a-zA-Z0-9\\.\\-_]", "_");
        String unique = UUID.randomUUID() + "_" + clean;
        Files.copy(file.getInputStream(),
                docStorageLocation.resolve(unique),
                StandardCopyOption.REPLACE_EXISTING);
        return unique;
    }

    private String storeImage(MultipartFile file) throws IOException {
        String original = file.getOriginalFilename();
        String clean = original.replaceAll("[^a-zA-Z0-9\\.\\-_]", "_");
        String unique = UUID.randomUUID() + "_" + clean;
        Files.copy(file.getInputStream(),
                imageStorageLocation.resolve(unique),
                StandardCopyOption.REPLACE_EXISTING);
        return unique;
    }

    private void deleteIfExists(Path base, String fileName) {
        if (fileName == null || fileName.isBlank()) return;
        try {
            Files.deleteIfExists(base.resolve(fileName).normalize());
        } catch (IOException e) {
            System.err.println("Warning: could not delete file: " + e.getMessage());
        }
    }

    /** Turn "/api/news/images/xyz.jpg" into "xyz.jpg" */
    private String fileNameFromUrl(String url) {
        if (url == null || url.isBlank()) return null;
        int lastSlash = url.lastIndexOf('/');
        return lastSlash >= 0 ? url.substring(lastSlash + 1) : url;
    }

    // ── Validation helpers ─────────────────────────
    private boolean isValidDocumentExtension(String fileName) {
        String ext = getFileExtension(fileName).toLowerCase();
        return ext.equals("pdf") || ext.equals("doc") || ext.equals("docx");
    }

    private boolean isValidImageExtension(String fileName) {
        String ext = getFileExtension(fileName).toLowerCase();
        return ext.equals("jpg") || ext.equals("jpeg")
                || ext.equals("png") || ext.equals("webp");
    }

    private String getFileExtension(String fileName) {
        int lastIndex = fileName.lastIndexOf('.');
        return (lastIndex == -1) ? "" : fileName.substring(lastIndex + 1);
    }
}
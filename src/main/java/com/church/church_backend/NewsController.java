package com.church.church_backend;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    // ── Public reads ───────────────────────────────
    @GetMapping
    public ResponseEntity<List<NewsArticle>> getAllNews() {
        return ResponseEntity.ok(newsService.getAllNews());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsArticle> getNewsById(@PathVariable Long id) {
        return ResponseEntity.ok(newsService.getNewsById(id));
    }

    // Serve PDF/DOC attachments
    @GetMapping("/files/{fileName:.+}")
    public ResponseEntity<Resource> getDocumentFile(@PathVariable String fileName) {
        return serveFile(newsService.getDocumentPath(fileName), fileName);
    }

    // 🆕 Serve hero images
    @GetMapping("/images/{fileName:.+}")
    public ResponseEntity<Resource> getImageFile(@PathVariable String fileName) {
        return serveFile(newsService.getImagePath(fileName), fileName);
    }

    // ── Admin writes ───────────────────────────────
    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_SYSTEM_ADMIN')")
    public ResponseEntity<NewsArticle> createTextArticle(@RequestBody NewsArticle article) {
        return ResponseEntity.status(201).body(newsService.createTextArticle(article));
    }

    /**
     * Unified upload endpoint.
     * - Send `image` only → text article with hero image
     * - Send `file` only  → text article with document
     * - Send both         → article with image + document
     */
    @PostMapping("/upload")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_SYSTEM_ADMIN')")
    public ResponseEntity<?> upload(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "author", required = false, defaultValue = "Church Admin") String author,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "file",  required = false) MultipartFile file) {
        try {
            NewsArticle saved = newsService.createWithImages(title, content, author, image, file);
            return ResponseEntity.status(201).body(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_SYSTEM_ADMIN')")
    public ResponseEntity<?> deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
        return ResponseEntity.ok("News article deleted successfully.");
    }

    // ── File serving helper ────────────────────────
    private ResponseEntity<Resource> serveFile(Path path, String fileName) {
        try {
            Resource resource = new UrlResource(path.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
            String lower = fileName.toLowerCase();
            if (lower.endsWith(".pdf"))       mediaType = MediaType.APPLICATION_PDF;
            else if (lower.endsWith(".png"))  mediaType = MediaType.IMAGE_PNG;
            else if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) mediaType = MediaType.IMAGE_JPEG;
            else if (lower.endsWith(".webp")) mediaType = MediaType.parseMediaType("image/webp");

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
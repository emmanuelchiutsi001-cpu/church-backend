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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    // Public / Members: Get all news (latest first)
    @GetMapping
    public ResponseEntity<List<NewsArticle>> getAllNews() {
        return ResponseEntity.ok(newsService.getAllNews());
    }

    // Public / Members: Get news by ID
    @GetMapping("/{id}")
    public ResponseEntity<NewsArticle> getNewsById(@PathVariable Long id) {
        return ResponseEntity.ok(newsService.getNewsById(id));
    }

    // Public / Members: Download/view attached PDF or Word document
    @GetMapping("/files/{fileName:.+}")
    public ResponseEntity<Resource> getDocumentFile(@PathVariable String fileName) {
        try {
            Path filePath = newsService.getFilePath(fileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
                if (fileName.endsWith(".pdf")) {
                    mediaType = MediaType.APPLICATION_PDF;
                }

                return ResponseEntity.ok()
                        .contentType(mediaType)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Admin & System Admin: Create text-only news article (JSON)
    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN', 'ROLE_SYSTEM_ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<NewsArticle> createTextArticle(@RequestBody NewsArticle article) {
        NewsArticle created = newsService.createTextArticle(article);
        return ResponseEntity.status(201).body(created);
    }

    // Admin & System Admin: Upload news article with PDF or Word document attachment
    @PostMapping("/upload")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN', 'ROLE_SYSTEM_ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<?> createDocumentArticle(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "author", required = false, defaultValue = "Church Admin") String author,
            @RequestParam("file") MultipartFile file) {
        
        try {
            NewsArticle saved = newsService.createDocumentArticle(title, content, author, file);
            return ResponseEntity.status(201).body(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Admin & System Admin: Delete news article
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN', 'ROLE_SYSTEM_ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<?> deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
        return ResponseEntity.ok("News article deleted successfully.");
    }
}
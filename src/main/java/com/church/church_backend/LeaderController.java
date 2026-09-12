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
@RequestMapping("/api/leaders")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LeaderController {

    private final LeaderService leaderService;

    public LeaderController(LeaderService leaderService) {
        this.leaderService = leaderService;
    }

    // Public: Fetch all leaders
    @GetMapping
    public ResponseEntity<List<Leader>> getAllLeaders() {
        return ResponseEntity.ok(leaderService.getAllLeaders());
    }

    // Public: Fetch single leader profile
    @GetMapping("/{id}")
    public ResponseEntity<Leader> getLeaderById(@PathVariable Long id) {
        return ResponseEntity.ok(leaderService.getLeaderById(id));
    }

    // Public: Stream leader profile photo
    @GetMapping("/photos/{fileName:.+}")
    public ResponseEntity<Resource> getLeaderPhoto(@PathVariable String fileName) {
        return serveMediaFile(leaderService.getPhotoPath(fileName), MediaType.IMAGE_JPEG);
    }

    // Public: Stream leader sermon video
    @GetMapping("/videos/{fileName:.+}")
    public ResponseEntity<Resource> getSermonVideo(@PathVariable String fileName) {
        return serveMediaFile(leaderService.getVideoPath(fileName), MediaType.parseMediaType("video/mp4"));
    }

    // Admin & System Admin: Add Leader via JSON (No file attachments)
    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN', 'ROLE_SYSTEM_ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<Leader> createLeaderJson(@RequestBody Leader leader) {
        Leader saved = leaderService.saveLeader(leader);
        return ResponseEntity.status(201).body(saved);
    }

    // Admin & System Admin: Add Leader with Photo and/or Sermon Video
    @PostMapping("/upload")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN', 'ROLE_SYSTEM_ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<?> createLeaderWithMedia(
            @RequestParam("name") String name,
            @RequestParam("role") String role,
            @RequestParam("deanery") String deanery,
            @RequestParam(value = "bio", required = false, defaultValue = "") String bio,
            @RequestParam(value = "sermonTitle", required = false, defaultValue = "") String sermonTitle,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "video", required = false) MultipartFile video) {

        try {
            Leader saved = leaderService.createLeaderWithMedia(name, role, deanery, bio, sermonTitle, photo, video);
            return ResponseEntity.status(201).body(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Admin & System Admin: Delete Leader profile and media files
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN', 'ROLE_SYSTEM_ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<?> deleteLeader(@PathVariable Long id) {
        leaderService.deleteLeader(id);
        return ResponseEntity.ok("Leader profile deleted successfully.");
    }

    private ResponseEntity<Resource> serveMediaFile(Path filePath, MediaType fallbackMediaType) {
        try {
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(fallbackMediaType)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
package com.church.church_backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
public class ChurchFileController {

    private final FileStorageService fileStorageService;
    private final ChurchFileRepository churchFileRepository;

    // Correctly binds to your original sysadmin password property configuration
    @Value("${app.sysadmin.password:MasterSecret2026!}")
    private String configuredSuperAdminKey;

    public ChurchFileController(FileStorageService fileStorageService, ChurchFileRepository churchFileRepository) {
        this.fileStorageService = fileStorageService;
        this.churchFileRepository = churchFileRepository;
    }

    // 1. Upload files - Restrained by Role & Categorized
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("category") String category,
            @RequestHeader("User-Role") String userRole) {
        
        if (!"Admin".equalsIgnoreCase(userRole) && !"SuperAdmin".equalsIgnoreCase(userRole)) {
            return new ResponseEntity<>("Access Denied: Members cannot upload files.", HttpStatus.FORBIDDEN);
        }

        if (file.isEmpty()) {
            return new ResponseEntity<>("Please select a file to upload.", HttpStatus.BAD_REQUEST);
        }

        try {
            String originalFileName = file.getOriginalFilename();
            String uniqueFileName = System.currentTimeMillis() + "_" + (originalFileName != null ? originalFileName : "unnamed");
            
            java.nio.file.Path targetLocation = fileStorageService.getFileStorageLocation().resolve(uniqueFileName);
            java.nio.file.Files.copy(file.getInputStream(), targetLocation, java.nio.file.StandardCopyOption.REPLACE_EXISTING);

            ChurchFile churchFile = new ChurchFile(
                    uniqueFileName,
                    file.getContentType(),
                    "/uploads/" + uniqueFileName,
                    category,
                    java.time.LocalDateTime.now()
            );

            ChurchFile savedFile = churchFileRepository.save(churchFile);
            return new ResponseEntity<>(savedFile, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("File upload failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 2. Fetch resources - OPEN TO ALL for bulletins/announcements, strictly locked down for Security Logs
    @GetMapping("/category/{category}")
    public ResponseEntity<?> getFilesByCategory(
            @PathVariable String category,
            @RequestHeader(value = "User-Role", defaultValue = "Member") String userRole,
            @RequestHeader(value = "SuperAdmin-Key", required = false) String superAdminKey) {
        
        if ("SecurityLog".equalsIgnoreCase(category)) {
            
            // Rule A: Check the Role
            if (!"SuperAdmin".equalsIgnoreCase(userRole)) {
                return new ResponseEntity<>("Access Denied: Sensitive system logs are restricted to SuperAdmins.", HttpStatus.FORBIDDEN);
            }
            
            // Rule B: Match against your official sysadmin master password
            if (superAdminKey == null || !configuredSuperAdminKey.equals(superAdminKey)) {
                return new ResponseEntity<>("Access Denied: Invalid security clearance key signature.", HttpStatus.UNAUTHORIZED);
            }
        }

        List<ChurchFile> files = churchFileRepository.findByCategoryIgnoreCase(category);
        return new ResponseEntity<>(files, HttpStatus.OK);
    }

    // 3. Delete Endpoint (Admin and SuperAdmin access)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable Long id, @RequestHeader("User-Role") String userRole) {
        if (!"Admin".equalsIgnoreCase(userRole) && !"SuperAdmin".equalsIgnoreCase(userRole)) {
            return new ResponseEntity<>("Access Denied: Only Admins and SuperAdmins can delete files.", HttpStatus.FORBIDDEN);
        }

        boolean isDeleted = fileStorageService.deleteFile(id);
        if (isDeleted) {
            return new ResponseEntity<>("File removed completely.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("File not found.", HttpStatus.NOT_FOUND);
        }
    }
}
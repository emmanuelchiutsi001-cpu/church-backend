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
public class GalleryService {

    private final GalleryRepository galleryRepository;
    private final Path fileStorageLocation = Paths.get("uploads/gallery").toAbsolutePath().normalize();

    public GalleryService(GalleryRepository galleryRepository) {
        this.galleryRepository = galleryRepository;
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not create the directory for uploaded gallery files.", e);
        }
    }

    public List<GalleryImage> getAllImages() {
        return galleryRepository.findAll();
    }

    public GalleryImage uploadImage(String title, MultipartFile file) {
        try {
            // Generate unique filename to prevent overwriting existing files
            String originalFileName = file.getOriginalFilename();
            String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFileName;

            // Copy file to target location
            Path targetLocation = this.fileStorageLocation.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Construct public URL path
            String fileUrl = "/api/gallery/files/" + uniqueFileName;

            GalleryImage image = new GalleryImage(title, uniqueFileName, fileUrl);
            return galleryRepository.save(image);
        } catch (IOException e) {
            throw new RuntimeException("Could not store file. Please try again!", e);
        }
    }

    public void deleteImage(Long id) {
        GalleryImage image = galleryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found with id: " + id));

        try {
            Path filePath = this.fileStorageLocation.resolve(image.getFileName()).normalize();
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            System.err.println("Warning: Could not delete image file from disk: " + e.getMessage());
        }

        galleryRepository.deleteById(id);
    }

    public Path getFilePath(String fileName) {
        return this.fileStorageLocation.resolve(fileName).normalize();
    }
}
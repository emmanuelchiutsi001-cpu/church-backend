package com.church.church_backend;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;
    private final ChurchFileRepository churchFileRepository;

    public FileStorageService(@Value("${file.upload-dir}") String uploadDir, ChurchFileRepository churchFileRepository) {
        this.churchFileRepository = churchFileRepository;
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();

        try {
            // Creates the local 'uploads' directory if it doesn't exist yet
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }
    public Path getFileStorageLocation() { return this.fileStorageLocation; }
    public ChurchFile storeFile(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        String cleanedFileName = originalFileName != null ? Paths.get(originalFileName).getFileName().toString() : "unnamed";
        String uniqueFileName = System.currentTimeMillis() + "_" + cleanedFileName;

        try {
            // 1. Save the physical file bytes onto your local disk storage
            Path targetLocation = this.fileStorageLocation.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // 2. Generate the relative web URL path that matches our WebConfig handler
            String fileDownloadUrl = "/uploads/" + uniqueFileName;

            // 3. Map everything into the entity and write it into the SQLite database
            ChurchFile churchFile = new ChurchFile(
                    uniqueFileName,
                    file.getContentType(),
                    fileDownloadUrl, 
                    LocalDateTime.now()
            );

            return churchFileRepository.save(churchFile);
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + uniqueFileName + ". Please try again!", ex);
        }
    }

    // New finder method to get all files for the frontend list
    public List<ChurchFile> getAllFiles() {
        return churchFileRepository.findAll();
    }

    // New finder method to get a single file if needed
    public Optional<ChurchFile> getFileById(Long id) {
        return churchFileRepository.findById(id);
    }
    public boolean deleteFile(Long id) {
        return churchFileRepository.findById(id).map(churchFile -> {
            try {
                // 1. Get the physical file path using the unique filename stored
                Path targetLocation = this.fileStorageLocation.resolve(churchFile.getFileName());
                
                // 2. Delete the physical file from your laptop disk if it exists
                Files.deleteIfExists(targetLocation);
                
                // 3. Delete the record from your SQLite database
                churchFileRepository.delete(churchFile);
                return true;
            } catch (IOException ex) {
                throw new RuntimeException("Could not delete physical file: " + churchFile.getFileName(), ex);
            }
        }).orElse(false); // Returns false if the file ID wasn't found in the database
    }
}
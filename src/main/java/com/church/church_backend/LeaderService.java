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
public class LeaderService {

    private final LeaderRepository leaderRepository;
    private final Path imageStoragePath = Paths.get("uploads/leaders/photos").toAbsolutePath().normalize();
    private final Path videoStoragePath = Paths.get("uploads/leaders/videos").toAbsolutePath().normalize();

    public LeaderService(LeaderRepository leaderRepository) {
        this.leaderRepository = leaderRepository;
        try {
            Files.createDirectories(this.imageStoragePath);
            Files.createDirectories(this.videoStoragePath);
        } catch (IOException e) {
            throw new RuntimeException("Could not create storage directories for leadership media.", e);
        }
    }

    public List<Leader> getAllLeaders() {
        return leaderRepository.findAll();
    }

    public Leader getLeaderById(Long id) {
        return leaderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leader not found with id: " + id));
    }

    // Save text-only metadata or direct URL references
    public Leader saveLeader(Leader leader) {
        return leaderRepository.save(leader);
    }

    // Create or Update leader profile with optional Image and Video files
    public Leader createLeaderWithMedia(String name, String role, String deanery, String bio, 
                                       String sermonTitle, MultipartFile photo, MultipartFile video) {
        Leader leader = new Leader();
        leader.setName(name);
        leader.setRole(role);
        leader.setDeanery(deanery);
        leader.setBio(bio);
        leader.setSermonTitle(sermonTitle);

        // Process Profile Photo
        if (photo != null && !photo.isEmpty()) {
            validateImage(photo);
            String photoFileName = storeFile(photo, this.imageStoragePath);
            leader.setPhotoFileName(photoFileName);
            leader.setPhotoUrl("/api/leaders/photos/" + photoFileName);
        }

        // Process Sermon Video
        if (video != null && !video.isEmpty()) {
            validateVideo(video);
            String videoFileName = storeFile(video, this.videoStoragePath);
            leader.setVideoFileName(videoFileName);
            leader.setVideoUrl("/api/leaders/videos/" + videoFileName);
        }

        return leaderRepository.save(leader);
    }

    public void deleteLeader(Long id) {
        Leader leader = getLeaderById(id);

        // Clean up photo on disk
        if (leader.getPhotoFileName() != null) {
            deleteFile(this.imageStoragePath.resolve(leader.getPhotoFileName()));
        }

        // Clean up video on disk
        if (leader.getVideoFileName() != null) {
            deleteFile(this.videoStoragePath.resolve(leader.getVideoFileName()));
        }

        leaderRepository.deleteById(id);
    }

    public Path getPhotoPath(String fileName) {
        return this.imageStoragePath.resolve(fileName).normalize();
    }

    public Path getVideoPath(String fileName) {
        return this.videoStoragePath.resolve(fileName).normalize();
    }

    private String storeFile(MultipartFile file, Path targetDir) {
        try {
            String originalName = file.getOriginalFilename();
            String cleanName = (originalName != null) ? originalName.replaceAll("[^a-zA-Z0-9\\.\\-_]", "_") : "file";
            String uniqueName = UUID.randomUUID().toString() + "_" + cleanName;

            Path targetPath = targetDir.resolve(uniqueName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
            return uniqueName;
        } catch (IOException e) {
            throw new RuntimeException("Could not store media file. Please try again!", e);
        }
    }

    private void deleteFile(Path filePath) {
        try {
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            System.err.println("Warning: Failed to delete file: " + e.getMessage());
        }
    }

    private void validateImage(MultipartFile file) {
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Invalid profile photo! File must be an image.");
        }
    }

    private void validateVideo(MultipartFile file) {
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("video/")) {
            throw new IllegalArgumentException("Invalid sermon file! File must be a video format (e.g. MP4, MOV).");
        }
    }
}
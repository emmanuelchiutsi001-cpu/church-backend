package com.church.church_backend;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    private final ChurchFileRepository churchFileRepository;
    private final FileStorageService fileStorageService;

    public GlobalExceptionHandler(ChurchFileRepository churchFileRepository, FileStorageService fileStorageService) {
        this.churchFileRepository = churchFileRepository;
        this.fileStorageService = fileStorageService;
    }

    // This handles EVERY unhandled Exception thrown anywhere in your app
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        String timestamp = String.valueOf(System.currentTimeMillis());
        String logFileName = "error_log_" + timestamp + ".txt";
        
        // 1. Format a highly detailed technical log entry for the SuperAdmin
        String detailedLogContent = String.format(
            "--- SYSTEM ERROR LOG ---\nTimestamp: %s\nException Type: %s\nError Message: %s\nStack Trace:\n",
            LocalDateTime.now(), ex.getClass().getName(), ex.getMessage()
        );
        
        // Append the actual stack trace lines
        StringBuilder sb = new StringBuilder(detailedLogContent);
        for (StackTraceElement element : ex.getStackTrace()) {
            sb.append("\tat ").append(element.toString()).append("\n");
        }
        
        try {
            // 2. Mock a file upload sequence to pipe this text directly into your storage ecosystem
            byte[] logBytes = sb.toString().getBytes(StandardCharsets.UTF_8);
            java.nio.file.Path targetLocation = fileStorageService.getFileStorageLocation().resolve(logFileName);
            java.nio.file.Files.write(targetLocation, logBytes);

            // 3. Save the log metadata explicitly under the "SecurityLog" category
            ChurchFile errorLogFile = new ChurchFile(
                logFileName,
                "text/plain",
                "/uploads/" + logFileName,
                "SecurityLog",
                LocalDateTime.now()
            );
            churchFileRepository.save(errorLogFile);
            
        } catch (Exception loggingError) {
            System.err.println("Critical: Failed to save error log file to disk: " + loggingError.getMessage());
        }

        // 4. Return a highly sanitized, incredibly polite message to the standard user
        String friendlyUserMessage = "Something went wrong on our end. The technical team has been notified automatically. Please try again later.";
        return new ResponseEntity<>(friendlyUserMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
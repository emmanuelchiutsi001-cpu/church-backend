package com.church.church_backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.church.church_backend.Entity.ChurchFile;

@Repository
public interface ChurchFileRepository extends JpaRepository<ChurchFile, Long> {
    // Automatically generates a query to filter by the specific category
    List<ChurchFile> findByCategoryIgnoreCase(String category);
}
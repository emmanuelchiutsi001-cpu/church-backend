package com.church.church_backend;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParishRepository extends JpaRepository<Parish, Long> {
    List<Parish> findByDeaneryId(Long deaneryId);
    boolean existsBySlug(String slug);
}

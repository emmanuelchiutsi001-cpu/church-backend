package com.church.church_backend;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeaneryRepository extends JpaRepository<Deanery, Long> {
    List<Deanery> findAllByOrderByNameAsc();
    boolean existsBySlug(String slug);
}

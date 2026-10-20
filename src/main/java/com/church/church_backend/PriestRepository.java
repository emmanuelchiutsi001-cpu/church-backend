package com.church.church_backend;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriestRepository extends JpaRepository<Priest, Long> {
    List<Priest> findByDeaneryId(Long deaneryId);
    List<Priest> findByParishId(Long parishId);
}

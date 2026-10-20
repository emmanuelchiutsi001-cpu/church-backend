package com.church.church_backend;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeaneryEventRepository extends JpaRepository<DeaneryEvent, Long> {
    List<DeaneryEvent> findByDeaneryId(Long deaneryId);
}

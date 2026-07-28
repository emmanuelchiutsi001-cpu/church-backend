package com.church.church_backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubDivisionRepository extends JpaRepository<SubDivision, Long> {
    // Checks if this specific user already manages a group
    boolean existsByAdmin(AppUser admin);
    
    // Tracks global group totals against our system cap
    long count();
}
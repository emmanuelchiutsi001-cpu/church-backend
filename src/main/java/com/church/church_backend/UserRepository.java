package com.church.church_backend;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);
    List<AppUser> findByApprovedFalse();
    boolean existsByParishId(Long parishId);
    Optional<AppUser> findByParishId(Long parishId);
}

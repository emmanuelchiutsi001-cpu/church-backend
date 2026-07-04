package com.church.church_backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.church.church_backend.Entity.ChurchEvent;

@Repository
public interface EventRepository extends JpaRepository<ChurchEvent, Long> {
}
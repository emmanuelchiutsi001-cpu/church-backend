package com.church.church_backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<NewsArticle, Long> {
    List<NewsArticle> findAllByOrderByPublishedAtDesc();
}
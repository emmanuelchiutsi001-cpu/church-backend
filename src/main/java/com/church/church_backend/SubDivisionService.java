package com.church.church_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubDivisionService {

    @Autowired
    private SubDivisionRepository subDivisionRepository;

    public SubDivision createGroup(String name, AppUser authenticatedAdmin) {
        // Rule 1: Global Cap Check (Max 54 groups total)
        if (subDivisionRepository.count() >= 54) {
            throw new IllegalStateException("System Limit Reached: The church platform is capped at a maximum of 54 sub-division groups.");
        }

        // Rule 2: Personal Ownership Check (1 group max per Admin)
        if (subDivisionRepository.existsByAdmin(authenticatedAdmin)) {
            throw new IllegalArgumentException("Creation Denied: Your administrative account is already assigned to a church sub-division group.");
        }

        SubDivision group = new SubDivision();
        group.setName(name);
        group.setAdmin(authenticatedAdmin);
        
        return subDivisionRepository.save(group);
    }
}
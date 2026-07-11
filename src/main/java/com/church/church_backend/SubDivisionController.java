package com.church.church_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/groups")
public class SubDivisionController {

    @Autowired
    private SubDivisionService subDivisionService;

    @PostMapping("/create")
    public ResponseEntity<?> createSubDivision(@RequestParam String name, @AuthenticationPrincipal AppUser admin) {
        try {
            SubDivision newGroup = subDivisionService.createGroup(name, admin);
            return new ResponseEntity<>(newGroup, HttpStatus.CREATED);
        } catch (IllegalStateException | IllegalArgumentException e) {
            // Returns the specific rule validation message cleanly back to the frontend
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
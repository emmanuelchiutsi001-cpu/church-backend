package com.church.church_backend;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin
public class AttendanceController {

    private final AttendanceRepository attendanceRepository;

    public AttendanceController(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    @GetMapping
    public List<Attendance> getAllRecords() {
        return attendanceRepository.findAll();
    }

    @PostMapping
    public Attendance recordAttendance(@RequestBody Attendance attendance) {
        if(attendance.getServiceDate() == null) {
            attendance.setServiceDate(LocalDate.now());
        }
        return attendanceRepository.save(attendance);
    }
}
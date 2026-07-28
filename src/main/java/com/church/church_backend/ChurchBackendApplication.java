package com.church.church_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.church.church_backend") // Forces Spring to load SecurityConfig
public class ChurchBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(ChurchBackendApplication.class, args);
    }
}
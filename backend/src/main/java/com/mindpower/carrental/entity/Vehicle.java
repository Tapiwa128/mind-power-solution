package com.mindpower.carrental.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(nullable = false, length = 50, unique = true)
    private String plate;
    
    @Column(nullable = false)
    private Long mileage;
    
    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private VehicleStatus status;
    
    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = java.time.LocalDateTime.now();
    }
    
    public enum VehicleStatus {
        ACTIVE, PARKED, IN_SERVICE
    }
}

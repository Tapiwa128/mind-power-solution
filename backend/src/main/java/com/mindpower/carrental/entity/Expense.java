package com.mindpower.carrental.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private LocalDate month;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal fuel;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal service;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal insurance;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal tolls;
    
    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = java.time.LocalDateTime.now();
    }
}

package com.mindpower.carrental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDTO {
    private Long id;
    private LocalDate month;
    private BigDecimal fuel;
    private BigDecimal service;
    private BigDecimal insurance;
    private BigDecimal tolls;
}

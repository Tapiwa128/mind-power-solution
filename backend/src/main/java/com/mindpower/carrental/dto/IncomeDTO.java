package com.mindpower.carrental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IncomeDTO {
    private Long id;
    private LocalDate date;
    private String vehicle;
    private BigDecimal amount;
}

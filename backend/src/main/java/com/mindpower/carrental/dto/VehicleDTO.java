package com.mindpower.carrental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDTO {
    private Long id;
    private String name;
    private String plate;
    private Long mileage;
    private String status;
}

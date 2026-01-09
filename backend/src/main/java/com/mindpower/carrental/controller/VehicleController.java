package com.mindpower.carrental.controller;

import com.mindpower.carrental.dto.VehicleDTO;
import com.mindpower.carrental.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class VehicleController {
    private final VehicleService vehicleService;
    
    @PostMapping
    public ResponseEntity<VehicleDTO> createVehicle(@Valid @RequestBody VehicleDTO dto) {
        VehicleDTO created = vehicleService.createVehicle(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @GetMapping
    public ResponseEntity<List<VehicleDTO>> getAllVehicles() {
        List<VehicleDTO> vehicles = vehicleService.getAllVehicles();
        return ResponseEntity.ok(vehicles);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<VehicleDTO> getVehicleById(@PathVariable Long id) {
        VehicleDTO vehicle = vehicleService.getVehicleById(id);
        return ResponseEntity.ok(vehicle);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<VehicleDTO> updateVehicle(@PathVariable Long id, @Valid @RequestBody VehicleDTO dto) {
        VehicleDTO updated = vehicleService.updateVehicle(id, dto);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }
}

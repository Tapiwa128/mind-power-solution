package com.mindpower.carrental.service;

import com.mindpower.carrental.dto.VehicleDTO;
import com.mindpower.carrental.entity.Vehicle;
import com.mindpower.carrental.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VehicleService {
    private final VehicleRepository vehicleRepository;
    
    @Transactional
    public VehicleDTO createVehicle(VehicleDTO dto) {
        if (vehicleRepository.findByPlate(dto.getPlate()).isPresent()) {
            throw new RuntimeException("Vehicle with plate " + dto.getPlate() + " already exists");
        }
        
        Vehicle vehicle = new Vehicle();
        vehicle.setName(dto.getName());
        vehicle.setPlate(dto.getPlate());
        vehicle.setMileage(dto.getMileage());
        vehicle.setStatus(Vehicle.VehicleStatus.valueOf(dto.getStatus().toUpperCase().replace(" ", "_")));
        Vehicle saved = vehicleRepository.save(vehicle);
        return toDTO(saved);
    }
    
    public List<VehicleDTO> getAllVehicles() {
        return vehicleRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public VehicleDTO getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        return toDTO(vehicle);
    }
    
    @Transactional
    public VehicleDTO updateVehicle(Long id, VehicleDTO dto) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        vehicle.setName(dto.getName());
        vehicle.setPlate(dto.getPlate());
        vehicle.setMileage(dto.getMileage());
        vehicle.setStatus(Vehicle.VehicleStatus.valueOf(dto.getStatus().toUpperCase().replace(" ", "_")));
        Vehicle updated = vehicleRepository.save(vehicle);
        return toDTO(updated);
    }
    
    @Transactional
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
    
    private VehicleDTO toDTO(Vehicle vehicle) {
        return new VehicleDTO(
                vehicle.getId(),
                vehicle.getName(),
                vehicle.getPlate(),
                vehicle.getMileage(),
                vehicle.getStatus().name().replace("_", " ")
        );
    }
}

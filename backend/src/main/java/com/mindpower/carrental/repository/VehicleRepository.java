package com.mindpower.carrental.repository;

import com.mindpower.carrental.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    Optional<Vehicle> findByPlate(String plate);
    List<Vehicle> findByStatus(Vehicle.VehicleStatus status);
}

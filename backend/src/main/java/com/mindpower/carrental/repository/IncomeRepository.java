package com.mindpower.carrental.repository;

import com.mindpower.carrental.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findByDateBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT SUM(i.amount) FROM Income i WHERE i.date BETWEEN :startDate AND :endDate")
    java.math.BigDecimal sumAmountByDateRange(LocalDate startDate, LocalDate endDate);
    
    List<Income> findAllByOrderByDateDesc();
}

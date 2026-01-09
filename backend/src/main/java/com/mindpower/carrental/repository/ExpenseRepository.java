package com.mindpower.carrental.repository;

import com.mindpower.carrental.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    Optional<Expense> findByMonth(LocalDate month);
    List<Expense> findAllByOrderByMonthDesc();
}

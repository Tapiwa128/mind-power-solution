package com.mindpower.carrental.service;

import com.mindpower.carrental.dto.ExpenseDTO;
import com.mindpower.carrental.entity.Expense;
import com.mindpower.carrental.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    
    @Transactional
    public ExpenseDTO createOrUpdateExpense(ExpenseDTO dto) {
        Expense expense = expenseRepository.findByMonth(dto.getMonth())
                .orElse(new Expense());
        
        expense.setMonth(dto.getMonth());
        expense.setFuel(dto.getFuel());
        expense.setService(dto.getService());
        expense.setInsurance(dto.getInsurance());
        expense.setTolls(dto.getTolls());
        
        Expense saved = expenseRepository.save(expense);
        return toDTO(saved);
    }
    
    public List<ExpenseDTO> getAllExpenses() {
        return expenseRepository.findAllByOrderByMonthDesc()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public ExpenseDTO getExpenseByMonth(LocalDate month) {
        Expense expense = expenseRepository.findByMonth(month)
                .orElse(new Expense());
        if (expense.getId() == null) {
            expense.setMonth(month);
            expense.setFuel(java.math.BigDecimal.ZERO);
            expense.setService(java.math.BigDecimal.ZERO);
            expense.setInsurance(java.math.BigDecimal.ZERO);
            expense.setTolls(java.math.BigDecimal.ZERO);
        }
        return toDTO(expense);
    }
    
    @Transactional
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
    
    private ExpenseDTO toDTO(Expense expense) {
        return new ExpenseDTO(
                expense.getId(),
                expense.getMonth(),
                expense.getFuel(),
                expense.getService(),
                expense.getInsurance(),
                expense.getTolls()
        );
    }
}

package com.mindpower.carrental.controller;

import com.mindpower.carrental.dto.ExpenseDTO;
import com.mindpower.carrental.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ExpenseController {
    private final ExpenseService expenseService;
    
    @PostMapping
    public ResponseEntity<ExpenseDTO> createOrUpdateExpense(@Valid @RequestBody ExpenseDTO dto) {
        ExpenseDTO saved = expenseService.createOrUpdateExpense(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    
    @GetMapping
    public ResponseEntity<List<ExpenseDTO>> getAllExpenses() {
        List<ExpenseDTO> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }
    
    @GetMapping("/month/{month}")
    public ResponseEntity<ExpenseDTO> getExpenseByMonth(@PathVariable LocalDate month) {
        ExpenseDTO expense = expenseService.getExpenseByMonth(month);
        return ResponseEntity.ok(expense);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}

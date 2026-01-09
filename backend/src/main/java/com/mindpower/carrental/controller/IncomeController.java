package com.mindpower.carrental.controller;

import com.mindpower.carrental.dto.IncomeDTO;
import com.mindpower.carrental.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/incomes")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class IncomeController {
    private final IncomeService incomeService;
    
    @PostMapping
    public ResponseEntity<IncomeDTO> createIncome(@Valid @RequestBody IncomeDTO dto) {
        IncomeDTO created = incomeService.createIncome(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @GetMapping
    public ResponseEntity<List<IncomeDTO>> getAllIncomes() {
        List<IncomeDTO> incomes = incomeService.getAllIncomes();
        return ResponseEntity.ok(incomes);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<IncomeDTO> getIncomeById(@PathVariable Long id) {
        IncomeDTO income = incomeService.getIncomeById(id);
        return ResponseEntity.ok(income);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<IncomeDTO> updateIncome(@PathVariable Long id, @Valid @RequestBody IncomeDTO dto) {
        IncomeDTO updated = incomeService.updateIncome(id, dto);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }
}

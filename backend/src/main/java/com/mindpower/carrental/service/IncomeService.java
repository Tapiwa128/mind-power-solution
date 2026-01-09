package com.mindpower.carrental.service;

import com.mindpower.carrental.dto.IncomeDTO;
import com.mindpower.carrental.entity.Income;
import com.mindpower.carrental.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IncomeService {
    private final IncomeRepository incomeRepository;
    
    @Transactional
    public IncomeDTO createIncome(IncomeDTO dto) {
        Income income = new Income();
        income.setDate(dto.getDate());
        income.setVehicle(dto.getVehicle());
        income.setAmount(dto.getAmount());
        Income saved = incomeRepository.save(income);
        return toDTO(saved);
    }
    
    public List<IncomeDTO> getAllIncomes() {
        return incomeRepository.findAllByOrderByDateDesc()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public IncomeDTO getIncomeById(Long id) {
        Income income = incomeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Income not found"));
        return toDTO(income);
    }
    
    @Transactional
    public IncomeDTO updateIncome(Long id, IncomeDTO dto) {
        Income income = incomeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Income not found"));
        income.setDate(dto.getDate());
        income.setVehicle(dto.getVehicle());
        income.setAmount(dto.getAmount());
        Income updated = incomeRepository.save(income);
        return toDTO(updated);
    }
    
    @Transactional
    public void deleteIncome(Long id) {
        incomeRepository.deleteById(id);
    }
    
    private IncomeDTO toDTO(Income income) {
        return new IncomeDTO(
                income.getId(),
                income.getDate(),
                income.getVehicle(),
                income.getAmount()
        );
    }
}

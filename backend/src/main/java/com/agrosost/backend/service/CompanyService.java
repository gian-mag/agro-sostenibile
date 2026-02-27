package com.agrosost.backend.service;

import com.agrosost.backend.dto.CompanyDto;
import com.agrosost.backend.dto.ReportDto;
import com.agrosost.backend.exception.ResourceNotFoundException;
import com.agrosost.backend.mapper.CompanyMapper;
import com.agrosost.backend.mapper.ReportMapper;
import com.agrosost.backend.repository.CompanyRepository;
import com.agrosost.backend.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// Logica di business per le aziende e i relativi report
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final ReportRepository reportRepository;
    private final CompanyMapper companyMapper;
    private final ReportMapper reportMapper;

    public List<CompanyDto> findAll() {
        log.info("Recupero tutte le aziende");
        return companyRepository.findAll().stream()
                .map(companyMapper::toDto)
                .toList();
    }

    public CompanyDto findById(Long id) {
        log.info("Recupero azienda con id: {}", id);
        return companyRepository.findById(id)
                .map(companyMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Company", id));
    }

    // Verifica che l'azienda esista prima di cercare i suoi report
    public List<ReportDto> findReportsByCompanyId(Long companyId) {
        log.info("Recupero report per azienda id: {}", companyId);
        if (!companyRepository.existsById(companyId)) {
            throw new ResourceNotFoundException("Company", companyId);
        }
        return reportRepository.findByCompanyIdOrderByYearDesc(companyId).stream()
                .map(reportMapper::toDto)
                .toList();
    }
}

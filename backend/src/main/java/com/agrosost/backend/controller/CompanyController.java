package com.agrosost.backend.controller;

import com.agrosost.backend.dto.ApiResponse;
import com.agrosost.backend.dto.CompanyDto;
import com.agrosost.backend.dto.ReportDto;
import com.agrosost.backend.service.CompanyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
@Tag(name = "Companies", description = "Gestione aziende del settore primario")
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping
    @Operation(summary = "Elenco aziende", description = "Restituisce tutte le aziende registrate")
    public ResponseEntity<ApiResponse<List<CompanyDto>>> findAll() {
        List<CompanyDto> companies = companyService.findAll();
        return ResponseEntity.ok(ApiResponse.ok(companies));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Dettaglio azienda", description = "Restituisce i dettagli di una singola azienda")
    public ResponseEntity<ApiResponse<CompanyDto>> findById(@PathVariable Long id) {
        CompanyDto company = companyService.findById(id);
        return ResponseEntity.ok(ApiResponse.ok(company));
    }

    @GetMapping("/{id}/reports")
    @Operation(summary = "Report di un'azienda", description = "Restituisce tutti i report di sostenibilita di un'azienda")
    public ResponseEntity<ApiResponse<List<ReportDto>>> findReports(@PathVariable Long id) {
        List<ReportDto> reports = companyService.findReportsByCompanyId(id);
        return ResponseEntity.ok(ApiResponse.ok(reports));
    }
}

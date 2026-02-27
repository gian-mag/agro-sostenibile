package com.agrosost.backend.controller;

import com.agrosost.backend.dto.ApiResponse;
import com.agrosost.backend.dto.ReportDto;
import com.agrosost.backend.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Tag(name = "Reports", description = "Gestione report di sostenibilita")
public class ReportController {

    private final ReportService reportService;

    @GetMapping
    @Operation(summary = "Elenco report", description = "Restituisce i report con filtri opzionali")
    public ResponseEntity<ApiResponse<List<ReportDto>>> findAll(
            @RequestParam(required = false) Long companyId,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String segment) {
        List<ReportDto> reports = reportService.findAll(companyId, year, segment);
        return ResponseEntity.ok(ApiResponse.ok(reports));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Dettaglio report", description = "Restituisce i metadati di un singolo report")
    public ResponseEntity<ApiResponse<ReportDto>> findById(@PathVariable Long id) {
        ReportDto report = reportService.findById(id);
        return ResponseEntity.ok(ApiResponse.ok(report));
    }

    @GetMapping("/{id}/download")
    @Operation(summary = "Download PDF", description = "Scarica il file PDF del report")
    public ResponseEntity<Resource> download(@PathVariable Long id) {
        Resource resource = reportService.downloadPdf(id);
        String fileName = reportService.getPdfFileName(id);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }

    @GetMapping("/{id}/summary")
    @Operation(summary = "Resoconto report", description = "Restituisce il resoconto testuale sintetico del report")
    public ResponseEntity<ApiResponse<String>> getSummary(@PathVariable Long id) {
        String summary = reportService.findSummaryById(id);
        return ResponseEntity.ok(ApiResponse.ok(summary));
    }

    @GetMapping("/years")
    @Operation(summary = "Anni disponibili", description = "Restituisce la lista degli anni per cui esistono report")
    public ResponseEntity<ApiResponse<List<Integer>>> getAvailableYears() {
        List<Integer> years = reportService.findAvailableYears();
        return ResponseEntity.ok(ApiResponse.ok(years));
    }
}

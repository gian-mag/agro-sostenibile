package com.agrosost.backend.service;

import com.agrosost.backend.dto.ReportDto;
import com.agrosost.backend.entity.Report;
import com.agrosost.backend.exception.DownloadException;
import com.agrosost.backend.exception.ResourceNotFoundException;
import com.agrosost.backend.mapper.ReportMapper;
import com.agrosost.backend.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ReportService {

    private final ReportRepository reportRepository;
    private final ReportMapper reportMapper;

    @Value("${app.storage.pdf-path}")
    private String pdfStoragePath;

    @Value("${app.download.timeout-seconds}")
    private int downloadTimeoutSeconds;

    public List<ReportDto> findAll(Long companyId, Integer year, String segment) {
        log.info("Recupero report con filtri - companyId: {}, year: {}, segment: {}", companyId, year, segment);
        return reportRepository.findWithFilters(companyId, year, segment).stream()
                .map(reportMapper::toDto)
                .toList();
    }

    public ReportDto findById(Long id) {
        log.info("Recupero report con id: {}", id);
        return reportRepository.findById(id)
                .map(reportMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Report", id));
    }

    public String findSummaryById(Long id) {
        log.info("Recupero summary per report id: {}", id);
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report", id));
        return report.getSummary();
    }

    public List<Integer> findAvailableYears() {
        return reportRepository.findDistinctYears();
    }

    public Resource downloadPdf(Long id) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report", id));

        log.info("Download report id: {}, fileStored: {}", id, report.getFileStored());

        if (Boolean.TRUE.equals(report.getFileStored())) {
            return downloadFromLocalStorage(report);
        } else {
            return downloadFromExternalUrl(report);
        }
    }

    public String getPdfFileName(Long id) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report", id));

        if (report.getPdfFileName() != null && !report.getPdfFileName().isBlank()) {
            return report.getPdfFileName();
        }
        String companyName = report.getCompany().getCompanyName().replaceAll("[^a-zA-Z0-9]", "_");
        return companyName + "_Report_" + report.getYear() + ".pdf";
    }

    private Resource downloadFromLocalStorage(Report report) {
        try {
            Path filePath = Paths.get(pdfStoragePath).resolve(report.getPdfUrl()).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            }
            throw new ResourceNotFoundException("File PDF", report.getId());
        } catch (IOException e) {
            throw new DownloadException("Errore nell'accesso al file locale", e);
        }
    }

    private Resource downloadFromExternalUrl(Report report) {
        try {
            HttpClient client = HttpClient.newBuilder()
                    .followRedirects(HttpClient.Redirect.NORMAL)
                    .connectTimeout(Duration.ofSeconds(downloadTimeoutSeconds))
                    .build();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(report.getPdfUrl()))
                    .timeout(Duration.ofSeconds(downloadTimeoutSeconds))
                    .GET()
                    .build();

            HttpResponse<InputStream> response = client.send(request, HttpResponse.BodyHandlers.ofInputStream());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                return new InputStreamResource(response.body());
            }

            throw new DownloadException("Il server esterno ha risposto con status: " + response.statusCode());
        } catch (DownloadException e) {
            throw e;
        } catch (Exception e) {
            throw new DownloadException("Impossibile scaricare il PDF dall'URL esterno: " + e.getMessage(), e);
        }
    }
}

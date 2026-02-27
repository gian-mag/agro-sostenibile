package com.agrosost.backend.mapper;

import com.agrosost.backend.dto.ReportDto;
import com.agrosost.backend.entity.Report;
import org.springframework.stereotype.Component;

@Component
public class ReportMapper {

    public ReportDto toDto(Report entity) {
        return ReportDto.builder()
                .id(entity.getId())
                .companyId(entity.getCompany().getId())
                .companyName(entity.getCompany().getCompanyName())
                .title(entity.getTitle())
                .year(entity.getYear())
                .pdfUrl(entity.getPdfUrl())
                .pdfFileName(entity.getPdfFileName())
                .summary(entity.getSummary())
                .standard(entity.getStandard())
                .tags(entity.getTags())
                .fileStored(entity.getFileStored())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}

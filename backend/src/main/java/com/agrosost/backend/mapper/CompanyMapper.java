package com.agrosost.backend.mapper;

import com.agrosost.backend.dto.CompanyDto;
import com.agrosost.backend.entity.Company;
import org.springframework.stereotype.Component;

@Component
public class CompanyMapper {

    public CompanyDto toDto(Company entity) {
        return CompanyDto.builder()
                .id(entity.getId())
                .companyName(entity.getCompanyName())
                .segment(entity.getSegment())
                .description(entity.getDescription())
                .history(entity.getHistory())
                .logoUrl(entity.getLogoUrl())
                .websiteUrl(entity.getWebsiteUrl())
                .reportCount(entity.getReports() != null ? entity.getReports().size() : 0)
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}

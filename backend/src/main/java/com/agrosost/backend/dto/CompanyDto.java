package com.agrosost.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyDto {

    private Long id;
    private String companyName;
    private String segment;
    private String description;
    private String history;
    private String logoUrl;
    private String websiteUrl;
    private int reportCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

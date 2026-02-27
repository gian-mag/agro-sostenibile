package com.agrosost.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportDto {

    private Long id;
    private Long companyId;
    private String companyName;
    private String title;
    private Integer year;
    private String pdfUrl;
    private String pdfFileName;
    private String summary;
    private String standard;
    private String tags;
    private Boolean fileStored;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

package com.agrosost.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

// Entita JPA che rappresenta un report di sostenibilita
@Entity
@Table(name = "reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String title;

    @Column(name = "report_year", nullable = false)
    private Integer year;

    // Puo essere un path locale o un URL esterno
    @Column(name = "pdf_url", nullable = false)
    private String pdfUrl;

    @Column(name = "pdf_file_name")
    private String pdfFileName;

    @Column(columnDefinition = "TEXT")
    private String summary; // resoconto testuale del report

    private String standard; // standard di rendicontazione (CSRD, ESRS, ecc.)

    private String tags; // tag separati da virgola

    // true se il PDF e salvato in locale, false se va scaricato da URL esterno
    @Column(name = "file_stored", nullable = false)
    @Builder.Default
    private Boolean fileStored = false;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}

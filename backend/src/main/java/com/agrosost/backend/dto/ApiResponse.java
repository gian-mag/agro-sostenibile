package com.agrosost.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

// Wrapper generico per le risposte API; include supporto opzionale alla paginazione
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private T data;
    private int status;
    private LocalDateTime timestamp;

    // Campi per paginazione (opzionali, inclusi solo se valorizzati)
    private Integer page;
    private Integer size;
    private Long totalElements;
    private Integer totalPages;

    // Factory method per risposte senza paginazione
    public static <T> ApiResponse<T> ok(T data) {
        return ApiResponse.<T>builder()
                .data(data)
                .status(200)
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static <T> ApiResponse<T> ok(T data, int page, int size, long totalElements, int totalPages) {
        return ApiResponse.<T>builder()
                .data(data)
                .status(200)
                .timestamp(LocalDateTime.now())
                .page(page)
                .size(size)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .build();
    }
}

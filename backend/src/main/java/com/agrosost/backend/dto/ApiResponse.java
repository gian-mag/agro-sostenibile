package com.agrosost.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

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

    // Campi per paginazione (opzionali)
    private Integer page;
    private Integer size;
    private Long totalElements;
    private Integer totalPages;

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

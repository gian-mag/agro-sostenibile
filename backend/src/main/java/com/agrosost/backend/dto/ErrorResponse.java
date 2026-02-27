package com.agrosost.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

// Formato standard per le risposte di errore
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponse {

    private String error;   // codice errore (es. RESOURCE_NOT_FOUND)
    private String message;
    private int status;
    private LocalDateTime timestamp;
}

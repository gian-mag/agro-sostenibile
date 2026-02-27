package com.agrosost.backend.exception;

// Eccezione lanciata quando una risorsa non viene trovata (404)
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String resource, Long id) {
        super(resource + " con id " + id + " non trovato");
    }
}

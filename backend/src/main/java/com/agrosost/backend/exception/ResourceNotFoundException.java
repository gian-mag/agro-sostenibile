package com.agrosost.backend.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String resource, Long id) {
        super(resource + " con id " + id + " non trovato");
    }
}

package com.agrosost.backend.exception;

// Eccezione per errori nel download dei PDF (503)
public class DownloadException extends RuntimeException {

    public DownloadException(String message) {
        super(message);
    }

    public DownloadException(String message, Throwable cause) {
        super(message, cause);
    }
}

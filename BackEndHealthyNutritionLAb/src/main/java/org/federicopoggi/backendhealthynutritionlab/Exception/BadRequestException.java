package org.federicopoggi.backendhealthynutritionlab.Exception;

public class BadRequestException extends RuntimeException{
    public BadRequestException(String message) {
        super(message);
    }
}

package org.federicopoggi.backendhealthynutritionlab.Exception;

public class NotFoundException extends RuntimeException{
    String message;

    public NotFoundException(String message) {
        super(message);
    }
}

package org.federicopoggi.backendhealthynutritionlab.Exception;

public class UnauthorizedException extends RuntimeException{
    public UnauthorizedException() {
        super("Non hai i permessi adeguati per accedere al servizio");
    }
}

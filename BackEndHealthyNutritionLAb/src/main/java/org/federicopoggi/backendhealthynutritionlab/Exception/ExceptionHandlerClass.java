package org.federicopoggi.backendhealthynutritionlab.Exception;

import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.lang.JoseException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDate;


@RestControllerAdvice
public class ExceptionHandlerClass {
    @ExceptionHandler({InvalidJwtException.class, JoseException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorMessage problemsWithToken(InvalidJwtException invalidJwtException, JoseException e) {
        return new ErrorMessage("Problemi con la validazione del token", LocalDate.now(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage badRequest(BadRequestException e) {
        return new ErrorMessage(e.getMessage(), LocalDate.now(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorMessage badRequest(AccessDeniedException e) {
        return new ErrorMessage("Non hai i permessi necessari per svolgere questa operazione ",
                                LocalDate.now(),
                                HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(AlreadyAssignException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage alreadyAssign(AlreadyAssignException e){
        return new ErrorMessage("L'utente ha gia un dottore assegnato",
                                LocalDate.now(),
                                HttpStatus.BAD_REQUEST);
    }
}



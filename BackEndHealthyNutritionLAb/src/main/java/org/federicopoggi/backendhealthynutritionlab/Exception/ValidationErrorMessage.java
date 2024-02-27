package org.federicopoggi.backendhealthynutritionlab.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;

import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

public class ValidationErrorMessage extends RuntimeException {

    private HttpStatus status;
        private String message;
        private List<FieldError> errors;

        public ValidationErrorMessage(HttpStatus status, String message, List<FieldError>errors) {
            this.status = status;
            this.message = message;
            this.errors = errors;
        }
}

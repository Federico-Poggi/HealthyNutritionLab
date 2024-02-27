package org.federicopoggi.backendhealthynutritionlab.Exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ErrorMessage {
    private String message;
    private LocalDate dateMessage;
    private HttpStatus httpStatus;

}

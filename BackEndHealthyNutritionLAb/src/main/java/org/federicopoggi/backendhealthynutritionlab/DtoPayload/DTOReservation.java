package org.federicopoggi.backendhealthynutritionlab.DtoPayload;

import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;

public record DTOReservation(
        @NotNull int day,
        @NotNull int month,
        @NotNull int year,
        @NotNull String email_customer
) {}

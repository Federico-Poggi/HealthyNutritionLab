package org.federicopoggi.backendhealthynutritionlab.DtoPayload;

import jakarta.validation.constraints.NotNull;

public record UserPayload(
        @NotNull(message = "Mail cannot be null")
        String email,
        @NotNull(message = "Password cannot be null")
        String password
) {}

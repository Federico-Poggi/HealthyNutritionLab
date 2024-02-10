package org.federicopoggi.backendhealthynutritionlab.DtoPayload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record DoctorPaylodSave(@NotNull(message = "Insert a name for the doctor") String name,
                               @NotNull(message = "Insert a surname for the doctor") String surname,
                               @NotNull(message = "Insert a cell for the doctor") String cellNumber,
                               @NotNull(message = "Insert a mail for the doctor") @Email String email,
                               @NotNull(message = "Insert a password for the doctor") String password,
                               @NotNull(message = "Role must be declared") String role) {}

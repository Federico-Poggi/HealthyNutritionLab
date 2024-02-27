package org.federicopoggi.backendhealthynutritionlab.DtoPayload;

import jakarta.validation.constraints.*;

public record RegisterUserPayload(@NotNull(message = "Name cannot be null pls insert a name")  String name,
                                  @NotNull(message = "Surname cannot be null pls insert a surname") String surname,
                                  @NotNull(message = "Insert a cell number") @NotBlank String cellNumber,
                                  @Email @NotNull(message = "mail cannot be empty, please insert a mail") String mail,
                                  @NotNull(message = "Password cannot be null, please insert a password")
                                  @NotBlank(message = "Password cannot be empty")
                                  @Size(min = 8, message = "Password must be at least 8 characters long")
                                  String password


) {}

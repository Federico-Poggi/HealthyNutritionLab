package org.federicopoggi.backendhealthynutritionlab.DtoPayload;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Map;
import java.util.Objects;

public record DietPayload(
        @NotNull
        int kcalDiet,
        @NotNull LocalDate isueDate,
        @NotNull LocalDate expirationDate,
        @NotNull String duration,
        @NotNull String dietType,
        @NotNull Map AlimentoQuantita
        ) {}

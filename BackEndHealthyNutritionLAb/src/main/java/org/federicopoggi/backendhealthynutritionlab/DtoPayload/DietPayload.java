package org.federicopoggi.backendhealthynutritionlab.DtoPayload;

import jakarta.validation.constraints.NotNull;
import org.federicopoggi.backendhealthynutritionlab.model.AlimentoAndQuantita;

import java.time.LocalDate;
import java.util.List;

public record DietPayload(

        @NotNull LocalDate expirationDate,
        @NotNull String duration,
        @NotNull String dietType,
        @NotNull AlimentoAndQuantita[] alimentoAndQuantita
        ) {}

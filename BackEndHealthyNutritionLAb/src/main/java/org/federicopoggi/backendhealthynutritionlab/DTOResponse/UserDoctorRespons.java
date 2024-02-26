package org.federicopoggi.backendhealthynutritionlab.DTOResponse;

import org.federicopoggi.backendhealthynutritionlab.model.Nutritionist;
import org.federicopoggi.backendhealthynutritionlab.model.PersonalTrainer;

public record UserDoctorRespons(
        Nutritionist nutriotionist,
        PersonalTrainer personalTrainer
) {}

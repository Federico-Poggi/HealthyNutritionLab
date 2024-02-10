package org.federicopoggi.backendhealthynutritionlab.service;

import org.federicopoggi.backendhealthynutritionlab.DtoPayload.DoctorPaylodSave;
import org.federicopoggi.backendhealthynutritionlab.model.Nutritionist;
import org.federicopoggi.backendhealthynutritionlab.model.PersonalTrainer;
import org.federicopoggi.backendhealthynutritionlab.model.Role;
import org.federicopoggi.backendhealthynutritionlab.repository.NutritionistDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.PersonalTrainerDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {
    NutritionistDAO nutritionistDAO;

    PersonalTrainerDAO pt;

    @Autowired
    public DoctorService(NutritionistDAO nutritionistDAO, PersonalTrainerDAO pt) {
        this.nutritionistDAO = nutritionistDAO;
        this.pt = pt;
    }

    public void saveDoctor(DoctorPaylodSave dps) {
        String role = dps.role()
                         .toUpperCase();

        switch (role) {
            case "NUTRITIONIST":
                Nutritionist d = new Nutritionist();
                d.setName(dps.name());
                d.setSurname(dps.surname());
                d.setCellNumber(dps.cellNumber());
                d.setEmail(dps.email());
                d.setPassword(dps.password());
                d.setRole(Role.NUTRITIONIST);
                nutritionistDAO.save(d);
                break;
            case "PERSONAL_TRAINER":
                PersonalTrainer p = new PersonalTrainer();
                p.setName(dps.name());
                p.setSurname(dps.surname());
                p.setCellNumber(dps.cellNumber());
                p.setEmail(dps.email());
                p.setPassword(dps.password());
                p.setRole(Role.PERSONAL_TRAINER);
                pt.save(p);
                break;
        }

    }
}

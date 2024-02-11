package org.federicopoggi.backendhealthynutritionlab.service;

import org.federicopoggi.backendhealthynutritionlab.DTOResponse.ResponseDoctor;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.DoctorPaylodSave;
import org.federicopoggi.backendhealthynutritionlab.Exception.UnauthorizedException;
import org.federicopoggi.backendhealthynutritionlab.model.Nutritionist;
import org.federicopoggi.backendhealthynutritionlab.model.PersonalTrainer;
import org.federicopoggi.backendhealthynutritionlab.model.Role;
import org.federicopoggi.backendhealthynutritionlab.repository.NutritionistDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.PersonalTrainerDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class DoctorService {
    NutritionistDAO nutritionistDAO;

    PersonalTrainerDAO pt;
    PasswordEncoder bc;

    @Autowired
    public DoctorService(NutritionistDAO nutritionistDAO, PersonalTrainerDAO pt,PasswordEncoder bc) {
        this.nutritionistDAO = nutritionistDAO;
        this.pt = pt;
        this.bc=bc;
    }

    public ResponseDoctor saveDoctor(DoctorPaylodSave dps) throws AccessDeniedException {
        String role = dps.role()
                         .toUpperCase();
        try {
            switch (role) {
                case "NUTRITIONIST":
                    Nutritionist d = new Nutritionist();
                    d.setName(dps.name());
                    d.setSurname(dps.surname());
                    d.setCellNumber(dps.cellNumber());
                    d.setEmail(dps.email());
                    d.setPassword(bc.encode(dps.password()));
                    d.setRole(Role.NUTRITIONIST);
                    nutritionistDAO.save(d);
                    return new ResponseDoctor(d.getUserId());
                case "PERSONAL_TRAINER":
                    PersonalTrainer p = new PersonalTrainer();
                    p.setName(dps.name());
                    p.setSurname(dps.surname());
                    p.setCellNumber(dps.cellNumber());
                    p.setEmail(dps.email());
                    p.setPassword(bc.encode(dps.password()));
                    p.setRole(Role.PERSONAL_TRAINER);
                    pt.save(p);
                    return new ResponseDoctor(p.getUserId());
                default: new ResponseDoctor(null, "Devi inserire il tipo");
            }
        } catch (RuntimeException e) {
            throw new AccessDeniedException(e.getMessage()) ;
        }
        return null;
    }
}

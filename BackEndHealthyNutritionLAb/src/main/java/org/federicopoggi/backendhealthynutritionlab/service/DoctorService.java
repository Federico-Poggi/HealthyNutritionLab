package org.federicopoggi.backendhealthynutritionlab.service;

import org.federicopoggi.backendhealthynutritionlab.DTOResponse.ResponseDoctor;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.DoctorPaylodSave;
import org.federicopoggi.backendhealthynutritionlab.Exception.NotFoundException;
import org.federicopoggi.backendhealthynutritionlab.Exception.UnauthorizedException;
import org.federicopoggi.backendhealthynutritionlab.model.*;
import org.federicopoggi.backendhealthynutritionlab.repository.NutritionistDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.PersonalTrainerDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Service
public class DoctorService {
    NutritionistDAO nutritionistDAO;
    PersonalTrainerDAO pt;
    PasswordEncoder bc;
    UserDAO ud;

    @Autowired
    public DoctorService(NutritionistDAO nutritionistDAO, PersonalTrainerDAO pt,PasswordEncoder bc,UserDAO ud) {
        this.nutritionistDAO = nutritionistDAO;
        this.pt = pt;
        this.bc=bc;
        this.ud=ud;
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

    public Page<Customer> getAllNutritionPatient(Long id ,int page, int size, String sortedBy){
        if(size>30){
            size=30;
        }
        Nutritionist n=nutritionistDAO.findById(id).orElseThrow(()-> new NotFoundException("Nutrizionista non trovato"));
        System.out.println(n.toString());
        Pageable p=PageRequest.of(page,size,Sort.by(sortedBy));
        List<Customer> customers= n.getCustomers() != null? n.getCustomers(): Collections.emptyList();
        long sizeList= customers.size();
        return new PageImpl<>(customers, p, sizeList);
    }
}

package org.federicopoggi.backendhealthynutritionlab.service;

import org.federicopoggi.backendhealthynutritionlab.DTOResponse.DietResponse;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.ResponseDoctor;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.DietPayload;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.DoctorPaylodSave;
import org.federicopoggi.backendhealthynutritionlab.Exception.BadRequestException;
import org.federicopoggi.backendhealthynutritionlab.Exception.NotFoundException;
import org.federicopoggi.backendhealthynutritionlab.model.*;
import org.federicopoggi.backendhealthynutritionlab.model.Enum.Actually;
import org.federicopoggi.backendhealthynutritionlab.model.Enum.DietType;
import org.federicopoggi.backendhealthynutritionlab.model.Enum.Duration;
import org.federicopoggi.backendhealthynutritionlab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;


@Service
public class DoctorService {
    NutritionistDAO nutritionistDAO;

    PersonalTrainerDAO pt;

    PasswordEncoder bc;

    CustomerDAO cs;

    DocDAO dc;

    AlimentoDAO al;

    DietDAO dt;


    @Autowired
    public DoctorService(NutritionistDAO nutritionistDAO,
                         PersonalTrainerDAO pt,
                         PasswordEncoder bc,
                         CustomerDAO cs,
                         DocDAO dc,
                         AlimentoDAO al,
                         DietDAO dt) {
        this.nutritionistDAO = nutritionistDAO;
        this.pt = pt;
        this.bc = bc;
        this.cs = cs;
        this.dc = dc;
        this.al = al;
        this.dt = dt;
    }


    public ResponseDoctor saveDoctor(DoctorPaylodSave dps) throws AccessDeniedException, BadRequestException {
        boolean isPresent = dc.findByEmail(dps.email())
                              .isPresent();
        if (isPresent) {
            throw new BadRequestException("Utente con email " + dps.email() + " esiste già");
        }
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
                    dc.save(d);
                    return new ResponseDoctor(d.getIdDoctor());
                case "PERSONAL_TRAINER":
                    PersonalTrainer p = new PersonalTrainer();
                    p.setName(dps.name());
                    p.setSurname(dps.surname());
                    p.setCellNumber(dps.cellNumber());
                    p.setEmail(dps.email());
                    p.setPassword(bc.encode(dps.password()));
                    p.setRole(Role.PERSONAL_TRAINER);
                    dc.save(p);
                    return new ResponseDoctor(p.getIdDoctor());
                default:
                    new ResponseDoctor(null, "Devi inserire il tipo");
            }
        } catch (RuntimeException e) {
            throw new AccessDeniedException(e.getMessage());
        }
        return null;
    }

    //CLIENTI DEL NUTRIZIONISTA
    public Page<Customer> getAllNutritionPatient(Long id, int page, int size, String sortedBy) {
        if (size > 30) {
            size = 30;
        }
        Nutritionist n = nutritionistDAO.findById(id)
                                        .orElseThrow(() -> new NotFoundException("Nutrizionista non trovato"));
        System.out.println(n.toString());
        Pageable p = PageRequest.of(page, size, Sort.by(sortedBy));
        List<Customer> customers = n.getCustomers() != null ? n.getCustomers() : Collections.emptyList();
        long sizeList = customers.size();
        return new PageImpl<>(customers, p, sizeList);
    }

    //CLIENTI DEL PERSONAL TRAINER

    public Page<Customer> getAllPersonalCustomer(Long id, int page, int size, String sortedBy) {
        if (size > 30) {
            size = 30;
        }
        PersonalTrainer n = pt.findById(id)
                              .orElseThrow(() -> new NotFoundException("Nutrizionista non trovato"));
        Pageable p = PageRequest.of(page, size, Sort.by(sortedBy));
        List<Customer> customers = n.getCustomers() != null ? n.getCustomers() : Collections.emptyList();
        long sizeList = customers.size();
        return new PageImpl<>(customers, p, sizeList);
    }

    public Page<Alimento> getAllAliments(int page, int size, String sortedBy) {
        if (size > 30) {
            size = 30;
        }

        Pageable p = PageRequest.of(page, size, Sort.by(sortedBy));
        return al.findAll(p);
    }

    public DietResponse createDiet(Long idCustomer, DietPayload dp) throws NotFoundException {
        Customer c = cs.findById(idCustomer)
                       .orElseThrow(() -> new NotFoundException("Utente non trovato"));
        List<AlimentoAndQuantita> alimentoAndQuantitaList = Arrays.asList(dp.alimentoAndQuantita());
        Diet newDiet = new Diet();
        newDiet.setDietType(DietType.valueOf(dp.dietType()));
        newDiet.setActually(Actually.IN_USE);
        newDiet.setDuration(Duration.valueOf(dp.duration()));
        newDiet.setIssueDate(LocalDate.now());
        newDiet.setExpirationDate(dp.expirationDate());
        newDiet.setCustomer(c);
        for (AlimentoAndQuantita alimentoAndQuantita : alimentoAndQuantitaList) {
            Alimento a = al.findById(alimentoAndQuantita.getIdAlimento())
                           .orElseThrow(() -> new NotFoundException("Alimento non trovato reinserisci nuovamente"));
            newDiet.getAlimentiQuantita()
                   .put(a.getName(), alimentoAndQuantita.getQuantita());
        }


        dt.save(newDiet);
        c.getDiets().add(newDiet);
        return new DietResponse(c.getIdCliente(), newDiet.getDietId());
    }
}

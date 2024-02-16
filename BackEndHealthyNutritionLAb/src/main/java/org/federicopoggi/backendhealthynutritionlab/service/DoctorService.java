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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
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
    public Page<Customer> getAllPatient(UserDetails us, int page, int size, String sortedBy) {
        if (size > 30) {
            size = 30;
        }
        List<Customer> customers = nutritionistDAO.getAllPatient(us.getUsername());

        Pageable p = PageRequest.of(page, size, Sort.by(sortedBy));
        /*List<Customer> customers = n.getCustomers() != null ? n.getCustomers() : Collections.emptyList();*/
        long sizeList = customers.size();
        return new PageImpl<>(customers, p, sizeList);
    }

    //CLIENTI DEL PERSONAL TRAINER

   /* public Page<Customer> getAllPersonalCustomer(Long id, int page, int size, String sortedBy) {
        if (size > 30) {
            size = 30;
        }
        PersonalTrainer n = pt.findById(id)
                              .orElseThrow(() -> new NotFoundException("Nutrizionista non trovato"));
        Pageable p = PageRequest.of(page, size, Sort.by(sortedBy));
        List<Customer> customers = n.getCustomers() != null ? n.getCustomers() : Collections.emptyList();
        long sizeList = customers.size();
        return new PageImpl<>(customers, p, sizeList);
    }*/

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
        switch (dp.duration()) {
            case "BIMESTRALE":
                newDiet.setDuration(Duration.BIMONTHLY);
                newDiet.setExpirationDate(LocalDate.now()
                                                   .plusMonths(2));
                break;
            case "MENSILE":
                newDiet.setDuration(Duration.MONTHLY);
                newDiet.setExpirationDate(LocalDate.now()
                                                   .plusMonths(1));
                break;
            case "SETTIMANALE":
                newDiet.setDuration(Duration.WEEKLY);
                newDiet.setExpirationDate(LocalDate.now()
                                                   .plusWeeks(1));
                break;
        }
        switch (dp.dietType()) {
            case "DIMAGRIMENTO":
                newDiet.setDietType(DietType.WEIGHT_LOSS);
                break;
            case "MASSA MUSCOLARE":
                newDiet.setDietType(DietType.BULK);
                break;
            case "VEGANA":
                newDiet.setDietType(DietType.VEGAN);
                break;
            case "VEGETARIANA":
                newDiet.setDietType(DietType.VEGETARIAN);
                break;
            case "ALTRO":
                newDiet.setDietType(DietType.OTHER);
                break;
        }
        newDiet.setActually(Actually.IN_USE);
        newDiet.setIssueDate(LocalDate.now());
        newDiet.setCustomer(c);
        for (AlimentoAndQuantita alimentoAndQuantita : alimentoAndQuantitaList) {
            Alimento a = al.findById(alimentoAndQuantita.getIdAlimento())
                           .orElseThrow(() -> new NotFoundException("Alimento non trovato reinserisci nuovamente"));
            newDiet.getAlimentiQuantita()
                   .put(a.getName(), alimentoAndQuantita.getQuantita());
        }
        dt.save(newDiet);
        c.getDiets()
         .add(newDiet);
        return new DietResponse(c.getIdCliente(), newDiet.getDietId());
    }
}

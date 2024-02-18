package org.federicopoggi.backendhealthynutritionlab.service;

import org.federicopoggi.backendhealthynutritionlab.DTOResponse.UserDietResponse;
import org.federicopoggi.backendhealthynutritionlab.Exception.AlreadyAssignException;
import org.federicopoggi.backendhealthynutritionlab.Exception.NotFoundException;
import org.federicopoggi.backendhealthynutritionlab.model.*;
import org.federicopoggi.backendhealthynutritionlab.repository.CustomerDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.DocDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.NutritionistDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.PersonalTrainerDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserSevice {

    DocDAO docD;
    CustomerDAO cs;
    PersonalTrainerDAO p;
    NutritionistDAO n;

    @Autowired
    public UserSevice( CustomerDAO cs, PersonalTrainerDAO p, NutritionistDAO n,DocDAO d) {
        this.cs = cs;
        this.n = n;
        this.p = p;
        this.docD=d;
    }

    public Customer findById(Long id) throws NotFoundException {
        return cs.findById(id)
                      .orElseThrow(() -> new NotFoundException("Utente con id " + id + " non trovato"));
    }

    public List<Customer> getAll(){
        return cs.findAll();
    }

    public void assignDoctor(Long userId, Long doctorId) {
        Customer user = cs.findById(userId)
                           .orElseThrow(() -> new NotFoundException("USer non trovato ricontrollare l'id inserito"));
        Doc doc = docD.findById(doctorId)
                    .orElseThrow(() -> new NotFoundException("Dottore non trovato ricontrollare l'id inserito"));
        /*if (doc instanceof Nutritionist){

            System.out.println(doc.getRole().name());
            System.out.println("é un nutrizionista");
        }else {
            System.out.println("è un personal trainer");
        }*/

        if (user.getNutritionist() != null) {
            throw new AlreadyAssignException();
        } else {
            if (doc.getRole()
                   .name()
                   .equals("NUTRITIONIST")) {
                user.setNutritionist((Nutritionist) doc);

            } else if (doc.getRole()
                          .name()
                          .equals("PERSONAL_TRAINER")) {
                if (user.getPersonalTrainer() != null) {
                    throw new AlreadyAssignException();
                } else {
                    user.setPersonalTrainer((PersonalTrainer) doc);

                }
            }
        }
        cs.save(user);
    }

    /*{
        String docRole = doc.getRole()
                            .name();
        newCus.setUserId(userId);
        newCus.setName(user.getName());
        newCus.setSurname(user.getSurname());
        newCus.setCellNumber(user.getCellNumber());
        newCus.setEmail(user.getEmail());
        newCus.setRole(Role.USER);
        newCus.setPassword(user.getPassword());
        newCus.setBirthday(user.getBirthday());
        switch (docRole) {
            case "NUTRITIONIST":
                newCus.setNutritionist((Nutritionist) doc);
                ((Nutritionist) doc).getCustomers()
                                    .add(newCus);
                break;
            case "PERSONAL_TRAINER":
                newCus.setPersonalTrainer((PersonalTrainer) doc);
                ((PersonalTrainer) doc).getCustomers()
                                       .add(newCus);
                break;
        }
    }*/
    public UserDietResponse getMyDiets(String email) throws NotFoundException{
        Customer c= cs.findByEmail(email).orElseThrow(()->new NotFoundException("user non trovato"));
        List<Diet> myDIetList=c.getDiets();
        return new UserDietResponse(myDIetList);
    }

}


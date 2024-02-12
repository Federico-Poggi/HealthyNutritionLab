package org.federicopoggi.backendhealthynutritionlab.service;

import org.federicopoggi.backendhealthynutritionlab.Exception.AlreadyAssignException;
import org.federicopoggi.backendhealthynutritionlab.Exception.NotFoundException;
import org.federicopoggi.backendhealthynutritionlab.model.*;
import org.federicopoggi.backendhealthynutritionlab.repository.CustomerDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.NutritionistDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.PersonalTrainerDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserSevice {

    UserDAO userDAO;
    CustomerDAO cs;
    PersonalTrainerDAO p;

    NutritionistDAO n;
    @Autowired
    public UserSevice(UserDAO userDAO, CustomerDAO cs,PersonalTrainerDAO p,NutritionistDAO n) {
        this.userDAO = userDAO;
        this.cs=cs;
        this.n=n;
        this.p=p;
    }

    public User findById(Long id) throws NotFoundException{
        return userDAO.findById(id).orElseThrow(()->new NotFoundException("Utente con id " + id +" non trovato"));
    }

    public void assignDoctor(Long userId,Long doctorId){
        User user = userDAO.findById(userId).orElseThrow(()->new NotFoundException("USer non trovato ricontrollare l'id inserito"));
        User doc= userDAO.findById(doctorId).orElseThrow(()->new NotFoundException("Dottore non trovato ricontrollare l'id inserito"));
        Customer newCus=new Customer();
        String docRole=doc.getRole().name();
            newCus.setUserId(userId);
            newCus.setName(user.getName());
            newCus.setSurname(user.getSurname());
            newCus.setCellNumber(user.getCellNumber());
            newCus.setEmail(user.getEmail());
            newCus.setRole(Role.USER);
            newCus.setPassword(user.getPassword());
            newCus.setBirthday(user.getBirthday());
            switch (docRole){
                case "NUTRITIONIST":
                    newCus.setNutritionist((Nutritionist) doc);
                     ((Nutritionist) doc).getCustomers().add(newCus);
                    break;
                case "PERSONAL_TRAINER":
                    newCus.setPersonalTrainer((PersonalTrainer) doc);
                    ((PersonalTrainer)doc).getCustomers().add(newCus);
                    break;
            }
            userDAO.save(newCus);
        /*}*//*else{
            Customer found=cs.findById(userId).get();
            if(docRole.equals("NUTRITIONIST")){
                Nutritionist userNutritionist=found.getNutritionist();
                if(userNutritionist!=null){
                    throw new AlreadyAssignException();
                }
                else {
                    found.setNutritionist((Nutritionist) doc);
                    ((Nutritionist) doc).getCustomers().add(found);
                    userDAO.save(found);
                    n.save((Nutritionist) doc);
                }
            }else if(docRole.equals("PERSONAL_TRAINER")){
                PersonalTrainer personalUser=found.getPersonalTrainer();
                if (personalUser!=null){
                    throw new AlreadyAssignException();

                }else {
                    found.setPersonalTrainer((PersonalTrainer) doc);
                    ((PersonalTrainer) doc).getCustomers().add(found);
                    userDAO.save(found);
                    p.save((PersonalTrainer) doc);
                }*/

            /*}*/

        /*}*/

    }

}

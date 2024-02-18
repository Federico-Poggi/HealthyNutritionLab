package org.federicopoggi.backendhealthynutritionlab.controller;

import org.federicopoggi.backendhealthynutritionlab.DTOResponse.ResponseDoctor;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.UserDietResponse;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.DoctorPaylodSave;
import org.federicopoggi.backendhealthynutritionlab.Exception.AlreadyAssignException;
import org.federicopoggi.backendhealthynutritionlab.Exception.BadRequestException;
import org.federicopoggi.backendhealthynutritionlab.Exception.UnauthorizedException;
import org.federicopoggi.backendhealthynutritionlab.model.Customer;
import org.federicopoggi.backendhealthynutritionlab.service.DoctorService;
import org.federicopoggi.backendhealthynutritionlab.service.UserSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    /*
    * TODO:
    *  - Modificare funzione getAll e impaginarla
    *  - Da aggiungere Get per visualizzare le proprie diete o schede di allenamento
    *  - AGGIUNGERE POSSIBILITA DI UN IMMAGINE PROFILO
    *  .....
    * */

    DoctorService doctorService;
    UserSevice us;

    @Autowired
    public UserController(DoctorService doctorService,UserSevice us) {
        this.doctorService = doctorService;
        this.us=us;
    }
    /*GETT MAPPING*/

    //Funzione da modificare
    @GetMapping
    public List<Customer> getall(){
        return us.getAll();
    }

    @GetMapping("/{idCustomer}")
    public Customer getById(@PathVariable Long idCustomer){
        return us.findById(idCustomer);
    }

    @GetMapping("/me/diets")
    @ResponseStatus(HttpStatus.OK)
    public UserDietResponse getDiet(@AuthenticationPrincipal UserDetails userDetails){
        String emailCustomer=userDetails.getUsername();
        return us.getMyDiets(emailCustomer);
    }


    /*POST MAPPING*/




}

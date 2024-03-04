package org.federicopoggi.backendhealthynutritionlab.controller;

import org.federicopoggi.backendhealthynutritionlab.DTOResponse.ImgResponse;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.UrlImgProfile;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.UserDietResponse;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.UserDoctorRespons;
import org.federicopoggi.backendhealthynutritionlab.model.Customer;
import org.federicopoggi.backendhealthynutritionlab.service.DoctorService;
import org.federicopoggi.backendhealthynutritionlab.service.UserSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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
    public UserController(DoctorService doctorService, UserSevice us) {
        this.doctorService = doctorService;
        this.us = us;
    }
    /*GETT MAPPING*/

    @GetMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getMe(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            return ResponseEntity.of(Optional.ofNullable(userDetails));
        } else {
            return ResponseEntity.status(401)
                                 .body("Utente non autenticato effettuare il login");
        }

    }

    //Funzione da modificare
    @GetMapping
    public List<Customer> getall() {
        return us.getAll();
    }

    @GetMapping("/{idCustomer}")
    public Customer getById(@PathVariable Long idCustomer) {
        return us.findById(idCustomer);
    }

    @GetMapping("/me/diets")
    @ResponseStatus(HttpStatus.OK)
    public UserDietResponse getDiet(@AuthenticationPrincipal UserDetails userDetails) {
        String emailCustomer = userDetails.getUsername();
        return us.getMyDiets(emailCustomer);
    }

    @GetMapping("/me/profile")
    @ResponseStatus(HttpStatus.OK)
    public Customer me(@AuthenticationPrincipal UserDetails me) {
        return us.getMe(me.getUsername());
    }

    @GetMapping("/me/myDoc")
    @ResponseStatus(HttpStatus.OK)
    public UserDoctorRespons getMyDoc(@AuthenticationPrincipal UserDetails me) {
        return us.myDoc(me.getUsername());
    }

    @GetMapping("me/imgProfile")
    @ResponseStatus(HttpStatus.OK)
    public ImgResponse getImg(@AuthenticationPrincipal UserDetails me) {
        return us.getMyImg(me.getUsername());
    }

    /*POST MAPPING*/

    @PostMapping("/me/imgUpload")
    @ResponseStatus(HttpStatus.OK)
    public UrlImgProfile uploadImg(@AuthenticationPrincipal UserDetails me, @RequestParam("avatar") MultipartFile file)
            throws IOException {
        return us.uploadImg(me.getUsername(), file);
    }


}

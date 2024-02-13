package org.federicopoggi.backendhealthynutritionlab.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.DietResponse;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.ResponseDoctor;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.DietPayload;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.DoctorPaylodSave;
import org.federicopoggi.backendhealthynutritionlab.model.Alimento;
import org.federicopoggi.backendhealthynutritionlab.model.Customer;
import org.federicopoggi.backendhealthynutritionlab.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;

@RestController
@RequestMapping("/doctor")
/*@Api(tags = "prova controller",value = "Controller operazioni doc")*/
public class DoctorController {
    @Autowired
    DoctorService docS;

    @GetMapping("/me")
    public ResponseEntity<?> getMe(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            return ResponseEntity.of(Optional.ofNullable(userDetails));
        } else {
            return ResponseEntity.status(401)
                                 .body("Utente non autenticato effettuare il login");
        }

    }


    @GetMapping("/nutritionist/{idNutrizionista}/patients")
    @PreAuthorize("hasAuthority('NUTRITIONIST')")
    @ResponseStatus(HttpStatus.OK)
    public Page<Customer> getAllNutritionPatient(@PathVariable Long idNutrizionista,
                                                 @RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size,
                                                 @RequestParam(defaultValue = "userId") String sortedBy) {

        return docS.getAllNutritionPatient(idNutrizionista, page, size, sortedBy);
    }

    @GetMapping("/nutritionist/aliments")
    @PreAuthorize("hasAuthority('NUTRITIONIST')")
    @ResponseStatus(HttpStatus.OK)
    public Page<Alimento> getAllAliments(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "30") int size,
                                         @RequestParam(defaultValue = "idAlimento") String sortedBy) {
        return docS.getAllAliments(page, size, sortedBy);
    }





    @GetMapping("/personalTrainer/{idPersonalTrainer}/patients")
    @PreAuthorize("hasAuthority('PERSONAL_TRAINER')")
    @ResponseStatus(HttpStatus.OK)
    public Page<Customer> getAllPersonalCustomer(@PathVariable Long idPersonalTrainer,
                                                 @RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size,
                                                 @RequestParam(defaultValue = "userId") String sortedBy) {
        return docS.getAllPersonalCustomer(idPersonalTrainer, page, size, sortedBy);
    }

    @PostMapping("/me/diet")
    @PreAuthorize("hasAuthority('NUTRITIONIST')")
    public DietResponse assignDiet(@AuthenticationPrincipal UserDetails userDetails,
                                   @RequestParam(required = true) Long idCustomer,
                                   @RequestBody @Validated DietPayload dp){
        return docS.createDiet(idCustomer,dp);

    }
    @PostMapping("/newDoctor")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDoctor saveDoctor(@RequestBody @Validated DoctorPaylodSave dps, BindingResult bd)
            throws AccessDeniedException {
        if (!bd.hasErrors()) {
            return docS.saveDoctor(dps);
        } else {
            throw new IllegalArgumentException("Invalid doctor data");
        }
    }


}

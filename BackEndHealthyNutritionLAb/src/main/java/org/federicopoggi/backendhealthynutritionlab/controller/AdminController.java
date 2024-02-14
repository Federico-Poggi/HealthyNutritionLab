package org.federicopoggi.backendhealthynutritionlab.controller;

import org.federicopoggi.backendhealthynutritionlab.DTOResponse.ResponseDoctor;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.DoctorPaylodSave;
import org.federicopoggi.backendhealthynutritionlab.Exception.AlreadyAssignException;
import org.federicopoggi.backendhealthynutritionlab.service.DoctorService;
import org.federicopoggi.backendhealthynutritionlab.service.UserSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {
    DoctorService docS;

    UserSevice us;

    @Autowired
    public AdminController(DoctorService docS, UserSevice us) {
        this.docS = docS;
        this.us = us;
    }

    /* --- SALVARE UN DOTTORE SOLO ADMIN --- */

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

    /* --- ASSEGNARE UN DOTTORE (NUTRIZIONISTA O PERSONAL TRAINER) AD UN CLIENTE ---*/

    @PutMapping("assign/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public void assignDoctor(@PathVariable Long userId, @RequestParam(required = true) Long doctorId)
            throws AlreadyAssignException {
        us.assignDoctor(userId, doctorId);
    }

}

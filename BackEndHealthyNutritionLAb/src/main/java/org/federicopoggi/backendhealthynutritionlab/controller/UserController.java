package org.federicopoggi.backendhealthynutritionlab.controller;

import org.federicopoggi.backendhealthynutritionlab.DTOResponse.ResponseDoctor;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.DoctorPaylodSave;
import org.federicopoggi.backendhealthynutritionlab.Exception.BadRequestException;
import org.federicopoggi.backendhealthynutritionlab.Exception.UnauthorizedException;
import org.federicopoggi.backendhealthynutritionlab.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    DoctorService doctorService;

    @Autowired
    public UserController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }
    /*GETT MAPPING*/




    /*POST MAPPING*/

    @PostMapping("/doctor")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDoctor saveDoctor(@RequestBody @Validated DoctorPaylodSave dps, BindingResult bd) throws AccessDeniedException{
        if (!bd.hasErrors()) {
            return doctorService.saveDoctor(dps);
        }else {
            throw new IllegalArgumentException("Invalid doctor data");
        }
    }

}

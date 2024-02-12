package org.federicopoggi.backendhealthynutritionlab.controller;

import org.federicopoggi.backendhealthynutritionlab.DTOResponse.ResponseDoctor;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.DoctorPaylodSave;
import org.federicopoggi.backendhealthynutritionlab.Exception.AlreadyAssignException;
import org.federicopoggi.backendhealthynutritionlab.Exception.BadRequestException;
import org.federicopoggi.backendhealthynutritionlab.Exception.UnauthorizedException;
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
@RequestMapping("/user")
public class UserController {

    DoctorService doctorService;
    UserSevice us;

    @Autowired
    public UserController(DoctorService doctorService,UserSevice us) {
        this.doctorService = doctorService;
        this.us=us;
    }
    /*GETT MAPPING*/




    /*POST MAPPING*/


    @PutMapping("assign/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public void assignDoctor(@PathVariable Long userId, @RequestParam(required = true) Long doctorId) throws AlreadyAssignException {
        us.assignDoctor(userId,doctorId);
    }

}

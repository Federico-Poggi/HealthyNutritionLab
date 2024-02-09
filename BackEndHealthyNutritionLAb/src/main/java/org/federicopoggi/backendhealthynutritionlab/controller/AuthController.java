package org.federicopoggi.backendhealthynutritionlab.controller;

import jakarta.validation.ConstraintViolationException;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.RegisterResponse;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.RegisterUserPayload;
import org.federicopoggi.backendhealthynutritionlab.Exception.BadRequestException;
import org.federicopoggi.backendhealthynutritionlab.Exception.ValidationErrorMessage;
import org.federicopoggi.backendhealthynutritionlab.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthService authService;
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public RegisterResponse registerUser(@RequestBody @Validated RegisterUserPayload rup, BindingResult bd){
        if(bd.hasErrors()){
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bd.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            /*return new ValidationErrorMessage(HttpStatus.BAD_REQUEST.toString(),"Controlla i campi inseriti",errors);*/
            FieldError error=bd.getFieldErrors().get(0);
           throw new BadRequestException(error.getDefaultMessage());
        }else{
            return authService.registerUser(rup);
        }
    }



}

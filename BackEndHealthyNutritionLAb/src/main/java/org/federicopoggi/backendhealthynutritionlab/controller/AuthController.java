package org.federicopoggi.backendhealthynutritionlab.controller;

import jakarta.validation.ConstraintViolationException;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.RegisterResponse;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.UserLoginResponse;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.RegisterUserPayload;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.UserPayload;
import org.federicopoggi.backendhealthynutritionlab.Exception.BadRequestException;
import org.federicopoggi.backendhealthynutritionlab.Exception.ValidationErrorMessage;
import org.federicopoggi.backendhealthynutritionlab.service.AuthService;
import org.jose4j.lang.JoseException;
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
            FieldError error=bd.getFieldErrors().get(0);
           throw new BadRequestException(error.getDefaultMessage());
        }else{
            return authService.registerUser(rup);
        }
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public UserLoginResponse login(@RequestBody @Validated UserPayload usp, BindingResult b) throws JoseException {
        if(b.hasErrors()){
            FieldError error=b.getFieldErrors().get(0);
            throw new BadRequestException(error.getDefaultMessage());
        }else {
            return authService.login(usp);
        }
    }

}

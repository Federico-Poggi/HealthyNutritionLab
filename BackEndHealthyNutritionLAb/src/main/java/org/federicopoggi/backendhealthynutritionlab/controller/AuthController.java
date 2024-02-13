package org.federicopoggi.backendhealthynutritionlab.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import jakarta.validation.ConstraintViolationException;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.RegisterResponse;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.ResponseDoctor;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.UserLoginResponse;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.DoctorPaylodSave;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.RegisterUserPayload;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.UserPayload;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.ValidationTokenDTO;
import org.federicopoggi.backendhealthynutritionlab.Exception.BadRequestException;
import org.federicopoggi.backendhealthynutritionlab.Exception.ValidationErrorMessage;
import org.federicopoggi.backendhealthynutritionlab.service.AuthService;
import org.federicopoggi.backendhealthynutritionlab.service.DoctorService;
import org.jose4j.jwt.MalformedClaimException;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.lang.JoseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    AuthService authService;
    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /* -------------- REGISTRAZIONE UTENTE ----------- */


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

    /* ---------- LOGIN UTENTE E DOC ------------- */

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

    /* ---------- VERIFICA TOKEN PER RUOLI NEL FRONTEND ------------ */

    @PostMapping("/verifyToken")
    @ResponseStatus(HttpStatus.OK)
    public void verificaToken(@RequestBody ValidationTokenDTO token) throws InvalidJwtException, JoseException, MalformedClaimException {
        authService.verifyToken(token.token());
    }

}

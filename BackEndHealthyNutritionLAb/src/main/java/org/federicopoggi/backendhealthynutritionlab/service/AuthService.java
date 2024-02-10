package org.federicopoggi.backendhealthynutritionlab.service;

import org.federicopoggi.backendhealthynutritionlab.DTOResponse.RegisterResponse;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.UserLoginResponse;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.RegisterUserPayload;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.UserPayload;
import org.federicopoggi.backendhealthynutritionlab.Exception.BadRequestException;
import org.federicopoggi.backendhealthynutritionlab.Exception.ValidationErrorMessage;
import org.federicopoggi.backendhealthynutritionlab.model.Customer;
import org.federicopoggi.backendhealthynutritionlab.model.Role;
import org.federicopoggi.backendhealthynutritionlab.model.User;
import org.federicopoggi.backendhealthynutritionlab.repository.UserDAO;
import org.federicopoggi.backendhealthynutritionlab.security.JWTools;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.MalformedClaimException;
import org.jose4j.jwt.NumericDate;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.lang.JoseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    UserDAO userDAO;

    @Autowired
    PasswordEncoder psEncoder;

    @Autowired
    JWTools jwTools;

    public RegisterResponse registerUser(RegisterUserPayload rup) throws BadRequestException {

        try {
            Optional<User> user = userDAO.findByEmail(rup.mail());
            if (user.isPresent()) {
                throw new BadRequestException("User con email: " + rup.mail() + " esiste già");
            } else {
                Customer newUser = new Customer();
                if (!rup.cellNumber()
                        .startsWith("+39")) {
                    StringBuilder sp = new StringBuilder(rup.cellNumber());
                    sp.insert(0, "+39 ");
                    newUser.setCellNumber(String.valueOf(sp));
                } else {
                    newUser.setCellNumber(rup.cellNumber());
                }
                newUser.setName(rup.name());
                newUser.setSurname(rup.surname());
                newUser.setEmail(rup.mail());
                newUser.setPassword(psEncoder.encode(rup.password()));
                newUser.setRole(Role.USER);

                userDAO.save(newUser);
                return new RegisterResponse("User registrato con successo", newUser.getUserId());
            }
        } catch (RuntimeException e) {
            throw new BadRequestException(e.getMessage());
        }

    }

    public UserLoginResponse login(UserPayload userLogin) throws JoseException, BadRequestException{
        boolean foundUser = userDAO.findByEmail(userLogin.email())
                                   .isPresent();
        if (foundUser) {
            User found = userDAO.findByEmail(userLogin.email())
                                .orElseThrow(() -> new BadRequestException("User non trovato"));
            if (psEncoder.matches(userLogin.password(), found.getPassword())) {
                return new UserLoginResponse(jwTools.generateToken(found));
            }
        } else {
            throw new BadRequestException("Rieffettuare il login");
        }
        return null;
    }

    public boolean verifyToken(String token) throws InvalidJwtException, JoseException, MalformedClaimException {
        NumericDate n=NumericDate.now();
        System.out.println(n);
        try{
            System.out.println(token);
            jwTools.validateToken(token);
            return true;
        }catch (RuntimeException e){
            System.out.println(e.getMessage());
            return false;
        }

    }
}


package org.federicopoggi.backendhealthynutritionlab.service;

import org.federicopoggi.backendhealthynutritionlab.DTOResponse.RegisterResponse;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.UserLoginResponse;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.RegisterUserPayload;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.UserPayload;
import org.federicopoggi.backendhealthynutritionlab.Exception.BadRequestException;
import org.federicopoggi.backendhealthynutritionlab.Exception.NotFoundException;
import org.federicopoggi.backendhealthynutritionlab.model.Customer;
import org.federicopoggi.backendhealthynutritionlab.model.Doc;
import org.federicopoggi.backendhealthynutritionlab.model.Role;
import org.federicopoggi.backendhealthynutritionlab.repository.CustomerDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.DocDAO;
import org.federicopoggi.backendhealthynutritionlab.security.JWTools;
import org.jose4j.jwt.MalformedClaimException;
import org.jose4j.jwt.NumericDate;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.lang.JoseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    CustomerDAO cs;

    @Autowired
    PasswordEncoder psEncoder;

    @Autowired
    JWTools jwTools;

    @Autowired
    DocDAO dc;

    public RegisterResponse registerUser(RegisterUserPayload rup) throws BadRequestException {

        try {
            Optional<Customer> user = cs.findByEmail(rup.mail());
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
                newUser.setRole(Role.CUSTOMER);

                cs.save(newUser);
                return new RegisterResponse("User registrato con successo", newUser.getIdCliente());
            }
        } catch (RuntimeException e) {
            throw new BadRequestException(e.getMessage());
        }

    }

    public UserLoginResponse login(UserPayload userLogin) throws JoseException, BadRequestException {

        boolean foundUser = cs.findByEmail(userLogin.email())
                              .isPresent();
        System.out.println(foundUser);
        boolean foundDoc = dc.findByEmail(userLogin.email())
                             .isPresent();
        if (foundUser) {
            Customer found = cs.findByEmail(userLogin.email())
                               .orElseThrow(() -> new BadRequestException("User non trovato"));
            if (psEncoder.matches(userLogin.password(), found.getPassword())) {
                return new UserLoginResponse(jwTools.generateToken(found));
            }
        } else if (foundDoc) {
            System.out.println("presente");
            Doc doc = dc.findByEmail(userLogin.email())
                        .orElseThrow(() -> new NotFoundException("Dottore non trovato"));
            if (psEncoder.matches(userLogin.password(), doc.getPassword())) {
                UserLoginResponse us = new UserLoginResponse(jwTools.generateTokenForDoc(doc));
                System.out.println(us.token());
                return us;
            } else {
                throw new BadRequestException("Credenziali non valide");
            }
        } else {
            throw new BadRequestException("Nessun utente con questa email trovato");
        }
        return null;
    }

    public Doc findById(Long id) {
        return dc.findById(id)
                 .orElseThrow(() -> new NotFoundException("Dottore non trovato"));
    }

    public boolean verifyToken(String token) throws InvalidJwtException, JoseException, MalformedClaimException {
        NumericDate n = NumericDate.now();
        System.out.println(n);
        try {
            System.out.println(token);
            jwTools.validateToken(token);
            return true;
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return false;
        }

    }
}


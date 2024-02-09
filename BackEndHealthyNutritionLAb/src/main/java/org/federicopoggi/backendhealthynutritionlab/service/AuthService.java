package org.federicopoggi.backendhealthynutritionlab.service;

import org.federicopoggi.backendhealthynutritionlab.DTOResponse.RegisterResponse;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.RegisterUserPayload;
import org.federicopoggi.backendhealthynutritionlab.Exception.BadRequestException;
import org.federicopoggi.backendhealthynutritionlab.Exception.ValidationErrorMessage;
import org.federicopoggi.backendhealthynutritionlab.model.Customer;
import org.federicopoggi.backendhealthynutritionlab.model.Role;
import org.federicopoggi.backendhealthynutritionlab.model.User;
import org.federicopoggi.backendhealthynutritionlab.repository.UserDAO;
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
    public RegisterResponse registerUser(RegisterUserPayload rup) throws BadRequestException {

        try {
            Optional<User> user= userDAO.findByEmail(rup.mail());
            if (user.isPresent()){
                throw new  BadRequestException("User con email: " + rup.mail() + " esiste già");
            }else{
                Customer newUser=new Customer();
                if (!rup.cellNumber().startsWith("+39")){
                    StringBuilder sp=new StringBuilder(rup.cellNumber());
                    sp.insert(0, "+39 " );
                    newUser.setCellNumber(String.valueOf(sp));
                }else{
                    newUser.setCellNumber(rup.cellNumber());
                }
                newUser.setName(rup.name());
                newUser.setSurname(rup.surname());
                newUser.setEmail(rup.mail());
                newUser.setPassword(psEncoder.encode(rup.password()));
                newUser.setRole(Role.USER);

                userDAO.save(newUser);
                return new RegisterResponse("User registrato con successo");
            }
        }catch (RuntimeException e){
            throw new BadRequestException(e.getMessage());
        }

    }
}

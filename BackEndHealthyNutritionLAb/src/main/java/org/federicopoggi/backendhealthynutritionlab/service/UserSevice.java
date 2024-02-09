package org.federicopoggi.backendhealthynutritionlab.service;

import org.federicopoggi.backendhealthynutritionlab.Exception.NotFoundException;
import org.federicopoggi.backendhealthynutritionlab.model.User;
import org.federicopoggi.backendhealthynutritionlab.repository.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserSevice {
    @Autowired
    UserDAO userDAO;
    public User findById(Long id) throws NotFoundException{
        return userDAO.findById(id).orElseThrow(()->new NotFoundException("Utente con id " + id +" non trovato"));
    }

}

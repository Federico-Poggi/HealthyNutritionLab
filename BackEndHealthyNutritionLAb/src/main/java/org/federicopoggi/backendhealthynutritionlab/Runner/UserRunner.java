package org.federicopoggi.backendhealthynutritionlab.Runner;

import org.federicopoggi.backendhealthynutritionlab.model.Doc;
import org.federicopoggi.backendhealthynutritionlab.model.Role;
import org.federicopoggi.backendhealthynutritionlab.repository.CustomerDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.DocDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserRunner implements CommandLineRunner {
    @Autowired
    DocDAO dc;
    @Autowired
    PasswordEncoder bp;

    @Override
    public void run(String... args) throws Exception {

       /* Doc admin=new Doc();
        admin.setName("admin");
        admin.setSurname("admin");
        admin.setEmail("admin@admin.com");
        admin.setPassword(bp.encode("admin123"));
        admin.setRole(Role.ADMIN);
        dc.save(admin);*/
    }
}

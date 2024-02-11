package org.federicopoggi.backendhealthynutritionlab.Runner;

import org.federicopoggi.backendhealthynutritionlab.model.Role;
import org.federicopoggi.backendhealthynutritionlab.model.User;
import org.federicopoggi.backendhealthynutritionlab.repository.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserRunner implements CommandLineRunner {
    @Autowired
    UserDAO us;
    @Autowired
    PasswordEncoder bp;

    @Override
    public void run(String... args) throws Exception {

        us.deleteAll();

        User user=new User();
        user.setName("Admin");
        user.setSurname("Admin");
        user.setEmail("admin@admin.com");
        user.setPassword(bp.encode("1234"));
        user.setRole(Role.ADMIN);
        us.save(user);

    }
}

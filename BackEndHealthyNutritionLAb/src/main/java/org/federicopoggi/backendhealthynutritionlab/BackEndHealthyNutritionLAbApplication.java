package org.federicopoggi.backendhealthynutritionlab;

import org.federicopoggi.backendhealthynutritionlab.model.Doctor;
import org.federicopoggi.backendhealthynutritionlab.model.PersonalTrainer;
import org.federicopoggi.backendhealthynutritionlab.repository.AlimentoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.IOException;

@SpringBootApplication
public class BackEndHealthyNutritionLAbApplication {

    public static void main(String[] args) throws IOException {

        SpringApplication.run(BackEndHealthyNutritionLAbApplication.class, args);
    }

}

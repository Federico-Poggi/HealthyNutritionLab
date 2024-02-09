package org.federicopoggi.backendhealthynutritionlab.Runner;

import org.federicopoggi.backendhealthynutritionlab.BackEndHealthyNutritionLAbApplication;
import org.federicopoggi.backendhealthynutritionlab.CsvReader;
import org.federicopoggi.backendhealthynutritionlab.repository.AlimentoDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.EsercizioDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class RunnerDb implements CommandLineRunner {
    @Autowired
    AlimentoDAO alimentoDAO;
    @Autowired
    EsercizioDAO esercizioDAO;
    @Override
    public void run(String... args) throws Exception {
        /*File file = new File("src/main/java/org/federicopoggi/backendhealthynutritionlab/DbAl.xlsx");
        CsvReader csvReader = new CsvReader();
        csvReader.saveAlimenti(file,alimentoDAO);*/
        /*File file=new File("src/main/java/org/federicopoggi/backendhealthynutritionlab/gymDataEx.csv");
        CsvReader csvReader = new CsvReader();
        csvReader.saveEx(file,esercizioDAO);*/
    }
}

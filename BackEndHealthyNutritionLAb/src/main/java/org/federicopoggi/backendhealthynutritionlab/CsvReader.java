package org.federicopoggi.backendhealthynutritionlab;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.federicopoggi.backendhealthynutritionlab.model.Alimenti;
import org.federicopoggi.backendhealthynutritionlab.model.Exercice;
import org.federicopoggi.backendhealthynutritionlab.repository.AlimentoDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.EsercizioDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.*;

@Component
public class CsvReader {

    public void saveAlimenti(File alimenti,AlimentoDAO a) throws IOException {
        FileInputStream inputStream = new FileInputStream(alimenti);
        Workbook workbook = new XSSFWorkbook(inputStream);

        Sheet sheet = workbook.getSheetAt(0);
        String name = sheet.getSheetName();
        System.out.println(sheet.getRow(1)
                                .getCell(0));
        System.out.println(name);
        for (Row row : sheet) {
            if (row.getRowNum() == 0) {
                continue;
            }
            Cell nameAlimento = row.getCell(0);
            Cell edibile = row.getCell(1);
            Cell kcal = row.getCell(2);
            Cell kj = row.getCell(3);
            Cell acqua = row.getCell(4);
            Cell protTot = row.getCell(5);
            Cell protAnim = row.getCell(6);
            Cell protVeg = row.getCell(7);
            Cell glucidiTot = row.getCell(8);
            Cell lipidiTot = row.getCell(9);
            Cell lipidiSat = row.getCell(10);
            Cell lipidiMono = row.getCell(11);
            Alimenti al = new Alimenti();
            al.setName(nameAlimento.getStringCellValue());
            al.setParteEdibile((int) edibile.getNumericCellValue());
            al.setKcal((int) kcal.getNumericCellValue());
            al.setKj((int) kj.getNumericCellValue());
            al.setAcqua(acqua.getNumericCellValue());
            al.setTotProt(protTot.getNumericCellValue());
            al.setProtAnimali(protAnim.getNumericCellValue());
            al.setProtVeg(protVeg.getNumericCellValue());
            al.setGlucidiTot(glucidiTot.getNumericCellValue());
            al.setLipidiTot(lipidiTot.getNumericCellValue());
            al.setLipidiSaturi(lipidiSat.getNumericCellValue());
            al.setLipidiMonoinsaturi(lipidiMono.getNumericCellValue());
            a.save(al);
        }

    }
    public void saveEx(File esercizi, EsercizioDAO esercizioDAO) throws IOException {
        BufferedReader bf=new BufferedReader(new FileReader(esercizi));
        String line;
        bf.readLine();


        while ((line = bf.readLine()) != null){
            String[] data = line.split(",");
            Exercice mun = new Exercice();
            String nomeEs = data[0].replaceAll("^\"+|\"+$", "");
            String muscleGroup = data[5].replaceAll("^\"+|\"+$", "");
            Exercice ex=new Exercice();
            ex.setNomeEsercizio(nomeEs);
            ex.setMuscleGroup(muscleGroup);
            esercizioDAO.save(ex);
        }
    }
}

package org.federicopoggi.backendhealthynutritionlab.service;

import ch.qos.logback.core.rolling.helper.CompressionMode;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfBody;
import com.itextpdf.text.pdf.PdfWriter;

import jakarta.mail.MessagingException;

import jakarta.mail.internet.MimeMessage;
import org.federicopoggi.backendhealthynutritionlab.model.Customer;
import org.federicopoggi.backendhealthynutritionlab.model.Diet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;


@Service
public class EmailService {
    @Autowired
    JavaMailSender mail;

    @Value("${spring.mail.username}")
    String mailDev;

    public void sendEmail(String userMail) throws MessagingException, IOException {
        MimeMessage message = mail.createMimeMessage();
        MimeMessageHelper ms = new MimeMessageHelper(message, true);
        ms.setFrom(mailDev);
        ms.setTo(userMail);
        ms.setSubject("Benvenuto e grazie della registarzione");
        /* messHelper.setText("Complimenti per esserti registarto");*/
       /* File file = new File("src/main/java/org/federicopoggi/backendhealthynutritionlab/kUNGfU.odt");
        ms.addAttachment("kungFu.odt", file);*/
        File res = new File(
                "src/main/java/org/federicopoggi/backendhealthynutritionlab/LogoPerMail.jpg");
         ms.addAttachment("logo",res);

        String htmlContent = "<html><body>" + "<h1>Registrazione effettuata con successo</h1>" + "<p>Grazie per " +
                "esserti registrato, ora sara possibile iniziare un percorso con HealthyNutritionLab</p>" + "<p>Buona" +
                " continazione,</p>  <p>Lo Staff di HealthyNutritionLab</p>" + "<img src='cid:logo'/>" + "</body" +
                "></html>";
        ms.setText(htmlContent, true);


        mail.send(message);

    }



    public void sendEmailWithDiet(byte[]pdf,Customer c) throws MessagingException {
        MimeMessage message=mail.createMimeMessage();
        MimeMessageHelper helper=new MimeMessageHelper(message,true);

        helper.setTo(c.getEmail());
        helper.setSubject("PDF DIET");
        helper.setText("Gentile cliente,\n\nIn allegato troverà la sua nuova dieta.");

        helper.addAttachment("Dieta.pdf",new ByteArrayResource(pdf));

        mail.send(message);
        System.out.println("emailInviata");

    };

    public void sendEmailWithTraining() {}

    ;
    @Transactional
    public byte[] generatePdf(Diet diet){
        try{
            ByteArrayOutputStream byteArrayOutputStream=new ByteArrayOutputStream();
            Document newDoc=new Document();
            PdfWriter w=PdfWriter.getInstance(newDoc,byteArrayOutputStream);
            w.setFullCompression();
            newDoc.open();

            newDoc.addAuthor("Nutrizionista");
            newDoc.addSubject("Nuova dieta");
            newDoc.addTitle("Nuova dieta");
            newDoc.addCreationDate();
            newDoc.add(new Paragraph("Email con dieta"));
            newDoc.add(new Paragraph(diet.getDietType().name()));
            newDoc.add(new Paragraph(diet.getDuration().name()));
            diet.getAlimentiQuantita().forEach((al,q)->{
                try {
                    newDoc.add(new Paragraph(al+" " + " " + q));
                } catch (DocumentException e) {
                    throw new RuntimeException(e);
                }
            });


            newDoc.close();
            return byteArrayOutputStream.toByteArray();

        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}

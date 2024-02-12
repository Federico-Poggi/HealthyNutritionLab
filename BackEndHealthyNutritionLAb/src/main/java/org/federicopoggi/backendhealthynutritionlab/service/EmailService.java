package org.federicopoggi.backendhealthynutritionlab.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

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

    public void sendEmailWithDiet() {}

    ;

    public void sendEmailWithTraining() {}

    ;

}

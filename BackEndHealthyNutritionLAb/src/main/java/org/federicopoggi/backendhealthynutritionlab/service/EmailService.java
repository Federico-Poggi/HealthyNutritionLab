package org.federicopoggi.backendhealthynutritionlab.service;

import com.cloudinary.Cloudinary;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.federicopoggi.backendhealthynutritionlab.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
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

   @Autowired
   Cloudinary cloudUploader;

   public void sendEmail(String userMail) throws MessagingException, IOException {
      MimeMessage message = mail.createMimeMessage();
      MimeMessageHelper ms = new MimeMessageHelper(message, true);
      ms.setFrom(mailDev);
      ms.setTo(userMail);
      ms.setSubject("Benvenuto e grazie della registarzione");

      File res = new File("src/main/java/org/federicopoggi/backendhealthynutritionlab/LogoPerMail.jpg");
      ms.addAttachment("logo", res);

      String htmlContent = "<html><body>" + "<h1>Registrazione effettuata con successo</h1>" + "<p>Grazie per " +
              "esserti registrato, ora sara possibile iniziare un percorso con HealthyNutritionLab</p>" + "<p>Buona" + " continazione,</p>  <p>Lo Staff di HealthyNutritionLab</p>" + "<img src='cid:logo'/>" + "</body" + "></html>";
      ms.setText(htmlContent, true);


      mail.send(message);

   }


   public void sendEmailWithDiet(byte[] pdf, Customer c) throws MessagingException {
      MimeMessage message = mail.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, true);

      helper.setTo(c.getEmail());
      helper.setSubject("PDF DIET");
      helper.setText("Gentile cliente,\n\nIn allegato troverà la sua nuova dieta.");

      helper.addAttachment("Dieta.pdf", new ByteArrayResource(pdf));

      mail.send(message);
      System.out.println("emailInviata");

   }

   ;

   public void sendEmailWithTraining() {}

   ;


}

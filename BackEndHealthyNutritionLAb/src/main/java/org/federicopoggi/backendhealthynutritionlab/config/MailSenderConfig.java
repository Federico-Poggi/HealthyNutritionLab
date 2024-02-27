package org.federicopoggi.backendhealthynutritionlab.config;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

@Configuration
@EnableWebMvc
public class MailSenderConfig {


    private ApplicationContext applicationContext;

    @Bean(name = "google_mail_sender")
    JavaMailSender getJavaMailSender(@Value("${spring.mail.host}") String host,
                                     @Value("${spring.mail.port}") int port,
                                     @Value("${spring.mail.username}") String email,
                                     @Value("${spring.mail.password}") String password) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(port);

        mailSender.setUsername(email);
        mailSender.setPassword(password);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");
        return mailSender;
    }

    @Bean
    public Cloudinary cloudinaryUploader(@Value("${CLOUDINARY_NAME}") String name,@Value("${CLOUDINARY_APIKEY}") String apiKey,@Value("${CLOUDINARY_SECRET}") String apiSecret ){
        Map<String,String> config=new HashMap<>();
        config.put("cloud_name", name);
        config.put("api_key",apiKey);
        config.put("api_secret", apiSecret);

        return new Cloudinary(config);
    }


}

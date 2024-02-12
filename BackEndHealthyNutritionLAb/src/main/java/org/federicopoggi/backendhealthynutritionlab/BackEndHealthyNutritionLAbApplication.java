package org.federicopoggi.backendhealthynutritionlab;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.io.IOException;

@SpringBootApplication
public class BackEndHealthyNutritionLAbApplication {

    public static void main(String[] args) throws IOException {

        SpringApplication.run(BackEndHealthyNutritionLAbApplication.class, args);
    }

}

package org.federicopoggi.backendhealthynutritionlab.config;

import io.swagger.annotations.Api;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/*@Configuration
@EnableSwagger2
@Api*/
public class SwaggerConfig {
 /*   @Bean*/
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .apiInfo(this.apiInfo())
                .useDefaultResponseMessages(true);
    }

    private ApiInfo apiInfo() {
        ApiInfoBuilder apiInfoBuilder = new ApiInfoBuilder();
        apiInfoBuilder.title("REST API CAPSTONE");
        apiInfoBuilder.description("REST API Generation");
        apiInfoBuilder.version("1.0.0");
        apiInfoBuilder.license("GNU GENERAL PUBLIC LICENSE, Version 3");
        return apiInfoBuilder.build();
    }
}

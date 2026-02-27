package com.agrosost.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Agro Sostenibile API")
                        .version("1.0.0")
                        .description("API per la consultazione e il download dei report di sostenibilita delle aziende del settore primario"));
    }
}

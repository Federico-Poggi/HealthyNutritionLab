package org.federicopoggi.backendhealthynutritionlab.DtoPayload;

import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

public record ArticlePayload (
        @NotNull
        String title,
        @NotNull
        String text,
        @NotNull String[] autoriEmail
){

}

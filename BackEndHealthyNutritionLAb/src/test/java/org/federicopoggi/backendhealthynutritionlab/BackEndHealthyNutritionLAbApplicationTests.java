package org.federicopoggi.backendhealthynutritionlab;

import org.federicopoggi.backendhealthynutritionlab.model.Article;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import static com.aspose.pdf.internal.html.forms.InputElementType.File;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class BackEndHealthyNutritionLAbApplicationTests {

   @Test
   public void testToSaveContent() throws IOException {
      String title = "La vita è bella";
      String content = "Hola a tutti";

      Article a = new Article();
      a.setTitle(title);
      a.setContent(content);

      String filePath = a.convertToFile(content, title);

      assertEquals("src/main/java/ArticlesFile/" + title.replaceAll("\\s", "_") + ".txt", filePath);
      assertTrue(Files.exists(Paths.get(filePath)));
      String contentValue =new String(Files.readAllBytes(Paths.get(filePath)));

      System.out.println(contentValue);
      System.out.print(filePath);
      assertEquals(content,contentValue);
   }

}

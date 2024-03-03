package org.federicopoggi.backendhealthynutritionlab.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Entity
@Table(name = "articoli")
@NoArgsConstructor
@Getter
@Setter
public class Article {
   @Id
   @Setter(AccessLevel.PRIVATE)
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @Column(name = "title")
   private String title;
   @Column(name = "image_article")
   private String imageArticle;
   @Column(name = "content")
   private String content;
   @ManyToMany
   List<Doc> autori=new ArrayList<>();


   public String convertToFile(String content,String title) throws IOException {
      String CONTENT_PATH="src/main/java/ArticlesFile/";
      String fileName=title.replaceAll("\\s","_") + ".txt";
      String filePathContent=CONTENT_PATH +fileName;


     /* Pattern pat=Pattern.compile("(Sottotitolo \\d+)\n(.*?)\n\n", Pattern.DOTALL);
      Matcher matcher=pat.matcher(content);*/

      try(BufferedWriter writer=new BufferedWriter(new FileWriter(filePathContent))){
         writer.write(content);
      }
      return filePathContent;
   }

   public String getFileCon(Article text) throws IOException {
         byte[] bytes= Files.readAllBytes(Paths.get(text.content));
         return new String(bytes);
   }

   public String encodeBase64(String fileBytes) throws IOException{
      return Base64.getEncoder().encodeToString(fileBytes.getBytes());
   }

}

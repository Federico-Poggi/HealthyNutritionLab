package org.federicopoggi.backendhealthynutritionlab.controller;

import org.federicopoggi.backendhealthynutritionlab.DtoPayload.ArticleGetResponse;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.ArticlePayload;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.ArticleResponse;
import org.federicopoggi.backendhealthynutritionlab.Exception.BadRequestException;
import org.federicopoggi.backendhealthynutritionlab.model.Article;
import org.federicopoggi.backendhealthynutritionlab.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/article")
public class ArticleController {

   ArticleService articleService;

   @Autowired
   public ArticleController(ArticleService articleService) {
      this.articleService = articleService;
   }

   @GetMapping()
   @ResponseStatus(HttpStatus.OK)
   public Page<ArticleGetResponse> getAll(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "30") int size,
                                          @RequestParam(defaultValue = "id") String sortedBy) throws IOException {
      return articleService.getAllArticle(page, size, sortedBy);
   }

   @GetMapping("/single")
   @ResponseStatus(HttpStatus.OK)
   public ArticleGetResponse findBy(@RequestParam Long id) throws IOException {
      return articleService.find(id);
   }


   @GetMapping("/me/myArticle")
   @ResponseStatus(HttpStatus.OK)
   public Page<Article> getMyArticle(@AuthenticationPrincipal UserDetails u,
                                     @RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "20") int size,
                                     @RequestParam(defaultValue = "id") String sortedBy) {
      return articleService.myArticle(u,page,size,sortedBy);
   }


   @PostMapping("/insert")
   @ResponseStatus(HttpStatus.OK)
   @PreAuthorize("hasAuthority('NUTRITIONIST') or hasAuthority('PERSONAL_TRAINER')")
   public ArticleResponse saveArticle(@RequestBody @Validated ArticlePayload article, BindingResult b)
           throws BadRequestException, IOException {
      if (b.hasErrors()) {
         throw new BadRequestException("Errore nella validazione del payload");
      } else {
         return articleService.saveArticle(article);
      }
   }

   @PostMapping("/uploadArticleImage")
   @ResponseStatus(HttpStatus.OK)
   @PreAuthorize("hasAuthority('NUTRITIONIST') or hasAuthority('PERSONAL_TRAINER')")
   public void asignImage(@RequestParam("imgArticle") MultipartFile imgArticle,
                          @RequestParam("idArticolo") String idArticolo) throws IOException {
      Long idAr=Long.parseLong(idArticolo);
      articleService.assignImg(idAr, imgArticle);
   }


}

package org.federicopoggi.backendhealthynutritionlab.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.ArticleGetResponse;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.ArticlePayload;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.ArticleResponse;
import org.federicopoggi.backendhealthynutritionlab.Exception.NotFoundException;
import org.federicopoggi.backendhealthynutritionlab.model.Article;
import org.federicopoggi.backendhealthynutritionlab.model.Doc;
import org.federicopoggi.backendhealthynutritionlab.repository.ArticleDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.DocDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ArticleService {

   DocDAO docDAO;
   ArticleDAO articleDAO;
   Cloudinary cloudinary;

   @Autowired
   public ArticleService(DocDAO docDAO, ArticleDAO articleDAO, Cloudinary cloudinary) {
      this.docDAO = docDAO;
      this.articleDAO = articleDAO;
      this.cloudinary = cloudinary;
   }

   public ArticleResponse saveArticle(ArticlePayload article) throws IOException {
      Article newArticle = new Article();
      newArticle.setTitle(article.title());

      String filePathArticle = newArticle.convertToFile(article.text(), article.title());
      newArticle.setContent(filePathArticle);

      String[] emailAuthor = article.autoriEmail();
      for (String mail : emailAuthor) {
         Doc found = docDAO.findByEmail(mail)
                           .orElseThrow(() -> new NotFoundException("Dottori con email " + mail + " non trovato"));
         newArticle.getAutori()
                   .add(found);
      }
      articleDAO.save(newArticle);
      return new ArticleResponse(newArticle.getId());
   }

   public void assignImg(Long id, MultipartFile img) throws NotFoundException, IOException {
      Article article = articleDAO.findById(id)
                                  .orElseThrow(() -> new NotFoundException("non trovata"));
      String urlImg = (String) cloudinary.uploader()
                                         .upload(img.getBytes(), ObjectUtils.emptyMap())
                                         .get("url");
      article.setImageArticle(urlImg);
      articleDAO.save(article);
   }

   public Page<ArticleGetResponse> getAllArticle(int page, int size, String sortedBy) throws IOException {
      Pageable pageable = PageRequest.of(page, size, Sort.by(sortedBy));
      Page<Article> articles = articleDAO.findAll(pageable);
      Page<ArticleGetResponse> p = articles.map((article) -> {
         try {
            return converArticleGetResponse(article);
         } catch (IOException e) {
            throw new RuntimeException(e);
         }
      });
      return p;

   }

   public ArticleGetResponse converArticleGetResponse(Article a) throws IOException {
      List<String> autorName = new ArrayList<>();
      for (Doc aut : a.getAutori()) {
         autorName.add(aut.getName() + aut.getSurname());
      }
      try {
         String base64Content = a.getFileCon(a);
         String encodeFile = a.encodeBase64(base64Content);
         return new ArticleGetResponse(a.getId(), a.getTitle(), encodeFile, a.getImageArticle(), autorName);
      } catch (Exception io) {
         throw io;
      }
   }

   public ArticleGetResponse find(Long id) throws IOException {
      Article a = articleDAO.findById(id)
                            .orElseThrow(() -> new NotFoundException("Articolo non trovato"));
      List<String> autorName = new ArrayList<>();
      for (Doc aut : a.getAutori()) {
         autorName.add(aut.getName() + aut.getSurname());
      }
      try {
         String base64Content = a.getFileCon(a);
         String encodeFile = a.encodeBase64(base64Content);
         return new ArticleGetResponse(a.getId(), a.getTitle(), encodeFile, a.getImageArticle(), autorName);
      } catch (IOException e) {
         throw e;
      }
   }


}

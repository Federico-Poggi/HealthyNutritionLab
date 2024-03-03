package org.federicopoggi.backendhealthynutritionlab.repository;

import org.federicopoggi.backendhealthynutritionlab.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleDAO extends JpaRepository<Article, Long> {

   @Query("SELECT DISTINCT a FROM Article a JOIN a.autori aut where aut.idDoctor = :idDoctor")
   Page<Article> getMyArticle(@Param("idDoctor") Long idDoctor, Pageable pageable);


}

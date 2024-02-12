package org.federicopoggi.backendhealthynutritionlab.repository;

import org.federicopoggi.backendhealthynutritionlab.model.Doc;
import org.federicopoggi.backendhealthynutritionlab.model.Nutritionist;
import org.federicopoggi.backendhealthynutritionlab.model.PersonalTrainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DocDAO extends JpaRepository<Doc,Long> {
    Optional<Doc> findByEmail(String email);
}

package org.federicopoggi.backendhealthynutritionlab.repository;

import org.federicopoggi.backendhealthynutritionlab.model.Diet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DietDAO extends JpaRepository<Diet,Long> {}

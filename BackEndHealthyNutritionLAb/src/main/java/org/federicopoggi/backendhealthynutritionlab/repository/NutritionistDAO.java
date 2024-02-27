package org.federicopoggi.backendhealthynutritionlab.repository;

import jdk.dynalink.linker.LinkerServices;
import org.federicopoggi.backendhealthynutritionlab.model.Customer;
import org.federicopoggi.backendhealthynutritionlab.model.Nutritionist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NutritionistDAO extends JpaRepository<Nutritionist,Long> {
    @Query("SELECT c from Customer c JOIN c.nutritionist d WHERE d.email = :email")
    List<Customer> getAllPatient(String email);
}

package org.federicopoggi.backendhealthynutritionlab.repository;

import org.federicopoggi.backendhealthynutritionlab.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerDAO extends JpaRepository<Customer,Long> {}

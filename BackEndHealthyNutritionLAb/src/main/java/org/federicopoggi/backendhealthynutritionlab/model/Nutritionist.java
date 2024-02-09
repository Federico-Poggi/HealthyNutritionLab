package org.federicopoggi.backendhealthynutritionlab.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(name = "nutritionist")
public class Nutritionist extends Doctor{
    @OneToMany
    List<Customer> customers;
}

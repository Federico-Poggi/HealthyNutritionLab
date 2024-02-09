package org.federicopoggi.backendhealthynutritionlab.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(name = "personal_trainers")
public class PersonalTrainer extends Doctor{

    @OneToMany
    List<Customer> customers;
}

package org.federicopoggi.backendhealthynutritionlab.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "customers")
public class Customer extends User{
    @ManyToOne
    private PersonalTrainer personalTrainer;
    @ManyToOne
    private Nutritionist nutritionist;
    @OneToMany
    List<Diet> diets;
}

package org.federicopoggi.backendhealthynutritionlab.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "customers")
@Setter
@Getter
public class Customer extends User{
    @ManyToOne
    @JsonBackReference
    private PersonalTrainer personalTrainer;
    @ManyToOne
    @JsonBackReference
    private Nutritionist nutritionist;
    @OneToMany
    List<Diet> diets;
}

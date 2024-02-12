package org.federicopoggi.backendhealthynutritionlab.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "personal_trainers")
@Getter
@Setter
public class PersonalTrainer extends Doctor {
    @OneToMany
    @JsonManagedReference
    List<Customer> customers = new ArrayList<>();
}

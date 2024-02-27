package org.federicopoggi.backendhealthynutritionlab.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/*@Entity
@Table(name = "personal_trainers")*/
@Entity
@Getter
@Setter
public class PersonalTrainer extends Doc {

   @OneToMany(fetch = FetchType.EAGER)
   @JsonManagedReference
   List<Customer> customers = new ArrayList<>();


}

package org.federicopoggi.backendhealthynutritionlab.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "nutritionist")
@Getter
@Setter
@NoArgsConstructor
public class Nutritionist extends Doctor {


    @OneToMany
    @JsonManagedReference
    List<Customer> customers = new ArrayList<>();

}

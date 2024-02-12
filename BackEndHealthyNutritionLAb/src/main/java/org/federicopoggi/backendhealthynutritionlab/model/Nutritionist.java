package org.federicopoggi.backendhealthynutritionlab.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



import java.util.ArrayList;
import java.util.List;

/*@Entity
@Table(name = "nutritionist")*/
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Nutritionist extends Doc{

    @OneToMany
    @JsonManagedReference
    List<Customer> customers = new ArrayList<>();

}

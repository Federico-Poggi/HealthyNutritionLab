package org.federicopoggi.backendhealthynutritionlab.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.DoctorPaylodSave;
import org.hibernate.annotations.Fetch;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
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

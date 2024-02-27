package org.federicopoggi.backendhealthynutritionlab.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "customers")
@Setter
@Getter
public class Customer implements UserDetails {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   Long idCliente;

   @Column(name = "user_name")
   private String name;

   @Column(name = "user_surname")
   private String surname;

   @Column(name = "cell_number")
   private String cellNumber;

   @Column(name = "email")
   private String email;

   @Column(name = "password")
   private String password;

   @Column(name = "birthday")
   private LocalDate birthday;

   @Column(name = "user_role")
   @Enumerated(EnumType.STRING)
   Role role;

   @Column(name = "profile_img")
   String urlImg;

   @ManyToOne
   @JsonBackReference
   private PersonalTrainer personalTrainer;

   @ManyToOne
   @JsonBackReference
   private Nutritionist nutritionist;

   @OneToMany(fetch = FetchType.EAGER, mappedBy = "customer")
   @JsonManagedReference
   List<Diet> diets;

   @OneToMany(fetch = FetchType.EAGER)
   List<TrainingPlan> trainingPlans;

   @Override
   public Collection<? extends GrantedAuthority> getAuthorities() {
      return List.of(new SimpleGrantedAuthority(role.name()));
   }

   @Override
   public String getPassword() {
      return this.password;
   }

   @Override
   @JsonIgnore
   public String getUsername() {
      return this.email;
   }

   @Override
   @JsonIgnore
   public boolean isAccountNonExpired() {
      return false;
   }

   @Override
   @JsonIgnore
   public boolean isAccountNonLocked() {
      return false;
   }

   @Override
   @JsonIgnore
   public boolean isCredentialsNonExpired() {
      return false;
   }

   @Override
   @JsonIgnore
   public boolean isEnabled() {
      return false;
   }


}

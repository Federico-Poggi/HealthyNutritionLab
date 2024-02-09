package org.federicopoggi.backendhealthynutritionlab.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

@MappedSuperclass
@Getter
public class Doctor extends User {
    @OneToMany
    List<Customer> customers;
}

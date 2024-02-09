package org.federicopoggi.backendhealthynutritionlab.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

@Entity
@Table(name = "doctors")
@Inheritance(strategy = InheritanceType.JOINED)
public class Doctor extends User{}

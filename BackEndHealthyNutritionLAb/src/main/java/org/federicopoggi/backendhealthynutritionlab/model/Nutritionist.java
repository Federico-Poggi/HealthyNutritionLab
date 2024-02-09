package org.federicopoggi.backendhealthynutritionlab.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "nutritionist")
public class Nutritionist extends Doctor{}

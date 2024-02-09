package org.federicopoggi.backendhealthynutritionlab.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="alimenti")
@Getter
@Setter
@NoArgsConstructor
public class Alimento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idAlimento;
    @Column
    private String name;
    @Column
    private int parteEdibile;
    @Column
    private int kcal;
    @Column
    private int kj;
    @Column
    private double acqua;
    @Column
    private double totProt;
    @Column
    private double protAnimali;
    @Column
    private double protVeg;
    @Column
    private double glucidiTot;
    @Column
    private double lipidiTot;
    @Column
    private double lipidiSaturi;
    @Column
    private double lipidiMonoinsaturi;


}

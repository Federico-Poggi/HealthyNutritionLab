package org.federicopoggi.backendhealthynutritionlab.model;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "diets")
@NoArgsConstructor
public class Diet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "diet_id")
    long dietId;

}
/*
@Entity
public class Dieta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @ElementCollection
    @CollectionTable(
            name = "dieta_alimento_quantita",
            joinColumns = @JoinColumn(name = "dieta_id")
    )
    @MapKeyJoinColumn(name = "alimento_id")
    @Column(name = "quantita")
    private Map<Alimento, Integer> alimentiQuantita = new HashMap<>();

    // Metodi getter e setter per alimentiQuantita

    // Altri attributi e metodi della classe Dieta
}*/

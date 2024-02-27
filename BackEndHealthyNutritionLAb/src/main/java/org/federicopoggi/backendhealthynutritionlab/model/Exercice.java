package org.federicopoggi.backendhealthynutritionlab.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "esercizi")
@Getter
@Setter
@NoArgsConstructor
public class Exercice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idEsercizio;

    @Column(name = "nome_esercizio")
    private String nomeEsercizio;

    @Column(name = "gruppo_muscolare")
    private String muscleGroup;

}

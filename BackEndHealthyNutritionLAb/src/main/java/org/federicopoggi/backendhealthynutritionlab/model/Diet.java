package org.federicopoggi.backendhealthynutritionlab.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.federicopoggi.backendhealthynutritionlab.model.Enum.Actually;
import org.federicopoggi.backendhealthynutritionlab.model.Enum.DietType;
import org.federicopoggi.backendhealthynutritionlab.model.Enum.Duration;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "diets")
@NoArgsConstructor
@Getter
@Setter
public class Diet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "diet_id")
    long dietId;

    @Column(name = "kcal_diet")
    private int kcalTot;

    @Column(name = "issue_date")
    private LocalDate issueDate;

    @Column
    LocalDate expirationDate;
    @Column
    @Enumerated(EnumType.STRING)
    Duration duration;

    @Column
    @Enumerated(EnumType.STRING)
    Actually actually;

    @Column(name = "diet_type")
    @Enumerated(EnumType.STRING)
    DietType dietType;

    @ElementCollection
    @CollectionTable(
            name = "dieta_alimento_quantita", joinColumns = @JoinColumn(name = "dieta_id"))
    @MapKeyJoinColumn(name = "alimento_id")
    @Column(name = "quantita")
    private Map<Alimento, Integer> alimentiQuantita = new HashMap<>();

    @ManyToOne
    Customer customer;

}


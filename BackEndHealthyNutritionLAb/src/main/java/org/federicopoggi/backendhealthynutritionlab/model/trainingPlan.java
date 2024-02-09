package org.federicopoggi.backendhealthynutritionlab.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.federicopoggi.backendhealthynutritionlab.model.Enum.Actually;
import org.federicopoggi.backendhealthynutritionlab.model.Enum.Duration;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "training_plans")
@Getter
@Setter
@NoArgsConstructor
public class trainingPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "training_plan_id")
    private Long idTrainingPlan;

    @Column(name = "issue_date")
    LocalDate issueDate;

    @Column(name = "exipiration_date")
    LocalDate expirationDate;

    @Column(name = "duration")
    Duration duration;

    @Column(name = "inUse")
    @Enumerated(EnumType.STRING)
    Actually actually;

    @ManyToOne
    private Customer customer;

    @ElementCollection
    @CollectionTable(
            name = "training_plan_esercizi_ripetizioni", joinColumns = @JoinColumn(name = "id_esercizio"))
    @MapKeyJoinColumn(name = "esercizio_id")
    @Column(name = "ripetizioni")
    private Map<Exercice, String> eserciziRipetizioni = new HashMap<>();

}

package org.federicopoggi.backendhealthynutritionlab.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.federicopoggi.backendhealthynutritionlab.model.Enum.Actually;
import org.federicopoggi.backendhealthynutritionlab.model.Enum.DietType;
import org.federicopoggi.backendhealthynutritionlab.model.Enum.Duration;
import org.hibernate.annotations.Type;

import java.time.LocalDate;
import java.util.Base64;
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
    @MapKeyJoinColumn(name = "alimento_name")
    @Column(name = "quantita")
    private Map<String, Integer> alimentiQuantita = new HashMap<>();

    @ManyToOne
    @JsonBackReference
    Customer customer;


    @Column(name = "diet_file")
    private String pdfDiet;


    public String encodedFile(byte[] file){
        return Base64.getEncoder().encodeToString(file);
    }

}


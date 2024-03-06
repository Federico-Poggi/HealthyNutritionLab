package org.federicopoggi.backendhealthynutritionlab.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;


import java.sql.Date;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;


@Table(name = "reservations")
@Entity
@NoArgsConstructor
@Setter
@Getter
public class Reservation {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Setter(AccessLevel.NONE)
   @Column(name = "id", nullable = false)
   private Long id;
   @Column(name = "reservation_date", nullable = false)
   private LocalDate reservationDate;

   @ManyToOne(fetch = FetchType.EAGER)
   @JoinColumn(name = "customer_id")
   private Customer customer;

   @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
   @JoinColumn(name = "doc_id_doctor")
   private Doc doc;

   public void setReservationDate(String dateString) throws ParseException {
      DateTimeFormatter formatter=DateTimeFormatter.ofPattern("dd-MM-yyyy");
      this.reservationDate = LocalDate.parse(dateString,formatter);
   }
}

package org.federicopoggi.backendhealthynutritionlab.model;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;


@Table(name = "reservations")
@Entity
@NoArgsConstructor
public class Reservation {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "id", nullable = false)
   private Long id;
   @Column(name = "reservation_date", nullable = false)
   @JdbcTypeCode(SqlTypes.DATE)
   private Date reservationDate;

   @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
   @JoinColumn(name = "customer_id")
   private Customer customer;

   @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
   @JoinColumn(name = "doc_id_doctor")
   private Doc doc;

   public void setReservationDate(String reservationDate) throws ParseException {
      SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
      java.util.Date date = format.parse(reservationDate);
      this.reservationDate = new Date(date.getTime());
   }
}

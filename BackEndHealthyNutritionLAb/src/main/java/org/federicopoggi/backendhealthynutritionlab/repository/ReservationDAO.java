package org.federicopoggi.backendhealthynutritionlab.repository;

import org.federicopoggi.backendhealthynutritionlab.model.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationDAO extends JpaRepository<Reservation,Long> {
   @Query("SELECT r FROM Reservation r WHERE r.customer.idCliente = :idCliente")
   public Page<Reservation> getReservationByIdCliente(Long idCliente, Pageable pageable);

   @Query("SELECT r FROM Reservation r WHERE r.doc.idDoctor = :idDoctor")
   public Page<Reservation> getReservationByIdDoc(Long idDoctor, Pageable pageable);
}

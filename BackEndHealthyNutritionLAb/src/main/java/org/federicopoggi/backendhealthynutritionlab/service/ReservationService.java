package org.federicopoggi.backendhealthynutritionlab.service;

import org.federicopoggi.backendhealthynutritionlab.DTOResponse.ReservationCustomerDTO;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.ReservationResponse;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.ReservationsResponseDTO;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.DTOReservation;
import org.federicopoggi.backendhealthynutritionlab.model.Customer;
import org.federicopoggi.backendhealthynutritionlab.model.Doc;
import org.federicopoggi.backendhealthynutritionlab.model.Reservation;
import org.federicopoggi.backendhealthynutritionlab.repository.CustomerDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.DocDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.ReservationDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;

@Service
public class ReservationService {
   @Autowired
   CustomerDAO customerDAO;
   @Autowired
   DocDAO docDAO;
   @Autowired
   ReservationDAO reservationDAO;

   public Page<ReservationsResponseDTO> getMyReservation(String mail, int page, int size, String sortedBy) {
      Pageable pageable = PageRequest.of(page, size, Sort.by(sortedBy));

      Doc doctor = docDAO.findByEmail(mail)
                         .orElseThrow();
      List<Reservation> docReservations=reservationDAO.getReservationByIdDoc(doctor.getIdDoctor());
      List<ReservationsResponseDTO> pageList=docReservations.stream().map(this::convertDTO).toList();
      return new PageImpl<>(pageList,pageable,pageList.size());

   }

   public Page<ReservationCustomerDTO> getCustomerReservationString(String mail, int page, int size, String sortedBy) {
      Pageable pageable = PageRequest.of(page, size, Sort.by(sortedBy));

      Customer cus = customerDAO.findByEmail(mail)
                                .orElseThrow();
      List<Reservation> cusReservation = reservationDAO.getReservationByIdCliente(cus.getIdCliente());
      List<ReservationCustomerDTO> pageList=cusReservation.stream().map(this::convertResponse).toList();
      return new PageImpl<>(pageList,pageable,pageList.size());
   }

   public ReservationsResponseDTO convertDTO(Reservation reservation) {
      return new ReservationsResponseDTO(reservation.getReservationDate(),
                                         reservation.getCustomer()
                                                    .getName(),
                                         reservation.getCustomer()
                                                    .getSurname(),
                                         reservation.getCustomer()
                                                    .getEmail(),
                                         reservation.getCustomer()
                                                    .getIdCliente());
   }
   public ReservationCustomerDTO convertResponse(Reservation reservation) {
      return new ReservationCustomerDTO(reservation.getReservationDate(),
                                         reservation.getDoc()
                                                    .getName(),
                                         reservation.getDoc()
                                                    .getEmail(),
                                         reservation.getDoc().getIdDoctor());
   }

   public ReservationResponse addRes(DTOReservation reservation, Long id) throws Exception {
      Customer customer = customerDAO.findByEmail(reservation.email_customer())
                                     .orElseThrow();
      Doc doc = docDAO.findById(id)
                      .orElseThrow();

      Reservation newReservation = new Reservation();

      String day = String.valueOf(reservation.day());
      String month = String.valueOf(reservation.month());
      if ((reservation.day() <= 9) && day.charAt(0) != '0') {
         String value = day;
         day = "0" + value;
      }
      if ((reservation.month() <= 9) && month.charAt(0) != '0') {
         String value = month;
         month = "0" + value;
      }

      String date = day + "-" + month + "-" + reservation.year();
      try {
         newReservation.setReservationDate(date);
         newReservation.setCustomer(customer);
         newReservation.setDoc(doc);
         Reservation saved = reservationDAO.save(newReservation);
         docDAO.save(doc);
         return new ReservationResponse("Prenotazione aggiunta");
      } catch (ParseException e) {
         throw new Exception(e.getMessage());
      }
   }
}

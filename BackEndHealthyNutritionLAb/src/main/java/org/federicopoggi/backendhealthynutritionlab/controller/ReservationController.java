package org.federicopoggi.backendhealthynutritionlab.controller;

import org.federicopoggi.backendhealthynutritionlab.DTOResponse.ReservationResponse;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.DTOReservation;
import org.federicopoggi.backendhealthynutritionlab.Exception.BadRequestException;
import org.federicopoggi.backendhealthynutritionlab.model.Reservation;
import org.federicopoggi.backendhealthynutritionlab.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {
   @Autowired
   ReservationService reservationService;

  /* @GetMapping("/me")
   @ResponseStatus(HttpStatus.OK)
   public Page<Reservation> getMyReservation(@AuthenticationPrincipal UserDetails userDetails,
                                             @RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size,
                                             @RequestParam(defaultValue = "id") String sortedBy) {
      return reservationService.getMyReservation(userDetails,page,size,sortedBy);
   }*/

   @PostMapping("/post/{id}")
   @ResponseStatus(HttpStatus.OK)
   @PreAuthorize("hasAuthority('NUTRITIONIST') or hasAuthority('PERSONAL_TRAINER')")
   public ReservationResponse addReservation(@PathVariable Long id, @RequestBody DTOReservation reservationAsk, BindingResult bindingResult)
           throws Exception {
      if (bindingResult.hasErrors()){
         throw new BadRequestException("Controllare i campi inseriti");
      }else{
         return reservationService.addRes(reservationAsk,id);
      }
   }
}

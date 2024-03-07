package org.federicopoggi.backendhealthynutritionlab.DTOResponse;

import java.time.LocalDate;

public record ReservationCustomerDTO(
        LocalDate reservationDate,
        String nameDoctor,
        String mailDoctor,
        Long idDoctor
) {}

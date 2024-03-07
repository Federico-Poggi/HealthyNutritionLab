package org.federicopoggi.backendhealthynutritionlab.DTOResponse;

import java.time.LocalDate;

public record ReservationsResponseDTO(
        LocalDate reservationDate,
        String nameCustomer,
        String surnameCustomer,
        String emailCustomer,
        Long idCustomer
) {}

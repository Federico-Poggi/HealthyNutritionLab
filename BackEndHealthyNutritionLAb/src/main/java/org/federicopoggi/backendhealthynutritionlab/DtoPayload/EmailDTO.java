package org.federicopoggi.backendhealthynutritionlab.DtoPayload;

public record EmailDTO(
        String to,
        String subject,
        String text

) {}

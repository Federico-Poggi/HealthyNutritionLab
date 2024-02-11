package org.federicopoggi.backendhealthynutritionlab.DTOResponse;

public record ResponseDoctor(
        Long id,
        String message
) {
    public ResponseDoctor(Long id) {
        this(id,"Dottore creato con successo " );
    }
}

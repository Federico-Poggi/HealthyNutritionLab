package org.federicopoggi.backendhealthynutritionlab.DTOResponse;

public record UserLoginResponse(
        String token,
        String role
) {}

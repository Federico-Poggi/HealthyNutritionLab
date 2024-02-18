package org.federicopoggi.backendhealthynutritionlab.DTOResponse;

import java.util.List;

public record UserDietResponse<Diete>(
        List<Diete> dietList
) {}

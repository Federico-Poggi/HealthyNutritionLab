package org.federicopoggi.backendhealthynutritionlab.DtoPayload;

import java.net.ContentHandler;
import java.util.List;

public record ArticleGetResponse(
        Long id,
        String title,
        String content,
        String urlImg,
        List<String> authorsName
) {}

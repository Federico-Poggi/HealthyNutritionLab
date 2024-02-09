package org.federicopoggi.backendhealthynutritionlab.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.federicopoggi.backendhealthynutritionlab.Exception.NotFoundException;
import org.federicopoggi.backendhealthynutritionlab.model.User;
import org.federicopoggi.backendhealthynutritionlab.service.UserSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    JWTools jwTools;

    @Autowired
    UserSevice userSevice;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException, NotFoundException {
        String headerAuth = request.getHeader("Authorization");
        if (headerAuth == null | !headerAuth.startsWith("Bearer ")) {
            throw new ServletException("Token non valido rieffettuare il login");
        } else {
            String token = headerAuth.substring(7);
            /*Verifico se il token è valido*/
            try {
                String id = jwTools.validateToken(token)
                                   .getSubject();
                User user = userSevice.findById(Long.parseLong(id));
                Authentication authentication = new UsernamePasswordAuthenticationToken(user,
                                                                                        null,
                                                                                        user.getAuthorities());
                SecurityContextHolder.getContext()
                                     .setAuthentication(authentication);
                filterChain.doFilter(request, response);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return new AntPathMatcher().match("/auth/**", request.getServletPath());
    }
}

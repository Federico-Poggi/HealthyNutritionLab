package org.federicopoggi.backendhealthynutritionlab.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.federicopoggi.backendhealthynutritionlab.Exception.NotFoundException;
import org.federicopoggi.backendhealthynutritionlab.model.Customer;
import org.federicopoggi.backendhealthynutritionlab.model.Doc;
import org.federicopoggi.backendhealthynutritionlab.repository.DocDAO;
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

    @Autowired
    DocDAO docd;


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

                String userType = jwTools.validateToken(token)
                                         .getClaimValueAsString("userType");
                System.out.println(userType);

                if (userType.equals("doctor")) {
                    Doc d = docd.findById(Long.parseLong(id))
                                .orElseThrow(() -> new NotFoundException("non esiste il dottore con l'id inserito"));
                    Authentication authentication = new UsernamePasswordAuthenticationToken(d,
                                                                                            null,
                                                                                            d.getAuthorities());
                    SecurityContextHolder.getContext()
                                         .setAuthentication(authentication);
                } else if (userType.equals("customer")) {
                    Customer user = userSevice.findById(Long.parseLong(id));
                    Authentication authentication = new UsernamePasswordAuthenticationToken(user,
                                                                                            null,
                                                                                            user.getAuthorities());
                    SecurityContextHolder.getContext()
                                         .setAuthentication(authentication);
                }

                filterChain.doFilter(request, response);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String serverLet = request.getServletPath();
        return new AntPathMatcher().match("/auth/**", request.getServletPath()) ||
                new AntPathMatcher().match("/v2/**", request.getServletPath()) ||
                new AntPathMatcher().match("/v3/**", request.getServletPath()) ||
                new AntPathMatcher().match("/swagger-resources/**", request.getServletPath())||
                new AntPathMatcher().match("/configuration/ui",request.getServletPath())||
                new AntPathMatcher().match("/configuration/security",request.getServletPath())||
                new AntPathMatcher().match("/swagger-ui/**",request.getServletPath())||
                new AntPathMatcher().match("/swagger-ui.html",request.getServletPath())||
                new AntPathMatcher().match("/webjars/**",request.getServletPath());
    }
}

package org.federicopoggi.backendhealthynutritionlab.security;

import org.federicopoggi.backendhealthynutritionlab.model.User;
import org.jose4j.jwk.RsaJsonWebKey;
import org.jose4j.jwk.RsaJwkGenerator;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.lang.JoseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JWTools {
    @Value("${spring.jwt.secret}")
    private String secret;


    public void generateTokenForUser(User user) throws JoseException {
        RsaJsonWebKey rsaJsonWebKey= RsaJwkGenerator.generateJwk(2048);
        rsaJsonWebKey.setKeyId(secret);
        JwtClaims jwtClaims=new JwtClaims();
        jwtClaims.setExpirationTimeMinutesInTheFuture(60*24*7);
        jwtClaims.setGeneratedJwtId();
        jwtClaims.setIssuedAtToNow();
        jwtClaims.setSubject(String.valueOf(user.getUserId()));

    }
}

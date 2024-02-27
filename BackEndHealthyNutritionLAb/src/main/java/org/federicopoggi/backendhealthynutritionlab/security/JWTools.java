package org.federicopoggi.backendhealthynutritionlab.security;

import org.federicopoggi.backendhealthynutritionlab.model.Customer;
import org.federicopoggi.backendhealthynutritionlab.model.Doc;
import org.jose4j.jwa.AlgorithmConstraints;
import org.jose4j.jwk.RsaJsonWebKey;
import org.jose4j.jwk.RsaJwkGenerator;
import org.jose4j.jws.AlgorithmIdentifiers;
import org.jose4j.jws.JsonWebSignature;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.jose4j.lang.JoseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JWTools {
    @Value("${spring.jwt.secret}")
    private String secretK;
    private RsaJsonWebKey rsaJsonWebKey;

    public JWTools() throws JoseException {
        rsaJsonWebKey=RsaJwkGenerator.generateJwk(2048);
        rsaJsonWebKey.setKeyId(secretK);
    }



    public String generateToken(Customer user) throws JoseException {

        JwtClaims jwtClaims = new JwtClaims();
        jwtClaims.setExpirationTimeMinutesInTheFuture(60 * 24 * 7);
        jwtClaims.setGeneratedJwtId();
        jwtClaims.setIssuedAtToNow();
        jwtClaims.setClaim("Role",user.getRole().name());
        jwtClaims.setClaim("userType", "customer");
        jwtClaims.setSubject(String.valueOf(user.getIdCliente()));

        JsonWebSignature jws = new JsonWebSignature();
        jws.setPayload(jwtClaims.toJson());
        jws.setKey(rsaJsonWebKey.getPrivateKey());
        jws.setKeyIdHeaderValue(rsaJsonWebKey.getKeyId());
        jws.setAlgorithmHeaderValue(AlgorithmIdentifiers.RSA_USING_SHA256);
        String jwt = jws.getCompactSerialization();
        return jwt;
    }
    public String generateTokenForDoc(Doc doctor) throws JoseException{
        JwtClaims jwtClaims = new JwtClaims();
        jwtClaims.setExpirationTimeMinutesInTheFuture(60 * 24 * 7);
        jwtClaims.setGeneratedJwtId();
        jwtClaims.setIssuedAtToNow();
        jwtClaims.setClaim("Role",doctor.getRole().name());
        jwtClaims.setClaim("userType", "doctor");
        jwtClaims.setSubject(String.valueOf(doctor.getIdDoctor()));

        JsonWebSignature jws = new JsonWebSignature();
        jws.setPayload(jwtClaims.toJson());
        jws.setKey(rsaJsonWebKey.getPrivateKey());
        jws.setKeyIdHeaderValue(rsaJsonWebKey.getKeyId());
        jws.setAlgorithmHeaderValue(AlgorithmIdentifiers.RSA_USING_SHA256);
        String docJwt = jws.getCompactSerialization();
        return docJwt;
    }

    public JwtClaims validateToken(String token) throws JoseException, InvalidJwtException {
        JwtConsumer jwtConsumer = new JwtConsumerBuilder().setRequireExpirationTime()
                                                          .setAllowedClockSkewInSeconds(30)
                                                          .setRequireSubject()
                                                          .setVerificationKey(rsaJsonWebKey.getKey())
                                                          .setJwsAlgorithmConstraints(AlgorithmConstraints.ConstraintType.PERMIT,
                                                                                      AlgorithmIdentifiers.RSA_USING_SHA256)
                                                          .build();
        return jwtConsumer.processToClaims(token);
    }
}

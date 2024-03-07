package org.federicopoggi.backendhealthynutritionlab.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.ImgResponse;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.UrlImgProfile;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.UserDietResponse;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.UserDoctorRespons;
import org.federicopoggi.backendhealthynutritionlab.Exception.AlreadyAssignException;
import org.federicopoggi.backendhealthynutritionlab.Exception.NotFoundException;
import org.federicopoggi.backendhealthynutritionlab.model.*;
import org.federicopoggi.backendhealthynutritionlab.repository.CustomerDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.DocDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.NutritionistDAO;
import org.federicopoggi.backendhealthynutritionlab.repository.PersonalTrainerDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class UserSevice {

   DocDAO docD;

   CustomerDAO cs;

   PersonalTrainerDAO p;

   NutritionistDAO n;

   Cloudinary cloud;

   @Autowired
   public UserSevice(CustomerDAO cs, PersonalTrainerDAO p, Cloudinary c, NutritionistDAO n, DocDAO d) {
      this.cs = cs;
      this.n = n;
      this.p = p;
      this.docD = d;
      this.cloud = c;
   }

   public Customer findById(Long id) throws NotFoundException {
      return cs.findById(id)
               .orElseThrow(() -> new NotFoundException("Utente con id " + id + " non trovato"));
   }

   public List<Customer> getAll() {
      return cs.findAll();
   }

   public void assignDoctor(Long userId, Long doctorId) {
      Customer user = cs.findById(userId)
                        .orElseThrow(() -> new NotFoundException("USer non trovato ricontrollare l'id inserito"));
      Doc doc = docD.findById(doctorId)
                    .orElseThrow(() -> new NotFoundException("Dottore non trovato ricontrollare l'id inserito"));

      if (user.getNutritionist() != null) {
         throw new AlreadyAssignException();
      } else {
         if (doc.getRole()
                .name()
                .equals("NUTRITIONIST")) {
            user.setNutritionist((Nutritionist) doc);

         } else if (doc.getRole()
                       .name()
                       .equals("PERSONAL_TRAINER")) {
            if (user.getPersonalTrainer() != null) {
               throw new AlreadyAssignException();
            } else {
               user.setPersonalTrainer((PersonalTrainer) doc);

            }
         }
      }
      cs.save(user);
   }

   public UserDietResponse getMyDiets(String email) throws NotFoundException {
      Customer c = cs.findByEmail(email)
                     .orElseThrow(() -> new NotFoundException("user non trovato"));
      List<Diet> myDIetList = c.getDiets();
      return new UserDietResponse(myDIetList);
   }

   public Customer getMe(String email) {
      return cs.findByEmail(email)
               .orElseThrow(() -> new NotFoundException("User non trovato"));
   }

   public UserDoctorRespons myDoc(String email) {
      Customer me = cs.findByEmail(email)
                      .orElseThrow();
      Nutritionist meN = me.getNutritionist();
      PersonalTrainer pers = me.getPersonalTrainer();
      return new UserDoctorRespons(meN, pers);
   }

   public UrlImgProfile uploadImg(String email, MultipartFile file) throws IOException {
      Customer c = cs.findByEmail(email)
                     .orElseThrow();
      String url = (String) cloud.uploader()
                                 .upload(file.getBytes(), ObjectUtils.emptyMap())
                                 .get("url");
      c.setUrlImg(url);
      cs.save(c);
      return new UrlImgProfile(url);
   }

   public ImgResponse getMyImg(String email) {
      Customer me = cs.findByEmail(email)
                      .orElseThrow();
      return new ImgResponse(me.getUrlImg());
   }

}


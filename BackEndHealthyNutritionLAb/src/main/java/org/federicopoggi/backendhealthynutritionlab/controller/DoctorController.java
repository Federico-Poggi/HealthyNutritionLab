package org.federicopoggi.backendhealthynutritionlab.controller;

import org.federicopoggi.backendhealthynutritionlab.model.Customer;
import org.federicopoggi.backendhealthynutritionlab.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctor")
public class DoctorController {
    @Autowired
    DoctorService docS;
    @GetMapping("/nutritionist/{idNutrizionista}/patients")
    @PreAuthorize("hasAuthority('NUTRITIONIST')")
    public Page<Customer> getAllNutritionPatient(@PathVariable Long idNutrizionista,
                                                 @RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size,
                                                 @RequestParam(defaultValue = "userId") String sortedBy) {

        return docS.getAllNutritionPatient(idNutrizionista,page,size,sortedBy);

    }


}

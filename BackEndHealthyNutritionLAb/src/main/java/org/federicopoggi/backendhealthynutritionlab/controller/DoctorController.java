package org.federicopoggi.backendhealthynutritionlab.controller;
import jakarta.mail.MessagingException;
import org.federicopoggi.backendhealthynutritionlab.DTOResponse.DietResponse;
import org.federicopoggi.backendhealthynutritionlab.DtoPayload.DietPayload;
import org.federicopoggi.backendhealthynutritionlab.model.Alimento;
import org.federicopoggi.backendhealthynutritionlab.model.Customer;
import org.federicopoggi.backendhealthynutritionlab.repository.AlimentoDAO;
import org.federicopoggi.backendhealthynutritionlab.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/doctor")
/*@Api(tags = "prova controller",value = "Controller operazioni doc")*/
public class DoctorController {
    /*
    * TODO:
    *  1- GET PER OTTENERE LE DIETE ASSEGNATE AD UN CERTO CLIENTE PER COORDINARE IL LAVORO CON I PERSONAL TRAINER
    *  2- POST PER INSERIRE UN PROGRAMMA D'ALLENAMENTO FAX SIMILE DELLE DIETE
    *  3- AGGIUNGERE LA POSSIBILITA DI INSERIRE UN PDF CON LA DIET/SCHEDA ALLENAMENTO CHE VERRA SPEDITO VIA MAIL AL CLIENTE
    *  4- AGGIUNGERE CONTROLLI O SULLA DIETA E SULLA SCHEDA DI ALLENAMENTO PER SCADENZE (QUANDO SCADE CAMBIARE LO STATO IN EXPIRED)
    *  5- CONTROLLARE FORMATO DATE
    * */


    DoctorService docS;
    AlimentoDAO ad;
    @Autowired
    public DoctorController(DoctorService docS, AlimentoDAO ad) {
        this.docS = docS;
        this.ad=ad;
    }

    // GETMAPPING


    /* ------- GET PER OTTENERE DATI PROFILO LOGGATO ------- */
    @GetMapping("/me")
    public ResponseEntity<?> getMe(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            return ResponseEntity.of(Optional.ofNullable(userDetails));
        } else {
            return ResponseEntity.status(401)
                                 .body("Utente non autenticato effettuare il login");
        }

    }

    /* ---- GET PER OTTENERE TUTTI I PAZIENTI DI UN DETERMINATO DOTTORE -------*/
    @GetMapping("/me/patients")
    @ResponseStatus(HttpStatus.OK)
    public Page<Customer> getAllNutritionPatient(@AuthenticationPrincipal UserDetails us,
                                                 @RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size,
                                                 @RequestParam(defaultValue = "userId") String sortedBy) {

        return docS.getAllPatient(us,page, size, sortedBy);
    }
    /* ---- GET PER I NUTRIZIONISTI PER AVERE UNA TABELLA DEGLI ALIMENTI -----*/
    @GetMapping("/nutritionist/aliments")
    @PreAuthorize("hasAuthority('NUTRITIONIST')")
    @ResponseStatus(HttpStatus.OK)
    public Page<Alimento> getAllAliments(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "30") int size,
                                         @RequestParam(defaultValue = "idAlimento") String sortedBy) {
        return docS.getAllAliments(page, size, sortedBy);
    }

    /* ------ PER OTTENERE TUTTI GLI ALIMENTI ----- */

    @GetMapping("/aliments")
    @ResponseStatus(HttpStatus.OK)
    public List<Alimento> getAll(){
        return ad.findAll();
    }

    /* ---- GET PER I PERSONALTRAINER PER AVERE UNA TABELLA DEGLI ESERCIZI ------ */



    // POST

    /* ---- ASSEGNARE UNA DIETA SOLO PER NUTRIZIONISTI -----*/

    @PostMapping("/me/diet")
    @PreAuthorize("hasAuthority('NUTRITIONIST')")
    public DietResponse assignDiet(@AuthenticationPrincipal UserDetails userDetails,
                                   @RequestParam(required = true) Long idCustomer,
                                   @RequestBody @Validated DietPayload dp) throws MessagingException {
        return docS.createDiet(idCustomer,dp);

    }

    /* ---- Da testare e vedere se funziona con l'endpoint /me ----- */

    /*@GetMapping("/personalTrainer/{idPersonalTrainer}/patients")
    @PreAuthorize("hasAuthority('PERSONAL_TRAINER')")
    @ResponseStatus(HttpStatus.OK)
    public Page<Customer> getAllPersonalCustomer(@PathVariable Long idPersonalTrainer,
                                                 @RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size,
                                                 @RequestParam(defaultValue = "userId") String sortedBy) {
        return docS.getAllPersonalCustomer(idPersonalTrainer, page, size, sortedBy);
    }*/

    @DeleteMapping("/diet")
    @ResponseStatus(HttpStatus.OK)
    public void deleteDiet(@RequestParam Long idDieta){
        docS.deletDiet(idDieta);
    }
}

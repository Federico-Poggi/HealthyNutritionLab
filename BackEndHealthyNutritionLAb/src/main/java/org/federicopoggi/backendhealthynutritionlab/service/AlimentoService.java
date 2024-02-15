package org.federicopoggi.backendhealthynutritionlab.service;

import org.federicopoggi.backendhealthynutritionlab.model.Alimento;
import org.federicopoggi.backendhealthynutritionlab.repository.AlimentoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlimentoService {

    AlimentoDAO al;
    @Autowired
    public AlimentoService(AlimentoDAO al) {
        this.al = al;
    }

    public List<Alimento> getAll(){
        return al.findAll();
    }


}
